<!-- src/components/EmergencyContactsWidget.vue -->
<!-- Interactive Travel Emergency Contacts & Embassy Directory component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { computed } from 'vue';
import { useTravelStore } from '../stores/travelStore';

const props = defineProps<{
  destinationId?: string;
}>();

const travelStore = useTravelStore();

const activeDestId = computed(() => props.destinationId || travelStore.activeEmergencyDestId);

const emergency = computed(() => travelStore.getEmergencyContactForDestination(activeDestId.value));
</script>

<template>
  <div class="emergency-widget card">
    <div class="widget-header">
      <div>
        <h3>🚨 Destination Emergency Contacts & Embassy Directory</h3>
        <p class="subtitle">Quick access to local police, ambulance hotlines, foreign embassies, and 24/7 hospitals.</p>
      </div>

      <!-- Destination Selector Pills -->
      <div v-if="!destinationId" class="dest-selector">
        <button 
          v-for="d in travelStore.destinations" 
          :key="d.id"
          @click="travelStore.setActiveEmergencyDestId(d.id)"
          class="dest-btn"
          :class="{ active: travelStore.activeEmergencyDestId === d.id }"
        >
          {{ d.name }}
        </button>
      </div>
    </div>

    <!-- Hotlines Grid -->
    <div class="hotlines-grid">
      <div class="hotline-card card police">
        <span class="icon">🚓</span>
        <div class="info">
          <span class="lbl">Police Hotline</span>
          <h4 class="number">{{ emergency.policeNumber }}</h4>
        </div>
        <a :href="`tel:${emergency.policeNumber}`" class="call-btn">📞 Call</a>
      </div>

      <div class="hotline-card card medical">
        <span class="icon">🚑</span>
        <div class="info">
          <span class="lbl">Ambulance & Medical</span>
          <h4 class="number">{{ emergency.ambulanceNumber }}</h4>
        </div>
        <a :href="`tel:${emergency.ambulanceNumber}`" class="call-btn">📞 Call</a>
      </div>

      <div class="hotline-card card fire">
        <span class="icon">🚒</span>
        <div class="info">
          <span class="lbl">Fire Department</span>
          <h4 class="number">{{ emergency.fireNumber }}</h4>
        </div>
        <a :href="`tel:${emergency.fireNumber}`" class="call-btn">📞 Call</a>
      </div>

      <div class="hotline-card card universal">
        <span class="icon">🆘</span>
        <div class="info">
          <span class="lbl">Universal Tourist Emergency</span>
          <h4 class="number">{{ emergency.generalEmergencyNumber }}</h4>
        </div>
        <a :href="`tel:${emergency.generalEmergencyNumber}`" class="call-btn">📞 Call</a>
      </div>
    </div>

    <div class="details-split">
      <!-- Embassies Directory -->
      <div class="embassies-card card">
        <h4>🏛️ Foreign Embassies & Consulates in {{ emergency.country }}</h4>
        <div class="embassies-list">
          <div v-for="emb in emergency.embassies" :key="emb.countryName" class="embassy-item">
            <div class="emb-head">
              <span class="emb-flag">{{ emb.flag }} {{ emb.countryName }} Embassy</span>
              <a :href="`tel:${emb.phone}`" class="emb-phone">📞 {{ emb.phone }}</a>
            </div>
            <p class="emb-addr">📍 {{ emb.address }}</p>
          </div>
        </div>
      </div>

      <!-- 24/7 International Hospitals -->
      <div class="hospitals-card card">
        <h4>🏥 Recommended 24/7 Hospitals & Medical Centers</h4>
        <div class="hospitals-list">
          <div v-for="hosp in emergency.hospitals" :key="hosp.name" class="hospital-item">
            <div class="hosp-head">
              <span class="hosp-name">{{ hosp.name }}</span>
              <span v-if="hosp.is247" class="badge-247">24/7 ER</span>
            </div>
            <p class="hosp-addr">📍 {{ hosp.address }}</p>
            <a :href="`tel:${hosp.phone}`" class="hosp-phone">📞 {{ hosp.phone }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.emergency-widget {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(15, 23, 42, 0.9));
  border-color: rgba(239, 68, 68, 0.4);
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
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}

.hotlines-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.hotline-card {
  padding: 14px;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  gap: 12px;
  border-color: rgba(239, 68, 68, 0.3);
}

.hotline-card .icon { font-size: 26px; }

.hotline-card .info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.hotline-card .lbl { font-size: 11px; color: var(--text-muted); }
.hotline-card .number { font-size: 20px; font-weight: 800; color: #ef4444; }

.call-btn {
  background: #ef4444;
  color: #fff;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 700;
  text-decoration: none;
}

.details-split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.embassies-card, .hospitals-card {
  padding: 18px;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.embassies-card h4, .hospitals-card h4 { font-size: 15px; color: var(--text-primary); }

.embassies-list, .hospitals-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.embassy-item, .hospital-item {
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.emb-head, .hosp-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.emb-flag { font-size: 13px; font-weight: 700; color: var(--text-primary); }
.emb-phone, .hosp-phone { font-size: 12px; color: #ef4444; font-weight: 700; text-decoration: none; }

.emb-addr, .hosp-addr { font-size: 11px; color: var(--text-muted); }

.badge-247 {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 10px;
}
</style>
