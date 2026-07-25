<!-- src/views/PostDetailView.vue -->
<!-- Single blog post detail view with author bio, paragraph contents, tags, and reader comments. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTravelStore } from '../stores/travelStore';

const route = useRoute();
const travelStore = useTravelStore();

const scrollProgress = ref(0);

const post = computed(() => {
  const id = route.params.id as string;
  return travelStore.posts.find((p) => p.id === id) || travelStore.posts[0];
});

const isSavedOffline = computed(() => {
  return travelStore.isPostSavedOffline(post.value.id);
});

function handleScroll() {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (totalHeight > 0) {
    const currentProgress = Math.round((window.scrollY / totalHeight) * 100);
    scrollProgress.value = currentProgress;
    travelStore.updateReadingProgress(post.value.id, currentProgress);
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const newCommentText = ref('');
const newAuthorName = ref('');

const submitComment = () => {
  if (post.value && newCommentText.value.trim()) {
    travelStore.addCommentToPost(post.value.id, newCommentText.value, newAuthorName.value);
    newCommentText.value = '';
    newAuthorName.value = '';
  }
};
</script>

<template>
  <div v-if="post" class="post-detail-page container">
    <!-- Top Reading Progress Indicator -->
    <div class="reading-progress-bar" :style="{ width: `${scrollProgress}%` }"></div>

    <router-link to="/blog" class="back-link">← Back to Journal Posts</router-link>

    <article class="post-article card">
      <div class="article-header">
        <div class="post-meta-row">
          <span class="read-badge">⏱️ {{ post.readTimeMinutes }} min read</span>
          <span class="date">{{ post.publishedDate }}</span>
          
          <button 
            @click="travelStore.toggleSaveOfflinePost(post.id)" 
            class="save-offline-btn"
            :class="{ active: isSavedOffline }"
          >
            {{ isSavedOffline ? '⚡ Saved Offline' : '📲 Save for Offline' }}
          </button>
        </div>
        <div class="author-info">
            <span class="author-name">{{ post.author.name }}</span>
            <span class="author-role">{{ post.author.role }} • {{ post.publishedDate }} • {{ post.readTimeMinutes }} min read</span>
        </div>

        <h1 class="article-title">{{ post.title }}</h1>
      </div>

      <img :src="post.coverImage" :alt="post.title" class="article-cover" />

      <div class="article-body">
        <p v-for="(pText, idx) in post.content" :key="idx" class="paragraph">
          {{ pText }}
        </p>
      </div>

      <div class="article-tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
      </div>
    </article>

    <!-- Comments Section -->
    <section class="comments-section card">
      <h3>💬 Comments ({{ post.comments.length }})</h3>

      <div class="comments-list">
        <div v-for="comment in post.comments" :key="comment.id" class="comment-item card">
          <div class="comment-header">
            <span class="comment-author">👤 {{ comment.author }}</span>
            <span class="comment-date">{{ comment.date }}</span>
          </div>
          <p class="comment-text">{{ comment.text }}</p>
        </div>

        <p v-if="post.comments.length === 0" class="no-comments">No comments yet. Be the first to share your thoughts!</p>
      </div>

      <!-- Add Comment Form -->
      <form @submit.prevent="submitComment" class="comment-form">
        <h4>Leave a Comment</h4>
        <input 
          v-model="newAuthorName" 
          type="text" 
          placeholder="Your Name (Optional)" 
          class="form-input"
        />
        <textarea 
          v-model="newCommentText" 
          placeholder="Write your comment..." 
          rows="3"
          class="form-textarea"
          required
        ></textarea>
        <button type="submit" class="btn btn-primary">Submit Comment</button>
      </form>
    </section>
  </div>
</template>

<style scoped>
.post-detail-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
}

.back-link {
  color: var(--accent-amber);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}

.article-card {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.author-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.author-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-amber);
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name { font-size: 15px; font-weight: 700; color: var(--text-primary); }
.author-role { font-size: 12px; color: var(--text-muted); }

.article-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.3;
}

.article-cover {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: var(--radius-md);
}

.article-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.paragraph {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.article-tags {
  display: flex;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.tag {
  font-size: 12px;
  color: var(--accent-cyan);
  background: rgba(76, 201, 240, 0.08);
  padding: 4px 10px;
  border-radius: 12px;
}

.comments-section {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comments-section h3 { font-size: 20px; color: var(--text-primary); }

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment-item {
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.comment-author { font-size: 13px; font-weight: 700; color: var(--accent-amber); }
.comment-date { font-size: 11px; color: var(--text-muted); }
.comment-text { font-size: 14px; color: var(--text-secondary); }
.no-comments { font-size: 14px; color: var(--text-muted); }

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.comment-form h4 { font-size: 16px; color: var(--text-primary); }

.form-input, .form-textarea {
  width: 100%;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-family);
  outline: none;
}

.form-input:focus, .form-textarea:focus {
  border-color: var(--accent-amber);
}
</style>
