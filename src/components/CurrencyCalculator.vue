<!-- src/components/CurrencyCalculator.vue -->
<!-- Interactive Travel Currency & Exchange Rate Calculator component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { computed } from 'vue';
import { useTravelStore, CURRENCY_RATES } from '../stores/travelStore';
import type { CurrencyCode } from '../stores/travelStore';

const travelStore = useTravelStore();

const currencyCodes = computed(() => Object.keys(CURRENCY_RATES) as CurrencyCode[]);

const calc = computed(() => travelStore.convertedCurrencyResult);

const sampleItemsUsd = [
  { name: '☕ Espresso / Matcha', usdCost: 4.5 },
  { name: '🍜 Local Dinner Bowl', usdCost: 18.0 },
  { name: '🏨 Boutique Hotel Night', usdCost: 140.0 },
  { name: '🚄 High-Speed Train Pass', usdCost: 280.0 }
];
</script>

<template>
  <div class="currency-widget card">
    <div class="widget-header">
      <div>
        <h3>💱 Travel Currency & Live Exchange Rate Converter</h3>
        <p class="subtitle">Convert travel budgets across major currencies and estimate local expenses.</p>
      </div>

      <span class="rate-tag">⚡ Live Interbank Reference Rates</span>
    </div>

    <!-- Converter Form Console -->
    <div class="converter-console card">
      <div class="input-group">
        <label class="lbl">Amount</label>
        <input 
          type="number" 
          min="1"
          :value="travelStore.calcAmount" 
          @input="(e) => travelStore.setCalcAmount(Number((e.target as HTMLInputElement).value))"
          class="amount-input"
        />
      </div>

      <!-- From Currency Picker -->
      <div class="input-group">
        <label class="lbl">From Currency</label>
        <select 
          :value="travelStore.calcFromCurr" 
          @change="(e) => travelStore.setCalcFromCurr((e.target as HTMLSelectElement).value as CurrencyCode)"
          class="curr-select"
        >
          <option v-for="c in currencyCodes" :key="c" :value="c">
            {{ CURRENCY_RATES[c].flag }} {{ c }} - {{ CURRENCY_RATES[c].name }}
          </option>
        </select>
      </div>

      <!-- Swap Button -->
      <button @click="travelStore.swapCalcCurrencies()" class="swap-btn" title="Swap Currencies">
        ⇄
      </button>

      <!-- To Currency Picker -->
      <div class="input-group">
        <label class="lbl">To Currency</label>
        <select 
          :value="travelStore.calcToCurr" 
          @change="(e) => travelStore.setCalcToCurr((e.target as HTMLSelectElement).value as CurrencyCode)"
          class="curr-select"
        >
          <option v-for="c in currencyCodes" :key="c" :value="c">
            {{ CURRENCY_RATES[c].flag }} {{ c }} - {{ CURRENCY_RATES[c].name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Result Banner -->
    <div class="result-banner card">
      <div class="result-main">
        <span class="converted-lbl">{{ calc.fromSymbol }}{{ calc.amount.toLocaleString() }} {{ calc.fromCode }} =</span>
        <h2 class="converted-val">{{ calc.toSymbol }}{{ calc.convertedValue.toLocaleString() }} <span class="to-code">{{ calc.toCode }}</span></h2>
        <span class="rate-formula">{{ calc.rateText }}</span>
      </div>
    </div>

    <!-- Quick Local Expense Reference Table -->
    <div class="reference-card card">
      <h4>🛒 Common Local Travel Costs (Converted)</h4>
      <div class="items-grid">
        <div v-for="item in sampleItemsUsd" :key="item.name" class="ref-item">
          <span class="item-name">{{ item.name }}</span>
          <strong class="item-price">
            {{ calc.toSymbol }}{{ Math.round(item.usdCost * CURRENCY_RATES[calc.toCode].rateFromUsd).toLocaleString() }}
          </strong>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.currency-widget {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(28, 37, 65, 0.8));
  border-color: rgba(59, 130, 246, 0.35);
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

.rate-tag {
  font-size: 11px;
  font-weight: 700;
  background: rgba(59, 130, 246, 0.2);
  color: var(--accent-cyan);
  padding: 4px 10px;
  border-radius: 20px;
}

.converter-console {
  padding: 20px;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-end;
  }
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.lbl { font-size: 12px; font-weight: 600; color: var(--text-muted); }

.amount-input, .curr-select {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
}

.swap-btn {
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-banner {
  padding: 24px;
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(59, 130, 246, 0.4);
  text-align: center;
}

.result-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.converted-lbl { font-size: 14px; color: var(--text-secondary); }
.converted-val { font-size: 32px; font-weight: 800; color: var(--accent-cyan); }
.to-code { font-size: 20px; color: var(--text-muted); }
.rate-formula { font-size: 12px; color: var(--text-muted); margin-top: 4px; }

.reference-card {
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reference-card h4 { font-size: 14px; color: var(--text-primary); }

.items-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.ref-item {
  padding: 10px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name { font-size: 11px; color: var(--text-muted); }
.item-price { font-size: 15px; color: var(--text-primary); }
</style>
