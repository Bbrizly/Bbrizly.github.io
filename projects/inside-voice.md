---
layout: project
title: "Inside Voice"
eyebrow: "iOS app · 2026"
subtitle: "An EPUB and PDF reader that speaks the page with word-level highlighting, optional speed reading, and short recall prompts so you keep what you just read. Books, audio, and progress stay on your phone."
description: "An iOS EPUB and PDF reader that speaks the page with word-level highlighting, speed reading, and short recall prompts to help you retain what you read."
tech:
  - Swift
  - SwiftUI
  - TextKit
  - iOS 18+
github_link: "https://github.com/Bbrizly/reader"
topbar_link: "/insidevoice/"
topbar_icon: "fas fa-arrow-up-right-from-square"
topbar_label: "Visit site"
live_url: "/insidevoice/"
live_external: false
live_label: "Open the Inside Voice site"
live_note: "The app site has the screens, the features, and the privacy policy. Everything below is how it was built."
logo: "/assets/images/inside-voice-logo.png"
hero_image: "/assets/images/inside-voice-card.webp"
---

## What it is

Reading out loud is easy to zone out of. Silent reading is easy to skim past. Inside Voice keeps both modes on one timeline: each word has a start and end time, so the highlight, the speed-reading card, and the spoken audio are always the same place in the book.

When you want to check that you were actually paying attention, a recall card asks what just happened and scores your answer against a short summary of the passage you already read. Spoiling ahead is blocked on purpose.

## What it does

- **Reads EPUB and PDF** books you add from Files or share into the app.
- **Word-level highlight** while a chapter plays, with scrubbing and 0.75x to 2.0x rate.
- **Speed reading** one word (or a short burst) at a time, with an optional sentence stage under the card.
- **Background playback** and lock-screen controls so a chapter can keep going with the phone locked.
- **Recall and book chat** on device by default, with optional Gemini or Azure keys you paste yourself.
- **Neural voice download** (optional) for a local speech model after a one-time fetch.

## How it's built

SwiftUI on iOS 18+, with a `ReaderKit` package for EPUB and PDF parsing, pagination, timelines, and recall. Narration can use system voices or an optional on-device neural voice. The highlight is a pure function of playback time, so rate changes and backgrounding do not need special case math.

## Privacy policy
{: #privacy}

**Effective date:** August 20, 2026  
**App:** Inside Voice: Book Reader  
**Developer:** Bassam Kamal ([bassamkamal.py@gmail.com](mailto:bassamkamal.py@gmail.com))

**App Store privacy URL:** `https://bassamkamal.dev/projects/inside-voice.html#privacy`

This policy describes what Inside Voice does with data on your device and what leaves the device when you choose optional features.

### Short version

Inside Voice does not require an account. It does not sell data, run ads, or embed third-party analytics. Your books and reading progress stay on your device. Optional features (cloud AI keys, microphone transcription, neural voice download) only run after you turn them on and only send what that feature needs.

### Data stored on your device

- **Books you import** (EPUB or PDF), copied into the app's storage so moving the original file does not break the library.
- **Reading position**, themes, voice choices, speed-reading settings, and similar preferences (UserDefaults and local files).
- **Rendered chapter audio and word timings**, cached so a chapter does not have to be rebuilt every open.
- **Optional API keys** you enter for Gemini, Azure OpenAI, or Azure Speech, kept in the Keychain on your device.

The App Store privacy nutrition label for this build declares no tracking and no collected data types sold or used for tracking. The app accesses UserDefaults, file timestamps, and system boot time only for ordinary on-device behavior (preferences, cache freshness, timing).

### Microphone

The microphone is used only if you start voice input in recall or chat. On a fresh install that path is off until you add an Azure Speech key and region in Settings and grant microphone permission. Audio for that feature is sent to Microsoft Azure Speech for short transcription, then discarded by the app after the text returns. Typing always works without the microphone.

### Optional network features

None of these are required to read a book aloud with system voices.

- **On-device answers (default).** Nothing leaves the phone. Available when Apple Intelligence is ready.
- **Gemini.** Sends text you already read, plus your recall or chat messages, to Google Gemini using an API key you paste. Only if you select Gemini.
- **Azure OpenAI.** Same kinds of text, sent to your Azure OpenAI resource. Only if you configure endpoint, deployment, and key.
- **Azure Speech.** Sends short microphone recordings you start to Microsoft Speech, using your key and region. Only for voice input you trigger.
- **Neural voice install.** Downloads model weights (via the neural voice package, from Hugging Face) only if you tap to install the optional voice.

Keys never leave the Keychain except as authorization headers on requests you initiate. The app does not operate a backend that stores your books or chat history.

### Children

Inside Voice is not directed at children under 13. Do not use optional cloud features to send a child's personal information.

### Third-party services

If you enable Gemini, Azure OpenAI, Azure Speech, or the neural voice download, those providers' own terms and privacy policies also apply to the data you send them. Inside Voice does not control how those providers retain logs on their side.

### Changes

If this policy changes in a way that affects how the app handles data, the effective date at the top will update and the App Store listing privacy URL will keep pointing here: `https://bassamkamal.dev/projects/inside-voice.html#privacy`.

### Contact

Questions about privacy: [bassamkamal.py@gmail.com](mailto:bassamkamal.py@gmail.com).
