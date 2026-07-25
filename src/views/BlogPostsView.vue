<!-- src/views/BlogPostsView.vue -->
<!-- Travel blog journal posts list view. -->
<!-- Connects to: stores/travelStore.ts, components/PostCard.vue -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { useTravelStore } from '../stores/travelStore';
import PostCard from '../components/PostCard.vue';
import OfflineReadingManager from '../components/OfflineReadingManager.vue';

const travelStore = useTravelStore();
</script>

<template>
  <div class="blog-posts-view">
    <div class="header-card card">
      <h2>📖 Travel Journal & Dispatches</h2>
      <p>Stories, guides, and photography notes written from the road.</p>
    </div>

    <div class="posts-grid">
      <!-- Saved Offline Articles Manager Section -->
    <section class="margin-bottom-calc">
      <OfflineReadingManager />
    </section>

    <!-- Posts Grid -->
      <PostCard
        v-for="post in travelStore.posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<style scoped>
.blog-posts-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
}

.header-card {
  padding: 28px;
}

.header-card h2 { font-size: 26px; color: var(--text-primary); margin-bottom: 6px; }
.header-card p { font-size: 14px; color: var(--text-secondary); }

.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .posts-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
