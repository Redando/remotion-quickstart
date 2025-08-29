# Remotion Quickstart Tutorial

[![YouTube Video](https://img.youtube.com/vi/X_lCPzKxnSE/maxresdefault.jpg)](https://www.youtube.com/watch?v=X_lCPzKxnSE)

---

## Remotion Quickstart — Render Image & Video Posts

This repository contains the code used in the Remotion Quickstart tutorial video. It demonstrates how to build a simple image and short vertical video composition that uses Pexels as a background source and overlays a quote.

---

## What you'll find here

- A tiny Remotion project using React components in `src/`.
- A `Composition`/`Still` pair that renders:
  - `QuoteImage` — a square still (1080x1080).
  - `QuoteVideo` — a 15s vertical video (1080x1920) at 60fps.
- A small `RenderService` wrapper and a `server.js` example to render from Node.

## Requirements

- Node.js (16+ recommended by Remotion; verify with your Remotion version)
- An internet connection (the project fetches media from the Pexels API)
- A Pexels API key

## Quick setup

1. Install dependencies:

```bash
npm install
```

2. Set your Pexels API key:

 - Open `src/Constants.js` and replace `<YOUR_API_KEY>` with your Pexels API key.

Example:

```js
export const Constants = {
  apiKey: 'YOUR_REAL_PEXELS_KEY',
  quote: { ... }
}
```

3. Start the Remotion studio (live preview):

```bash
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:3000) to preview compositions in the Remotion Studio.

## Available npm scripts

- `npm run dev` — Start Remotion Studio for interactive preview.
- `npm run build` — Bundle the project for rendering.
- `npm run server` — Run `node src/server.js` which demonstrates rendering the `QuoteVideo` to `./out/Quote-1.mp4` via the included `RenderService`.

## Rendering

Render a video using the example server script (after you set your API key):

```bash
npm run server
```

This runs `src/server.js` which calls `RenderService.renderVideo` and writes the result to `./out/Quote-1.mp4`.

If you prefer to render a still image, uncomment the `renderImage` call in `src/server.js` or call `RenderService.renderImage` directly.

## Files of interest

- `src/Composition.jsx` — Contains `QuoteComponent` with two public helpers:
  - `quoteImageComposition` (Still) and `quoteVideoComposition` (Composition).
  - Image/video components that fetch background media from Pexels and overlay the quote.
- `src/Root.jsx` — Registers the compositions that Remotion Studio shows.
- `src/index.ts` — Remotion entry point that registers `RemotionRoot`.
- `src/Constants.js` — Where the `apiKey` and default `quote` live. Update this to customize content.
- `src/RenderService.js` — Helper to bundle and render stills/videos programmatically.
- `src/server.js` — Example Node script that uses `RenderService` to render output to `./out/`.

## How to customize

- Change the quote: edit `src/Constants.js` or pass different `inputProps` to `RenderService`.
- Change the background search query: in `src/Root.jsx` the components are invoked with `query={'nature'}` — change that string to fetch different backgrounds.
- Composition settings (duration, fps, resolution): edit the `Composition` props in `src/Composition.jsx` (ids: `QuoteImage`, `QuoteVideo`).

## Troubleshooting

- No background or request failures: make sure `src/Constants.js` contains a valid Pexels API key and that your machine has internet access.
- Remotion/Node errors while bundling: ensure your Node version is compatible with the Remotion version in `package.json` (Remotion v4 series). If you hit webpack errors, run `npm run build` to see the full bundler output.
- Permission errors writing to `./out/`: ensure the directory exists or that Node has write access. Create the folder manually if needed:

```bash
mkdir -p out
```

## Notes for tutorial viewers

- The project demonstrates programmatic composition rendering (see `RenderService.js`) and using calculateMetadata to fetch remote media at bundle-time.
- It's intentionally minimal so you can fork it and experiment: try swapping the Pexels query, changing fonts, or animating the text.

## References

- Remotion docs: https://www.remotion.dev
- Pexels API docs: https://www.pexels.com/api/

---
