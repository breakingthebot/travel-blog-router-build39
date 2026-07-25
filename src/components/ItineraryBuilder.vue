<!-- src/components/ItineraryBuilder.vue -->
<!-- Interactive Visual Trip Itinerary Builder component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTravelStore } from '../stores/travelStore';

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

const days = computed(() => {
  return travelStore.getItineraryForDestination(activeDestId.value);
});

const selectedDayNumber = ref<number>(1);

const currentDay = computed(() => {
  return days.value.find((d) => d.dayNumber === selectedDayNumber.value) || days.value[0];
});

const dayTotalCost = computed(() => {
  if (!currentDay.value) return 0;
  return currentDay.value.activities.reduce((sum, act) => sum + (act.estimatedCostUsd || 0), 0);
});

// Inline Add Activity Form State
const showAddModal = ref(false);
const newTimeSlot = ref('09:00 AM');
const newTitle = ref('');
const newLocation = ref('');
const newCategory = ref<'Culture' | 'Dining' | 'Adventure' | 'Relaxation'>('Culture');
const newCost = ref<number>(15);

function handleAddActivity() {
  if (!newTitle.value.trim() || !newLocation.value.trim()) return;

  travelStore.addActivityToDay(activeDestId.value, selectedDayNumber.value, {
    timeSlot: newTimeSlot.value.trim(),
    title: newTitle.value.trim(),
    location: newLocation.value.trim(),
    category: newCategory.value,
    estimatedCostUsd: Number(newCost.value) || 0
  });

  // Reset form
  newTitle.value = '';
  newLocation.value = '';
  newCost.value = 15;
  showAddModal.value = false;
}

function handleAddDay() {
  travelStore.addItineraryDay(activeDestId.value);
  selectedDayNumber.value = days.value.length;
}

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'Culture': return 'cat-culture';
    case 'Dining': return 'cat-dining';
    case 'Adventure': return 'cat-adventure';
    case 'Relaxation': return 'cat-relaxation';
    default: return '';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Culture': return '🏛️';
    case 'Dining': return '🍽️';
    case 'Adventure': return '🚵';
    case 'Relaxation': return '🏖️';
    default: return '📍';
  }
};
</script>

<template>
  <div class="itinerary-builder card">
    <div class="builder-header">
      <div>
        <h3>🗺️ Interactive Trip Itinerary Builder</h3>
        <p class="builder-subtitle">Plan and customize your day-by-day schedule for <strong>{{ currentDest.name }}</strong>.</p>
      </div>

      <button @click="showAddModal = true" class="btn btn-primary btn-sm">
        + Add Activity
      </button>
    </div>

    <!-- Day Selector Tabs -->
    <div class="days-bar">
      <div class="day-tabs">
        <button
          v-for="d in days"
          :key="d.dayNumber"
          @click="selectedDayNumber = d.dayNumber"
          class="day-tab-btn"
          :class="{ active: selectedDayNumber === d.dayNumber }"
        >
          Day {{ d.dayNumber }}
        </button>

        <button @click="handleAddDay" class="add-day-btn" title="Add New Day">
          + Day
        </button>
      </div>

      <div class="day-summary-cost card">
        <span class="cost-lbl">Day {{ selectedDayNumber }} Total:</span>
        <span class="cost-val">${{ dayTotalCost.toLocaleString() }} USD</span>
      </div>
    </div>

    <!-- Active Day Title Banner -->
    <div v-if="currentDay" class="day-title-banner card">
      <h4>📅 {{ currentDay.title }}</h4>
      <span class="activity-count">{{ currentDay.activities.length }} Scheduled Activities</span>
    </div>

    <!-- Timeline Activity Cards -->
    <div v-if="currentDay && currentDay.activities.length > 0" class="activities-timeline">
      <div 
        v-for="(act, index) in currentDay.activities" 
        :key="act.id" 
        class="activity-card card"
      >
        <div class="time-column">
          <span class="time-badge">{{ act.timeSlot }}</span>
          <span class="cost-tag">${{ act.estimatedCostUsd }}</span>
        </div>

        <div class="info-column">
          <div class="title-row">
            <h5 class="act-title">{{ act.title }}</h5>
            <span class="cat-chip" :class="getCategoryBadgeClass(act.category)">
              {{ getCategoryIcon(act.category) }} {{ act.category }}
            </span>
          </div>
          <p class="act-location">📍 {{ act.location }}</p>
        </div>

        <!-- Reorder & Action Controls -->
        <div class="actions-column">
          <button 
            @click="travelStore.moveActivity(activeDestId, selectedDayNumber, act.id, 'up')" 
            :disabled="index === 0"
            class="icon-btn"
            title="Move Up"
          >
            ▲
          </button>
          <button 
            @click="travelStore.moveActivity(activeDestId, selectedDayNumber, act.id, 'down')" 
            :disabled="index === currentDay.activities.length - 1"
            class="icon-btn"
            title="Move Down"
          >
            ▼
          </button>
          <button 
            @click="travelStore.removeActivityFromDay(activeDestId, selectedDayNumber, act.id)" 
            class="icon-btn delete-btn"
            title="Remove Activity"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-day card">
      <span>🏖️</span>
      <p>No activities planned for Day {{ selectedDayNumber }} yet.</p>
      <button @click="showAddModal = true" class="btn btn-secondary btn-sm margin-top-sm">
        + Add First Activity
      </button>
    </div>

    <!-- Add Activity Modal Overlay -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal-card card">
        <div class="modal-header">
          <h4>➕ Add Activity to Day {{ selectedDayNumber }}</h4>
          <button @click="showAddModal = false" class="close-btn">✕</button>
        </div>

        <form @submit.prevent="handleAddActivity" class="modal-form">
          <div class="form-row">
            <div class="form-group">
              <label>Time Slot:</label>
              <input v-model="newTimeSlot" type="text" placeholder="e.g. 09:30 AM" required class="input-field" />
            </div>

            <div class="form-group">
              <label>Category:</label>
              <select v-model="newCategory" class="input-field">
                <option value="Culture">🏛️ Culture</option>
                <option value="Dining">🍽️ Dining</option>
                <option value="Adventure">🚵 Adventure</option>
                <option value="Relaxation">🏖️ Relaxation</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Activity Title:</label>
            <input v-model="newTitle" type="text" placeholder="e.g. Zen Meditation & Garden Tour" required class="input-field" />
          </div>

          <div class="form-group">
            <label>Location:</label>
            <input v-model="newLocation" type="text" placeholder="e.g. Ryoan-ji Temple" required class="input-field" />
          </div>

          <div class="form-group">
            <label>Estimated Cost (USD $):</label>
            <input v-model.number="newCost" type="number" min="0" required class="input-field" />
          </div>

          <div class="modal-footer">
            <button type="button" @click="showAddModal = false" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Activity</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.itinerary-builder {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(76, 201, 240, 0.08), rgba(28, 37, 65, 0.75));
  border-color: rgba(76, 201, 240, 0.3);
}

