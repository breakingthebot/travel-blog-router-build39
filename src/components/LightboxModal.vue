<!-- src/components/LightboxModal.vue -->
<!-- Photo gallery image lightbox modal. -->
<!-- Connects to: stores/travelStore.ts, views/GalleryView.vue -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { useTravelStore } from '../stores/travelStore';

const travelStore = useTravelStore();
</script>

<template>
  <div v-if="travelStore.activeLightboxImage" class="lightbox-overlay" @click.self="travelStore.closeLightbox">
    <div class="lightbox-card card">
      <button @click="travelStore.closeLightbox" class="close-btn">✕</button>
      <img :src="travelStore.activeLightboxImage.imageUrl" :alt="travelStore.activeLightboxImage.title" class="lightbox-img" />
      <div class="lightbox-caption">
        <h4>{{ travelStore.activeLightboxImage.title }}</h4>
        <p>📍 {{ travelStore.activeLightboxImage.location }} — Photo by {{ travelStore.activeLightboxImage.photographer }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 900;
  background: rgba(5, 8, 15, 0.9);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.lightbox-card {
  position: relative;
  max-width: 900px;
  width: 100%;
  overflow: hidden;
  padding: 0;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid var(--border-color);
  color: #fff;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 16px;
  cursor: pointer;
}

.lightbox-img {
  width: 100%;
  max-height: 70vh;
  object-fit: cover;
}

.lightbox-caption {
  padding: 16px 20px;
  background: rgba(11, 19, 43, 0.95);
}

.lightbox-caption h4 {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.lightbox-caption p {
  font-size: 13px;
  color: var(--text-secondary);
}
</style>
