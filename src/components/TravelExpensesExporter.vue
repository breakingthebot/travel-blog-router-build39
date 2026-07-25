<!-- src/components/TravelExpensesExporter.vue -->
<!-- Interactive Travel Expenses Analytics & Export Tool component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { computed } from 'vue';
import { useTravelStore } from '../stores/travelStore';
import type { CurrencyCode, TravelStyle } from '../stores/travelStore';

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

const budget = computed(() => {
  return travelStore.calculateDestinationBudget(dest.value.id);
});

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function handleExportItinerary() {
  const csv = travelStore.exportItineraryCsv(dest.value.id);
  downloadFile(csv, `${dest.value.name.toLowerCase()}-trip-itinerary.csv`, 'text/csv;charset=utf-8;');
}

function handleExportBudget() {
  const jsonStr = travelStore.exportBudgetJson(dest.value.id);
  downloadFile(jsonStr, `${dest.value.name.toLowerCase()}-budget-analytics.json`, 'application/json');
}

function handleExportPacking() {
  const csv = travelStore.exportPackingListCsv();
  downloadFile(csv, `travel-packing-checklist.csv`, 'text/csv;charset=utf-8;');
}
</script>

<template>
  <div class="expenses-exporter card">
    <div class="exporter-header">
      <div>
        <h3>📈 Expenses Analytics & Export Center</h3>
        <p class="subtitle">Analyze travel budget allocations and export trip schedules for {{ dest.name }}.</p>
      </div>

      <div class="controls-row">
        <!-- Travel Style Chips -->
        <div class="btn-group">
          <button 
            v-for="s in (['backpacker', 'explorer', 'luxury'] as TravelStyle[])" 
            :key="s"
            @click="travelStore.setTravelStyle(s)"
            class="chip-btn"
            :class="{ active: travelStore.budgetConfig.travelStyle === s }"
          >
            {{ s === 'backpacker' ? '🎒 Backpacker' : s === 'explorer' ? '🧳 Explorer' : '💎 Luxury' }}
          </button>
        </div>

        <!-- Currency Picker -->
        <select 
          :value="travelStore.budgetConfig.currency" 
          @change="(e) => travelStore.setCurrency((e.target as HTMLSelectElement).value as CurrencyCode)"
          class="currency-select"
        >
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
          <option value="GBP">£ GBP</option>
          <option value="JPY">¥ JPY</option>
        </select>
      </div>
    </div>

    <!-- Analytics Dashboard Cards -->
    <div class="analytics-grid">
      <!-- Total Budget Summary Card -->
      <div class="summary-card card">
        <div class="card-lbl">Estimated Total Budget ({{ travelStore.budgetConfig.tripDays }} Days)</div>
        <div class="total-price">{{ budget.currencySymbol }}{{ budget.totalBudget.toLocaleString() }} {{ budget.currencyCode }}</div>
        <div class="daily-price">{{ budget.currencySymbol }}{{ budget.dailyCost.toLocaleString() }} / day</div>
      </div>

      <!-- Expense Allocation Breakdown Card -->
      <div class="breakdown-card card">
        <div class="card-lbl">Expense Category Allocation</div>
        
        <div class="alloc-list">
          <div class="alloc-item">
            <div class="item-head">
              <span>🏨 Accommodation (45%)</span>
              <strong>{{ budget.currencySymbol }}{{ budget.breakdown.accommodation.toLocaleString() }}</strong>
            </div>
            <div class="meter-track"><div class="meter-fill acc-bar"></div></div>
          </div>

          <div class="alloc-item">
            <div class="item-head">
              <span>🍜 Dining & Food (30%)</span>
              <strong>{{ budget.currencySymbol }}{{ budget.breakdown.dining.toLocaleString() }}</strong>
            </div>
            <div class="meter-track"><div class="meter-fill food-bar"></div></div>
          </div>

          <div class="alloc-item">
            <div class="item-head">
              <span>🚕 Transport & Transit (15%)</span>
              <strong>{{ budget.currencySymbol }}{{ budget.breakdown.transport.toLocaleString() }}</strong>
            </div>
            <div class="meter-track"><div class="meter-fill transit-bar"></div></div>
          </div>

          <div class="alloc-item">
            <div class="item-head">
              <span>🎟️ Activities & Pass (10%)</span>
              <strong>{{ budget.currencySymbol }}{{ budget.breakdown.activities.toLocaleString() }}</strong>
            </div>
            <div class="meter-track"><div class="meter-fill act-bar"></div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Export Action Buttons Bar -->
    <div class="export-actions-card card">
      <h4>💾 Export Trip Files for Offline Use</h4>
      <div class="export-btns">
        <button @click="handleExportItinerary" class="btn btn-primary">
          📥 Download Itinerary (.CSV)
        </button>

        <button @click="handleExportBudget" class="btn btn-secondary">
          📊 Export Budget Data (.JSON)
        </button>

        <button @click="handleExportPacking" class="btn btn-secondary">
          🧳 Download Packing List (.CSV)
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expenses-exporter {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(28, 37, 65, 0.8));
  border-color: rgba(16, 185, 129, 0.35);
}

.exporter-header {
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.exporter-header h3 { font-size: 22px; color: var(--text-primary); }
.subtitle { font-size: 14px; color: var(--text-secondary); }

.controls-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-group {
  display: flex;
  gap: 4px;
}

.chip-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  cursor: pointer;
}

.chip-btn.active {
  background: #10b981;
  color: #000;
  border-color: #10b981;
  font-weight: 700;
}

.currency-select {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
}

.analytics-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: 280px 1fr;
  }
}

.summary-card {
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}

.card-lbl { font-size: 12px; color: var(--text-muted); font-weight: 600; }
.total-price { font-size: 28px; font-weight: 800; color: #10b981; }
.daily-price { font-size: 14px; color: var(--text-secondary); }

.breakdown-card {
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alloc-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.alloc-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-head {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-secondary);
}

.meter-track {
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
}

.meter-fill { height: 100%; border-radius: 3px; }
.acc-bar { width: 45%; background: var(--accent-purple); }
.food-bar { width: 30%; background: var(--accent-amber); }
.transit-bar { width: 15%; background: var(--accent-cyan); }
.act-bar { width: 10%; background: #10b981; }

.export-actions-card {
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.export-actions-card h4 { font-size: 15px; color: var(--text-primary); }

.export-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
