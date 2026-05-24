---
project_key: splat2
nav_title: "Physics"
order: 10
title: "Vehicle Physics"
eyebrow: "Splat II · Deep dive"
subtitle: "How the car actually feels: suspension, drift, weight transfer, and contact response."
---

The car is the player. Everything else in the game is dressing on top of it. That meant the physics had to feel right within the first three seconds of holding the stick, then stay predictable through every drift, contact, and landing.

## Suspension

Each car runs four independent suspension probes, one per wheel. Each probe ray-casts down from its wheel mount, finds the ground, and applies a spring force scaled by compression depth plus a damper proportional to compression velocity. The chassis above the wheels is a rigid body that the spring forces push around.

The wheel-by-wheel approach gives natural body roll on turns and pitch on braking and acceleration for free, without any scripted animation on top.

## Drift slip

Each wheel exposes a longitudinal and lateral grip curve. Lateral grip is intentionally non-linear: low slip angles get high grip, then past a tunable break-away angle the grip drops sharply. That sharp drop is what makes drift feel like a discrete state instead of a slider.

Recovery is tuned so the player can either ride the slide or steer out of it, depending on throttle. The break-away angle, recovery rate, and grip floor are all per-car so the cast can have distinct handling without rewriting the physics.

## Weight transfer

When the car brakes hard, the front wheels press into the ground harder and the rear wheels lift slightly. The available grip redistributes with it: more for the front, less for the rear. That's the physical reason braking-while-turning feels different from steady-state cornering. The implementation tracks instantaneous longitudinal and lateral acceleration on the chassis and rebalances per-wheel normal load each tick.

## Contact response

Vehicle-vehicle contact runs through a constraint solver tuned to feel like a bump, not a dead stop. Vehicle-environment contact also routes through the debug tools so I can replay any specific collision event in the tech debug renderer and see exactly why a hit felt wrong.

## Tools

A lot of the work that doesn't show up on screen is the tooling that made the rest tunable: live curve editors for grip falloff, a wheel-state HUD that shows compression / slip / load per wheel in real time, and a replay capture that I can scrub through frame-by-frame when something feels off in a playtest.

---

*Draft scaffold. Expand each section with the actual numbers, code snippets, and clips from the dev log.*
