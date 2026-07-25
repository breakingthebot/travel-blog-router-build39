<!-- src/views/DestinationsView.vue -->
<!-- Destinations catalog view with search input and region filter chips. -->
<!-- Connects to: stores/travelStore.ts, components/DestinationCard.vue -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { useTravelStore } from '../stores/travelStore';
import DestinationCard from '../components/DestinationCard.vue';
import BudgetCalculator from '../components/BudgetCalculator.vue';
import ItineraryBuilder from '../components/ItineraryBuilder.vue';
import PackingChecklist from '../components/PackingChecklist.vue';
import TravelQuiz from '../components/TravelQuiz.vue';
import TravelMapVisualizer from '../components/TravelMapVisualizer.vue';
import WeatherClimateWidget from '../components/WeatherClimateWidget.vue';
import UserTravelStories from '../components/UserTravelStories.vue';
import AudioGuidePlayer from '../components/AudioGuidePlayer.vue';
import TravelExpensesExporter from '../components/TravelExpensesExporter.vue';
import DestinationComparator from '../components/DestinationComparator.vue';
import CurrencyCalculator from '../components/CurrencyCalculator.vue';
import TravelPhrasebook from '../components/TravelPhrasebook.vue';

const travelStore = useTravelStore();
const regions = ['All', 'Europe', 'Asia', 'Africa', 'Americas'];
</script>

<template>
  <div class="destinations-view">
    <div class="header-card card">
      <h2>🌍 Explore Global Destinations</h2>
      <p>Filter by region or search for your next travel spot.</p>

      <div class="filter-controls">
        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input 
            :value="travelStore.searchQuery"
            @input="(e: any) => travelStore.setSearchQuery(e.target.value)"
            type="text"
            placeholder="Search by city, country or keyword..."
            class="search-input"
          />
        </div>

        <div class="region-chips">
          <button 
            v-for="reg in regions" 
            :key="reg" 
            @click="travelStore.setRegion(reg)"
            class="chip-btn"
            :class="{ active: travelStore.selectedRegion === reg }"
          >
            {{ reg }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="travelStore.filteredDestinations.length > 0" class="dest-grid">
      <DestinationCard
        v-for="dest in travelStore.filteredDestinations"
        :key="dest.id"
        :destination="dest"
      />
    </div>

    <div v-else class="empty-state card">
      <span class="empty-icon">📍</span>
      <h3>No Destinations Found</h3>
      <p>Try resetting search filters or region selection.</p>
      <button @click="travelStore.setRegion('All'); travelStore.setSearchQuery('')" class="btn btn-secondary margin-top">
        Reset Search Filters
      </button>
    </div>

    <!-- Interactive Travel Quiz Section -->
    <section class="margin-bottom-calc">
      <TravelQuiz />
    </section>

    <!-- Immersive Travel Audio Guide Player -->
    <section class="margin-top">
      <AudioGuidePlayer />
    </section>

    <!-- Weather & Climate Guide Section -->
    <section class="margin-top">
      <WeatherClimateWidget />
    </section>

    <!-- Reader Travel Stories & Reviews Section -->
    <section class="margin-top">
      <UserTravelStories />
    </section>

    <!-- Interactive Travel Map & Distance Matrix -->
    <section class="margin-top">
      <TravelMapVisualizer />
    </section>

    <!-- Destination Comparison Matrix Tool -->
    <section class="margin-top">
      <DestinationComparator />
    </section>

    <!-- Travel Currency & Exchange Rate Calculator -->
    <section class="margin-top">
      <CurrencyCalculator />
    </section>

    <!-- Essential Travel Phrasebook -->
    <section class="margin-top">
      <TravelPhrasebook />
    </section>

    <!-- Expenses Analytics & Export Tool -->
    <section class="margin-top">
      <TravelExpensesExporter />
    </section>

    <!-- Interactive Budget Estimator Tool, Itinerary Planner & Packing Checklist -->
    <section class="budget-section margin-top">
      <BudgetCalculator />
      <ItineraryBuilder class="margin-top" />
      <PackingChecklist class="margin-top" />
    </section>
  </div>
</template>

<style scoped>
.destinations-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
}

.header-card {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header-card h2 { font-size: 26px; color: var(--text-primary); }
.header-card p { font-size: 14px; color: var(--text-secondary); }

.filter-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.search-wrapper {
  position: relative;
  flex: 1;
  max-width: 450px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.6;
}

.search-input {
  width: 100%;
  padding: 10px 14px 10px 36px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-family);
  outline: none;
}

.search-input:focus {
  border-color: var(--accent-amber);
}

.region-chips {
  display: flex;
  gap: 8px;
}

.chip-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
}

.chip-btn.active {
  background: rgba(247, 127, 0, 0.15);
  border-color: var(--accent-amber);
  color: var(--accent-amber);
  font-weight: 600;
}

.dest-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .dest-grid { grid-template-columns: repeat(3, 1fr); }
}

.empty-state {
  padding: 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.empty-icon { font-size: 44px; }
.margin-top { margin-top: 12px; }
</style>
