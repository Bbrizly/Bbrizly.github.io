---
layout: project
title: "Drawer"
eyebrow: "macOS app · 2026"
subtitle: "A menu bar app that slides today's to-do list into view with a global hotkey. The list is a plain markdown file, so you can edit it anywhere and the panel stays in sync. Check a task off in the panel and the checkbox is written back to the file. No account, no database."
tech:
  - Swift
  - SwiftUI
  - Swift Package Manager
  - macOS
github_link: "https://github.com/Bbrizly/Drawer"
topbar_link: "https://bbrizly.github.io/Drawer/"
topbar_icon: "fas fa-arrow-up-right-from-square"
topbar_label: "Visit site"
logo: "/assets/images/drawer-logo.png"
hero_image: "/assets/images/drawer-demo.mp4"
hero_poster: "/assets/images/drawer-demo-poster.jpg"
live_url: "https://bbrizly.github.io/Drawer/"
live_label: "Get Drawer"
live_note: "Download the signed build from the Drawer site, then come back for how it works."
---

## What it is

I keep my whole day in one markdown file. I wanted to see it and check things off without opening an app or switching windows. Drawer lives at the top-left edge of the screen and slides out with a global hotkey. Inside is today's list, read straight from that file, plus a focus timer to work through it.

The list is just text, so you can edit it in Obsidian, an editor, or iCloud, and the panel stays in sync. Nothing to sync, no account, no database. Your tasks stay yours.

## What it does

- **Global hotkey** to show and hide, default Control-Option-Space.
- **Today, Carried over, and Tomorrow** sections, built from dated headings in the file.
- **Focus timer** with pause, resume, and a completion chime, plus a Pomodoro cycle.
- **Stopwatch** that logs real hours against each task, with an end-of-day summary.
- **Focus sounds** and check-off sounds, a floating notes pad, and an idea board in the same file.
- **Eight themes**, from calm system materials to art-directed worlds.
- **Turn any feature on or off**, or strip the app down to Minimal.

## How it's built

A SwiftUI menu bar app built with Swift Package Manager, targeting macOS 26 and Swift 6.2. It reads and writes a plain markdown task file with checkboxes under dated headings, kept hand-writable so it stays in sync with whatever editor you use. Respects Reduce Motion.

## Shipped

Public on GitHub with tagged releases and a landing page, downloadable as a signed build.
