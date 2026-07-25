// src/main.ts
// Main application entry initializing Vue 3, Pinia, and Vue Router.
// Created: 2026-07-25

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount('#app');
