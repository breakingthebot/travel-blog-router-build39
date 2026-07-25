<!-- src/views/GalleryView.vue -->
<!-- High-res photo gallery grid with image lightbox preview trigger. -->
<!-- Connects to: stores/travelStore.ts, components/LightboxModal.vue -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { useTravelStore } from '../stores/travelStore';

const travelStore = useTravelStore();
</script>

<template>
  <div class="gallery-view">
    <div class="header-card card">
      <h2>📸 Global Photo Gallery</h2>
      <p>High-resolution travel photography captured by our editorial team. Click any photo for lightbox preview.</p>
    </div>

    <div class="gallery-grid">
      <div 
        v-for="photo in travelStore.gallery" 
        :key="photo.id" 
        @click="travelStore.openLightbox(photo)"
        class="gallery-item card"
      >
        <img :src="photo.imageUrl" :alt="photo.title" class="gallery-img" loading="lazy" />
        <div class="gallery-overlay">
          <span class="photo-title">{{ photo.title }}</span>
          <span class="photo-loc">📍 {{ photo.location }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
}

.header-card { padding: 28px; }
.header-card h2 { font-size: 26px; color: var(--text-primary); margin-bottom: 6px; }
.header-card p { font-size: 14px; color: var(--text-secondary); }

.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 640px) {
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .gallery-grid { grid-template-columns: repeat(4, 1fr); }
}

.gallery-item {
  position: relative;
  height: 240px;
  overflow: hidden;
  cursor: pointer;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-item:hover .gallery-img {
  transform: scale(1.08);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(11, 19, 43, 0.9), transparent 50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.photo-title { font-size: 15px; font-weight: 700; color: #fff; }
.photo-loc { font-size: 12px; color: var(--accent-cyan); }
</style>
