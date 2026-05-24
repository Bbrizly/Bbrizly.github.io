---
project_key: splat2
nav_title: "Player Locomotion"
order: 20
title: "Player Locomotion"
eyebrow: "Splat II · Deep dive"
subtitle: "Dual grappling hooks, ring aim assist, coyote time, and a slack mechanic on top of the spring."
---

PlayerLocomotion is the biggest gameplay component in the project. It owns input, aiming, the two grappling hooks, the spring physics, the speed boosts, and the crosshair state.

## Components involved

```
GameObject (Player)
├── PhysicsBodyComponent    (sphere collider in Jolt)
├── PlayerLocomotion        (this component)
├── CameraComponent         (third person camera + FOV)
├── CrosshairComponent      (dual crosshair, colour coded)
├── TrailRendererComponent  (acceleration-driven glow)
└── GhostRecorderComponent  (writes 30 Hz binary stream)
```

The locomotion code reads input, queries the camera for the aim ray, runs aim assist, and pushes results into the Jolt distance constraints behind each hook.

## Two hooks, two constraints

Left click fires the left hook, right click fires the right. Each hook runs an independent Jolt distance constraint between the player body and a world-space anchor. Both can be live at the same time. The visual rope mesh sits in a separate component, and I added dual-hook support to it.

## The raycast origin bug

First version cast the grapple ray from the camera. Camera sits behind and above the player. When the player got close to a wall, the ray hit the back face of that wall (the side facing the camera) and the grapple snapped into the inside of the building. Player got stuck.

Fix: move the ray origin to the player centre and run a multi-pass body filter that ignores non-grappleable objects on the way out.

{% comment %} IMAGE: side-by-side diagram of the bug. Left panel shows camera ray hitting back face of wall. Right panel shows player-centred ray hitting the correct surface. {% endcomment %}

## Ring aim assist

A raw raycast is too punishing at high speed. The aim assist fires extra rays in a structured pattern around the central aim direction. **5 rings, 8 directions per ring, 40 samples per crosshair.** First sample that hits a valid surface wins.

{% comment %} IMAGE: the 5-ring 8-direction sample pattern with the crosshair in the centre. Easier to read as a real diagram than as ASCII. {% endcomment %}

```
for ring in 1..5:
    radius = detection_radius * (ring / 5)
    for dir in 8_compass_directions:
        sample = base_aim + dir * radius
        if raycast(sample).hits_grappleable():
            return sample
return base_aim  // missed
```

## Coyote time

Three timers run in parallel. When a valid target leaves view, its timer starts at **0.3 seconds**. If the player clicks during that window, the target stays armed even though it is no longer under the crosshair.

```
m_CoyoteTimers : float[3] = { 0, 0, 0 }
m_GrappleAimCoyoteTime    = 0.3

on aim_lost(hook_index, last_target):
    m_CoyoteTimers[hook_index] = m_GrappleAimCoyoteTime
    cached_target[hook_index] = last_target

on update(dt):
    for t in m_CoyoteTimers:
        t = max(0, t - dt)

on grapple_input(hook_index):
    if current_aim.hits:
        fire(current_aim)
    elif m_CoyoteTimers[hook_index] > 0:
        fire(cached_target[hook_index])
```

Short enough that the game does not feel like it is playing for you. Long enough to save the shots you actually meant to land.

## Spring with a slack mechanic

The rope is a spring-damper between the player and the anchor. The extra layer on top: hold shift to build slack, release to convert that slack into a forward boost. Players who learn the timing can chain swings with mid-air boosts.

The spring carries two state values (`springBoost` and `springVelocity`):

```
spring_accel = K * springBoost - decay * springVelocity
springVelocity += spring_accel * dt
springBoost    -= radial_speed * dt
```

Tuned so the player accelerates toward the anchor smoothly, never feels rubbery, never oscillates.

## Crosshair states

Each of the two crosshairs draws in one of three colours so you can read the available shot at a glance.

| Colour | Meaning                                        |
|--------|------------------------------------------------|
| Blue   | hook is ready, target is valid                 |
| Yellow | coyote time is active (recent valid target)    |
| Gray   | hook is disabled (cooldown or no valid aim)    |

{% comment %} IMAGE: dual crosshair shown in all three states. {% endcomment %}

## Physics layers

The collision matrix separates player, building, terrain, trigger. The grapple ray filters by layer so players cannot grapple to each other. Bad layer assignment was an easy way to break a level, so I had the debug renderer paint colliders by layer in editor view.

## Other fixes the version history hides

- Invisible colliders that ate grapples silently.
- Player inertia carrying over wrong after a release.
- Collider mismatch on curved buildings between the visual mesh and the physics shape (see [Buildings](/projects/splat2/buildings/)).

None of those are interesting alone. Together they were most of the work.
