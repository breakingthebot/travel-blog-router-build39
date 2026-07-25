# Build 39 — TravelPulse Vue Router Multi-Page Travel Blog

TravelPulse is a multi-page travel journal and destination discovery web application built with Vue 3, Vue Router 4, Pinia, and Vitest.

## Stack
- **Framework**: Vue 3 (Composition API) + TypeScript
- **Router**: Vue Router 4 (Multi-page SPA navigation with page transitions)
- **State Management**: Pinia
- **Styling**: Glassmorphism Dark Mode (Vanilla CSS & HSL tokens)
- **Testing**: Vitest + Happy DOM

## Setup
```bash
# Clone repository
git clone https://github.com/breakingthebot/travel-blog-router-build39.git
cd Build_39

# Install dependencies
npm install --legacy-peer-deps
```

## Environment Variables
Refer to `.env.example`:
- `VITE_APP_NAME`
- `VITE_SITE_URL`

## Running Locally
```bash
# Run development server
npm run dev

# Run unit tests
npm run test

# Build production bundle
npm run build
```

## Deployed
- **Vercel Production**: [https://travel-blog-router-build39.vercel.app](https://travel-blog-router-build39.vercel.app)
- **GitHub Repository**: [https://github.com/breakingthebot/travel-blog-router-build39](https://github.com/breakingthebot/travel-blog-router-build39)

## Architecture Notes
Built as an atomic Vue 3 multi-page web application using Vue Router 4 to handle dynamic routing across 7 pages (`/`, `/destinations`, `/destinations/:id`, `/blog`, `/blog/:id`, `/gallery`, `/newsletter`). State is centrally managed via Pinia (`travelStore.ts`), allowing users to search destinations, filter by region (`Europe`, `Asia`, `Africa`, `Americas`), bookmark destinations to their Wishlist, view photo lightboxes, and submit reader comments.

## Data Handling
Default data posture stores zero personal user data. Wishlist bookmarks and submitted article comments are retained in client-side reactive state memory.

## Notes
- **Smooth Page Transitions**: Router views are wrapped in Vue `<transition name="page-fade">` elements for fluid page switching.
- **Lightbox Viewer**: Gallery view features an interactive modal lightbox for viewing high-resolution travel photography.
