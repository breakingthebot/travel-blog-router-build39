<!-- src/components/CulturalEtiquetteGuide.vue -->
<!-- Interactive Travel Local Etiquette & Cultural Do's and Don'ts Guide component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { computed } from 'vue';
import { useTravelStore } from '../stores/travelStore';

const props = defineProps<{
  destinationId?: string;
}>();

const travelStore = useTravelStore();

const activeDestId = computed(() => props.destinationId || travelStore.activeEtiquetteDestId);

const guide = computed(() => travelStore.getCulturalGuideForDestination(activeDestId.value));
</script>

<template>
  <div class="etiquette-widget card">
    <div class="widget-header">
      <div>
        <h3>🎎 Local Cultural Etiquette & Do's and Don'ts Guide</h3>
        <p class="subtitle">Avoid cultural faux pas, understand tipping customs, and master local respect guidelines.</p>
      </div>

      <!-- Destination Selector Pills -->
      <div v-if="!destinationId" class="dest-selector">
        <button 
          v-for="d in travelStore.destinations" 
          :key="d.id"
          @click="travelStore.setActiveEtiquetteDestId(d.id)"
          class="dest-btn"
          :class="{ active: travelStore.activeEtiquetteDestId === d.id }"
        >
          {{ d.name }}
        </button>
      </div>
    </div>

    <!-- Quick Customs Banner -->
    <div class="customs-summary-grid">
      <div class="summary-card card tipping">
        <span class="icon">🪙</span>
        <div class="info">
          <span class="lbl">Tipping Customs</span>
          <p class="text">{{ guide.tippingCustoms }}</p>
        </div>
      </div>

      <div class="summary-card card dress">
        <span class="icon">👗</span>
        <div class="info">
          <span class="lbl">Dress Code & Modesty</span>
          <p class="text">{{ guide.dressCodeRules }}</p>
        </div>
      </div>
    </div>

    <!-- Side-by-Side Do's and Don'ts Grid -->
    <div class="dos-donts-grid">
      <!-- DO'S -->
      <div class="column-card card dos-col">
        <h4 class="col-title dos-title">✅ Cultural DO'S</h4>
        <div class="rules-list">
          <div v-for="rule in guide.dos" :key="rule.title" class="rule-item do-item">
            <span class="rule-icon">{{ rule.icon }}</span>
            <div class="rule-text">
              <strong class="rule-head">{{ rule.title }}</strong>
              <p class="rule-body">{{ rule.explanation }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- DON'TS -->
      <div class="column-card card donts-col">
        <h4 class="col-title donts-title">❌ Cultural DON'TS</h4>
        <div class="rules-list">
          <div v-for="rule in guide.donts" :key="rule.title" class="rule-item dont-item">
            <span class="rule-icon">{{ rule.icon }}</span>
            <div class="rule-text">
              <strong class="rule-head">{{ rule.title }}</strong>
              <p class="rule-body">{{ rule.explanation }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Major Taboo Warnings -->
    <div v-if="guide.tabooWarnings.length > 0" class="taboo-box card">
      <h4>⚠️ Major Cultural Faux Pas & Taboo Warnings</h4>
      <ul>
        <li v-for="(warn, idx) in guide.tabooWarnings" :key="idx">
          {{ warn }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.etiquette-widget {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.9));
  border-color: rgba(16, 185, 129, 0.4);
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

.dest-selector {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.dest-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.dest-btn.active {
  background: #10b981;
  color: #fff;
  border-color: #10b981;
}

.customs-summary-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.summary-card {
  padding: 16px;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: flex-start;
  gap: 14px;
  border-color: rgba(16, 185, 129, 0.3);
}

.summary-card .icon { font-size: 28px; }

.summary-card .info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-card .lbl { font-size: 11px; font-weight: 700; color: #10b981; text-transform: uppercase; }
.summary-card .text { font-size: 13px; color: var(--text-primary); line-height: 1.4; }

.dos-donts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.column-card {
  padding: 18px;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.col-title { font-size: 16px; font-weight: 800; }
.dos-title { color: #10b981; }
.donts-title { color: #f43f5e; }

.rules-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rule-item {
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-sm);
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.do-item { border-left: 3px solid #10b981; }
.dont-item { border-left: 3px solid #f43f5e; }

.rule-icon { font-size: 22px; }

.rule-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rule-head { font-size: 14px; color: var(--text-primary); }
.rule-body { font-size: 12px; color: var(--text-muted); line-height: 1.4; }

.taboo-box {
  padding: 16px;
  background: rgba(244, 63, 94, 0.1);
  border-color: rgba(244, 63, 94, 0.4);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.taboo-box h4 { font-size: 14px; color: #f43f5e; }

.taboo-box ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.taboo-box li { font-size: 13px; color: var(--text-secondary); }
</style>
