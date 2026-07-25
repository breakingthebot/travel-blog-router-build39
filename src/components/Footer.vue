<!-- src/components/Footer.vue -->
<!-- Site footer component. -->
<!-- Connects to: src/App.vue -->
<!-- Created: 2026-07-25 -->

<template>
  <footer class="app-footer">
    <div class="container footer-container">
      <div class="footer-brand">
        <h3>🧭 TravelPulse</h3>
        <p>Curated multi-page travel guides, cultural insights, and high-resolution photography for global wanderers.</p>
      </div>

      <div class="footer-links">
        <h4>Navigation</h4>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/destinations">Destinations</router-link></li>
          <li><router-link to="/blog">Blog Journal</router-link></li>
          <li><router-link to="/gallery">Photo Gallery</router-link></li>
          <li><router-link to="/newsletter">Newsletter</router-link></li>
        </ul>
      </div>

      <div class="footer-social">
        <h4>Connect</h4>
        <p>Subscribe to our weekly dispatch for hidden gems and travel guides.</p>
        <router-link to="/newsletter" class="btn btn-primary margin-top">Join Dispatch</router-link>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>© 2026 TravelPulse. Built with Vue 3, Vue Router 4 & Pinia.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--border-color);
  background: rgba(11, 19, 43, 0.95);
  padding-top: 48px;
  margin-top: 64px;
}

.footer-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  padding-bottom: 40px;
}

@media (min-width: 768px) {
  .footer-container {
    grid-template-columns: 2fr 1fr 1.5fr;
  }
}

.footer-brand h3 {
  font-size: 20px;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.footer-brand p {
  font-size: 14px;
  color: var(--text-secondary);
  max-width: 380px;
}

.footer-links h4, .footer-social h4 {
  font-size: 15px;
  color: var(--accent-amber);
  margin-bottom: 12px;
}

.footer-links ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--text-primary);
}

.footer-social p {
  font-size: 14px;
  color: var(--text-secondary);
}

.margin-top {
  margin-top: 12px;
}

.footer-bottom {
  border-top: 1px solid var(--border-color);
  padding: 16px 0;
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
}
</style>
