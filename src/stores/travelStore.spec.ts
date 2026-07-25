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

  it('should support guest travel story submission and retrieval by destination', () => {
    const store = useTravelStore();
    const initialKyotoStories = store.getStoriesForDestination('dest-1');
    expect(initialKyotoStories.length).toBe(1);

    store.submitGuestTravelStory({
      destinationId: 'dest-1',
      authorName: 'Alex Rivera',
      tripDate: '2026-07-01',
      rating: 5,
      storyTitle: 'Incredible Teahouse Experience in Gion',
      storyContent: 'We attended a traditional matcha ceremony in Gion. It was serene and educational!'
    });

    const updatedKyotoStories = store.getStoriesForDestination('dest-1');
    expect(updatedKyotoStories.length).toBe(2);
    expect(updatedKyotoStories[0].storyTitle).toBe('Incredible Teahouse Experience in Gion');
    expect(updatedKyotoStories[0].verifiedVisitor).toBe(true);
  });
});
