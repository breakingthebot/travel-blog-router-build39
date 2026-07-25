<!-- src/components/TravelMapVisualizer.vue -->
<!-- Interactive Travel Map Visualizer & Distance Matrix component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { computed } from 'vue';
import { useTravelStore } from '../stores/travelStore';

const props = defineProps<{
  highlightDestId?: string;
}>();

const travelStore = useTravelStore();

const activeDestId = computed(() => {
  return props.highlightDestId || travelStore.activeMapDestId;
});

const activeDest = computed(() => {
  return travelStore.destinations.find((d) => d.id === activeDestId.value) || travelStore.destinations[0];
});

// Coordinates for Origin Hubs (percentage X, Y)
const originHubs: Record<'NYC' | 'London', { name: string; x: number; y: number }> = {
  NYC: { name: 'New York (JFK)', x: 26.5, y: 34.0 },
  London: { name: 'London (LHR)', x: 48.0, y: 26.0 }
};

const currentHub = computed(() => {
  return originHubs[travelStore.selectedOriginHub];
});
</script>

<template>
  <div class="map-visualizer card">
    <div class="map-header">
      <div>
        <h3>🗺️ Interactive Global Route Map & Distance Matrix</h3>
        <p class="map-subtitle">Visualize flight routes and travel distances to world destinations.</p>
      </div>

      <div class="hub-picker">
        <span class="hub-lbl">Origin Hub:</span>
        <button 
          @click="travelStore.setOriginHub('NYC')" 
          class="hub-btn"
          :class="{ active: travelStore.selectedOriginHub === 'NYC' }"
        >
          🇺🇸 New York (NYC)
        </button>
        <button 
          @click="travelStore.setOriginHub('London')" 
          class="hub-btn"
          :class="{ active: travelStore.selectedOriginHub === 'London' }"
        >
          🇬🇧 London (LHR)
        </button>
      </div>
    </div>

    <!-- SVG Interactive Map Canvas -->
    <div class="map-canvas-container card">
      <svg viewBox="0 0 1000 500" class="world-svg">
        <defs>
          <!-- Gradient for flight route arcs -->
          <linearGradient id="flightLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f77f00" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#4cc9f0" stop-opacity="0.9" />
          </linearGradient>
        </defs>

        <!-- Simplified World Map Continents Background -->
        <!-- North America -->
        <path d="M 150 100 Q 250 80 320 150 T 260 260 T 180 200 Z" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
        <!-- South America -->
        <path d="M 280 280 Q 340 320 320 420 T 250 360 Z" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
        <!-- Europe & Asia -->
        <path d="M 450 100 Q 650 80 900 150 T 800 300 T 520 220 Z" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
        <!-- Africa -->
        <path d="M 480 230 Q 580 240 600 380 T 500 360 Z" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />

        <!-- Origin Hub Marker -->
        <g class="origin-hub-group">
          <circle :cx="currentHub.x * 10" :cy="currentHub.y * 5" r="7" fill="#f77f00" class="hub-pulse" />
          <circle :cx="currentHub.x * 10" :cy="currentHub.y * 5" r="4" fill="#ffffff" />
          <text :x="currentHub.x * 10" :y="(currentHub.y * 5) - 10" text-anchor="middle" fill="#f77f00" font-size="11" font-weight="700">
            {{ currentHub.name }}
          </text>
        </g>

        <!-- Flight Route Arcs & Destination Pins -->
        <g v-for="dest in travelStore.destinations" :key="dest.id">
          <!-- Active Flight Arc Line -->
          <path 
            v-if="dest.id === activeDestId"
            :d="`M ${currentHub.x * 10} ${currentHub.y * 5} Q ${(currentHub.x * 10 + dest.coords.svgX * 10) / 2} ${Math.min(currentHub.y * 5, dest.coords.svgY * 5) - 40} ${dest.coords.svgX * 10} ${dest.coords.svgY * 5}`" 
            fill="none" 
            stroke="url(#flightLineGrad)" 
            stroke-width="3"
            stroke-dasharray="6,4"
            class="flight-arc"
          />

          <!-- Destination Pin -->
          <g 
            @click="travelStore.setActiveMapDestination(dest.id)" 
            class="dest-pin-group"
            :class="{ active: dest.id === activeDestId }"
          >
            <circle :cx="dest.coords.svgX * 10" :cy="dest.coords.svgY * 5" r="10" class="pin-ring" />
            <circle :cx="dest.coords.svgX * 10" :cy="dest.coords.svgY * 5" r="5" class="pin-core" />
            <text 
              :x="dest.coords.svgX * 10" 
              :y="(dest.coords.svgY * 5) + 20" 
              text-anchor="middle" 
              class="pin-label"
            >
              {{ dest.name }}
            </text>
          </g>
        </g>
      </svg>

      <!-- Map Active Pin Tooltip Info -->
      <div v-if="activeDest" class="map-tooltip card">
        <div class="tooltip-title-row">
          <h4>✈️ Flight to {{ activeDest.name }}</h4>
          <span class="tooltip-badge">{{ activeDest.region }}</span>
        </div>
        <div class="tooltip-stats">
          <div>
            <span class="lbl">Flight Duration</span>
            <strong>{{ travelStore.selectedOriginHub === 'NYC' ? activeDest.coords.flightFromNyc : activeDest.coords.flightFromLondon }}</strong>
          </div>
          <div>
            <span class="lbl">Distance</span>
            <strong>{{ activeDest.coords.distanceFromNycKm.toLocaleString() }} km</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- Distance Matrix Table -->
    <div class="matrix-table-wrap card">
      <h4>📊 Global Travel Distance & Flight Duration Matrix</h4>
      <div class="table-responsive">
        <table class="matrix-table">
          <thead>
            <tr>
              <th>Destination</th>
              <th>Region</th>
              <th>Flight Duration (NYC)</th>
              <th>Flight Duration (London)</th>
              <th>Distance (km)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="dest in travelStore.destinations" 
              :key="dest.id"
              :class="{ selected: dest.id === activeDestId }"
              @click="travelStore.setActiveMapDestination(dest.id)"
            >
              <td><strong>{{ dest.name }}</strong>, {{ dest.country }}</td>
              <td><span class="region-chip">{{ dest.region }}</span></td>
              <td>✈️ {{ dest.coords.flightFromNyc }}</td>
              <td>✈️ {{ dest.coords.flightFromLondon }}</td>
              <td>📍 {{ dest.coords.distanceFromNycKm.toLocaleString() }} km</td>
              <td>
                <button 
                  @click.stop="travelStore.setActiveMapDestination(dest.id)"
                  class="btn-inspect"
                  :class="{ active: dest.id === activeDestId }"
                >
                  {{ dest.id === activeDestId ? 'Selected Pin' : 'Inspect Pin' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-visualizer {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(76, 201, 240, 0.08), rgba(28, 37, 65, 0.8));
  border-color: rgba(76, 201, 240, 0.35);
}

.map-header {
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.map-header h3 { font-size: 22px; color: var(--text-primary); }
.map-subtitle { font-size: 14px; color: var(--text-secondary); }

.hub-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.hub-lbl { font-size: 12px; color: var(--text-muted); font-weight: 600; }

.hub-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.hub-btn.active {
  background: var(--accent-amber);
  color: #000;
  border-color: var(--accent-amber);
}

.map-canvas-container {
  position: relative;
  padding: 16px;
  background: rgba(0, 0, 0, 0.35);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.world-svg {
  width: 100%;
  height: auto;
  min-height: 280px;
}

.hub-pulse {
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% { r: 6px; opacity: 0.8; }
  50% { r: 12px; opacity: 0.3; }
  100% { r: 6px; opacity: 0.8; }
}

.dest-pin-group {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.dest-pin-group:hover {
  transform: scale(1.15);
}

.pin-ring {
  fill: rgba(76, 201, 240, 0.2);
  stroke: var(--accent-cyan);
  stroke-width: 1.5;
}

.pin-core {
  fill: var(--accent-cyan);
}

.pin-label {
  font-size: 11px;
  font-weight: 700;
  fill: var(--text-primary);
  pointer-events: none;
}

.dest-pin-group.active .pin-ring {
  fill: rgba(247, 127, 0, 0.3);
  stroke: var(--accent-amber);
}

.dest-pin-group.active .pin-core {
  fill: var(--accent-amber);
}

.flight-arc {
  animation: dash 30s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -1000;
  }
}

.map-tooltip {
  position: absolute;
  bottom: 16px;
  left: 16px;
  padding: 12px 18px;
  background: rgba(28, 37, 65, 0.95);
  backdrop-filter: blur(8px);
  border-color: var(--accent-cyan);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tooltip-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.tooltip-title-row h4 { font-size: 14px; color: var(--text-primary); }

.tooltip-badge {
  font-size: 10px;
  font-weight: 700;
  background: rgba(76, 201, 240, 0.2);
  color: var(--accent-cyan);
  padding: 2px 6px;
  border-radius: 4px;
}

.tooltip-stats {
  display: flex;
  gap: 16px;
  font-size: 12px;
}

.tooltip-stats div {
  display: flex;
  flex-direction: column;
}

.tooltip-stats .lbl { color: var(--text-muted); font-size: 10px; }
.tooltip-stats strong { color: var(--accent-amber); font-size: 13px; }

.matrix-table-wrap {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.matrix-table-wrap h4 { font-size: 16px; color: var(--text-primary); }

.table-responsive { overflow-x: auto; }

.matrix-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
}

.matrix-table th {
  padding: 10px 12px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
}

.matrix-table td {
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  color: var(--text-secondary);
}

.matrix-table tr {
  cursor: pointer;
  transition: background 0.2s ease;
}

.matrix-table tr:hover {
  background: rgba(255, 255, 255, 0.03);
}

.matrix-table tr.selected {
  background: rgba(76, 201, 240, 0.1);
}

.region-chip {
  font-size: 11px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--text-secondary);
}

.btn-inspect {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  cursor: pointer;
}

.btn-inspect.active {
  background: var(--accent-cyan);
  color: #000;
  border-color: var(--accent-cyan);
  font-weight: 700;
}
</style>
