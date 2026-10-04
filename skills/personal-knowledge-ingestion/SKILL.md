---
name: personal-knowledge-ingestion
description: Design personal capture pipelines that ingest chat messages, URLs, quick notes, receipts, attendance/check-ins, lightweight finance entries, and web clippings into an Obsidian-style personal vault through a Telegram bot or similar gateway. Use when building a personal-gateway, Telegram-to-Obsidian capture flow, URL parser/web clipper, inbox processor, structured daily input, or when deciding how automation should write into a long-lived personal knowledge base without making the vault messy or coupling it to one bot.
---

# Personal Knowledge Ingestion

Keep the vault as the durable source of truth. Treat chat as a capture interface, not the data model.

## Architecture

Prefer this boundary:

```text
Telegram / share target / webhook
        ↓
personal gateway
        ↓
normalize + classify + enrich
        ↓
append/create durable vault files
        ↓
optional acknowledgement back to chat
```

The gateway owns transport/auth/retries. The vault owns long-lived human-readable data.

## Capture envelope

Normalize every input into a small envelope before routing:

- source;
- captured timestamp;
- sender/account identity if relevant;
- raw text/URL;
- parsed type;
- optional structured fields;
- provenance/original link;
- processing status.

Preserve the raw input when parsing is lossy.

## Routing

Use a small number of stable destinations:

- `Inbox/` for unclassified capture;
- daily note append for quick logs/attendance;
- topic/reference note for web captures;
- dedicated ledger-style files for structured finance data;
- attachments folder for files/media.

Do not create a new folder taxonomy for every bot command.

## URL capture

1. Store original URL.
2. Resolve canonical title/source/date when available.
3. Extract useful text/metadata without pretending a failed parser succeeded.
4. Add concise summary/tags only if they improve retrieval.
5. Make ingestion idempotent using URL/hash/message ID so retries do not create duplicates.

## Structured inputs

For finance, attendance, or quick forms, separate the canonical machine-readable fields from human-readable note text. Use stable date/currency conventions and never infer a transaction amount/category silently when the message is ambiguous.

## Reliability

- acknowledge only after durable write, or clearly mark queued state;
- retry transient failures;
- make writes idempotent;
- never expose bot tokens in the vault/repo;
- log enough provenance to repair bad parsing later;
- prefer append-only capture before implementing destructive "smart organization".

## Growth rule

Start with capture and retrieval. Add budgeting, finance automation, daily workflows, or agent actions only after the ingestion boundary is stable.
