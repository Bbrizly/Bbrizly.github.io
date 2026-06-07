---
project_key: splat2
nav_title: "Design Decisions"
order: 10
title: "Design Decisions"
eyebrow: "Splat II · Deep dive"
subtitle: "Why the game looks and feels the way it does. Concept art, early prototypes, and what stuck."
---

This page is a visual history of the design choices that shaped Splat II. Each section pairs an image with the thought process behind the call.

## Visual identity

We wanted the game to read as Splat II at a glance. That meant strong silhouettes, a tight palette, and a few hero visuals that would carry the whole identity.

![Inspiration board: Neon White, Clustertruck, Antichamber, Superhot, and other movement-game references](/assets/images/splat2/design-inspiration-board.png)
![Concept references and identity mood for the city](/assets/images/splat2/design-concept-references.png)
![Silhouette and identity tests we used to lock the look](/assets/images/splat2/design-identity-refs.png)

## Map structure

The maps had to be big enough that the grappling hook felt powerful, but legible enough that a new player could find the next checkpoint without a HUD arrow. Building density, height progression, and the route system all came out of this constraint. See [Buildings](/projects/splat2/buildings/) for the route system in detail and [World Generation](/projects/splat2/world-generation/) for how the terrain underneath gets built.

## Player feel

We tuned movement around one question: what makes a 30-second loop fun to repeat? The answer drove the aim assist forgiveness, the grapple recovery window, and the camera lead. See [Player Locomotion](/projects/splat2/player-locomotion/) for the implementation.

![Earlier visual pass before the tuning](/assets/images/splat2/design-tuning-before.png)
![The same scene after the look pass landed](/assets/images/splat2/design-tuning-after.png)

## Visual language for gameplay cues

Important objects had to read as important from across the map. The black hole at the end of each level, the boost pads, the grappleable surfaces. Each got a distinct visual treatment so you never had to read text mid-run. The black hole shader is broken down in [Visual Effects](/projects/splat2/visual-effects/).

## What got cut

Not every idea shipped. Cutting a system is also a design decision. The big ones:

- **The bullet premise.** The first version of the story cast you as a bullet gaining enough momentum to pierce through giant enemies. The momentum fantasy stayed, the bullet and the enemies did not.
- **The alien migration story.** The second pass at narrative had every racer as an alien species racing back to its mother, set in a dystopian, surreal, abstract world. We never had the time to tell it properly, so it got stripped back to pure racing.
- **A more detailed player character.** The player is a ball with a face on it. We wanted a character with real presence, with animations and clothing, but the art never came together before the deadline.

![Character and creature references that did not survive scope cuts](/assets/images/splat2/design-cut-character-refs.png)
