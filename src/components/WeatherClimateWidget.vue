<!-- src/components/WeatherClimateWidget.vue -->
<!-- Travel Weather Forecast & Climate Guide Widget component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { computed } from 'vue';
import { useTravelStore } from '../stores/travelStore';
import type { SeasonKey } from '../stores/travelStore';

const props = defineProps<{
  destinationId?: string;
}>();

const travelStore = useTravelStore();

const activeDestId = computed(() => {
  return props.destinationId || travelStore.activeMapDestId;
});

const dest = computed(() => {
  return travelStore.destinations.find((d) => d.id === activeDestId.value) || travelStore.destinations[0];
});

const seasons: { key: SeasonKey; label: string; icon: string }[] = [
  { key: 'spring', label: 'Spring', icon: '🌸' },
  { key: 'summer', label: 'Summer', icon: '☀️' },
  { key: 'autumn', label: 'Autumn', icon: '🍁' },
  { key: 'winter', label: 'Winter', icon: '❄️' }
];

const currentSeasonData = computed(() => {
  const season = travelStore.selectedSeason;
  const tempC = dest.value.climate.avgTempC[season];
  const rainfall = dest.value.climate.rainfallMm[season];
  return {
    tempC,
    tempFormatted: travelStore.formatTemp(tempC),
    rainfall,
    seasonLabel: seasons.find((s) => s.key === season)?.label || 'Spring'
  };
});
</script>

<template>
  <div class="weather-widget card">
    <div class="widget-header">
      <div>
        <h3>🌤️ Weather Forecast & Climate Guide</h3>
        <p class="subtitle">Seasonal temperature averages, rainfall indices, and best visiting windows for {{ dest.name }}.</p>
      </div>

      <div class="header-controls">
        <button 
          @click="travelStore.toggleTempUnit()" 
          class="unit-toggle-btn"
          title="Toggle °C / °F"
        >
          Unit: <strong>°{{ travelStore.tempUnit }}</strong>
        </button>
      </div>
    </div>

    <!-- Season Tabs -->
    <div class="season-tabs">
      <button
        v-for="s in seasons"
        :key="s.key"
        @click="travelStore.setSelectedSeason(s.key)"
        class="season-tab-btn"
        :class="{ active: travelStore.selectedSeason === s.key }"
      >
        <span>{{ s.icon }}</span>
        <span>{{ s.label }}</span>
      </button>
    </div>

    <!-- Climate Stats Display Grid -->
    <div class="climate-grid">
      <!-- Temp Card -->
      <div class="stat-card card">
        <div class="stat-label">Average Temperature</div>
        <div class="stat-value temp-val">{{ currentSeasonData.tempFormatted }}</div>
        <div class="stat-sub">Expected average in {{ currentSeasonData.seasonLabel }}</div>

        <div class="bar-wrap">
          <div 
            class="bar-fill temp-bar" 
            :style="{ width: `${Math.min(100, Math.max(10, (currentSeasonData.tempC / 35) * 100))}%` }"
          ></div>
        </div>
      </div>

      <!-- Rainfall Card -->
      <div class="stat-card card">
        <div class="stat-label">Average Monthly Rainfall</div>
        <div class="stat-value rain-val">🌧️ {{ currentSeasonData.rainfall }} mm</div>
        <div class="stat-sub">Precipitation volume</div>

        <div class="bar-wrap">
          <div 
            class="bar-fill rain-bar" 
            :style="{ width: `${Math.min(100, Math.max(10, (currentSeasonData.rainfall / 250) * 100))}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Best Months & Packing Advice -->
    <div class="advice-grid">
      <div class="advice-card card">
        <div class="advice-title">✨ Recommended Visiting Window</div>
        <p class="advice-body">{{ dest.climate.bestMonths }}</p>
      </div>

      <div class="advice-card card">
        <div class="advice-title">🎒 Seasonal Packing Advice</div>
        <p class="advice-body">{{ dest.climate.packingTip }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-widget {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(247, 127, 0, 0.08), rgba(28, 37, 65, 0.8));
  border-color: rgba(247, 127, 0, 0.35);
}

.widget-header {
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.widget-header h3 { font-size: 22px; color: var(--text-primary); }
.subtitle { font-size: 14px; color: var(--text-secondary); }

.unit-toggle-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.unit-toggle-btn:hover {
  border-color: var(--accent-amber);
  color: var(--accent-amber);
}

.season-tabs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}

.season-tab-btn {
  flex: 1;
  min-width: 90px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.season-tab-btn.active {
  background: rgba(247, 127, 0, 0.2);
  border-color: var(--accent-amber);
  color: var(--accent-amber);
}

.climate-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
}

.stat-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(0, 0, 0, 0.25);
}

.stat-label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; }
.stat-value { font-size: 32px; font-weight: 800; color: var(--text-primary); }
.temp-val { color: var(--accent-amber); }
.rain-val { color: var(--accent-cyan); font-size: 26px; }
.stat-sub { font-size: 12px; color: var(--text-secondary); }

.bar-wrap {
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 6px;
}

.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.temp-bar { background: var(--accent-amber); }
.rain-bar { background: var(--accent-cyan); }

.advice-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
}

.advice-card {
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.advice-title { font-size: 13px; font-weight: 700; color: var(--accent-amber); }
.advice-body { font-size: 13px; color: var(--text-secondary); line-height: 1.4; }
</style>
