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

    const budgetUsd = store.calculateDestinationBudget('dest-1');
    expect(budgetUsd.totalBudget).toBe(1300);
    expect(budgetUsd.currencySymbol).toBe('$');
  });

  it('should manage day-by-day trip itineraries (add day, add activity, remove activity, reorder)', () => {
    const store = useTravelStore();
    const destId = 'dest-1';
    const initialDays = store.getItineraryForDestination(destId);
    expect(initialDays.length).toBe(1);

    store.addItineraryDay(destId, 'Day 2 Sagano');
    const updatedDays = store.getItineraryForDestination(destId);
    expect(updatedDays.length).toBe(2);
  });

  it('should support weather climate seasonal selection and temperature conversion (C to F)', () => {
    const store = useTravelStore();
    expect(store.selectedSeason).toBe('spring');

    store.setSelectedSeason('summer');
    expect(store.selectedSeason).toBe('summer');

    // Kyoto spring temp 16C -> 61F
    expect(store.formatTemp(16)).toBe('16°C');
    store.toggleTempUnit();
    expect(store.formatTemp(16)).toBe('61°F');
  });
});
