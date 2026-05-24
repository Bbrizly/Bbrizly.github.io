---
project_key: splat2
nav_title: "World Generation"
order: 30
title: "World Generation"
eyebrow: "Splat II · Deep dive"
subtitle: "Layered Perlin, biomes, thermal erosion, threaded chunk streaming, and a one-call render path for the whole world."
---

Every match gets a fresh world from a seed. The terrain has to stream in around the player without stalling the main thread and render hundreds of chunks per frame for almost free.

## Pipeline

```
seed
  │
  ▼
noise stack ──► biome blend ──► thermal erosion
                                       │
                                       ▼
                                HeightTile (uint16 grid)
                                       │
                              ┌────────┴────────┐
                              ▼                 ▼
                       GPU atlas upload   Jolt heightfield
                              │                 │
                              └────────┬────────┘
                                       ▼
                                 chunk goes live
```

Everything from "noise stack" to "HeightTile" runs on a worker thread. Both uploads must succeed before the chunk is visible. Either fails, both roll back.

## Noise stack

Layered Perlin noise. Each octave adds a finer level of detail on top of the last.

```
octave 1:  ████████████████████████   big rolling hills (low freq, high amp)
octave 2:  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓           hills with bumps  (2x freq, 0.5x amp)
octave 3:  ▒▒▒▒▒▒▒▒                   ridges            (4x freq, 0.25x amp)
octave 4:  ░░░░                       grit              (8x freq, 0.125x amp)
                          sum
                           │
                           ▼
                  final height value
```

- Lacunarity = 2.0 (each layer doubles in frequency)
- Persistence = 0.5 (each layer halves in amplitude)

Two biome masks (plains, mountains) sample the same noise at different offsets so they do not correlate. They blend by weight to produce smooth transitions instead of hard borders.

{% comment %} IMAGE: side-by-side of raw noise, biome mask, blended terrain. {% endcomment %}

## Thermal erosion

After the noise pass, a thermal erosion sweep walks the height grid. Where two neighbouring cells have a slope above a threshold, material moves from the higher cell to the lower one. Rough ridges become weathered slopes.

Runs once at generation time on the worker thread, so it costs nothing at runtime.

{% comment %} IMAGE: before/after of the erosion pass on the same seed. {% endcomment %}

## uint16 heights

Each height sample is a 16-bit unsigned integer (0 to 65535). Half the memory of a float and far more vertical precision than the game ever needs. The shader maps these to world-space heights on the GPU.

## Streaming

TerrainSystem decides which chunks should exist based on what the camera can see. Missing chunks get queued for worker threads.

```
camera moves
    │
    ▼
visible set changes ──► missing chunks queued
                              │
                              ▼
                       worker pool generates
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
       upload to GPU atlas        register Jolt heightfield
              │                               │
              └─────────────┬─────────────────┘
                            ▼
              chunk live (visible + solid)
```

When a chunk finishes, its height data uploads to a GPU texture atlas using `glTexSubImage3D`. An LRU cache evicts the least-recently-used chunk when the atlas fills.

Unload runs in reverse: physics shape first, then visual. A chunk never has collision without a visual.

## One vertex buffer for the entire world

Every chunk renders from the same shared vertex buffer. The buffer stores only `(x, z)` grid positions as a `uint16` pair. **4 bytes per vertex.** The vertex shader looks up the real height from the texture atlas and computes normals by sampling neighbours.

All visible chunks pack into one InstanceBuffer with their world position, atlas layer, height range, and LOD level. One `glDrawElementsInstanced` call draws the entire visible terrain, regardless of chunk count.

## Stride-based LOD

LOD does not change the mesh. It changes the index stride. Stride 1 hits every vertex for full detail. Stride 2 skips every other vertex, which cuts triangles to a quarter.

```
stride 1 (full detail, near camera)
  •───•───•───•───•───•───•
  │ \ │ \ │ \ │ \ │ \ │ \ │
  •───•───•───•───•───•───•
  │ \ │ \ │ \ │ \ │ \ │ \ │
  •───•───•───•───•───•───•

stride 2 (quarter triangles, mid range)
  •───────•───────•───────•
  │   \   │   \   │   \   │
  │       │       │       │
  •───────•───────•───────•
  │   \   │   \   │   \   │
  •───────•───────•───────•
```

```
for chunk in visible_chunks:
    stride = lod_for_distance(camera, chunk)
    index_buffer = shared_index_buffers[stride]
    submit_instance(chunk.world_pos, chunk.atlas_layer, stride)
```

Vertex buffer untouched. Only the index buffer swaps. Cheap to change per chunk per frame.

## Physics

TerrainPhysics builds Jolt heightfield shapes directly from the same height data the renderer uses. Same numbers feed both systems, so what you see is what you collide with.
