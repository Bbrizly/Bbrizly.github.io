---
layout: project
project_key: splat2
project_home: true
title: "Splat II"
eyebrow: "Final-year capstone · 2025"
subtitle: "Multiplayer racing game on Steam. You fly through a procedural city at high speed with dual grappling hooks, racing your own ghost or your friends. Built in C++ on a custom engine."
hero_image: "/assets/images/splat2/splat2-gameplay.gif"
tech:
  - "C++"
  - OpenGL
  - Jolt Physics
  - GLSL
  - Steam Networking
  - Procedural Gen
github_link: "https://github.com/splatstudios/Splat_II"

# Topbar override: Steam button, greyed out until the store page is live.
# When it is, delete topbar_disabled and set:
#   topbar_link: "https://store.steampowered.com/app/..."
#   topbar_label: "View on Steam"
topbar_label: "Steam page coming soon"
topbar_icon: "fab fa-steam"
topbar_disabled: true

# Slide deck. PDF is static (animated GIFs in the deck flatten to first frame).
# The .pptx keeps the animations.
pdf: "/documents/splat-ii-dev-log.pdf"
pptx: "/documents/splat-ii-dev-log.pptx"
---

## Overview

Splat II is my final-year capstone, built in C++ on top of a custom engine framework called Wolf. The game is a multiplayer racer where players swing through a procedurally generated city using dual grappling hooks, race their own ghost or other players over Steam, and try to reach the black hole at the end of the map.

## Highlights

- **Dual grappling hook movement** with spring physics, ring-based aim assist, and coyote time forgiveness.
- **Procedural city** generated per match from a seed: layered Perlin terrain with biome blending and thermal erosion, GPU-instanced buildings (flat, curved, arched), and a route system that guarantees every map is finishable.
- **Volumetric fog** built from graphics papers: screen-space ray marching with Henyey-Greenstein scattering, half-res with temporal filtering.
- **Ghost replay**, cutscene system with arc-length parameterization, and a black hole shader with 27 uniforms driving spiral arms, halftone stylization, and screen distortion.

## My contribution

The systems I owned end-to-end:

- **Player Locomotion**: the largest gameplay component in the project. Dual grappling hooks with independent constraints, ring aim assist (5 rings, 8 directions, 40 samples per crosshair), coyote time with three trackers, spring dynamics with slack accumulation and boost conversion, physics layers, and the bug fix that moved the grapple raycast origin from the camera to the player's centre so it stopped getting stuck inside walls.
- **Terrain System**: layered Perlin with biome blending, thermal erosion, chunk streaming on worker threads, a shared vertex grid with stride-based LOD, height storage as `uint16` in a GPU texture atlas, and Jolt heightfield collision.
- **Procedural Buildings**: the biggest component in the project. Flat, curved, and arched building generation. The curvature struct that drives the vertex-shader bend, plus the CPU convex hull colliders that match it. Building placement rules, landmark injection, the sine-wave route system, and anti-splat building handling.
- **Volumetric Fog**: research-driven implementation. Screen-space ray marching, Henyey-Greenstein phase, height + ground + wind-noise density, half-res + temporal filter. Took four iterations to reach 60 fps.
- **Trail Renderer**: built from scratch. Ring buffer of points, CPU mesh rebuild every frame, glow driven by acceleration not speed so boosts visibly flash.
- **Black Hole Shader**: replaced the original basic goal object. Procedural spirals, halftone dots, distortion, physics sensor, particles pulled inward via "towards point" affector.
- **Ghost Replay**: position, rotation, and both grapple anchors recorded at 30 Hz to raw binary. Auto-keeps the faster of new vs old run.
- **Cutscene System**: seven camera command types in a queue, three easing curves, arc-length parameterization so the camera moves at constant speed along the procedural building routes.
- **Culling, Bounding Volumes, GPU Instancing, Occlusion Culling**: built from scratch. The occlusion pass downsamples depth to 160x90 and tests projected bounding boxes against it. Instancing cut building draw calls by around 70%.
- **Jolt Physics Setup**: 65k bodies max, multithreaded job system on N-1 cores, 60 Hz fixed timestep with accumulator, sphere colliders, distance constraints, heightfield shapes, collision layer system, and Jolt's debug visualizer wired into our editor.
- **Settings, Tutorial, Gameplay Gates** (Speed boost, Checkpoint, Death block), **Crosshair**, **Background Loader** (the single biggest perceived performance win in the project), **Steam Manager** wrapper (lobbies, leaderboards, presence).

I also brought four systems forward from previous years and integrated them: my **Particle System** (five emitter shapes, affector pipeline, YAML serialization), my **Text Renderer**, my **Debug Renderer** (the system that made every spatial bug findable instead of guessable), and my **bounding volume system**.

Click any deep-dive in the sidebar for the details.

## Dev log

The dev log walks through the architecture decisions, system breakdowns, and lessons learned across the year. The PowerPoint keeps the animated clips that show the systems in motion; the PDF gives you the static read.
