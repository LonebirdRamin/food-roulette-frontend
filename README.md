# Food Roulette frontend

A Next.js app that helps you pick an everyday Thai meal. Phase 3 includes the welcome screen and random dish picker. Restaurant search is planned for a later phase.

## Run locally

Install a recent Node.js version (20.9 or later), then from this folder run:

```sh
npm install
npm run dev
```

Open http://localhost:3000. Press Ctrl+C in the terminal to stop the server. The Lobster display font loads from Google Fonts; a cursive fallback is used when it cannot be loaded.

## Test and build

```sh
npm test
npm run build
```

The automated tests use Node's built-in TypeScript support (Node.js 22.18 or newer). Random draws include the entire list, so the same dish can appear more than once in a row.
