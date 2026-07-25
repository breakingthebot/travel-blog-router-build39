// @vitest-environment happy-dom
// src/router/index.spec.ts
// Unit tests for router definitions.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { routes } from './index';

describe('router configuration', () => {
  it('should define all 7 required multi-page routes', () => {
    expect(routes.length).toBe(7);
    const routePaths = routes.map((r) => r.path);
    expect(routePaths).toContain('/');
    expect(routePaths).toContain('/destinations');
    expect(routePaths).toContain('/destinations/:id');
    expect(routePaths).toContain('/blog');
    expect(routePaths).toContain('/blog/:id');
    expect(routePaths).toContain('/gallery');
    expect(routePaths).toContain('/newsletter');
  });
});
