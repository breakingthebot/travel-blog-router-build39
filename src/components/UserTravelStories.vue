<!-- src/components/UserTravelStories.vue -->
<!-- User Travel Story & Guest Photo Submission Form component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTravelStore } from '../stores/travelStore';

const props = defineProps<{
  destinationId?: string;
}>();

const travelStore = useTravelStore();

const showForm = ref(false);
const authorName = ref('');
const selectedDestId = ref(props.destinationId || 'dest-1');
const rating = ref(5);
const tripDate = ref(new Date().toISOString().split('T')[0]);
const storyTitle = ref('');
const storyContent = ref('');
const userPhotoUrl = ref('');
const formSubmitted = ref(false);

const stories = computed(() => {
  return travelStore.getStoriesForDestination(props.destinationId);
});

function handleSubmit() {
  if (!storyTitle.value.trim() || !storyContent.value.trim()) return;

  travelStore.submitGuestTravelStory({
    destinationId: props.destinationId || selectedDestId.value,
    authorName: authorName.value.trim() || 'Anonymous Explorer',
    tripDate: tripDate.value,
    rating: rating.value,
    storyTitle: storyTitle.value.trim(),
    storyContent: storyContent.value.trim(),
    userPhotoUrl: userPhotoUrl.value.trim() || undefined
  });

  // Reset Form
  authorName.value = '';
  storyTitle.value = '';
  storyContent.value = '';
  userPhotoUrl.value = '';
  formSubmitted.value = true;
  showForm.value = false;

  setTimeout(() => {
    formSubmitted.value = false;
  }, 4000);
}
</script>

<template>
  <div class="user-stories-section card">
    <div class="section-header">
      <div>
        <h3>💬 Reader Travel Stories & Photo Reviews</h3>
        <p class="subtitle">Real experiences, tips, and photos shared by fellow travelers.</p>
      </div>

      <button @click="showForm = !showForm" class="btn btn-primary btn-sm">
        {{ showForm ? 'Cancel Submission' : '✍️ Share Your Travel Story' }}
      </button>
    </div>

    <!-- Success Toast Notification -->
    <div v-if="formSubmitted" class="toast-success card">
      🎉 Thank you! Your travel story and photo have been published to the guide.
    </div>

    <!-- Story Submission Form Container -->
    <div v-if="showForm" class="story-form-card card">
      <h4>✍️ Share Your Experience</h4>
      
      <form @submit.prevent="handleSubmit" class="form-grid">
        <div v-if="!destinationId" class="form-group">
          <label class="form-label">Select Destination</label>
          <select v-model="selectedDestId" class="form-input">
            <option v-for="d in travelStore.destinations" :key="d.id" :value="d.id">
              {{ d.name }}, {{ d.country }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Your Name</label>
          <input v-model="authorName" type="text" placeholder="e.g. Marcus Vance" class="form-input" required />
        </div>

        <div class="form-group">
          <label class="form-label">Trip Date</label>
          <input v-model="tripDate" type="date" class="form-input" required />
        </div>

        <div class="form-group">
          <label class="form-label">Star Rating</label>
          <div class="star-rating-picker">
            <button 
              v-for="star in [1, 2, 3, 4, 5]" 
              :key="star"
              type="button" 
              @click="rating = star"
              class="star-btn"
              :class="{ active: star <= rating }"
            >
              ★
            </button>
          </div>
        </div>

        <div class="form-group full-width">
          <label class="form-label">Story Headline</label>
          <input v-model="storyTitle" type="text" placeholder="e.g. Watching Sunrise at Fushimi Inari" class="form-input" required />
        </div>

        <div class="form-group full-width">
          <label class="form-label">Story & Travel Highlights</label>
          <textarea v-model="storyContent" rows="4" placeholder="Describe your experience, secret tips, or recommendations..." class="form-input" required></textarea>
        </div>

        <div class="form-group full-width">
          <label class="form-label">Photo URL (Optional)</label>
          <input v-model="userPhotoUrl" type="url" placeholder="https://images.unsplash.com/..." class="form-input" />
        </div>

        <div class="form-actions full-width">
          <button type="submit" class="btn btn-primary">
            Publish Story & Photo →
          </button>
        </div>
      </form>
    </div>

    <!-- Stories List -->
    <div v-if="stories.length > 0" class="stories-list">
      <div v-for="story in stories" :key="story.id" class="story-card card">
        <div class="story-card-header">
          <div class="author-row">
            <img :src="story.authorAvatar" :alt="story.authorName" class="avatar-img" />
            <div>
              <div class="author-name-row">
                <strong>{{ story.authorName }}</strong>
                <span v-if="story.verifiedVisitor" class="verified-badge">✓ Verified Visitor</span>
              </div>
              <span class="trip-date">Visited in {{ story.tripDate }}</span>
            </div>
          </div>

          <div class="stars-row">
            <span v-for="s in 5" :key="s" class="star" :class="{ filled: s <= story.rating }">★</span>
          </div>
        </div>

        <div class="story-body">
          <h4 class="story-title">{{ story.storyTitle }}</h4>
          <p class="story-content">{{ story.storyContent }}</p>

          <div v-if="story.userPhotoUrl" class="story-photo-wrap">
            <img :src="story.userPhotoUrl" :alt="story.storyTitle" class="story-photo" />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-stories card">
      <span class="empty-icon">💬</span>
      <p>No traveler stories published yet for this destination. Be the first to share your experience!</p>
    </div>
  </div>
</template>

<style scoped>
.user-stories-section {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(114, 9, 183, 0.08), rgba(28, 37, 65, 0.8));
  border-color: rgba(114, 9, 183, 0.35);
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.section-header h3 { font-size: 22px; color: var(--text-primary); }
.subtitle { font-size: 14px; color: var(--text-secondary); }

.toast-success {
  padding: 14px 20px;
  background: rgba(16, 185, 129, 0.2);
  border-color: #10b981;
  color: #10b981;
  font-weight: 600;
  font-size: 14px;
}

.story-form-card {
  padding: 20px;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.story-form-card h4 { font-size: 18px; color: var(--text-primary); }

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
}

.full-width {
  grid-column: 1 / -1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label { font-size: 12px; font-weight: 600; color: var(--text-secondary); }

.form-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  font-size: 14px;
}

.star-rating-picker {
  display: flex;
  gap: 6px;
}

.star-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: color 0.15s ease;
}

.star-btn.active { color: var(--accent-amber); }

.stories-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.story-card {
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.story-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.author-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-name-row strong { color: var(--text-primary); font-size: 15px; }

.verified-badge {
  font-size: 10px;
  font-weight: 700;
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  padding: 2px 6px;
  border-radius: 4px;
}

.trip-date { font-size: 12px; color: var(--text-muted); }

.stars-row { display: flex; gap: 2px; }
.star { font-size: 16px; color: rgba(255, 255, 255, 0.2); }
.star.filled { color: var(--accent-amber); }

.story-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; }
.story-content { font-size: 14px; color: var(--text-secondary); line-height: 1.5; }

.story-photo-wrap {
  margin-top: 12px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  max-height: 240px;
}

.story-photo {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.empty-stories {
  padding: 32px;
  text-align: center;
  color: var(--text-muted);
}
</style>
