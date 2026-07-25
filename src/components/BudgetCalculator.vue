<!-- src/components/BudgetCalculator.vue -->
<!-- Interactive Trip Budget Estimation Calculator & Currency Converter component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { computed } from 'vue';
import { useTravelStore, type TravelStyle, type CurrencyCode } from '../stores/travelStore';

const props = defineProps<{
  destinationId?: string;
}>();

const travelStore = useTravelStore();

const activeDestId = computed(() => {
  return props.destinationId || travelStore.destinations[0].id;
});

const currentDest = computed(() => {
  return travelStore.destinations.find((d) => d.id === activeDestId.value) || travelStore.destinations[0];
});

const budget = computed(() => {
  return travelStore.calculateDestinationBudget(activeDestId.value);
});

const currencies: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: 'USD', label: 'USD ($)', symbol: '$' },
  { code: 'EUR', label: 'EUR (€)', symbol: '€' },
  { code: 'GBP', label: 'GBP (£)', symbol: '£' },
  { code: 'JPY', label: 'JPY (¥)', symbol: '¥' }
];

const styles: { key: TravelStyle; label: string; icon: string; desc: string }[] = [
  { key: 'backpacker', label: 'Backpacker', icon: '🎒', desc: 'Hostels, street food & public transport' },
  { key: 'explorer', label: 'Explorer', icon: '🧳', desc: 'Mid-range hotels, local dining & guided tours' },
  { key: 'luxury', label: 'Luxury', icon: '💎', desc: '5-star resorts, fine dining & private transport' }
];
</script>

<template>
  <div class="budget-calculator card">
    <div class="calc-title-row">
      <div>
        <h3>💰 Trip Budget & Currency Estimator</h3>
        <p class="calc-subtitle">Estimate daily and total trip expenses for <strong>{{ currentDest.name }}, {{ currentDest.country }}</strong>.</p>
      </div>

      <div class="currency-picker">
        <button 
          v-for="curr in currencies" 
          :key="curr.code"
          @click="travelStore.setCurrency(curr.code)"
          class="curr-btn"
          :class="{ active: travelStore.budgetConfig.currency === curr.code }"
        >
          {{ curr.code }} ({{ curr.symbol }})
        </button>
      </div>
    </div>

    <div class="controls-grid">
      <!-- Duration Slider & Presets -->
      <div class="control-box card">
        <div class="box-header">
          <label>📅 Trip Duration:</label>
          <span class="highlight-val">{{ travelStore.budgetConfig.tripDays }} Days</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="30" 
          :value="travelStore.budgetConfig.tripDays"
          @input="(e: any) => travelStore.setTripDays(parseInt(e.target.value))"
          class="days-slider"
        />
        <div class="preset-row">
          <button 
            v-for="d in [3, 7, 14, 21]" 
            :key="d" 
            @click="travelStore.setTripDays(d)"
            class="preset-btn"
            :class="{ active: travelStore.budgetConfig.tripDays === d }"
          >
            {{ d }} Days
          </button>
        </div>
      </div>

      <!-- Travel Style Selection -->
      <div class="control-box card">
        <label class="box-label">✈️ Select Travel Style:</label>
        <div class="styles-row">
          <button 
            v-for="st in styles" 
            :key="st.key"
            @click="travelStore.setTravelStyle(st.key)"
            class="style-card-btn"
            :class="{ active: travelStore.budgetConfig.travelStyle === st.key }"
          >
            <span class="style-icon">{{ st.icon }}</span>
            <span class="style-title">{{ st.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Estimated Budget Summary Output -->
    <div class="summary-card card">
      <div class="total-banner">
        <div class="stat-block">
          <span class="stat-lbl">Daily Average Spend</span>
          <span class="stat-main">{{ budget.currencySymbol }}{{ budget.dailyCost.toLocaleString() }} <small>/ day</small></span>
        </div>

        <div class="divider"></div>

        <div class="stat-block">
          <span class="stat-lbl">Total Estimated Trip Budget ({{ travelStore.budgetConfig.tripDays }} Days)</span>
          <span class="stat-main highlight">{{ budget.currencySymbol }}{{ budget.totalBudget.toLocaleString() }}</span>
        </div>
      </div>

      <!-- Category Expense Breakdown Meters -->
      <div class="breakdown-section">
        <h4>📊 Estimated Cost Breakdown:</h4>
        <div class="breakdown-grid">
          <div class="breakdown-item">
            <div class="item-header">
              <span>🏨 Accommodation (45%)</span>
              <strong>{{ budget.currencySymbol }}{{ budget.breakdown.accommodation.toLocaleString() }}</strong>
            </div>
            <div class="progress-bar"><div class="fill fill-accom"></div></div>
          </div>

          <div class="breakdown-item">
            <div class="item-header">
              <span>🍽️ Dining & Food (30%)</span>
              <strong>{{ budget.currencySymbol }}{{ budget.breakdown.dining.toLocaleString() }}</strong>
            </div>
            <div class="progress-bar"><div class="fill fill-food"></div></div>
          </div>

          <div class="breakdown-item">
            <div class="item-header">
              <span>🚕 Local Transport (15%)</span>
              <strong>{{ budget.currencySymbol }}{{ budget.breakdown.transport.toLocaleString() }}</strong>
            </div>
            <div class="progress-bar"><div class="fill fill-trans"></div></div>
          </div>

          <div class="breakdown-item">
            <div class="item-header">
              <span>🎟️ Sightseeing & Activities (10%)</span>
              <strong>{{ budget.currencySymbol }}{{ budget.breakdown.activities.toLocaleString() }}</strong>
            </div>
            <div class="progress-bar"><div class="fill fill-act"></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.budget-calculator {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(247, 127, 0, 0.08), rgba(28, 37, 65, 0.7));
  border-color: rgba(247, 127, 0, 0.3);
}

.calc-title-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 768px) {
  .calc-title-row {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.calc-title-row h3 { font-size: 22px; color: var(--text-primary); }
.calc-subtitle { font-size: 14px; color: var(--text-secondary); }

.currency-picker {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.curr-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.curr-btn.active {
  background: var(--accent-amber);
  color: #000;
  border-color: var(--accent-amber);
}

.controls-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .controls-grid { grid-template-columns: 1fr 1fr; }
}

.control-box {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--text-secondary);
}

.highlight-val {
  font-size: 16px;
  font-weight: 800;
  color: var(--accent-amber);
}

.days-slider {
  width: 100%;
  accent-color: var(--accent-amber);
  cursor: pointer;
}

.preset-row {
  display: flex;
  gap: 8px;
}

.preset-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  cursor: pointer;
}

