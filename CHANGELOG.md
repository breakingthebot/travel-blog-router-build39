# Changelog

All notable changes to **Build 39 — TravelPulse Vue Router Multi-page Travel Blog** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.17.0] - 2026-07-25

### Added
- Built `src/components/CulturalEtiquetteGuide.vue` providing an interactive destination cultural etiquette & Do's and Don'ts guide.
- Added tipping customs guidelines and dress code rules for major travel destinations.
- Added side-by-side Do's (green highlight) and Don'ts (red highlight) cards with cultural icons.
- Added major taboo callout boxes alerting travelers to high-risk cultural faux pas.
- Integrated `CulturalEtiquetteGuide.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing cultural guide retrieval per destination.

## [0.16.0] - 2026-07-25

### Added
- Built `src/components/EmergencyContactsWidget.vue` providing an interactive destination emergency contacts & embassy directory.
- Added hotline grid for Police, Ambulance, Fire, and Universal Tourist Emergency with one-click `tel:` calling links.
- Added foreign embassy & consulate directory (US, UK, Canadian embassies) with phone, address, and website details.
- Added recommended 24/7 international emergency hospitals and trauma centers list.
- Integrated `EmergencyContactsWidget.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing emergency contact dataset retrieval per destination.

## [0.15.0] - 2026-07-25

### Added
- Built `src/components/PassportTracker.vue` providing an interactive digital traveler passport & bucket list badge tracker.
- Added digital passport booklet progress meter (`33% Complete - 2/6 Stamps Unlocked`).
- Built vintage circular passport stamp seals with metallic gold glow effect for unlocked stamps.
- Added 6 default passport stamps (`💮 Kyoto Zen Master`, `🏛️ Aegean Caldera Explorer`, `🏔️ Swiss Summit Mountaineer`, `🦁 Serengeti Safari Pioneer`, `📋 Master Itinerary Planner`, `✍️ Community Storyteller`).
- Added real-time toast alert popups upon unlocking passport stamps.
- Integrated `PassportTracker.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing passport stamp progress calculations and stamp claims.

## [0.14.0] - 2026-07-25

### Added
- Built `src/components/TravelPhrasebook.vue` providing an interactive multi-language travel phrasebook & audio pronunciation guide.
- Added support for 4 major travel languages: Japanese (🇯🇵), Greek (🇬🇷), German (🇩🇪), and Swahili (🇹🇿).
- Added category filters (Greetings, Dining, Directions, Emergency, Shopping).
- Integrated Web Speech API (`speechSynthesis`) for real-time native audio pronunciations.
- Added one-click copy phrase action with toast feedback.
- Integrated `TravelPhrasebook.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing phrasebook language and category filtering.

## [0.13.0] - 2026-07-25

### Added
- Built `src/components/CurrencyCalculator.vue` providing a travel currency & live exchange rate converter.
- Expanded currency support: USD ($), EUR (€), GBP (£), JPY (¥), AUD (A$), CAD (C$), CHF (CHF).
- Added instant currency swapping and live rate formula display (`1 USD = 155.0 JPY`).
- Added common local travel cost conversion reference grid (Espresso, Dinner, Boutique Hotel, High-Speed Rail).
- Integrated `CurrencyCalculator.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing multi-currency conversions and currency swapping.

## [0.12.0] - 2026-07-25

### Added
- Built `src/components/DestinationComparator.vue` providing a side-by-side destination comparison matrix tool.
- Added side-by-side comparison metrics for daily backpacker/explorer/luxury costs, flight times & distances, best visiting seasons, ratings, and atmosphere vibe tags.
- Added automated `💡 Cheaper` badge highlighting the cost winner between selected destinations.
- Added quick `⇄ Swap` button and direct destination guide router links.
- Integrated `DestinationComparator.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing destination selection and swapping.

## [0.11.0] - 2026-07-25

### Added
- Built `src/components/TravelExpensesExporter.vue` providing an interactive expense analytics & data export tool.
- Added financial expense allocation breakdown progress meters (Accommodation 45%, Dining 30%, Transport 15%, Activities 10%).
- Added dynamic currency conversion ($ USD, € EUR, £ GBP, ¥ JPY).
- Added 3 one-click file download triggers: `📥 Download Itinerary (.CSV)`, `📊 Export Budget Data (.JSON)`, and `🧳 Download Packing List (.CSV)`.
- Integrated `TravelExpensesExporter.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing itinerary CSV formatting, budget JSON structure, and packing list exports.

## [0.10.0] - 2026-07-25

### Added
- Built `src/components/AudioGuidePlayer.vue` providing an interactive travel audio guide & podcast player widget.
- Added track control console with narrator avatars, track cover images, descriptions, and Play/Pause controls.
- Added interactive time scrubber slider (`00:00 / 04:15`).
- Added playback speed selector (`1.0x`, `1.25x`, `1.5x`, `2.0x`).
- Added interactive chapter markers for quick timestamp jumping within walking guides.
- Integrated `AudioGuidePlayer.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing audio guide track selection, play/pause toggling, chapter seeking, and playback rate adjustments.

## [0.9.0] - 2026-07-25

### Added
- Built `src/components/UserTravelStories.vue` providing a user travel story and guest photo review submission form.
- Added author avatar, trip date, and `✓ Verified Visitor` badges to reader reviews.
- Added interactive 5-star rating picker (`⭐⭐⭐⭐⭐`).
- Built story submission form with headline, travel highlights textarea, trip date picker, and photo URL attachment.
- Added instant toast feedback notification on story publication.
- Integrated `UserTravelStories.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing guest travel story submissions and destination filtering.

## [0.8.0] - 2026-07-25

### Added
- Built `src/components/WeatherClimateWidget.vue` providing an interactive seasonal weather forecast & climate guide.
- Added seasonal tab pills (`🌸 Spring`, `☀️ Summer`, `🍁 Autumn`, `❄️ Winter`).
- Added temperature unit conversion toggle switch (`°C` vs `°F`).
- Added seasonal temperature average meters and rainfall depth progress bars.
- Added "Recommended Visiting Window" badge and "Seasonal Packing Advice" guidance card.
- Integrated `WeatherClimateWidget.vue` into `DestinationDetailView.vue` and `DestinationsView.vue`.
- Added unit tests in `src/stores/travelStore.spec.ts` testing seasonal climate selection and temperature conversion (°C vs °F).

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
