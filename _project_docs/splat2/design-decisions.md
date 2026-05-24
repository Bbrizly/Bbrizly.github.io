---
project_key: splat2
nav_title: "Design Decisions"
order: 10
title: "Design Decisions"
eyebrow: "Splat II · Deep dive"
subtitle: "Why the game looks and feels the way it does. Concept art, early prototypes, and what stuck."
---

This page is a visual history of the design choices that shaped Splat II. Each section pairs an image with the thought process behind the call.

{% comment %}
This article is image-driven. Drop screenshots into /assets/images/splat2/
and reference them inline below each section. Each section has a one-paragraph
intro to anchor the rationale, then add as many supporting images as you like.
{% endcomment %}

## Visual identity

We wanted the game to read as Splat II at a glance. That meant strong silhouettes, a tight palette, and a few hero visuals that would carry the whole identity.

{% comment %} IMAGES: early concept art, palette tests, identity references. {% endcomment %}

## Map structure

The maps had to be big enough that the grappling hook felt powerful, but legible enough that a new player could find the next checkpoint without a HUD arrow. Building density, height progression, and the route system all came out of this constraint.

{% comment %} IMAGES: top-down map sketches, density passes, route-system diagrams. {% endcomment %}

## Player feel

We tuned movement around one question: what makes a 30-second loop fun to repeat? The answer drove the aim assist forgiveness, the grapple recovery window, and the camera lead. See [Player Locomotion](/projects/splat2/player-locomotion/) for the implementation.

{% comment %} IMAGES: movement playtest clips, before/after tuning comparisons. {% endcomment %}

## Visual language for gameplay cues

Important objects had to read as important from across the map. The black hole at the end of each level, the boost pads, the grappleable surfaces. Each got a distinct visual treatment so you never had to read text mid-run.

{% comment %} IMAGES: side-by-side of in-world objects with their gameplay role. {% endcomment %}

## What got cut

Not every idea shipped. Cutting a system is also a design decision. List the big ones here with one line on why they did not make it.

{% comment %} IMAGES: screenshots or videos of cut features for the record. {% endcomment %}
