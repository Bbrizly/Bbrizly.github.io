---
layout: project
title: "Splat II"
eyebrow: "Final-year project · 2025"
subtitle: "Final-year capstone. Multiplayer arcade racer on Steam. Physics-driven vehicles, procedural tracks generated per match, and custom GLSL shaders for the environment."
tech:
  - "C++"
  - Steam SDK
  - GLSL
  - Procedural Gen
github_link: ""
# steam_link: "https://store.steampowered.com/app/..."
# hero_image: "/assets/images/splat2-cover.webp"

# Slide deck. PDF is static (animated GIFs in the deck flatten to first frame).
# The .pptx is kept alongside so the animations survive for anyone who opens
# it in PowerPoint or Keynote.
pdf: "/documents/splat-ii-dev-log.pdf"
pptx: "/documents/splat-ii-dev-log.pptx"

# Drop video clips or screenshots here. .mp4 / .webm render as autoplaying
# muted loops, anything else renders as an image.
# images:
#   - "/assets/images/splat2-clip-1.mp4"
#   - "/assets/images/splat2-screen-1.webp"
---

## Overview

Splat II is a final-year capstone project: a multiplayer arcade racer built in C++ on top of a custom rendering pipeline with Steam integration for matchmaking, lobby invites, and friend joins.

## Highlights

- **Steam multiplayer** through the Steam SDK: lobby creation, friend invites, peer-to-peer networking with the Steam relay backbone.
- **Physics-based vehicle handling** tuned for arcade feel rather than simulation realism. Wheel-by-wheel suspension, configurable drift slip, and weight-transfer effects.
- **Procedural map generation**: each match generates a unique track from a seed. Useful for keeping practice sessions fresh and for making leaderboards seed-locked rather than memorization-locked.
- **Custom GLSL shaders** for the dynamic environment: time-of-day lighting, road wetness/reflections, and dust kick-up tied to vehicle speed.

## My contribution

(Replace this section with the specific systems you owned: networking, physics, rendering, etc. The dev log below covers it in more depth.)

## Dev log

The dev log walks through architecture decisions, system breakdowns, and lessons learned. The PowerPoint version keeps the animated clips that show the systems in motion; the PDF gives you the static read.
