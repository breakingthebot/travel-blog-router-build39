// src/router/index.ts
// Vue Router 4 configuration with route definitions and scroll behavior.
// Connects to: views/*.vue, App.vue
// Created: 2026-07-25

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DestinationsView from '../views/DestinationsView.vue';
import DestinationDetailView from '../views/DestinationDetailView.vue';
import BlogPostsView from '../views/BlogPostsView.vue';
import PostDetailView from '../views/PostDetailView.vue';
import GalleryView from '../views/GalleryView.vue';
import NewsletterView from '../views/NewsletterView.vue';

export const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/destinations', name: 'Destinations', component: DestinationsView },
  { path: '/destinations/:id', name: 'DestinationDetail', component: DestinationDetailView, props: true },
  { path: '/blog', name: 'BlogPosts', component: BlogPostsView },
  { path: '/blog/:id', name: 'PostDetail', component: PostDetailView, props: true },
  { path: '/gallery', name: 'Gallery', component: GalleryView },
  { path: '/newsletter', name: 'Newsletter', component: NewsletterView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
