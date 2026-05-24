---
project_key: splat2
nav_title: "Visual Effects"
order: 40
title: "Visual Effects"
eyebrow: "Splat II · Deep dive"
subtitle: "Volumetric fog from graphics papers, a trail renderer driven by acceleration, and a 27-uniform black hole shader."
---

Three effects do most of the visual work in Splat II. All three are built from scratch.

## Volumetric fog

Screen-space ray marching with Henyey-Greenstein scattering. Researched from graphics papers, rewritten four times to hit 60 fps.

### Per-pixel ray march

```
camera
   │
   ▼
┌──────┐
│ ray  │ (one per pixel)
└──┬───┘
   │
   ▼ 48 sample steps along the ray
   ●───●───●───●───●───●───●───●───●───●───●───●─...
   │   │   │   │   │   │   │   │   │   │   │
   ▼   ▼   ▼   ▼   ▼   ▼   ▼   ▼   ▼   ▼   ▼
  density at each sample
    = height term × ground proximity × 3D wind noise

  light at each sample
    = sum over lights of Henyey-Greenstein( angle_to_light )

  pixel = integrate density × light along ray, clamped by depth buffer
```

Settings adapt the sample count from 16 (low quality) up to 96 (ultra). 48 is the default.

### Half resolution with temporal filter

Full resolution was too expensive. Fog is low-frequency anyway, so the trick is to render small and reconstruct.

```
half-res fog buffer
     │
     ▼
  Halton-jitter ray origins (reduces banding)
     │
     ▼
  temporal filter (blend with last frame's result, reprojected)
     │
     ▼
  upscale to full screen
     │
     ▼
  composite into the scene
```

Depth buffer is integrated so fog stops at solid surfaces.

### Player lights scatter inside it

Each player emits a point light. The fog samples those lights at every step, so a player across the map shows up as a glow inside the fog even when their body is hidden behind geometry. Turned out to be one of the strongest readability cues in playtests.

{% comment %} IMAGE: a screenshot above the fog line vs inside it, side by side. {% endcomment %}

### Iteration history

```
v1   basic exponential fog       too flat, no shape
v2   layered fog at heights      banding between layers
v3   thin fog film overlay       no depth, looked like a filter
v4   full ray-marched volumetric shipped version
```

Each version taught me what the next one had to fix.

## Trail renderer

A glowing ribbon behind each player. Ring buffer of points, rebuilt into a triangle strip every frame on the CPU.

### Ring buffer

```
   [P0][P1][P2][P3][P4][P5][P6][P7][P8] ... [PN]
    ↑                                          ↑
    oldest point                       newest point (player pos)

each frame:
    push player position
    drop points older than lifetime
    rebuild triangle strip mesh from the live window
```

### Acceleration drives the glow

Speed is constant most of the time so it makes a bad input. Acceleration spikes on boosts, grapple yanks, and direction changes, so the trail visibly flashes on those events.

```
glow_intensity = base + k * length(acceleration)

cruising at constant speed  → low glow (subtle)
boost / grapple yank        → spike (visible flash)
```

The shader builds a solid core stripe with soft edges plus a wider glow halo. Smooth turn handling prevents kinks where the path bends sharply.

### Tuning history

First version covered the screen and obscured the city. I iterated the width curve, alpha falloff, and segment length until the trail read as a path instead of a banner.

## Black hole shader

Replaced the original basic goal object. Fully procedural, no textures.

### 27 uniforms, grouped

```
┌─────────────────────────┬───────────────────────────────────┐
│ spiral arms             │ count, angle, twist rate, density │
│ halftone dots           │ dot size, screen scale, threshold │
│ screen-space distortion │ strength, radius, falloff curve   │
│ colour cycling          │ palette, cycle speed, mix curve   │
│ phase timing            │ activation, pulse rate, intro/out │
└─────────────────────────┴───────────────────────────────────┘
```

### Around the shader

```
   physics sensor sphere ──► triggers gameplay events
                                   │
                                   ▼
                            (player reached the end)

   ambient particle system
        │
        ▼
   towards-point affector ──► particles swirl into the centre
                              (long-range visual cue from far away)
```

{% comment %} IMAGE: the black hole with the city visibly distorting behind it. {% endcomment %}

### Workflow

I built the shader in Shadertoy first because iteration is fast there. Once it looked right, I ported it into `blackhole.fsh` / `blackhole.vsh` and tuned inside the engine across a few commits to lock in the spiral animation and the distortion field.

## Files

- `wolf/render/VolumetricFogPass.h`
- `wolf/components/TrailRendererComponent.h`
- `wolf/components/BlackHoleComponent.h`
- `data/shaders/blackhole.fsh`, `blackhole.vsh`
- `data/shaders/volumetric_fog.fsh`, `volumetric_fog.vsh`
