<!-- src/views/DestinationDetailView.vue -->
<!-- Single destination detail view with travel tips, ratings, and linked blog posts. -->
<!-- Connects to: stores/travelStore.ts, components/PostCard.vue -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTravelStore } from '../stores/travelStore';
import PostCard from '../components/PostCard.vue';
import BudgetCalculator from '../components/BudgetCalculator.vue';
import ItineraryBuilder from '../components/ItineraryBuilder.vue';
import PackingChecklist from '../components/PackingChecklist.vue';
import TravelMapVisualizer from '../components/TravelMapVisualizer.vue';
import WeatherClimateWidget from '../components/WeatherClimateWidget.vue';
import UserTravelStories from '../components/UserTravelStories.vue';
import AudioGuidePlayer from '../components/AudioGuidePlayer.vue';
import TravelExpensesExporter from '../components/TravelExpensesExporter.vue';
import DestinationComparator from '../components/DestinationComparator.vue';
import CurrencyCalculator from '../components/CurrencyCalculator.vue';
import TravelPhrasebook from '../components/TravelPhrasebook.vue';
import PassportTracker from '../components/PassportTracker.vue';
import EmergencyContactsWidget from '../components/EmergencyContactsWidget.vue';

const route = useRoute();
const travelStore = useTravelStore();

const destination = computed(() => {
  return travelStore.destinations.find((d) => d.id === route.params.id) || travelStore.destinations[0];
});

const relatedPosts = computed(() => {
  return travelStore.posts.filter((p) => p.destinationId === destination.value?.id);
});
</script>

<template>
  <div v-if="destination" class="dest-detail-view">
    <router-link to="/destinations" class="back-link">← Back to All Destinations</router-link>

    <div class="hero-card card">
      <img :src="destination.heroImage" :alt="destination.name" class="banner-img" />
      <div class="banner-overlay">
        <span class="region-tag">{{ destination.region }} • {{ destination.country }}</span>
        <h2>{{ destination.name }}</h2>
        <p>{{ destination.tagline }}</p>
      </div>
    </div>

    <div class="detail-grid">
      <div class="content-col card">
        <h3>About {{ destination.name }}</h3>
        <p class="desc-text">{{ destination.description }}</p>

        <div class="travel-info-box card">
          <h4>💡 Travel Essentials</h4>
          <ul>
            <li><strong>Best Time to Visit:</strong> {{ destination.bestTimeToVisit }}</li>
            <li><strong>Traveler Rating:</strong> ★ {{ destination.rating.toFixed(1) }} / 5.0</li>
            <li><strong>Category:</strong> {{ destination.region }} Culture & Sightseeing</li>
          </ul>
        </div>

        <AudioGuidePlayer :destination-id="destination.id" class="margin-top-calc" />
        <WeatherClimateWidget :destination-id="destination.id" class="margin-top-calc" />
        <BudgetCalculator :destination-id="destination.id" class="margin-top-calc" />
        <ItineraryBuilder :destination-id="destination.id" class="margin-top-calc" />
        <UserTravelStories :destination-id="destination.id" class="margin-top-calc" />
        <TravelMapVisualizer :highlight-dest-id="destination.id" class="margin-top-calc" />
        <DestinationComparator class="margin-top-calc" />
        <CurrencyCalculator class="margin-top-calc" />
        <TravelExpensesExporter :destination-id="destination.id" class="margin-top-calc" />
        <TravelPhrasebook class="margin-top-calc" />
        <PassportTracker class="margin-top-calc" />
        <EmergencyContactsWidget :destination-id="destination.id" class="margin-top-calc" />
        <PackingChecklist class="margin-top-calc" />
      </div>

      <div class="sidebar-col">
        <div class="wishlist-card card">
          <h4>❤️ Save Destination</h4>
          <p>Add {{ destination.name }} to your travel wishlist for quick access later.</p>
          <button 
            @click="travelStore.toggleWishlist(destination.id)"
            class="btn btn-primary margin-top full-width"
          >
            {{ travelStore.savedWishlist.includes(destination.id) ? '❤️ Saved to Wishlist' : '🤍 Add to Wishlist' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Related Journal Articles -->
    <div v-if="relatedPosts.length > 0" class="related-section">
      <h3>📝 Related Journal Dispatches</h3>
      <div class="grid-2">
        <PostCard v-for="post in relatedPosts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dest-detail-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
}

.back-link {
  color: var(--accent-amber);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}

.hero-card {
  position: relative;
  height: 320px;
  overflow: hidden;
  padding: 0;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(11, 19, 43, 0.95), transparent 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px;
}

.region-tag {
  font-size: 12px;
  color: var(--accent-cyan);
  font-weight: 700;
  text-transform: uppercase;
}

.banner-overlay h2 {
  font-size: 32px;
  font-weight: 800;
  color: #fff;
}

.banner-overlay p {
  font-size: 15px;
  color: var(--text-secondary);
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .detail-grid { grid-template-columns: 2.2fr 1fr; }
}

.content-col {
  padding: 28px;
}

.content-col h3 { font-size: 22px; color: var(--text-primary); margin-bottom: 12px; }
.desc-text { font-size: 15px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px; }

.travel-info-box {
  padding: 20px;
  background: rgba(247, 127, 0, 0.05);
  border-color: rgba(247, 127, 0, 0.2);
}

.travel-info-box h4 { font-size: 16px; color: var(--accent-amber); margin-bottom: 10px; }
.travel-info-box ul { list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: var(--text-secondary); }

.sidebar-col { display: flex; flex-direction: column; gap: 20px; }
.wishlist-card { padding: 24px; }
.wishlist-card h4 { font-size: 18px; color: var(--text-primary); margin-bottom: 8px; }
.wishlist-card p { font-size: 13px; color: var(--text-secondary); }
.margin-top { margin-top: 16px; }
.full-width { width: 100%; justify-content: center; }

.related-section { margin-top: 16px; display: flex; flex-direction: column; gap: 16px; }
.related-section h3 { font-size: 20px; color: var(--text-primary); }
.grid-2 { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 768px) { .grid-2 { grid-template-columns: repeat(2, 1fr); } }
</style>
