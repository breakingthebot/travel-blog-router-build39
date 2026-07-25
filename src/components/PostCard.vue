<!-- src/components/PostCard.vue -->
<!-- Blog post card item displaying cover image, author avatar, read time, and excerpt. -->
<!-- Connects to: stores/travelStore.ts, views/BlogPostsView.vue -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import type { BlogPost } from '../stores/travelStore';

const props = defineProps<{
  post: BlogPost;
}>();
</script>

<template>
  <div class="post-card card">
    <div class="post-img-wrapper">
      <img :src="post.coverImage" :alt="post.title" class="post-img" loading="lazy" />
      <span class="read-time-pill">⏱️ {{ post.readTimeMinutes }} min read</span>
    </div>

    <div class="post-body">
      <div class="author-row">
        <img :src="post.author.avatar" :alt="post.author.name" class="author-avatar" />
        <div class="author-meta">
          <span class="author-name">{{ post.author.name }}</span>
          <span class="pub-date">{{ post.publishedDate }}</span>
        </div>
      </div>

      <h3 class="post-title">
        <router-link :to="`/blog/${post.id}`" class="post-title-link">
          {{ post.title }}
        </router-link>
      </h3>

      <p class="post-excerpt">{{ post.excerpt }}</p>

      <div class="tags-row">
        <span v-for="tag in post.tags" :key="tag" class="tag-chip">#{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.post-img-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.post-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.post-card:hover .post-img {
  transform: scale(1.05);
}

.read-time-pill {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(11, 19, 43, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 20px;
}

.post-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.author-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--accent-amber);
}

.author-meta {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-primary);
}

.pub-date {
  font-size: 11px;
  color: var(--text-muted);
}

.post-title-link {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  transition: color 0.2s ease;
}

.post-title-link:hover {
  color: var(--accent-amber);
}

.post-excerpt {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-top: 8px;
  margin-bottom: 16px;
  flex: 1;
}

.tags-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag-chip {
  font-size: 11px;
  color: var(--accent-cyan);
  background: rgba(76, 201, 240, 0.08);
  padding: 2px 8px;
  border-radius: 12px;
}
</style>
