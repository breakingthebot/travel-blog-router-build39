<!-- src/components/TravelQuiz.vue -->
<!-- Interactive Travel Quiz & Destination Recommender component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { computed } from 'vue';
import { useTravelStore, QUIZ_QUESTIONS } from '../stores/travelStore';

const travelStore = useTravelStore();

const isResultScreen = computed(() => {
  return travelStore.quiz.currentStep >= QUIZ_QUESTIONS.length;
});

const currentQuestion = computed(() => {
  return QUIZ_QUESTIONS[travelStore.quiz.currentStep] || QUIZ_QUESTIONS[0];
});

const recommendedDest = computed(() => {
  return travelStore.quizRecommendedDestination;
});
</script>

<template>
  <div class="travel-quiz card">
    <!-- Active Quiz Question Screen -->
    <div v-if="!isResultScreen" class="quiz-step-container">
      <div class="quiz-header">
        <div class="step-badge">Question {{ travelStore.quiz.currentStep + 1 }} of {{ QUIZ_QUESTIONS.length }}</div>
        <h3>🎯 Find Your Ideal Destination</h3>
        <p class="question-text">{{ currentQuestion.question }}</p>
      </div>

      <div class="options-grid">
        <button
          v-for="opt in currentQuestion.options"
          :key="opt.label"
          @click="travelStore.answerQuizStep(opt.vibe)"
          class="option-card card"
        >
          <span class="opt-icon">{{ opt.icon }}</span>
          <span class="opt-label">{{ opt.label }}</span>
        </button>
      </div>

      <div class="progress-bar-wrap">
        <div 
          class="progress-bar-fill" 
          :style="{ width: `${((travelStore.quiz.currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Quiz Recommendation Result Screen -->
    <div v-else class="quiz-result-container">
      <div class="result-header">
        <div class="match-badge">🎉 {{ travelStore.quiz.matchScore }}% Match Found!</div>
        <h3>Your Ideal Destination Recommendation:</h3>
      </div>

      <div class="recommended-dest-card card">
        <div class="dest-image-col">
          <img :src="recommendedDest.heroImage" :alt="recommendedDest.name" class="dest-hero" />
        </div>

        <div class="dest-info-col">
          <div class="dest-meta">
            <span class="dest-region-chip">{{ recommendedDest.region }}</span>
            <span class="dest-rating">★ {{ recommendedDest.rating.toFixed(1) }}</span>
          </div>

          <h4 class="dest-name">{{ recommendedDest.name }}, {{ recommendedDest.country }}</h4>
          <p class="dest-tagline">"{{ recommendedDest.tagline }}"</p>
          <p class="dest-desc">{{ recommendedDest.description }}</p>

          <div class="result-actions">
            <router-link :to="`/destinations/${recommendedDest.id}`" class="btn btn-primary">
              Explore {{ recommendedDest.name }} Guide & Itinerary →
            </router-link>
            <button @click="travelStore.resetQuiz()" class="btn btn-secondary">
              🔄 Retake Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.travel-quiz {
  padding: 28px;
  background: linear-gradient(135deg, rgba(114, 9, 183, 0.12), rgba(28, 37, 65, 0.8));
  border-color: rgba(114, 9, 183, 0.35);

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.quiz-step-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.quiz-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  color: var(--accent-purple);
  background: rgba(114, 9, 183, 0.2);
  padding: 4px 10px;
  border-radius: 12px;
  align-self: flex-start;
  text-transform: uppercase;
}

.quiz-header h3 { font-size: 24px; color: var(--text-primary); }
.question-text { font-size: 16px; color: var(--text-secondary); }

.options-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
}

.option-card {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.option-card:hover {
  background: rgba(114, 9, 183, 0.15);
  border-color: var(--accent-purple);
  transform: translateY(-2px);
}

.opt-icon { font-size: 28px; }
.opt-label { font-size: 15px; font-weight: 600; color: var(--text-primary); }

.progress-bar-wrap {
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--accent-purple);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.quiz-result-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.match-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  color: var(--accent-amber);
  background: rgba(247, 127, 0, 0.2);
  padding: 6px 14px;
  border-radius: 16px;
  align-self: flex-start;
  margin-bottom: 4px;
}

.result-header h3 { font-size: 22px; color: var(--text-primary); }

.recommended-dest-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    grid-template-columns: 300px 1fr;
  }
}

.dest-hero {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: var(--radius-md);
}

.dest-info-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dest-meta {
  display: flex;
  gap: 10px;
  align-items: center;
}

.dest-region-chip {
  font-size: 11px;
  font-weight: 700;
  background: rgba(76, 201, 240, 0.2);
  color: var(--accent-cyan);
  padding: 3px 8px;
  border-radius: 4px;
}

.dest-rating { font-size: 13px; font-weight: 700; color: var(--accent-amber); }

.dest-name { font-size: 22px; color: var(--text-primary); }
.dest-tagline { font-size: 14px; font-style: italic; color: var(--text-secondary); }
.dest-desc { font-size: 14px; color: var(--text-muted); line-height: 1.5; }

.result-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 10px;
}
</style>
