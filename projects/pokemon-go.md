---
layout: project
title: "Pokemon Go Mobile Game"
eyebrow: "Mobile · 2024"
subtitle: "Pokemon Go style mobile game. Flutter on the frontend, AWS Lambda and Firebase on the backend. AR capture mechanics, cloud-synced inventory, and full CI/CD through GitHub Actions and Docker."
description: "A Pokemon Go style mobile game built with Flutter, AWS Lambda, and Firebase, with AR capture mechanics and cloud-synced inventory."
tech:
  - Flutter
  - Dart
  - Firebase
  - AWS Lambda
  - Docker
  - GitHub Actions
github_link: ""
# Paste the GitHub URL between the quotes when ready.
# Add a hero image / gameplay video once exported:
# hero_image: "/assets/images/pokemon-cover.webp"
# images:
#   - "/assets/images/pokemon-map.webp"
#   - "/assets/images/pokemon-capture.mp4"
---

## What it is

A location-based mobile game in the spirit of Pokemon Go: open the app, see creatures pinned on a map of your real-world surroundings, walk close enough to one, and trigger an AR capture session. Inventory and progress sync to a cloud backend so your save survives device swaps.

## How it works

### Frontend (Flutter)

- **Map view** uses a tile layer plus a custom overlay for live creature markers. Markers are spawned client-side from spawn tables seeded by the backend.
- **AR capture screen** activates the device camera, projects a 3D creature model into the live view, and tracks throw gestures through accelerometer + screen-coordinate input.
- **Inventory and stats** are local-first: edits write to a local store immediately, then sync to the backend in the background. This keeps the UI snappy even on a flaky cell connection.

### Backend (AWS Lambda + Firebase)

- **Firebase Auth** handles sign-in and issues the ID token used by every backend call.
- **AWS Lambda** functions sit behind API Gateway and serve the game's REST endpoints: list nearby spawns, register a capture, sync inventory deltas, return leaderboards.
- **DynamoDB** stores per-user progress, captures, and the spawn-table seeds. Lambda reads from DynamoDB on every request.
- **Firebase Realtime DB** is used only for the few endpoints that benefit from push-style updates (e.g., a friend's status changing).

### CI/CD

- GitHub Actions runs the test suite + Flutter analyze on every push.
- A separate workflow builds the Lambda functions inside a Docker image so the runtime matches AWS exactly, then deploys via the Serverless Framework on tag pushes.
- Android build artifacts are signed and uploaded to a staging track on every merge to main.

## What I learned

Building the AR layer taught me that "feels good" in mobile motion controls is mostly about easing curves, not raw input data. The throw mechanic went through four iterations before the trajectory felt like a real throw rather than a math problem.
