---
layout: project
title: "QuadStick Config"
eyebrow: "Accessibility hardware · 2025"
subtitle: "Desktop tool that gives quadriplegic gamers a real UI to configure their QuadStick mouth-operated controller. Guided multi-screen workflow, profile import/export, a serial bridge to the device, and an automated CI/CD pipeline that ships a Windows build on every release."
tech:
  - "C#"
  - .NET
  - WPF
  - Serial
  - GitHub Actions
github_link: "https://github.com/Bbrizly/Quadstick-Config-Manager"
---

## What it is

The **QuadStick** is a mouth-operated game controller designed for quadriplegic players: a bite-and-sip mouthpiece that maps puffs, sips, and tongue movements onto standard gamepad inputs. It is one of the most widely used adaptive controllers for high-spinal-cord-injury gamers.

Out of the box, it is configured through a text-based menu navigated entirely with mouth gestures. That works, but it is slow and opaque to anyone helping the player set it up. This tool moves all of that onto the desktop: edit a player's full profile on screen instead of by-feel through audio menus.

## What it does

- **On-screen profile editing.** Every binding and setting in one view instead of a sequential audio menu.
- **Import / export.** Profiles move in and out as CSV, with starter templates to build from.
- **Serial bridge.** A `QmpBridge` service talks to the device over its serial connection.
- **Guided workflow.** A multi-screen WPF flow walks through editing and writing a profile.

## How it's built

A WPF (.NET 9) desktop app: strongly-typed C# profile models mirroring the QuadStick's on-device format, a serial bridge for device I/O, a CSV + template layer for profile data, and an MVVM front end built on CommunityToolkit.Mvvm.

## CI/CD

The repo runs an automated GitHub Actions pipeline. Every push and pull request builds the app on `windows-latest`, runs tests, and publishes a self-contained single-file Windows executable as a downloadable artifact. Tagging a release cuts a GitHub Release with the packaged build attached, so there's always a ready-to-run download.
