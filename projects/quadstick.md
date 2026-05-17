---
layout: project
title: "QuadStick Config"
eyebrow: "Accessibility hardware · 2025"
subtitle: "Desktop tool that lets quadriplegic gamers configure their QuadStick mouth-controlled controller. Guided multi-screen workflow that flashes the device live over USB serial. Windows installer built and signed through GitHub Actions."
tech:
  - "C#"
  - .NET
  - WPF
  - Serial
  - GitHub Actions
github_link: ""
# To add a GitHub link: paste the URL between the quotes above.
# To add a hero image once you have a screenshot:
# hero_image: "/assets/images/quadstick-cover.webp"
# To add screenshots below the article:
# images:
#   - "/assets/images/quadstick-shot-1.webp"
#   - "/assets/images/quadstick-shot-2.webp"
---

## What it is

The **QuadStick** is a mouth-operated game controller designed for quadriplegic players: a single bite-and-sip mouthpiece that maps puffs, sips, and tongue movements onto standard gamepad inputs. It is the most widely used adaptive controller for high-spinal-cord-injury gamers.

This project is the desktop configuration tool that lives between the player and the device. It edits the QuadStick's stored profiles and flashes them to the controller over serial.

## Why this matters

Out of the box, the QuadStick is configured through a text-based menu navigated entirely with mouth gestures. That works, but it is slow, opaque to people helping the player set things up, and brutal to iterate on for caregivers or speech therapists who are tuning profiles for a specific player's mobility range.

This tool moves all of that to a desktop UI:

- Edit and visualize a player's full profile on screen instead of by-feel through audio menus.
- See every binding, sensitivity curve, and dwell timing in one view.
- Test changes by hot-flashing the device over serial without a reset.
- Save and version profiles so caregivers can roll back changes without losing the previous configuration.

## How it works

The app is a WPF (.NET) desktop application split across a few responsibilities:

- **Serial layer**: talks to the QuadStick firmware over a USB serial port. The firmware exposes a small command protocol for reading current config, writing new config, and triggering a reflash. The serial layer handles framing, retries, and timeouts.
- **Profile model**: strongly-typed C# objects mirroring the QuadStick's on-device profile format. Each binding, threshold, and curve is editable.
- **Multi-screen workflow**: a guided UI walks through input calibration, binding assignment, sensitivity tuning, and a final review screen before writing the profile to the device.
- **CI/CD pipeline**: GitHub Actions builds and signs the Windows installer on every tagged release.

## Status

In active use. Distributed to QuadStick users by request through the maker.
