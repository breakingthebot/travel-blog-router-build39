<!-- src/components/PassportTracker.vue -->
<!-- Interactive Travel Passport Stamp & Bucket List Badge Tracker component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { ref } from 'vue';
import { useTravelStore } from '../stores/travelStore';
import type { PassportStamp } from '../stores/travelStore';

const travelStore = useTravelStore();

const toastMessage = ref<string | null>(null);

function handleClaimStamp(stamp: PassportStamp) {
  const wasUnlocked = travelStore.isStampUnlocked(stamp.id);
  travelStore.toggleClaimStamp(stamp.id);
  
  if (!wasUnlocked) {
    toastMessage.value = `🎉 Congratulations! Unlocked "${stamp.stampName}" Passport Stamp!`;
    setTimeout(() => {
      toastMessage.value = null;
    }, 3000);
  }
}
</script>

<template>
  <div class="passport-widget card">
    <!-- Toast Feedback Alert -->
    <div v-if="toastMessage" class="toast-alert">
      {{ toastMessage }}
    </div>

    <div class="widget-header">
      <div>
        <h3>🛂 Digital Traveler Passport & Bucket List Stamps</h3>
        <p class="subtitle">Collect vintage passport stamps and gamified travel badges as you explore the world.</p>
      </div>

      <!-- Progress Meter Badge -->
      <div class="progress-badge">
        <span class="pct">{{ travelStore.passportProgress.percentage }}%</span>
        <span class="count">{{ travelStore.passportProgress.unlocked }} / {{ travelStore.passportProgress.total }} Stamps Unlocked</span>
      </div>
    </div>

    <!-- Progress Bar Track -->
    <div class="meter-bar-track">
      <div class="meter-bar-fill" :style="{ width: `${travelStore.passportProgress.percentage}%` }"></div>
    </div>

    <!-- Passport Booklet Grid -->
    <div class="stamps-grid">
      <div 
        v-for="stamp in travelStore.passportStamps" 
        :key="stamp.id"
        class="stamp-card card"
        :class="{ unlocked: travelStore.isStampUnlocked(stamp.id) }"
      >
        <div class="stamp-seal">
          <span class="seal-icon">{{ stamp.icon }}</span>
          <span class="country-badge">{{ stamp.countryCode }}</span>
        </div>

        <div class="stamp-body">
          <div class="stamp-type">{{ stamp.badgeType }}</div>
          <h4 class="stamp-title">{{ stamp.stampName }}</h4>
          <p class="stamp-desc">{{ stamp.description }}</p>
        </div>

        <button 
          @click="handleClaimStamp(stamp)" 
          class="btn-claim"
          :class="{ active: travelStore.isStampUnlocked(stamp.id) }"
        >
          {{ travelStore.isStampUnlocked(stamp.id) ? '✓ Stamp Claimed' : '🔒 Claim Stamp' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.passport-widget {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(234, 179, 8, 0.12), rgba(15, 23, 42, 0.9));
  border-color: rgba(234, 179, 8, 0.4);
  position: relative;
}

.toast-alert {
  position: absolute;
  top: -15px;
  right: 20px;
  background: #eab308;
  color: #000;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-weight: 800;
  font-size: 13px;
  box-shadow: 0 4px 15px rgba(234, 179, 8, 0.4);
  z-index: 10;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
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

.progress-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.4);
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid rgba(234, 179, 8, 0.3);
}

.progress-badge .pct { font-size: 18px; font-weight: 800; color: #eab308; }
.progress-badge .count { font-size: 12px; color: var(--text-secondary); }

.meter-bar-track {
  height: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
}

.meter-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #eab308, #f59e0b);
  border-radius: 4px;
  transition: width 0.4s ease;
}

.stamps-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stamp-card {
  padding: 18px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  border-color: rgba(255, 255, 255, 0.08);
  filter: grayscale(80%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.stamp-card.unlocked {
  filter: grayscale(0%);
  opacity: 1;
  border-color: #eab308;
  background: radial-gradient(circle at center, rgba(234, 179, 8, 0.15), rgba(0, 0, 0, 0.5));
  box-shadow: 0 0 15px rgba(234, 179, 8, 0.2);
}

.stamp-seal {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px dashed #eab308;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}

.seal-icon { font-size: 32px; }

.country-badge {
  position: absolute;
  bottom: -4px;
  right: -4px;
  background: #eab308;
  color: #000;
  font-size: 9px;
  font-weight: 800;
  padding: 1px 5px;
  border-radius: 4px;
}

.stamp-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stamp-type {
  font-size: 10px;
  font-weight: 700;
  color: #eab308;
  text-transform: uppercase;
}

.stamp-title { font-size: 16px; font-weight: 700; color: var(--text-primary); }
.stamp-desc { font-size: 12px; color: var(--text-muted); line-height: 1.4; }

.btn-claim {
  width: 100%;
  padding: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  margin-top: auto;
}

.btn-claim.active {
  background: #eab308;
  color: #000;
  border-color: #eab308;
}
</style>