.builder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.builder-header h3 { font-size: 22px; color: var(--text-primary); }
.builder-subtitle { font-size: 14px; color: var(--text-secondary); }

.days-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.day-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.day-tab-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.day-tab-btn.active {
  background: var(--accent-cyan);
  color: #000;
  border-color: var(--accent-cyan);
}

.add-day-btn {
  background: rgba(247, 127, 0, 0.15);
  border: 1px dashed var(--accent-amber);
  color: var(--accent-amber);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.day-summary-cost {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cost-lbl { font-size: 12px; color: var(--text-muted); }
.cost-val { font-size: 15px; font-weight: 800; color: var(--accent-amber); }

.day-title-banner {
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
}

.day-title-banner h4 { font-size: 16px; color: var(--text-primary); }
.activity-count { font-size: 13px; color: var(--accent-cyan); font-weight: 600; }

.activities-timeline {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-card {
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.03);
  transition: transform 0.2s ease;
}

.activity-card:hover {
  transform: translateX(4px);
}

.time-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  gap: 4px;
}

.time-badge {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-cyan);
  background: rgba(76, 201, 240, 0.15);
  padding: 3px 8px;
  border-radius: 4px;
}

.cost-tag {
  font-size: 11px;
  color: var(--text-muted);
}

.info-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.act-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
}

.cat-chip {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
}

.cat-culture { background: rgba(114, 9, 183, 0.2); color: #b5179e; }
.cat-dining { background: rgba(247, 127, 0, 0.2); color: var(--accent-amber); }
.cat-adventure { background: rgba(16, 185, 129, 0.2); color: var(--accent-emerald); }
.cat-relaxation { background: rgba(76, 201, 240, 0.2); color: var(--accent-cyan); }

.act-location { font-size: 13px; color: var(--text-secondary); }

.actions-column {
  display: flex;
  gap: 4px;
}

.icon-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
}

.icon-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.delete-btn { color: #f43f5e; border-color: rgba(244, 63, 94, 0.3); }
.delete-btn:hover { background: rgba(244, 63, 94, 0.2); }

.empty-day {
  padding: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
}

/* Modal Overlay Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-card {
  width: 100%;
  max-width: 480px;
  padding: 24px;
  background: var(--bg-card);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h4 { font-size: 18px; color: var(--text-primary); }

.close-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 18px;
  cursor: pointer;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 600;
}

.input-field {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  outline: none;
}

.input-field:focus {
  border-color: var(--accent-cyan);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}
</style>
