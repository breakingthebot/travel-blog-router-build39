<!-- src/components/DestinationComparator.vue -->
<!-- Interactive Destination Comparison Matrix Tool component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { computed } from 'vue';
import { useTravelStore } from '../stores/travelStore';

const travelStore = useTravelStore();

const destA = computed(() => travelStore.compareDestinationA);
const destB = computed(() => travelStore.compareDestinationB);

function getCheaperBadge(costA: number, costB: number, current: 'A' | 'B'): string | null {
  if (costA === costB) return null;
  if (current === 'A' && costA < costB) return '💡 Cheaper';
  if (current === 'B' && costB < costA) return '💡 Cheaper';
  return null;
}
</script>

<template>
  <div class="comparator-widget card">
    <div class="comparator-header">
      <div>
        <h3>⚖️ Side-by-Side Destination Matrix</h3>
        <p class="subtitle">Compare travel budgets, flight times, best seasons, and vibes side-by-side.</p>
      </div>

      <!-- Destination Selection Controls -->
      <div class="picker-row">
        <select 
          :value="travelStore.compareDestIdA" 
          @change="(e) => travelStore.setCompareDestinationA((e.target as HTMLSelectElement).value)"
          class="dest-select"
        >
          <option v-for="d in travelStore.destinations" :key="d.id" :value="d.id">{{ d.name }} ({{ d.country }})</option>
        </select>

        <button @click="travelStore.swapCompareDestinations()" class="swap-btn" title="Swap Destinations">
          ⇄ Swap
        </button>

        <select 
          :value="travelStore.compareDestIdB" 
          @change="(e) => travelStore.setCompareDestinationB((e.target as HTMLSelectElement).value)"
          class="dest-select"
        >
          <option v-for="d in travelStore.destinations" :key="d.id" :value="d.id">{{ d.name }} ({{ d.country }})</option>
        </select>
      </div>
    </div>

    <!-- Side-by-Side Matrix Table -->
    <div class="matrix-wrapper card">
      <div class="matrix-grid">

        <!-- Header Row -->
        <div class="grid-cell metric-header">Metric</div>
        <div class="grid-cell dest-header">
          <img :src="destA.heroImage" :alt="destA.name" class="dest-thumb" />
          <div>
            <h4>{{ destA.name }}</h4>
            <span class="sub-country">{{ destA.country }} • ⭐ {{ destA.rating }}</span>
          </div>
        </div>

        <div class="grid-cell dest-header">
          <img :src="destB.heroImage" :alt="destB.name" class="dest-thumb" />
          <div>
            <h4>{{ destB.name }}</h4>
            <span class="sub-country">{{ destB.country }} • ⭐ {{ destB.rating }}</span>
          </div>
        </div>

        <!-- Row 1: Backpacker Daily Cost -->
        <div class="grid-cell metric-name">🎒 Backpacker Daily</div>
        <div class="grid-cell">
          <strong>${{ destA.dailyCostsUsd.backpacker }} / day</strong>
          <span v-if="getCheaperBadge(destA.dailyCostsUsd.backpacker, destB.dailyCostsUsd.backpacker, 'A')" class="badge-cheaper">
            {{ getCheaperBadge(destA.dailyCostsUsd.backpacker, destB.dailyCostsUsd.backpacker, 'A') }}
          </span>
        </div>
        <div class="grid-cell">
          <strong>${{ destB.dailyCostsUsd.backpacker }} / day</strong>
          <span v-if="getCheaperBadge(destA.dailyCostsUsd.backpacker, destB.dailyCostsUsd.backpacker, 'B')" class="badge-cheaper">
            {{ getCheaperBadge(destA.dailyCostsUsd.backpacker, destB.dailyCostsUsd.backpacker, 'B') }}
          </span>
        </div>

        <!-- Row 2: Explorer Daily Cost -->
        <div class="grid-cell metric-name">🧳 Explorer Daily</div>
        <div class="grid-cell">
          <strong>${{ destA.dailyCostsUsd.explorer }} / day</strong>
          <span v-if="getCheaperBadge(destA.dailyCostsUsd.explorer, destB.dailyCostsUsd.explorer, 'A')" class="badge-cheaper">
            {{ getCheaperBadge(destA.dailyCostsUsd.explorer, destB.dailyCostsUsd.explorer, 'A') }}
          </span>
        </div>
        <div class="grid-cell">
          <strong>${{ destB.dailyCostsUsd.explorer }} / day</strong>
          <span v-if="getCheaperBadge(destA.dailyCostsUsd.explorer, destB.dailyCostsUsd.explorer, 'B')" class="badge-cheaper">
            {{ getCheaperBadge(destA.dailyCostsUsd.explorer, destB.dailyCostsUsd.explorer, 'B') }}
          </span>
        </div>

        <!-- Row 3: Luxury Daily Cost -->
        <div class="grid-cell metric-name">💎 Luxury Daily</div>
        <div class="grid-cell">
          <strong>${{ destA.dailyCostsUsd.luxury }} / day</strong>
        </div>
        <div class="grid-cell">
          <strong>${{ destB.dailyCostsUsd.luxury }} / day</strong>
        </div>

        <!-- Row 4: Best Visiting Season -->
        <div class="grid-cell metric-name">📅 Best Season</div>
        <div class="grid-cell text-sm">{{ destA.climate.bestMonths }}</div>
        <div class="grid-cell text-sm">{{ destB.climate.bestMonths }}</div>

        <!-- Row 5: Flight Time from NYC -->
        <div class="grid-cell metric-name">✈️ Flight from NYC</div>
        <div class="grid-cell">{{ destA.coords.flightFromNyc }} ({{ (destA.coords.distanceFromNycKm).toLocaleString() }} km)</div>
        <div class="grid-cell">{{ destB.coords.flightFromNyc }} ({{ (destB.coords.distanceFromNycKm).toLocaleString() }} km)</div>

        <!-- Row 6: Vibe Tags -->
        <div class="grid-cell metric-name">✨ Vibe & Atmosphere</div>
        <div class="grid-cell">
          <div class="tags-wrap">
            <span v-for="tag in destA.vibeTags" :key="tag" class="vibe-tag">#{{ tag }}</span>
          </div>
        </div>
        <div class="grid-cell">
          <div class="tags-wrap">
            <span v-for="tag in destB.vibeTags" :key="tag" class="vibe-tag">#{{ tag }}</span>
          </div>
        </div>

        <!-- Row 7: Action Link -->
        <div class="grid-cell metric-name">🔗 Full Guide</div>
        <div class="grid-cell">
          <router-link :to="`/destinations/${destA.id}`" class="btn-link">
            Explore {{ destA.name }} →
          </router-link>
        </div>
        <div class="grid-cell">
          <router-link :to="`/destinations/${destB.id}`" class="btn-link">
            Explore {{ destB.name }} →
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.comparator-widget {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(234, 179, 8, 0.08), rgba(28, 37, 65, 0.8));
  border-color: rgba(234, 179, 8, 0.35);
}

