---
layout: project
title: "ButtonHook"
eyebrow: "Web game · 2026"
subtitle: "A daily truck-backing puzzle. Everyone gets the same yard each day, one attempt, and the score is how many times you had to change gear after moving. Zero shifts is a perfect run."
description: "A daily truck-backing puzzle built with three.js: dock a 53ft trailer in the day's shared yard, scored by how many times you had to shift gear."
tech:
  - three.js
  - Vite
  - Capacitor
  - RevenueCat
github_link: "https://github.com/Bbrizly/ButtonHook"
topbar_link: "https://buttonhook.pages.dev"
topbar_label: "Visit site"
topbar_icon: "fas fa-arrow-up-right-from-square"
live_url: "https://buttonhook.pages.dev"
live_external: true
live_label: "Play Buttonhook"
live_note: "Free to play in the browser, no account. Everything below is how it was built."
logo: "/assets/images/buttonhook-logo.png"
hero_image: "/assets/images/buttonhook-demo.mp4"
hero_poster: "/assets/images/buttonhook-demo-poster.jpg"
---

## What it is

A buttonhook is the move a trucker makes to dock a 53ft trailer in a lot too tight for it: swing wide, then cut back. Every day there is one yard, the same one for everybody. You start loaded, in Drive, looking at a bay you cannot reach in a straight line. Make one good forward setup, shift into Reverse, and put the trailer on the dock without touching anything.

Your score is how many times you had to change gear after moving. Shifting while stopped is free. Zero shifts is a perfect run. A run takes about a minute, and there is a new yard tomorrow.

## What makes it hard

The puzzle is the setup, not the parking. Where you stop going forward decides whether the reverse line exists at all. A trailer does not go where you point it, it goes where you already put it. A guide line shows where the trailer is headed, so you learn fast.

Controls are built for a thumb: put it down anywhere and a steering wheel appears under it. Slide sideways to steer, pull down to roll, let go to stop. Arrow controls are available in the menu for anyone who prefers them.

No ads, no accounts, no login. There is a tip jar in the menu and it unlocks nothing: the game is exactly the same before and after.

## How it's built

Three.js on Vite for the 3D truck-and-yard sim, wrapped in Capacitor for the iOS build ("Back It Up!", currently in App Store review). RevenueCat handles the optional tip jar.

The repository bundles 378 yards in `src/yards.json`. `scripts/yards.js` generates and fills the daily schedule ahead of time, and its `--check` pass re-parks every banked yard against whatever physics is currently in the tree, as a regression test. `selfcheck.js` runs a broader set of assertions over the physics and scoring rules on every check.
