<!-- src/components/Navbar.vue -->
<!-- Header navigation bar with active route indicators and brand logo. -->
<!-- Connects to: src/router/index.ts, src/App.vue -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useTravelStore } from '../stores/travelStore';

const route = useRoute();
const travelStore = useTravelStore();
</script>

<template>
  <header class="navbar-header">
    <div class="container navbar-container">
      <router-link to="/" class="brand-link">
        <span class="brand-icon">🧭</span>
        <div class="brand-info">
          <span class="brand-title">TravelPulse</span>
          <span class="brand-subtitle">Wanderlust Journal</span>
        </div>
      </router-link>

      <nav class="nav-menu">
        <router-link to="/" class="nav-link" :class="{ active: route.path === '/' }">Home</router-link>
        <router-link to="/destinations" class="nav-link" :class="{ active: route.path.startsWith('/destinations') }">Destinations</router-link>
        <router-link to="/blog" class="nav-link" :class="{ active: route.path.startsWith('/blog') }">Blog</router-link>
        <router-link to="/gallery" class="nav-link" :class="{ active: route.path === '/gallery' }">Gallery</router-link>
        <router-link to="/newsletter" class="nav-link" :class="{ active: route.path === '/newsletter' }">Newsletter</router-link>
      </nav>

      <div class="wishlist-badge-wrapper">
        <router-link to="/destinations" class="btn btn-secondary wishlist-btn">
          ❤️ Wishlist ({{ travelStore.savedWishlist.length }})
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar-header {
  border-bottom: 1px solid var(--border-color);
  background: rgba(11, 19, 43, 0.85);
  backdrop-filter: blur(16px);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 14px 0;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.brand-icon {
  font-size: 28px;
}

.brand-info {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.1;
}

.brand-subtitle {
  font-size: 11px;
  color: var(--accent-amber);
  font-weight: 600;
  letter-spacing: 0.5px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  padding: 4px 0;
}

.nav-link:hover, .nav-link.active {
  color: var(--text-primary);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent-amber);
  border-radius: 2px;
}

.wishlist-btn {
  font-size: 13px;
  padding: 8px 14px;
}
</style>
