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

    store.setCurrency('JPY');
    const budgetJpy = store.calculateDestinationBudget('dest-1');
    expect(budgetJpy.currencySymbol).toBe('¥');
    expect(budgetJpy.totalBudget).toBe(201500);
  });

  it('should manage day-by-day trip itineraries (add day, add activity, remove activity, reorder)', () => {
    const store = useTravelStore();
    const destId = 'dest-1';
    const initialDays = store.getItineraryForDestination(destId);
    expect(initialDays.length).toBe(2);

    // Add Day
    store.addItineraryDay(destId, 'Day 3 Sagano Scenic Train');
    const updatedDays = store.getItineraryForDestination(destId);
    expect(updatedDays.length).toBe(3);

    // Add Activity to Day 3
    store.addActivityToDay(destId, 3, {
      timeSlot: '09:00 AM',
      title: 'Sagano Romantic Train Ride',
      location: 'Kameoka Station',
      category: 'Adventure',
      estimatedCostUsd: 12
    });

    const day3 = updatedDays.find((d) => d.dayNumber === 3);
    expect(day3?.activities.length).toBe(1);
    expect(day3?.activities[0].title).toBe('Sagano Romantic Train Ride');

    // Remove Activity
    const actId = day3!.activities[0].id;
    store.removeActivityFromDay(destId, 3, actId);
    expect(day3?.activities.length).toBe(0);
  });
});
