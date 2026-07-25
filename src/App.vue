<!-- src/App.vue -->
<!-- Main application layout with Navbar, Footer, RouterView, and LightboxModal overlay. -->
<!-- Connects to: src/router/index.ts, src/components/Navbar.vue, src/components/Footer.vue -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import LightboxModal from './components/LightboxModal.vue';
import './assets/css/main.css';
</script>

<template>
  <div class="app-root">
    <Navbar />

    <main class="container main-content">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Footer />
    <LightboxModal />
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 16px;
  padding-bottom: 48px;
}
</style>
