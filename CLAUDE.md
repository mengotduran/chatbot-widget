# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

An embeddable chatbot widget designed to be dropped into any client website as a single HTML snippet. It consists of two parts:

- **`index.html`** — The self-contained frontend widget (HTML + vanilla JS). This is the embed snippet clients copy-paste into their sites. It renders a fixed-position chat bubble, manages conversation state in memory, and calls the backend API.
- **`pages/api/chat.js`** — A Next.js API route deployed on Vercel. It proxies chat requests to the Google Gemini API (`gemini-1.5-flash`), forwarding the message history and a per-client `systemPrompt`.

## Architecture

The widget is **stateless on the server**: the full conversation history (`messages[]`) is sent with every request from the browser. The API route simply relays this to Gemini and returns the reply.

Message format follows Gemini's content schema — `{ role: "user"|"model", parts: [{ text }] }`.

Customization per client happens in two places:
1. `API_URL` in `index.html` — points to the deployed Vercel endpoint.
2. `SYSTEM_PROMPT` in `index.html` — describes the client's business and knowledge base.

## Environment variables

| Variable | Where set | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | `.env.local` / Vercel dashboard | Authenticates requests to the Gemini API |

## Deployment

The API route is deployed to Vercel. The current live endpoint is referenced in `index.html`. To deploy a new version, push to `main` (Vercel auto-deploys from the connected repo).

There is no build step, test suite, or package.json — this is a minimal Next.js project with a single serverless function.
