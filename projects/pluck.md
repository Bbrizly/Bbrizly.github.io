---
layout: project
title: "Pluck"
eyebrow: "Browser extension · 2026"
subtitle: "Copy a Pinterest feed image straight to your clipboard without ever opening the pin. Hover a still image, click Copy, and paste a clean PNG into Messages, Slack, Figma, or anything else that reads images from the clipboard. Shipped to the Chrome and Firefox stores."
description: "A browser extension that copies a Pinterest feed image straight to your clipboard, no need to open the pin. Shipped to the Chrome and Firefox stores."
tech:
  - JavaScript
  - Manifest V3
  - Chrome
  - Firefox
github_link: "https://github.com/Bbrizly/pluck"
topbar_link: "https://bbrizly.github.io/pluck/"
topbar_icon: "fas fa-arrow-up-right-from-square"
topbar_label: "Visit site"
logo: "/assets/images/pluck-logo.png"
hero_image: "/assets/images/pluck-demo.mp4"
hero_poster: "/assets/images/pluck-demo-poster.jpg"
live_url: "https://bbrizly.github.io/pluck/"
live_label: "Get Pluck"
live_note: "Install it from the Chrome or Firefox store on the Pluck site, then come back for how it works."
---

## What it is

Pinterest makes you open a pin to grab its image. Pluck removes that detour. A small **Copy** button appears on still images in the feed, search, and boards. Click it and a clean PNG lands on your system clipboard, ready to paste wherever you were already working.

No account, no server, no analytics. Everything runs in the browser.

## What it does

- **Copy on hover.** A Copy button on still images in the home feed, search results, and boards.
- **Handles carousels.** Copies the slide that is actually visible, and skips video pins.
- **Clean output.** A plain PNG on the clipboard, with Pinterest hover UI stripped out.
- **Layered fallback.** Reads the loaded image first, then falls back to a cropped visible-tab screenshot if canvas extraction is blocked.
- **Optional higher-res fetch** when the page exposes a larger URL, off by default.

## What it avoids on purpose

Pinterest's feed is a constantly mutating masonry grid. Pluck deliberately does not observe the whole document, rescan on a timer, prefetch images, read the clipboard, or talk to a backend. Pointer movement only stores coordinates. Detection runs when the pointer enters a new element, and the overlay hides while you scroll.

## How it's built

A Manifest V3 extension in plain JavaScript. One codebase builds Chrome and Firefox packages. 59 tests cover the copy pipeline. A build script packages each browser target, and the extension is published on the Chrome and Firefox stores.

## Shipped

Public on the Chrome Web Store and Firefox Add-ons, with a landing page and source on GitHub.
