<!-- src/components/DestinationCard.vue -->
<!-- Destination card component rendering hero image, country, rating, and wishlist heart button. -->
<!-- Connects to: stores/travelStore.ts, views/DestinationsView.vue -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { useTravelStore, type Destination } from '../stores/travelStore';

const props = defineProps<{
  destination: Destination;
}>();

const travelStore = useTravelStore();
</script>

<template>
  <div class="dest-card card">
    <div class="card-img-wrapper">
      <img :src="destination.heroImage" :alt="destination.name" class="dest-img" loading="lazy" />
      <div class="card-badge-row">
        <span class="region-badge">{{ destination.region }}</span>
        <button 
          @click.stop="travelStore.toggleWishlist(destination.id)" 
          class="wishlist-icon-btn"
          :class="{ active: travelStore.savedWishlist.includes(destination.id) }"
          :title="travelStore.savedWishlist.includes(destination.id) ? 'Remove Wishlist' : 'Save to Wishlist'"
        >
          {{ travelStore.savedWishlist.includes(destination.id) ? '❤️' : '🤍' }}
        </button>
      </div>
    </div>

    <div class="card-body">
      <div class="dest-header">
        <h3 class="dest-name">{{ destination.name }}</h3>
        <span class="country-tag">📍 {{ destination.country }}</span>
      </div>

      <p class="dest-tagline">{{ destination.tagline }}</p>

      <div class="card-meta">
        <span class="rating">★ {{ destination.rating.toFixed(1) }}</span>
        <router-link :to="`/destinations/${destination.id}`" class="btn btn-secondary explore-btn">
          Explore Guide →
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dest-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card-img-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.dest-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.dest-card:hover .dest-img {
  transform: scale(1.06);
}

.card-badge-row {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.region-badge {
  background: rgba(11, 19, 43, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-color);
  color: var(--accent-cyan);
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  text-transform: uppercase;
}

.wishlist-icon-btn {
  background: rgba(11, 19, 43, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.wishlist-icon-btn:hover {
  transform: scale(1.1);
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.dest-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 6px;
}

.dest-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.country-tag {
  font-size: 13px;
  color: var(--text-secondary);
}

.dest-tagline {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 16px;
  flex: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}

.rating {
  font-size: 14px;
  font-weight: 700;
  color: var(--accent-amber);
}

.explore-btn {
  font-size: 12px;
  padding: 6px 12px;
}
</style>