.preset-btn.active {
  background: rgba(247, 127, 0, 0.15);
  border-color: var(--accent-amber);
  color: var(--accent-amber);
}

.box-label { font-size: 14px; color: var(--text-secondary); }

.styles-row {
  display: flex;
  gap: 8px;
}

.style-card-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 10px 6px;
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.style-icon { font-size: 20px; }
.style-title { font-size: 12px; font-weight: 600; }

.style-card-btn.active {
  background: rgba(76, 201, 240, 0.15);
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}

.summary-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.total-banner {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
}

.stat-block {
  display: flex;
  flex-direction: column;
}

.stat-lbl { font-size: 12px; color: var(--text-muted); text-transform: uppercase; }
.stat-main { font-size: 22px; font-weight: 800; color: var(--text-primary); }
.stat-main small { font-size: 13px; font-weight: 500; color: var(--text-muted); }
.stat-main.highlight { font-size: 28px; color: var(--accent-amber); }

.divider { width: 1px; height: 40px; background: var(--border-color); display: none; }
@media (min-width: 600px) { .divider { display: block; } }

.breakdown-section h4 { font-size: 15px; color: var(--text-primary); margin-bottom: 12px; }

.breakdown-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
}

.breakdown-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-secondary);
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
}

.fill { height: 100%; border-radius: 3px; }
.fill-accom { width: 45%; background: var(--accent-amber); }
.fill-food { width: 30%; background: var(--accent-cyan); }
.fill-trans { width: 15%; background: var(--accent-purple); }
.fill-act { width: 10%; background: var(--accent-emerald); }
</style>
