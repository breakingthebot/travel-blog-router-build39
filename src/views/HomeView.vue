<!-- src/views/HomeView.vue -->
<!-- Landing home view featuring hero section, featured destinations, and latest blog posts. -->
<!-- Connects to: stores/travelStore.ts, components/DestinationCard.vue, components/PostCard.vue -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { useTravelStore } from '../stores/travelStore';
import DestinationCard from '../components/DestinationCard.vue';
import PostCard from '../components/PostCard.vue';

const travelStore = useTravelStore();
</script>

<template>
  <div class="home-view">
    <!-- Hero Banner -->
    <section class="hero-section card">
      <div class="hero-content">
        <span class="hero-badge">🌍 Multi-Page Travel Journal</span>
        <h2>Explore Extraordinary Destinations Across The Globe</h2>
        <p>Discover handpicked travel guides, cultural deep dives, and breathtaking photography curated by passionate world wanderers.</p>

        <div class="hero-actions">
          <router-link to="/destinations" class="btn btn-primary">
            Explore Destinations 🗺️
          </router-link>
          <router-link to="/blog" class="btn btn-secondary">
            Read Journal 📖
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Destinations Section -->
    <section class="section">
      <div class="section-header">
        <div>
          <h2>⭐ Featured Destinations</h2>
          <p>Hand-curated travel spots with top ratings and complete guides.</p>
        </div>
        <router-link to="/destinations" class="view-all-link">View All Destinations →</router-link>
      </div>

      <div class="grid-3">
        <DestinationCard
          v-for="dest in travelStore.featuredDestinations"
          :key="dest.id"
          :destination="dest"
        />
      </div>
    </section>

    <!-- Latest Journal Posts Section -->
    <section class="section">
      <div class="section-header">
        <div>
          <h2>📝 Latest Journal Dispatches</h2>
          <p>In-depth travel stories, local recommendations, and photography essays.</p>
        </div>
        <router-link to="/blog" class="view-all-link">View All Posts →</router-link>
      </div>

      <div class="grid-2">
        <PostCard
          v-for="post in travelStore.posts"
          :key="post.id"
          :post="post"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.hero-section {
  padding: 48px 36px;
  background: linear-gradient(135deg, rgba(247, 127, 0, 0.1), rgba(28, 37, 65, 0.7));
  border-color: rgba(247, 127, 0, 0.25);
  margin-top: 16px;
}

.hero-badge {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-amber);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-content h2 {
  font-size: 36px;
  font-weight: 800;
  color: var(--text-primary);
  margin: 8px 0 12px;
  line-height: 1.2;
  max-width: 750px;
}

.hero-content p {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 650px;
  margin-bottom: 24px;
}

.hero-actions {
  display: flex;
  gap: 16px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.section-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.section-header p {
  font-size: 14px;
  color: var(--text-secondary);
}

.view-all-link {
  color: var(--accent-amber);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.view-all-link:hover {
  opacity: 0.8;
}

.grid-3 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .grid-2 { grid-template-columns: repeat(2, 1fr); }
}
</style>
