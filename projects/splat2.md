---
layout: project
project_key: splat2
project_home: true
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

I owned the engine, rendering, and physics side of the project end to end. The systems I built and maintained:

- **Physics**: vehicle dynamics, wheel-by-wheel suspension, drift slip, weight transfer, and collision response, plus the supporting physics tooling the team tuned cars with.
- **Player locomotion**: the input layer and vehicle controller that defines how the car actually feels to drive.
- **World generation**: the procedural map system that builds a unique track per match seed.
- **Rendering and engine work**: the rendering pipeline, scene wiring, and the underlying engine systems the rest of the team built features on top of.
- **Visual effects**: in-game VFX layered onto the rendering pipeline (speed/dust, lighting cues, environmental effects).
- **Tools**: editor and debug tooling used to iterate on tracks, vehicles, and physics tuning.
- **Steam networking**: iterated heavily on lobby creation, matchmaking, and the peer-to-peer relay flow.

I also pulled in a large amount of work from my previous years and integrated it into the engine so the team could use it from day one: my own GPU particle system, my own OpenGL text renderer (font sheets, word wrap, ellipsis, multi-language), my own colouring system, and my own tech / debug renderer for visualising physics, collisions, and engine state.

## Dev log

The dev log walks through architecture decisions, system breakdowns, and lessons learned. The PowerPoint version keeps the animated clips that show the systems in motion; the PDF gives you the static read.
