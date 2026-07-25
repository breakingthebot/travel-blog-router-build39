# Changelog

All notable changes to **Build 39 — TravelPulse Vue Router Multi-page Travel Blog** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-07-25

### Added
- Copied `AGENTS.md` containing repository architectural standards into `Build_39`.
- Initialized Vue 3 + Vue Router 4 + Pinia application setup with TypeScript support.
- Built high-end Glassmorphism & Twilight Navy Dark Mode design system in `src/assets/css/main.css`.
- Created `src/router/index.ts` defining 7 multi-page routes (`/`, `/destinations`, `/destinations/:id`, `/blog`, `/blog/:id`, `/gallery`, `/newsletter`).
- Created `src/stores/travelStore.ts` managing destination database, region filtering (`Europe`, `Asia`, `Africa`, `Americas`), keyword search, wishlist bookmarks, and reader comments.
- Built `src/components/Navbar.vue` with active router link highlights and wishlist item counter.
- Built `src/components/Footer.vue`, `src/components/DestinationCard.vue`, `src/components/PostCard.vue`, and `src/components/LightboxModal.vue`.
- Built full multi-page views (`HomeView.vue`, `DestinationsView.vue`, `DestinationDetailView.vue`, `BlogPostsView.vue`, `PostDetailView.vue`, `GalleryView.vue`, `NewsletterView.vue`).
- Built Vitest unit test suite (5 passing tests).
