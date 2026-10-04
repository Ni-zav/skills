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
  ) return value.slice(1, -1);
  return value;
}

function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!match) return {};
  const data = {};
  for (const line of match[1].replace(/\r\n/g, "\n").split("\n")) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const pair = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (pair) data[pair[1]] = stripQuotes(pair[2].trim());
  }
  return data;
}

function parseOpenAI(text) {
  const value = (key) => {
    const match = new RegExp("^\\s*" + key + ":\\s*[\"']?(.*?)[\"']?\\s*$", "m").exec(text);
    return match ? match[1] : "";
  };
  return {
    displayName: value("display_name"),
    shortDescription: value("short_description"),
    defaultPrompt: value("default_prompt"),
  };
}

function findSkillFiles(dir, found = []) {
  if (!fs.existsSync(dir)) return found;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    const skillFile = path.join(full, "SKILL.md");
    if (fs.existsSync(skillFile)) found.push(skillFile);
    else findSkillFiles(full, found);
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
      const openaiPath = path.join(dir, "agents", "openai.yaml");
      const evalPath = path.join(dir, "evals", "evals.json");
      const provenancePath = path.join(dir, "references", "provenance.md");
      const openaiText = fs.existsSync(openaiPath) ? fs.readFileSync(openaiPath, "utf8") : "";
      let evals = null;
      if (fs.existsSync(evalPath)) {
        try {
          evals = JSON.parse(fs.readFileSync(evalPath, "utf8"));
        } catch {
          evals = { __parseError: true };
        }
      }
      return {
        name: fm.name || path.basename(dir),
        description: fm.description || "",
        path: relDir,
        dir,
        text,
        openaiPath,
        openaiText,
        openai: parseOpenAI(openaiText),
        evalPath,
        evals,
        provenancePath,
        hasProvenance: fs.existsSync(provenancePath),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function writeDashboard() {
  const skills = discoverSkills();
  const rows = skills.map((skill) => {
    const summary = skill.openai.shortDescription || skill.description.split(".")[0];
    const evalCount = Array.isArray(skill.evals?.prompts) ? skill.evals.prompts.length : 0;
    return `| \`${skill.name}\` | ${summary.replace(/\s+/g, " ")} | ${evalCount} | \`${skill.path}\` |`;
  }).join("\n");

  const markdown = `# Skills Dashboard

Generated from the canonical skill folders by \`npm run dashboard\`.

| Skill | Summary | Eval prompts | Path |
| --- | --- | ---: | --- |
${rows || "| _none_ | _none_ | 0 | _none_ |"}

## Commands

\`\`\`bash
npm run dashboard
npm run validate
npm run install:codex
npm run install:claude
\`\`\`

Read \`README.md\` for the curated catalog and \`.agents/skill-authoring.md\` for the quality bar.
`;

  const json = skills.map((skill) => ({
    name: skill.name,
    description: skill.description,
    short_description: skill.openai.shortDescription,
    path: skill.path,
    eval_prompts: Array.isArray(skill.evals?.prompts) ? skill.evals.prompts.length : 0,
    provenance: skill.hasProvenance,
    agents: { openai: Boolean(skill.openaiText) },
  }));

  fs.writeFileSync(path.join(repoRoot, "DASHBOARD.md"), markdown);
  fs.writeFileSync(path.join(repoRoot, "skills.json"), `${JSON.stringify(json, null, 2)}\n`);
  console.log(`Wrote DASHBOARD.md and skills.json for ${skills.length} skill(s).`);
}

function validate() {
  const skills = discoverSkills();
  const errors = [];
  const warnings = [];

  if (!skills.length) errors.push("No skills found under skills/.");

  for (const skill of skills) {
    if (!/^[a-z0-9-]{1,64}$/.test(skill.name)) {
      errors.push(`${skill.path}: invalid skill name ${skill.name}`);
    }
    if (skill.name !== path.basename(skill.dir)) {
      errors.push(`${skill.path}: frontmatter name must match folder name`);
    }
    if (!skill.description || /\bTODO\b|\[TODO/i.test(skill.description)) {
      errors.push(`${skill.path}: description is missing or contains TODO`);
    }
    if (skill.description.length > 1024) {
      errors.push(`${skill.path}: description exceeds 1024 characters`);
    }
    if (!/\bUse when\b/i.test(skill.description)) {
      errors.push(`${skill.path}: description should include concrete 'Use when' trigger guidance`);
    }
    if (/\[TODO|TODO:/i.test(skill.text)) {
      errors.push(`${skill.path}: SKILL.md still contains TODO markers`);
    }

    const lineCount = skill.text.replace(/\r\n/g, "\n").split("\n").length;
    if (lineCount > 500) {
      errors.push(`${skill.path}: SKILL.md is ${lineCount} lines; move detail to references (max 500)`);
    } else if (lineCount > 300) {
      warnings.push(`${skill.path}: SKILL.md is ${lineCount} lines; consider progressive disclosure`);
    }

    if (!skill.openaiText) {
      errors.push(`${skill.path}: missing agents/openai.yaml`);
    } else {
      if (!skill.openai.defaultPrompt.includes(`$${skill.name}`)) {
        errors.push(`${skill.path}: default_prompt should mention $${skill.name}`);
      }
      if (!skill.openai.displayName) errors.push(`${skill.path}: openai.yaml missing display_name`);
      if (!skill.openai.shortDescription) errors.push(`${skill.path}: openai.yaml missing short_description`);
      const n = skill.openai.shortDescription.length;
      if (n && (n < 25 || n > 64)) {
        errors.push(`${skill.path}: short_description must be 25-64 characters (got ${n})`);
      }
    }

    if (!skill.hasProvenance) {
      errors.push(`${skill.path}: missing references/provenance.md`);
    }

    if (!skill.evals) {
      errors.push(`${skill.path}: missing evals/evals.json`);
    } else if (skill.evals.__parseError) {
      errors.push(`${skill.path}: evals/evals.json is invalid JSON`);
    } else if (!Array.isArray(skill.evals.prompts) || skill.evals.prompts.length < 3) {
      errors.push(`${skill.path}: evals/evals.json needs at least 3 prompts`);
    } else if (skill.evals.prompts.some((p) => typeof p !== "string" || p.trim().length < 20)) {
      errors.push(`${skill.path}: eval prompts must be realistic non-empty request strings`);
    }
  }

  for (const warning of warnings) console.warn(`WARN: ${warning}`);
  if (errors.length) {
    for (const error of errors) console.error(`ERROR: ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`OK: ${skills.length} skill(s) validated with eval and provenance coverage.`);
}

function valueAfter(args, flag) {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

function defaultInstallDir(target) {
  if (target === "codex") {
    return path.join(process.env.CODEX_HOME || path.join(os.homedir(), ".codex"), "skills");
  }
  if (target === "claude") return path.join(os.homedir(), ".claude", "skills");
  throw new Error("target must be codex or claude");
}

function install(args) {
  const target = valueAfter(args, "--target");
  const onlySkill = valueAfter(args, "--skill");
  const dest = path.resolve(valueAfter(args, "--dest") || defaultInstallDir(target));
  const force = args.includes("--force");
  const skills = discoverSkills().filter((skill) => !onlySkill || skill.name === onlySkill);

  if (!skills.length) throw new Error(onlySkill ? `No skill named ${onlySkill}` : "No skills found");

  fs.mkdirSync(dest, { recursive: true });
  for (const skill of skills) {
    const output = path.join(dest, skill.name);
    if (fs.existsSync(output)) {
      if (!force) throw new Error(`${output} already exists; pass --force to replace it`);
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
