<!-- src/views/NewsletterView.vue -->
<!-- Travel Newsletter Dispatch subscription view with feedback confirmation toast. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { ref } from 'vue';

const subscriberEmail = ref('');
const subscriberName = ref('');
const subscribedSuccess = ref(false);

const handleSubscribe = () => {
  if (subscriberEmail.value.trim()) {
    subscribedSuccess.value = true;
  }
};
</script>

<template>
  <div class="newsletter-view">
    <div class="newsletter-card card">
      <div class="card-badge">📬 Weekly Travel Dispatch</div>
      <h2>Join 45,000+ Global Explorers</h2>
      <p>Receive secret destination itineraries, flight alerts, and cultural stories directly in your inbox every Thursday.</p>

      <div v-if="subscribedSuccess" class="success-banner card fade-in">
        <span class="success-icon">🎉</span>
        <h3>You are Subscribed!</h3>
        <p>Thank you <strong>{{ subscriberName || subscriberEmail }}</strong>! Check your inbox for our welcome itinerary.</p>
        <button @click="subscribedSuccess = false; subscriberEmail = ''; subscriberName = ''" class="btn btn-secondary margin-top">
          Subscribe Another Email
        </button>
      </div>

      <form v-else @submit.prevent="handleSubscribe" class="subscription-form">
        <div class="form-group">
          <label class="form-label">First Name</label>
          <input 
            v-model="subscriberName" 
            type="text" 
            placeholder="e.g. Alex" 
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Email Address *</label>
          <input 
            v-model="subscriberEmail" 
            type="email" 
            placeholder="alex@example.com" 
            class="form-input"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary full-width">
          Subscribe To Dispatch →
        </button>

        <p class="privacy-note">🔒 Zero spam. Unsubscribe at any time with one click.</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.newsletter-view {
  max-width: 650px;
  margin: 32px auto 0;
}

.newsletter-card {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  background: linear-gradient(135deg, rgba(247, 127, 0, 0.08), rgba(28, 37, 65, 0.7));
  border-color: rgba(247, 127, 0, 0.25);
}

.card-badge {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-amber);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.newsletter-card h2 {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-primary);
}

.newsletter-card p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.subscription-form {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
  text-align: left;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-family);
  outline: none;
}

.form-input:focus {
  border-color: var(--accent-amber);
}

.full-width {
  width: 100%;
  justify-content: center;
  padding: 12px;
  font-size: 15px;
}

.privacy-note {
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
}

.success-banner {
  width: 100%;
  padding: 32px;
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.success-icon { font-size: 40px; }
.success-banner h3 { font-size: 22px; color: var(--accent-emerald); }
.margin-top { margin-top: 12px; }
</style>