.comparator-header {
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.comparator-header h3 { font-size: 22px; color: var(--text-primary); }
.subtitle { font-size: 14px; color: var(--text-secondary); }

.picker-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.dest-select {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
}

.swap-btn {
  background: rgba(234, 179, 8, 0.2);
  border: 1px solid var(--accent-amber);
  color: var(--accent-amber);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  font-weight: 700;
  cursor: pointer;
}

.matrix-wrapper {
  padding: 16px;
  background: rgba(0, 0, 0, 0.35);
  overflow-x: auto;
}

.matrix-grid {
  display: grid;
  grid-template-columns: 160px 1fr 1fr;
  gap: 1px;
  background: var(--border-color);
  min-width: 600px;
}

.grid-cell {
  background: var(--bg-card);
  padding: 12px 14px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: var(--text-secondary);
  gap: 8px;
}

.metric-header {
  font-weight: 700;
  color: var(--text-muted);
  background: rgba(0, 0, 0, 0.4);
}

.dest-header {
  background: rgba(0, 0, 0, 0.4);
  gap: 12px;
}

.dest-thumb {
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 6px;
}

.dest-header h4 { font-size: 15px; color: var(--text-primary); }
.sub-country { font-size: 11px; color: var(--text-muted); }

.metric-name {
  font-weight: 700;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.02);
}

.badge-cheaper {
  font-size: 10px;
  font-weight: 700;
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  padding: 2px 6px;
  border-radius: 4px;
}

.text-sm { font-size: 12px; }

.tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.vibe-tag {
  font-size: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
  padding: 2px 6px;
  border-radius: 4px;
}

.btn-link {
  color: var(--accent-amber);
  font-weight: 700;
  text-decoration: none;
  font-size: 12px;
}

.btn-link:hover { text-decoration: underline; }
</style>
