---
project_key: splat2
nav_title: "Buildings"
order: 35
title: "Buildings and the City"
eyebrow: "Splat II · Deep dive"
subtitle: "Three building types, rule-based placement, a vertex-shader bend with matching CPU colliders, and the route system that keeps every map clearable."
---

ProceduralBuildingComponent is the biggest single component in the project. It owns generation, rendering, collision, placement rules, and the route system.

## Three types

```
┌─────────────────┬─────────────────────────────────────────────┐
│ flat top        │ straight rectangular, cheap at scale         │
│ curved          │ bent by vertex shader, convex hull collider  │
│ arched          │ profile-blended curve, like a tunnel mouth   │
└─────────────────┴─────────────────────────────────────────────┘
```

Ahmed's facade shader runs interior mapping on top so windows look like they have rooms behind them. No interior geometry exists.

## Placement: five checks per grid cell

The generator walks each terrain chunk on a 28 metre grid and runs five gates per cell.

```
for each cell in chunk_grid (28m spacing):
        │
        ▼
  ┌──────────────────┐
  │ 1. density roll  │  45% chance, else skip
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │ 2. jitter offset │  up to 8m random, breaks the grid look
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │ 3. slope check   │  too steep? reject (would float in air)
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │ 4. height check  │  outside allowed band? reject
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │ 5. spacing check │  any neighbour < 10m? reject
  └────────┬─────────┘
           ▼
       place building
```

Only cells that pass all five get a building.

## Building parameters

Each surviving building rolls its own dimensions inside fixed bands:

```
footprint     :  7.5 m  to  18 m
aspect ratio  :  0.6     to  1.6
floors        :  3       to  12
floor height  :  3.2 m   to  4.4 m
```

A directional height-scale field grows buildings taller the further they are from the map origin along a configurable vector. The skyline grows as the player progresses, so the city itself signals "you are heading the right way."

Density zones come from a separate noise mask: some areas dense downtown, others sparse outskirts.

## Curved buildings: the GPU side

The visual bend happens entirely in the vertex shader using a curvature struct:

```cpp
struct BuildingCurve {
    vec3  direction;       // bend axis
    float strength;        // how much to bend
    float exponent;        // bend curve shape
    float waveAmplitude;   // optional wave on top
    float waveFrequency;
    float wavePhase;
    float profileBlend;    // arched vs curved profile mix
};
```

Per-instance values let every curved building be a different shape from the same mesh, at zero CPU cost.

## Curved buildings: the CPU side

The GPU mesh is not what the player collides with. The collider has to bend too, in world space, closely enough that grapples and player physics feel correct.

I build a convex hull on the CPU that approximates the bent geometry. First version drifted off the visual. Second was off near the ends. Multiple rewrites later it lined up. The twisting bug when bending around two axes at once took its own fix.

```
visual mesh (GPU)             collision shape (CPU)
   │                              │
   │ ── BuildingCurve param ──────│
   │   (same struct, both sides)  │
   ▼                              ▼
 vertex shader bend           convex hull built from
 each frame                   sampled bend positions
```

### Recalculating the AABB

A bent building has a different bounding box than its straight version. First pass used the straight AABB for broad-phase culling and placement checks. Two bugs followed:

1. Curved buildings clipped into each other at placement time.
2. The route system did not clear enough space around them.

```
straight AABB (wrong for bent shape)     recalculated AABB (correct)
  ┌──────────────┐                          ┌──────────────────┐
  │              │                          │     ╱            │
  │   ╱          │                          │   ╱              │
  │  building    │                          │  building        │
  │   ╲          │                          │   ╲              │
  │              │                          │     ╲            │
  └──────────────┘                          └──────────────────┘
```

Fix samples a handful of points along the bent shape and grows the box to fit. Cheap, ended both bugs.

## Landmark buildings

Two landmark buildings get injected manually, one at the start of the map and one at the end. They give the player a recognisable anchor at each end so the procedural city does not feel directionless.

## The route system

A pure procedural city can lock the goal behind solid buildings. The route system carves a guaranteed path from start landmark to end landmark.

The path is a sine wave between the two endpoints. Always some curvature, never a straight hallway.

```
start ●                                                ● end
        \                                            /
         \      ___                ___              /
          \   /     \           /      \          /
           \ /       \         /        \        /
            X         \       /          \      /
                       \____/             \____/
              <─────── sine wave path ──────────>
```

The route does not delete every building in its radius. It pushes them outward, away from the centre line. Only buildings too close to the centre get deleted.

```
for building in placed_buildings:
    d = distance_from_centre_line(building.pos)
    if d < delete_radius:
        remove(building)
    elif d < push_radius:
        push_dir = normalize(building.pos - nearest_point_on_path)
        building.pos += push_dir * (push_radius - d)
```

Cutscene system follows these routes (see [Systems & Tools](/projects/splat2/systems-and-tools/)). The opening flyover runs along the real player path, not hardcoded waypoints.

## Rendering at scale

Every building of the same type renders through GPU instancing. One draw call per type per chunk, regardless of how many buildings are in view. Instancing alone cut building draw calls by around 70%.

## Bugs worth a sentence

- Vertex limit crash when building meshes grew past the buffer cap. Fixed by trimming the vertex budget.
- Angle-based splat detection so paint VFX (Ahmed's splat system) sits correctly on slanted surfaces.
- Anti-splat tagging so certain buildings never receive paint.

## Files

- `wolf/components/ProceduralBuildingComponent.h`
- `wolf/terrain/TerrainBuildingSystem.h`
- `data/shaders/building_*.fsh` / `.vsh`
