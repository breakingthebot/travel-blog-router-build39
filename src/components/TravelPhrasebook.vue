<!-- src/components/TravelPhrasebook.vue -->
<!-- Interactive Travel Phrasebook & Audio Pronunciation Guide component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { ref } from 'vue';
import { useTravelStore } from '../stores/travelStore';
import type { PhraseCategory, PhraseItem } from '../stores/travelStore';

const travelStore = useTravelStore();

const copiedPhraseId = ref<string | null>(null);

const languages: { label: string; value: 'Japanese' | 'Greek' | 'German' | 'Swahili'; flag: string }[] = [
  { label: 'Japanese', value: 'Japanese', flag: '🇯🇵' },
  { label: 'Greek', value: 'Greek', flag: '🇬🇷' },
  { label: 'German', value: 'German', flag: '🇩🇪' },
  { label: 'Swahili', value: 'Swahili', flag: '🇹🇿' }
];

const categories: ('All' | PhraseCategory)[] = ['All', 'Greetings', 'Dining', 'Directions', 'Emergency', 'Shopping'];

function copyPhrase(phrase: PhraseItem) {
  navigator.clipboard.writeText(`${phrase.translated} (${phrase.phonetic})`);
  copiedPhraseId.value = phrase.id;
  setTimeout(() => {
    copiedPhraseId.value = null;
  }, 2000);
}
</script>

<template>
  <div class="phrasebook-widget card">
    <div class="widget-header">
      <div>
        <h3>🗣️ Essential Travel Phrasebook & Audio Pronunciations</h3>
        <p class="subtitle">Learn key local phrases, phonetic guides, and listen to spoken audio pronunciations.</p>
      </div>

      <!-- Language Selector Tabs -->
      <div class="lang-tabs">
        <button 
          v-for="l in languages" 
          :key="l.value"
          @click="travelStore.setPhraseLanguage(l.value)"
          class="lang-btn"
          :class="{ active: travelStore.selectedPhraseLanguage === l.value }"
        >
          {{ l.flag }} {{ l.label }}
        </button>
      </div>
    </div>

    <!-- Category Filters -->
    <div class="cat-bar">
      <span class="cat-lbl">Category:</span>
      <button 
        v-for="cat in categories" 
        :key="cat"
        @click="travelStore.setPhraseCategory(cat)"
        class="cat-btn"
        :class="{ active: travelStore.selectedPhraseCategory === cat }"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Phrases Grid -->
    <div class="phrases-grid">
      <div v-for="phrase in travelStore.filteredPhrases" :key="phrase.id" class="phrase-card card">
        <div class="card-head">
          <span class="cat-tag">{{ phrase.category }}</span>
          <span class="eng-title">{{ phrase.english }}</span>
        </div>

        <div class="card-body">
          <div class="translated-script">{{ phrase.translated }}</div>
          <div class="phonetic-guide">[{{ phrase.phonetic }}]</div>
        </div>

        <div class="card-actions">
          <button @click="travelStore.speakPhrase(phrase)" class="btn-speak">
            🔊 Listen
          </button>

          <button @click="copyPhrase(phrase)" class="btn-copy">
            {{ copiedPhraseId === phrase.id ? '✓ Copied' : '📋 Copy' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.phrasebook-widget {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(244, 63, 94, 0.08), rgba(28, 37, 65, 0.8));
  border-color: rgba(244, 63, 94, 0.35);
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

.lang-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.lang-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.lang-btn.active {
  background: #f43f5e;
  color: #fff;
  border-color: #f43f5e;
}

.cat-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.cat-lbl { font-size: 12px; color: var(--text-muted); }

.cat-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  cursor: pointer;
}

.cat-btn.active {
  background: rgba(244, 63, 94, 0.2);
  color: #f43f5e;
  border-color: #f43f5e;
  font-weight: 700;
}

.phrases-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.phrase-card {
  padding: 16px;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card-head {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cat-tag {
  font-size: 10px;
  font-weight: 700;
  color: #f43f5e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.eng-title { font-size: 15px; font-weight: 700; color: var(--text-primary); }

.card-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: rgba(255, 255, 255, 0.03);
  padding: 10px;
  border-radius: var(--radius-sm);
}

.translated-script { font-size: 20px; font-weight: 800; color: #fff; }
.phonetic-guide { font-size: 13px; color: var(--accent-amber); font-weight: 600; }

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.btn-speak {
  flex: 1;
  padding: 6px 12px;
  background: #f43f5e;
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
}

.btn-copy {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  font-size: 12px;
  cursor: pointer;
}
</style>
