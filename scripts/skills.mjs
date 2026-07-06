#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = path.join(repoRoot, "skills");

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!match) return {};

  const lines = match[1].replace(/\r\n/g, "\n").split("\n");
  const data = {};
  for (let i = 0; i < lines.length; ) {
    const line = lines[i];
    if (!line.trim() || line.trimStart().startsWith("#")) {
      i += 1;
      continue;
    }
    const pair = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!pair) {
      i += 1;
      continue;
    }
    const key = pair[1];
    const raw = pair[2].trim();
    if (raw === ">" || raw === "|") {
      const parts = [];
      i += 1;
      while (i < lines.length && (/^\s/.test(lines[i]) || !lines[i].trim())) {
        if (lines[i].trim()) parts.push(lines[i].trim());
        i += 1;
      }
      data[key] = raw === ">" ? parts.join(" ") : parts.join("\n");
      continue;
    }
    data[key] = stripQuotes(raw);
    i += 1;
  }
  return data;
}

function findSkillFiles(dir, found = []) {
  if (!fs.existsSync(dir)) return found;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const skillFile = path.join(full, "SKILL.md");
      if (fs.existsSync(skillFile)) {
        found.push(skillFile);
      } else {
        findSkillFiles(full, found);
      }
    }
  }
  return found;
}

function discoverSkills() {
  return findSkillFiles(skillsRoot)
    .map((skillFile) => {
      const text = fs.readFileSync(skillFile, "utf8");
      const fm = parseFrontmatter(text);
      const dir = path.dirname(skillFile);
      const relDir = path.relative(repoRoot, dir).replaceAll(path.sep, "/");
      return {
        name: fm.name || path.basename(dir),
        description: fm.description || "",
        path: relDir,
        hasOpenAI: fs.existsSync(path.join(dir, "agents", "openai.yaml")),
        dir,
        text,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function writeDashboard() {
  const skills = discoverSkills();
  const rows = skills
    .map(
      (skill) =>
        `| \`${skill.name}\` | ${skill.description.replace(/\s+/g, " ")} | \`${skill.path}\` | ${
          skill.hasOpenAI ? "yes" : "no"
        } |`,
    )
    .join("\n");

  const markdown = `# Skills Dashboard

Generated from \`skills/*/SKILL.md\` by \`npm run dashboard\`.

| Skill | Description | Path | OpenAI metadata |
| --- | --- | --- | --- |
${rows || "| _none_ | _none_ | _none_ | _none_ |"}

## Install

Local copy install before publishing:

\`\`\`bash
npm run install:codex
npm run install:claude
\`\`\`

After this repo is pushed to GitHub, compatible skill installers can use:

\`\`\`bash
npx skills@latest add <owner>/<repo>
\`\`\`

## Add A Skill

Create skills under \`skills/<skill-name>/\`. Each skill needs \`SKILL.md\`; add \`agents/openai.yaml\` for Codex UI metadata and optional \`references/\`, \`scripts/\`, or \`assets/\` only when they are useful.
`;

  const json = skills.map(({ name, description, path: skillPath, hasOpenAI }) => ({
    name,
    description,
    path: skillPath,
    agents: { openai: hasOpenAI },
  }));

  fs.writeFileSync(path.join(repoRoot, "DASHBOARD.md"), markdown);
  fs.writeFileSync(path.join(repoRoot, "skills.json"), `${JSON.stringify(json, null, 2)}\n`);
  console.log(`Wrote DASHBOARD.md and skills.json for ${skills.length} skill(s).`);
}

function validate() {
  const skills = discoverSkills();
  const errors = [];
  if (!skills.length) errors.push("No skills found under skills/.");

  for (const skill of skills) {
    if (!/^[a-z0-9-]{1,64}$/.test(skill.name)) {
      errors.push(`${skill.path}: invalid skill name ${skill.name}`);
    }
    if (skill.name !== path.basename(skill.dir)) {
      errors.push(`${skill.path}: frontmatter name must match folder name`);
    }
    if (!skill.description || /\bTODO\b|\[TODO/i.test(skill.description)) {
      errors.push(`${skill.path}: description is missing or still contains TODO`);
    }
    if (skill.description.length > 1024) {
      errors.push(`${skill.path}: description exceeds 1024 characters`);
    }
    if (/\[TODO|TODO:/i.test(skill.text)) {
      errors.push(`${skill.path}: SKILL.md still contains TODO markers`);
    }
    const openaiPath = path.join(skill.dir, "agents", "openai.yaml");
    if (!fs.existsSync(openaiPath)) {
      errors.push(`${skill.path}: missing agents/openai.yaml`);
    } else {
      const openai = fs.readFileSync(openaiPath, "utf8");
      if (!openai.includes(`$${skill.name}`)) {
        errors.push(`${skill.path}: agents/openai.yaml default_prompt should mention $${skill.name}`);
      }
    }
  }

  if (errors.length) {
    for (const error of errors) console.error(`ERROR: ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`OK: ${skills.length} skill(s) validated.`);
}

function valueAfter(args, flag) {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

function defaultInstallDir(target) {
  if (target === "codex") {
    return path.join(process.env.CODEX_HOME || path.join(os.homedir(), ".codex"), "skills");
  }
  if (target === "claude") {
    return path.join(os.homedir(), ".claude", "skills");
  }
  throw new Error("target must be codex or claude");
}

function install(args) {
  const target = valueAfter(args, "--target");
  const onlySkill = valueAfter(args, "--skill");
  const dest = path.resolve(valueAfter(args, "--dest") || defaultInstallDir(target));
  const force = args.includes("--force");
  const skills = discoverSkills().filter((skill) => !onlySkill || skill.name === onlySkill);

  if (!skills.length) {
    throw new Error(onlySkill ? `No skill named ${onlySkill}` : "No skills found");
  }

  fs.mkdirSync(dest, { recursive: true });
  for (const skill of skills) {
    const output = path.join(dest, skill.name);
    if (fs.existsSync(output)) {
      if (!force) {
        throw new Error(`${output} already exists; pass --force to replace it`);
      }
      fs.rmSync(output, { recursive: true, force: true });
    }
    fs.cpSync(skill.dir, output, { recursive: true });
    console.log(`Installed ${skill.name} -> ${output}`);
  }
}

function usage() {
  console.log(`Usage:
  node scripts/skills.mjs dashboard
  node scripts/skills.mjs validate
  node scripts/skills.mjs install --target codex|claude [--skill name] [--dest path] [--force]`);
}

try {
  const [command, ...args] = process.argv.slice(2);
  if (command === "dashboard") writeDashboard();
  else if (command === "validate") validate();
  else if (command === "install") install(args);
  else {
    usage();
    process.exitCode = command ? 1 : 0;
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}