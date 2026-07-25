<!-- src/components/OfflineReadingManager.vue -->
<!-- Saved Articles & Offline Reading Mode Manager component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { useTravelStore } from '../stores/travelStore';

const travelStore = useTravelStore();
</script>

<template>
  <div class="offline-manager card">
    <div class="manager-header">
      <div>
        <h3>📖 Saved Articles & Offline Reading Library</h3>
        <p class="subtitle">Access your bookmarked journal articles anytime — even without internet connectivity.</p>
      </div>

      <div class="header-actions">
        <span class="count-badge">
          {{ travelStore.savedOfflinePosts.length }} Saved Articles
        </span>

        <button 
          v-if="travelStore.savedOfflinePosts.length > 0"
          @click="travelStore.clearAllSavedOfflinePosts()" 
          class="btn btn-secondary btn-sm"
        >
          Clear All Saved
        </button>
      </div>
    </div>

    <!-- Saved Articles Grid -->
    <div v-if="travelStore.savedOfflinePosts.length > 0" class="articles-grid">
      <div 
        v-for="post in travelStore.savedOfflinePosts" 
        :key="post.id" 
        class="offline-article-card card"
      >
        <div class="card-cover">
          <img :src="post.coverImage" :alt="post.title" class="cover-img" />
          <span class="offline-badge">⚡ Offline Ready</span>
          <button 
            @click="travelStore.toggleSaveOfflinePost(post.id)" 
            class="remove-btn"
            title="Remove from offline library"
          >
            ✕
          </button>
        </div>

        <div class="card-body">
          <div class="meta-row">
            <span class="read-time">⏱️ {{ post.readTimeMinutes }} min read</span>
            <span class="date">{{ post.publishedDate }}</span>
          </div>

          <h4 class="post-title">{{ post.title }}</h4>
          <p class="post-excerpt">{{ post.excerpt }}</p>

          <!-- Reading Progress Bar -->
          <div v-if="travelStore.readingProgress[post.id]" class="progress-wrap">
            <div class="progress-lbl-row">
              <span>Reading Progress</span>
              <strong>{{ travelStore.readingProgress[post.id] }}%</strong>
            </div>
            <div class="progress-track">
              <div 
                class="progress-bar-fill" 
                :style="{ width: `${travelStore.readingProgress[post.id]}%` }"
              ></div>
            </div>
          </div>

          <div class="card-footer">
            <router-link :to="`/blog/${post.id}`" class="btn btn-primary btn-sm">
              Read Article →
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-offline card">
      <span class="empty-icon">📲</span>
      <h4>No Articles Saved for Offline Reading</h4>
      <p>Save any journal post by clicking <strong>"Save for Offline"</strong> while browsing articles.</p>
    </div>
  </div>
</template>

<style scoped>
.offline-manager {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(76, 201, 240, 0.08), rgba(28, 37, 65, 0.8));
  border-color: rgba(76, 201, 240, 0.35);
}

.manager-header {
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.manager-header h3 { font-size: 22px; color: var(--text-primary); }
.subtitle { font-size: 14px; color: var(--text-secondary); }

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.count-badge {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-cyan);
  background: rgba(76, 201, 240, 0.15);
  padding: 4px 10px;
  border-radius: 12px;
}

.articles-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
}

.offline-article-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.03);
}

.card-cover {
  position: relative;
  height: 160px;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.offline-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 11px;
  font-weight: 800;
  background: rgba(16, 185, 129, 0.9);
  color: #000;
  padding: 2px 8px;
  border-radius: 4px;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.remove-btn:hover { background: #f43f5e; }

.card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-muted);
}

.post-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.post-excerpt {
  font-size: 13px;
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.progress-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.progress-lbl-row {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--text-muted);
}

.progress-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--accent-cyan);
  border-radius: 2px;
}

.card-footer {
  margin-top: auto;
  padding-top: 8px;
}

.empty-offline {
  padding: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
}

.empty-icon { font-size: 32px; }
</style>
