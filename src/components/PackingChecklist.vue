<!-- src/components/PackingChecklist.vue -->
<!-- Filterable Travel Packing Checklist Generator component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTravelStore, type PackingPreset, type PackingCategory } from '../stores/travelStore';

const travelStore = useTravelStore();

const activeCategory = ref<string>('All');
const searchQuery = ref<string>('');

// Form state
const newItemName = ref('');
const newItemCategory = ref<PackingCategory>('Clothing');
const newItemEssential = ref(true);

const presets: { name: PackingPreset; icon: string }[] = [
  { name: 'Urban Culture', icon: '🏙️' },
  { name: 'Beach Resort', icon: '🏖️' },
  { name: 'Alpine Hiking', icon: '🏔️' },
  { name: 'Safari', icon: '🦁' }
];

const categories: string[] = ['All', 'Documents', 'Clothing', 'Electronics', 'Toiletries', 'Gear'];

const filteredItems = computed(() => {
  return travelStore.packingItems.filter((item) => {
    const matchesCategory = activeCategory.value === 'All' || item.category === activeCategory.value;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

function handleAddItem() {
  if (newItemName.value.trim()) {
    travelStore.addCustomPackingItem(
      newItemName.value.trim(),
      newItemCategory.value,
      newItemEssential.value
    );
    newItemName.value = '';
  }
}

const getCategoryIcon = (cat: PackingCategory) => {
  switch (cat) {
    case 'Documents': return '📄';
    case 'Clothing': return '👕';
    case 'Electronics': return '🔌';
    case 'Toiletries': return '🧼';
    case 'Gear': return '🎒';
    default: return '📍';
  }
};
</script>

<template>
  <div class="packing-checklist card">
    <div class="checklist-header">
      <div>
        <h3>🧳 Smart Travel Packing Checklist</h3>
        <p class="subtitle">Customize and check off essential items tailored for your travel style.</p>
      </div>

      <div class="preset-chips">
        <button 
          v-for="p in presets" 
          :key="p.name"
          @click="travelStore.loadPackingPreset(p.name)"
          class="preset-chip-btn"
          :class="{ active: travelStore.currentPackingPreset === p.name }"
        >
          <span>{{ p.icon }}</span> {{ p.name }}
        </button>
      </div>
    </div>

    <!-- Packing Progress Bar -->
    <div class="progress-card card">
      <div class="progress-info-row">
        <span class="progress-lbl">Packing Progress</span>
        <strong class="progress-val">
          {{ travelStore.packingProgress.packed }} / {{ travelStore.packingProgress.total }} Packed ({{ travelStore.packingProgress.percentage }}%)
        </strong>
      </div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: `${travelStore.packingProgress.percentage}%` }"></div>
      </div>
    </div>

    <!-- Category Filter Tabs & Search -->
    <div class="filters-row">
      <div class="cat-tabs">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="activeCategory = cat"
          class="cat-tab-btn"
          :class="{ active: activeCategory === cat }"
        >
          {{ cat }}
        </button>
      </div>

      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Filter item name..." 
        class="search-input"
      />
    </div>

    <!-- Checklist Items Grid -->
    <div class="items-list">
      <div 
        v-for="item in filteredItems" 
        :key="item.id"
        class="packing-item-row card"
        :class="{ checked: item.checked }"
        @click="travelStore.togglePackingItem(item.id)"
      >
        <div class="checkbox-col">
          <input 
            type="checkbox" 
            :checked="item.checked" 
            @click.stop="travelStore.togglePackingItem(item.id)"
            class="item-checkbox"
          />
        </div>

        <div class="item-info">
          <span class="item-name" :class="{ strikethrough: item.checked }">
            {{ getCategoryIcon(item.category) }} {{ item.name }}
          </span>
          <span class="category-tag">{{ item.category }}</span>
        </div>

        <div class="tags-col">
          <span v-if="item.essential" class="essential-badge">REQUIRED</span>
          <button 
            @click.stop="travelStore.removePackingItem(item.id)" 
            class="delete-item-btn"
            title="Remove item"
          >
            ✕
          </button>
        </div>
      </div>

      <div v-if="filteredItems.length === 0" class="empty-items card">
        <p>No packing items found matching current filters.</p>
      </div>
    </div>

    <!-- Add Custom Item Form -->
    <form @submit.prevent="handleAddItem" class="add-item-form card">
      <div class="form-inputs">
        <input 
          v-model="newItemName" 
          type="text" 
          placeholder="+ Add custom item to checklist..." 
          required 
          class="add-input"
        />

        <select v-model="newItemCategory" class="add-select">
          <option value="Clothing">👕 Clothing</option>
          <option value="Documents">📄 Documents</option>
          <option value="Electronics">🔌 Electronics</option>
          <option value="Toiletries">🧼 Toiletries</option>
          <option value="Gear">🎒 Gear</option>
        </select>

        <label class="essential-check">
          <input type="checkbox" v-model="newItemEssential" />
          <span>Essential</span>
        </label>
      </div>

      <button type="submit" class="btn btn-primary btn-sm">Add Item</button>
    </form>
  </div>
</template>

<style scoped>
.packing-checklist {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(28, 37, 65, 0.75));
  border-color: rgba(16, 185, 129, 0.3);
}

.checklist-header {
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.checklist-header h3 { font-size: 22px; color: var(--text-primary); }
.subtitle { font-size: 14px; color: var(--text-secondary); }

.preset-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.preset-chip-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preset-chip-btn.active {
  background: var(--accent-emerald);
  color: #000;
  border-color: var(--accent-emerald);
}

.progress-card {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(0, 0, 0, 0.3);
}

.progress-info-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.progress-lbl { color: var(--text-muted); }
.progress-val { color: var(--accent-emerald); font-weight: 700; }

.progress-track {
  height: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-emerald);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.filters-row {
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.cat-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.cat-tab-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  cursor: pointer;
}

.cat-tab-btn.active {
  background: rgba(16, 185, 129, 0.2);
  border-color: var(--accent-emerald);
  color: var(--accent-emerald);
}

.search-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  outline: none;
}

.items-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
}

.packing-item-row {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.2s ease;
}

.packing-item-row:hover {
  background: rgba(255, 255, 255, 0.06);
}

.packing-item-row.checked {
  opacity: 0.65;
  background: rgba(16, 185, 129, 0.05);
}

.item-checkbox {
  width: 18px;
  height: 18px;
  accent-color: var(--accent-emerald);
  cursor: pointer;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.strikethrough {
  text-decoration: line-through;
  color: var(--text-muted);
}

.category-tag {
  font-size: 11px;
  color: var(--text-muted);
}

.tags-col {
  display: flex;
  align-items: center;
  gap: 8px;
}

.essential-badge {
  font-size: 10px;
  font-weight: 800;
  background: rgba(247, 127, 0, 0.2);
  color: var(--accent-amber);
  padding: 2px 6px;
  border-radius: 4px;
}

.delete-item-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 14px;
  cursor: pointer;
}

.delete-item-btn:hover { color: #f43f5e; }

.empty-items {
  grid-column: 1 / -1;
  padding: 24px;
  text-align: center;
  color: var(--text-muted);
}

.add-item-form {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.form-inputs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  flex: 1;
}

.add-input {
  flex: 1;
  min-width: 180px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  outline: none;
}

.add-select {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  font-size: 13px;
}

.essential-check {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-secondary);
  cursor: pointer;
}
</style>
