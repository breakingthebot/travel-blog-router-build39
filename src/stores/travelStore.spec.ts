// src/stores/travelStore.spec.ts
// Unit tests for travelStore Pinia store.
// Created: 2026-07-25

import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTravelStore } from './travelStore';

describe('travelStore Pinia store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with destinations and filter correctly by region', () => {
    const store = useTravelStore();
    expect(store.destinations.length).toBe(4);

    store.setRegion('Europe');
    expect(store.filteredDestinations.length).toBe(2);
    expect(store.filteredDestinations[0].name).toBe('Santorini');
  });

  it('should filter destinations by keyword search query', () => {
    const store = useTravelStore();
    store.setSearchQuery('Kyoto');
    expect(store.filteredDestinations.length).toBe(1);
    expect(store.filteredDestinations[0].id).toBe('dest-1');
  });

  it('should toggle wishlist bookmark status correctly', () => {
    const store = useTravelStore();
    expect(store.savedWishlist.includes('dest-1')).toBe(false);

    store.toggleWishlist('dest-1');
    expect(store.savedWishlist.includes('dest-1')).toBe(true);

    store.toggleWishlist('dest-1');
    expect(store.savedWishlist.includes('dest-1')).toBe(false);
  });

  it('should calculate trip budget and convert currencies correctly', () => {
    const store = useTravelStore();
    store.setTripDays(10);
    store.setTravelStyle('explorer');
    store.setCurrency('USD');

    const budgetUsd = store.calculateDestinationBudget('dest-1'); // Kyoto explorer = $130/day * 10 days = $1300
    expect(budgetUsd.totalBudget).toBe(1300);
    expect(budgetUsd.currencySymbol).toBe('$');

    // Change currency to JPY (1 USD = 155 JPY)
    store.setCurrency('JPY');
    const budgetJpy = store.calculateDestinationBudget('dest-1');
    expect(budgetJpy.currencySymbol).toBe('¥');
    expect(budgetJpy.totalBudget).toBe(201500); // 1300 * 155
  });

  it('should update travel style multipliers correctly', () => {
    const store = useTravelStore();
    store.setTripDays(5);
    store.setCurrency('USD');

    store.setTravelStyle('backpacker');
    const backpackerBudget = store.calculateDestinationBudget('dest-1');
    expect(backpackerBudget.dailyCost).toBe(55);

    store.setTravelStyle('luxury');
    const luxuryBudget = store.calculateDestinationBudget('dest-1');
    expect(luxuryBudget.dailyCost).toBe(320);
  });
});
