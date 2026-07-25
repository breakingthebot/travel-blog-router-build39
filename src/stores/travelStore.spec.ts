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

  it('should process full 4-question travel quiz, compute destination match, and reset', () => {
    const store = useTravelStore();
    expect(store.quiz.currentStep).toBe(0);

    store.answerQuizStep('culture');
    expect(store.quiz.currentStep).toBe(1);

    store.answerQuizStep('explorer');
    expect(store.quiz.currentStep).toBe(2);

    store.answerQuizStep('culture');
    expect(store.quiz.currentStep).toBe(3);

    store.answerQuizStep('culture');
    expect(store.quiz.currentStep).toBe(4); // Result screen
    expect(store.quizRecommendedDestination.name).toBe('Kyoto');

    store.resetQuiz();
    expect(store.quiz.currentStep).toBe(0);
  });

  it('should support audio guide playback, track switching, chapter seeking, and rate adjustment', () => {
    const store = useTravelStore();
    expect(store.activeAudioTrack.title).toBe('Kyoto Temple Architecture & Zen Garden Secrets');
    expect(store.isAudioPlaying).toBe(false);

    store.toggleAudioPlayback();
    expect(store.isAudioPlaying).toBe(true);

    store.selectAudioTrack('audio-2');
    expect(store.activeAudioTrack.id).toBe('audio-2');

    store.seekAudioTime(120);
    expect(store.audioCurrentTimeSeconds).toBe(120);

    store.setPlaybackRate(1.5);
    expect(store.playbackRate).toBe(1.5);
  });
});
