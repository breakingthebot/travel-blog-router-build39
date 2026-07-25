# Changelog

All notable changes to **Build 39 — TravelPulse Vue Router Multi-page Travel Blog** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.7.0] - 2026-07-25

### Added
- Built `src/components/OfflineReadingManager.vue` providing a saved articles and offline reading library manager.
- Added top window scroll reading progress bar to `PostDetailView.vue` (0-100%).
- Added "Save for Offline" toggle button on journal posts with LocalStorage persistence.
- Added offline saved articles summary cards with read time, publish date, reading progress, and quick read navigation buttons.
- Integrated `OfflineReadingManager.vue` into `BlogPostsView.vue` and `PostDetailView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing saving/unsaving posts offline, reading progress tracking, and LocalStorage persistence.

## [0.6.0] - 2026-07-25

### Added
- Built `src/components/TravelMapVisualizer.vue` providing an interactive global route map and travel distance matrix.
- Added SVG interactive canvas displaying continent outlines and animated destination pin markers with pulse rings.
- Added origin hub selector (`New York (NYC)` vs `London (LHR)`).
- Added flight route arc curves connecting selected origin hub to destination pins.
- Added map pin tooltips with flight duration & distance metrics.
- Added interactive Distance Matrix table comparing flight durations from NYC and London along with kilometer distances.
- Integrated `TravelMapVisualizer.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing map pin selection and origin hub toggling.

## [0.5.0] - 2026-07-25

### Added
- Built `src/components/TravelQuiz.vue` providing an interactive multi-step travel destination recommendation quiz.
- Added step progress indicator (Step 1 of 3, Step 2 of 3, Step 3 of 3).
- Added interactive visual option cards with icons and smooth select effects.
- Built Quiz Result screen calculating match score percentage (e.g. `96% Match!`) and displaying a recommended destination showcase card.
- Added direct router link button to open the recommended destination guide & itinerary.
- Integrated `TravelQuiz.vue` into `HomeView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing quiz step progression, vibe matching, recommendation calculations, and quiz resets.

## [0.4.0] - 2026-07-25

### Added
- Built `src/components/PackingChecklist.vue` providing filterable travel packing checklists tailored for different travel styles.
- Added Travel Preset chips (`Urban Culture`, `Beach Resort`, `Alpine Hiking`, `Safari`).
- Added category filters (`All`, `Documents`, `Clothing`, `Electronics`, `Toiletries`, `Gear`).
- Added packing progress bar & status indicator (e.g. `5 / 8 Packed (63%)`).
- Added essential items indicator badge (`REQUIRED`).
- Added custom item creation form with category & essential toggles.
- Integrated `PackingChecklist.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing preset switching, item toggling, custom item creation, and progress computation.

## [0.3.0] - 2026-07-25

### Added
- Built `src/components/ItineraryBuilder.vue` providing interactive visual trip itinerary planning per destination.
- Added day-by-day tab navigation (`Day 1`, `Day 2`, `Day 3`, `+ Day`).
- Added visual timeline activity cards displaying time slots (`07:30 AM`), titles, locations, category chips (`Culture`, `Dining`, `Adventure`, `Relaxation`), and estimated costs ($ USD).
- Added activity reordering controls (Move Up / Move Down buttons) and removal controls.
- Added inline "Add Activity" form with validation for custom time slots, titles, locations, categories, and costs.
- Added daily total cost summary cards.
- Integrated `ItineraryBuilder.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing adding days, adding activities, removing activities, and reordering.

## [0.2.0] - 2026-07-25

### Added
- Built `src/components/BudgetCalculator.vue` providing interactive trip budget estimation and real-time currency conversion.
- Added trip duration slider (1 to 30 days) with quick preset buttons (3, 7, 14, 21 days).
- Added travel style selector chips (`Backpacker`, `Explorer`, `Luxury`) with per-destination daily cost baselines.
- Added live currency conversion between USD ($), EUR (€), GBP (£), and JPY (¥).
- Added category cost breakdown visual meters (Accommodation 45%, Dining 30%, Transport 15%, Activities 10%).
- Integrated `BudgetCalculator.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing trip budget calculations, travel style multipliers, and currency conversion logic.

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
