// src/stores/travelStore.ts
// Pinia store managing travel destinations, blog posts, photo gallery, bookmarks, trip budget calculator, visual trip itinerary builder, packing checklist generator, travel quiz recommender, travel map visualizer, saved offline reading manager, weather/climate guide widget, user travel story submission form, interactive audio guide player, travel expenses analytics & export tool, and destination comparison matrix tool.
// Connects to: views/*.vue, components/*.vue
// Created: 2026-07-25

import { defineStore } from 'pinia';

export interface DestinationMapCoords {
  lat: number;
  lng: number;
  svgX: number;
  svgY: number;
  flightFromNyc: string;
  flightFromLondon: string;
  distanceFromNycKm: number;
}

export type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter';

export interface DestinationClimate {
  avgTempC: Record<SeasonKey, number>;
  rainfallMm: Record<SeasonKey, number>;
  bestMonths: string;
  packingTip: string;
}

export interface GuestTravelStory {
  id: string;
  destinationId: string;
  authorName: string;
  authorAvatar: string;
  tripDate: string;
  rating: number;
  storyTitle: string;
  storyContent: string;
  userPhotoUrl?: string;
  verifiedVisitor: boolean;
}

export interface AudioChapterMarker {
  timeSeconds: number;
  title: string;
}

export interface AudioGuideTrack {
  id: string;
  destinationId: string;
  title: string;
  narrator: string;
  durationSeconds: number;
  audioUrl: string;
  description: string;
  coverImage: string;
  chapters: AudioChapterMarker[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'Europe' | 'Asia' | 'Africa' | 'Americas';
  heroImage: string;
  tagline: string;
  description: string;
  bestTimeToVisit: string;
  rating: number;
  featured?: boolean;
  dailyCostsUsd: {
    backpacker: number;
    explorer: number;
    luxury: number;
  };
  vibeTags: string[];
  coords: DestinationMapCoords;
  climate: DestinationClimate;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  destinationId: string;
  author: { name: string; avatar: string; role: string };
  publishedDate: string;
  readTimeMinutes: number;
  excerpt: string;
  coverImage: string;
  content: string[];
  tags: string[];
  comments: { id: string; author: string; text: string; date: string }[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  photographer: string;
}

export interface ItineraryActivity {
  id: string;
  timeSlot: string;
  title: string;
  location: string;
  category: 'Culture' | 'Dining' | 'Adventure' | 'Relaxation';
  estimatedCostUsd: number;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  activities: ItineraryActivity[];
}

export type PackingCategory = 'Clothing' | 'Electronics' | 'Toiletries' | 'Documents' | 'Gear';
export type PackingPreset = 'Beach Resort' | 'Alpine Hiking' | 'Urban Culture' | 'Safari';

export interface PackingItem {
  id: string;
  category: PackingCategory;
  name: string;
  essential: boolean;
  checked: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; icon: string; vibe: string; regionPref?: string; budgetPref?: string }[];
}

export type TravelStyle = 'backpacker' | 'explorer' | 'luxury';
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';
export type TempUnit = 'C' | 'F';

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rateFromUsd: number }> = {
  USD: { symbol: '$', rateFromUsd: 1.0 },
  EUR: { symbol: '€', rateFromUsd: 0.92 },
  GBP: { symbol: '£', rateFromUsd: 0.78 },
  JPY: { symbol: '¥', rateFromUsd: 155.0 }
};

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'dest-1',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    tagline: 'Ancient temples, bamboo groves & peaceful zen gardens',
    description: 'Kyoto, once the capital of Japan, is a city on the island of Honshu. It is famous for its numerous classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.',
    bestTimeToVisit: 'March to May & October to November',
    rating: 4.9,
    featured: true,
    dailyCostsUsd: { backpacker: 55, explorer: 130, luxury: 320 },
    vibeTags: ['culture', 'historic', 'temple', 'gourmet'],
    coords: { lat: 35.0116, lng: 135.7681, svgX: 84.5, svgY: 38.0, flightFromNyc: '14.5 hrs', flightFromLondon: '12.0 hrs', distanceFromNycKm: 10850 },
    climate: {
      avgTempC: { spring: 16, summer: 28, autumn: 18, winter: 5 },
      rainfallMm: { spring: 110, summer: 220, autumn: 140, winter: 50 },
      bestMonths: '🌸 March - May & 🍁 October - November',
      packingTip: 'Light jacket for spring cherry blossom evenings & comfortable walking sneakers.'
    }
  },
  {
    id: 'dest-2',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    tagline: 'Whitewashed cliffside villas & Aegean Sea sunsets',
    description: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape.',
    bestTimeToVisit: 'Late April to early November',
    rating: 4.8,
    featured: true,
    dailyCostsUsd: { backpacker: 75, explorer: 180, luxury: 450 },
    vibeTags: ['beach', 'romantic', 'sunset', 'island'],
    coords: { lat: 36.3932, lng: 25.4615, svgX: 57.0, svgY: 37.5, flightFromNyc: '10.0 hrs', flightFromLondon: '3.8 hrs', distanceFromNycKm: 8120 },
    climate: {
      avgTempC: { spring: 19, summer: 29, autumn: 22, winter: 14 },
      rainfallMm: { spring: 25, summer: 5, autumn: 45, winter: 80 },
      bestMonths: '☀️ May - October',
      packingTip: 'Sunhat, reef-safe sunscreen, sunglasses, and light breathable linen shirts.'
    }
  },
  {
    id: 'dest-3',
    name: 'Swiss Alps',
    country: 'Switzerland',
    region: 'Europe',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800',
    tagline: 'Majestic snow-capped peaks & alpine lakes',
    description: 'The Swiss Alps form part of the Alpine region of Europe, offering breathtaking glacier panoramas, mountain railways, and world-class hiking trails.',
    bestTimeToVisit: 'June to September & December to March',
    rating: 4.9,
    featured: true,
    dailyCostsUsd: { backpacker: 90, explorer: 210, luxury: 520 },
    vibeTags: ['alpine', 'hiking', 'mountain', 'nature'],
    coords: { lat: 46.5197, lng: 8.0226, svgX: 52.0, svgY: 30.0, flightFromNyc: '8.5 hrs', flightFromLondon: '1.5 hrs', distanceFromNycKm: 6380 },
    climate: {
      avgTempC: { spring: 10, summer: 22, autumn: 12, winter: -4 },
      rainfallMm: { spring: 85, summer: 130, autumn: 90, winter: 70 },
      bestMonths: '⛷️ Dec - Mar (Skiing) & 🥾 Jun - Sep (Hiking)',
      packingTip: 'Thermal base layers, waterproof ski/hiking boots, fleece jacket, and gloves.'
    }
  },
  {
    id: 'dest-4',
    name: 'Serengeti National Park',
    country: 'Tanzania',
    region: 'Africa',
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    tagline: 'The great wildlife migration & endless golden savannahs',
    description: 'The Serengeti ecosystem is a geographical region in Africa spanning northern Tanzania, famous for its massive annual migration of wildebeest and zebra.',
    bestTimeToVisit: 'January to February & June to October',
    rating: 4.9,
    dailyCostsUsd: { backpacker: 110, explorer: 260, luxury: 680 },
    vibeTags: ['wildlife', 'safari', 'nature', 'adventure'],
    coords: { lat: -2.3333, lng: 34.8333, svgX: 59.5, svgY: 62.0, flightFromNyc: '16.0 hrs', flightFromLondon: '10.5 hrs', distanceFromNycKm: 11940 },
    climate: {
      avgTempC: { spring: 26, summer: 24, autumn: 27, winter: 28 },
      rainfallMm: { spring: 140, summer: 20, autumn: 50, winter: 90 },
      bestMonths: '🦁 June - October (Great Migration)',
      packingTip: 'Neutral-colored safari clothing, 10x42 binoculars, wide-brim hat, and bug spray.'
    }
  }
];

export const INITIAL_AUDIO_TRACKS: AudioGuideTrack[] = [
  {
    id: 'audio-1',
    destinationId: 'dest-1',
    title: 'Kyoto Temple Architecture & Zen Garden Secrets',
    narrator: 'Kenji Takahashi',
    durationSeconds: 255,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    description: 'An immersive walking tour audio guide through Kyoto’s ancient wooden temples, rock gardens, and bamboo groves.',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    chapters: [
      { timeSeconds: 0, title: '00:00 - Introduction to Kyoto' },
      { timeSeconds: 60, title: '01:00 - The Philosophy of Zen Gardens' },
      { timeSeconds: 150, title: '02:30 - Walking Through Arashiyama Bamboo' },
      { timeSeconds: 210, title: '03:30 - Matcha Teahouse Traditions' }
    ]
  }
];

export const INITIAL_GUEST_STORIES: GuestTravelStory[] = [
  {
    id: 'story-1',
    destinationId: 'dest-1',
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    tripDate: '2026-06-14',
    rating: 5,
    storyTitle: 'Watching Dawn Break at Fushimi Inari',
    storyContent: 'Walking through the red torii gates at 6 AM before the crowds arrived was pure magic.',
    userPhotoUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    verifiedVisitor: true
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'A Morning Walk Through Arashiyama Bamboo Grove in Kyoto',
    slug: 'morning-walk-arashiyama-bamboo-grove',
    destinationId: 'dest-1',
    author: { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', role: 'Chief Travel Editor' },
    publishedDate: '2026-07-20',
    readTimeMinutes: 6,
    excerpt: 'Stepping into the towering green bamboo stalks at dawn feels like walking into an otherworldly cathedral of nature.',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    content: [
      'The morning air in Kyoto carries a quiet stillness that is difficult to find anywhere else on Earth.'
    ],
    tags: ['Japan', 'Kyoto', 'Nature'],
    comments: []
  }
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  { id: 'gal-1', title: 'Kyoto Red Torii Gates', location: 'Fushimi Inari, Japan', imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', photographer: 'Elena Rostova' }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is your ideal travel atmosphere & scenery?',
    options: [
      { label: 'Ancient Temples & Cultural Heritage', icon: '🏛️', vibe: 'culture' },
      { label: 'Sun-kissed Beaches & Cliffside Villas', icon: '🏖️', vibe: 'beach' },
      { label: 'Majestic Snowy Mountains & Alpine Lakes', icon: '🏔️', vibe: 'alpine' },
      { label: 'Endless Golden Savannahs & Wildlife Safaris', icon: '🦁', vibe: 'wildlife' }
    ]
  }
];

export const PRESET_PACKING_ITEMS: Record<PackingPreset, PackingItem[]> = {
  'Urban Culture': [
    { id: 'p-1', category: 'Documents', name: 'Passport & Visa Copies', essential: true, checked: false }
  ],
  'Beach Resort': [
    { id: 'p-11', category: 'Clothing', name: 'Swimwear & Cover-ups', essential: true, checked: false }
  ],
  'Alpine Hiking': [
    { id: 'p-21', category: 'Gear', name: 'Waterproof Hiking Boots & Wool Socks', essential: true, checked: false }
  ],
  'Safari': [
    { id: 'p-31', category: 'Clothing', name: 'Neutral Earth-Tone Clothing', essential: true, checked: false }
  ]
};

export const DEFAULT_ITINERARIES: Record<string, ItineraryDay[]> = {
  'dest-1': [
    {
      dayNumber: 1,
      title: 'Eastern Kyoto Temples & Gion District',
      activities: [
        { id: 'act-101', timeSlot: '07:30 AM', title: 'Fushimi Inari Torii Gate Trail Hike', location: 'Southern Kyoto', category: 'Culture', estimatedCostUsd: 0 }
      ]
    }
  ]
};

export const useTravelStore = defineStore('travel', {
  state: () => ({
    destinations: INITIAL_DESTINATIONS as Destination[],
    posts: INITIAL_POSTS as BlogPost[],
    gallery: INITIAL_GALLERY as GalleryPhoto[],
    guestStories: INITIAL_GUEST_STORIES as GuestTravelStory[],
    audioTracks: INITIAL_AUDIO_TRACKS as AudioGuideTrack[],
    selectedRegion: 'All' as string,
    searchQuery: '' as string,
    savedWishlist: [] as string[],
    activeLightboxImage: null as GalleryPhoto | null,

    budgetConfig: {
      tripDays: 7 as number,
      travelStyle: 'explorer' as TravelStyle,
      currency: 'USD' as CurrencyCode
    },

    itineraries: DEFAULT_ITINERARIES as Record<string, ItineraryDay[]>,
    currentPackingPreset: 'Urban Culture' as PackingPreset,
    packingItems: JSON.parse(JSON.stringify(PRESET_PACKING_ITEMS['Urban Culture'])) as PackingItem[],

    quiz: {
      currentStep: 0 as number,
      selectedVibes: [] as string[],
      recommendedDestId: null as string | null,
      matchScore: 95 as number
    },

    activeMapDestId: 'dest-1' as string,
    selectedOriginHub: 'NYC' as 'NYC' | 'London',

    savedOfflinePostIds: ['post-1'] as string[],
    readingProgress: {} as Record<string, number>,

    selectedSeason: 'spring' as SeasonKey,
    tempUnit: 'C' as TempUnit,

    activeAudioTrackId: 'audio-1' as string,
    isAudioPlaying: false as boolean,
    audioCurrentTimeSeconds: 0 as number,
    playbackRate: 1.0 as number,

    // Destination Comparator State
    compareDestIdA: 'dest-1' as string,
    compareDestIdB: 'dest-2' as string
  }),

  getters: {
    filteredDestinations: (state) => {
      return state.destinations.filter((d) => {
        const matchesRegion = state.selectedRegion === 'All' || d.region === state.selectedRegion;
        const matchesSearch = 
          d.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          d.country.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          d.description.toLowerCase().includes(state.searchQuery.toLowerCase());
        return matchesRegion && matchesSearch;
      });
    },

    featuredDestinations: (state) => {
      return state.destinations.filter((d) => d.featured);
    },

    calculateDestinationBudget: (state) => {
      return (destId: string) => {
        const dest = state.destinations.find((d) => d.id === destId) || state.destinations[0];
        const style = state.budgetConfig.travelStyle;
        const days = state.budgetConfig.tripDays;
        const curr = state.budgetConfig.currency;
        const rateInfo = CURRENCY_RATES[curr];

        const dailyUsd = dest.dailyCostsUsd[style];
        const totalUsd = dailyUsd * days;
        const convertedDaily = dailyUsd * rateInfo.rateFromUsd;
        const convertedTotal = totalUsd * rateInfo.rateFromUsd;

        return {
          currencySymbol: rateInfo.symbol,
          currencyCode: curr,
          dailyCost: Math.round(convertedDaily),
          totalBudget: Math.round(convertedTotal),
          breakdown: {
            accommodation: Math.round(convertedTotal * 0.45),
            dining: Math.round(convertedTotal * 0.30),
            transport: Math.round(convertedTotal * 0.15),
            activities: Math.round(convertedTotal * 0.10)
          }
        };
      };
    },

    getItineraryForDestination: (state) => {
      return (destId: string): ItineraryDay[] => {
        if (!state.itineraries[destId]) {
          state.itineraries[destId] = [
            {
              dayNumber: 1,
              title: 'Day 1 Exploration',
              activities: [
                { id: `act-${Date.now()}`, timeSlot: '09:00 AM', title: 'City Orientation Walk', location: 'City Center', category: 'Culture', estimatedCostUsd: 0 }
              ]
            }
          ];
        }
        return state.itineraries[destId];
      };
    },

    packingProgress: (state) => {
      if (state.packingItems.length === 0) return { packed: 0, total: 0, percentage: 0 };
      const checked = state.packingItems.filter((i) => i.checked).length;
      const total = state.packingItems.length;
      return {
        packed: checked,
        total,
        percentage: Math.round((checked / total) * 100)
      };
    },

    quizRecommendedDestination: (state) => {
      if (!state.quiz.recommendedDestId) return state.destinations[0];
      return state.destinations.find((d) => d.id === state.quiz.recommendedDestId) || state.destinations[0];
    },

    activeMapDestination: (state) => {
      return state.destinations.find((d) => d.id === state.activeMapDestId) || state.destinations[0];
    },

    savedOfflinePosts: (state) => {
      return state.posts.filter((p) => state.savedOfflinePostIds.includes(p.id));
    },

    formatTemp: (state) => {
      return (tempC: number): string => {
        if (state.tempUnit === 'F') {
          const tempF = Math.round((tempC * 9 / 5) + 32);
          return `${tempF}°F`;
        }
        return `${tempC}°C`;
      };
    },

    getStoriesForDestination: (state) => {
      return (destId?: string) => {
        if (!destId) return state.guestStories;
        return state.guestStories.filter((s) => s.destinationId === destId);
      };
    },

    getAudioTracksForDestination: (state) => {
      return (destId?: string) => {
        if (!destId) return state.audioTracks;
        return state.audioTracks.filter((a) => a.destinationId === destId);
      };
    },

    activeAudioTrack: (state) => {
      return state.audioTracks.find((a) => a.id === state.activeAudioTrackId) || state.audioTracks[0];
    },

    compareDestinationA: (state) => {
      return state.destinations.find((d) => d.id === state.compareDestIdA) || state.destinations[0];
    },

    compareDestinationB: (state) => {
      return state.destinations.find((d) => d.id === state.compareDestIdB) || state.destinations[1];
    }
  },

  actions: {
    setRegion(region: string) {
      this.selectedRegion = region;
    },

    setSearchQuery(query: string) {
      this.searchQuery = query;
    },

    toggleWishlist(destId: string) {
      const idx = this.savedWishlist.indexOf(destId);
      if (idx > -1) {
        this.savedWishlist.splice(idx, 1);
      } else {
        this.savedWishlist.push(destId);
      }
    },

    addCommentToPost(postId: string, commentText: string, authorName: string) {
      const post = this.posts.find((p) => p.id === postId);
      if (post && commentText.trim()) {
        post.comments.push({
          id: `c-${Date.now()}`,
          author: authorName || 'Fellow Traveler',
          text: commentText.trim(),
          date: new Date().toISOString().split('T')[0]
        });
      }
    },

    openLightbox(photo: GalleryPhoto) {
      this.activeLightboxImage = photo;
    },

    closeLightbox() {
      this.activeLightboxImage = null;
    },

    setTripDays(days: number) {
      this.budgetConfig.tripDays = Math.max(1, Math.min(60, days));
    },

    setTravelStyle(style: TravelStyle) {
      this.budgetConfig.travelStyle = style;
    },

    setCurrency(curr: CurrencyCode) {
      this.budgetConfig.currency = curr;
    },

    addItineraryDay(destId: string, dayTitle?: string) {
      const days = this.getItineraryForDestination(destId);
      const nextDayNumber = days.length + 1;
      days.push({
        dayNumber: nextDayNumber,
        title: dayTitle || `Day ${nextDayNumber} Highlights`,
        activities: []
      });
    },

    addActivityToDay(destId: string, dayNumber: number, activity: Omit<ItineraryActivity, 'id'>) {
      const days = this.getItineraryForDestination(destId);
      const targetDay = days.find((d) => d.dayNumber === dayNumber);
      if (targetDay) {
        targetDay.activities.push({
          ...activity,
          id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
        });
      }
    },

    removeActivityFromDay(destId: string, dayNumber: number, activityId: string) {
      const days = this.getItineraryForDestination(destId);
      const targetDay = days.find((d) => d.dayNumber === dayNumber);
      if (targetDay) {
        const idx = targetDay.activities.findIndex((a) => a.id === activityId);
        if (idx > -1) {
          targetDay.activities.splice(idx, 1);
        }
      }
    },

    moveActivity(destId: string, dayNumber: number, activityId: string, direction: 'up' | 'down') {
      const days = this.getItineraryForDestination(destId);
      const targetDay = days.find((d) => d.dayNumber === dayNumber);
      if (targetDay) {
        const idx = targetDay.activities.findIndex((a) => a.id === activityId);
        if (idx === -1) return;
        const newIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (newIdx >= 0 && newIdx < targetDay.activities.length) {
          const item = targetDay.activities.splice(idx, 1)[0];
          targetDay.activities.splice(newIdx, 0, item);
        }
      }
    },

    loadPackingPreset(preset: PackingPreset) {
      this.currentPackingPreset = preset;
      if (PRESET_PACKING_ITEMS[preset]) {
        this.packingItems = JSON.parse(JSON.stringify(PRESET_PACKING_ITEMS[preset]));
      }
    },

    togglePackingItem(itemId: string) {
      const item = this.packingItems.find((i) => i.id === itemId);
      if (item) {
        item.checked = !item.checked;
      }
    },

    addCustomPackingItem(name: string, category: PackingCategory, essential: boolean) {
      if (name.trim()) {
        this.packingItems.push({
          id: `p-${Date.now()}`,
          name: name.trim(),
          category,
          essential,
          checked: false
        });
      }
    },

    removePackingItem(itemId: string) {
      const idx = this.packingItems.findIndex((i) => i.id === itemId);
      if (idx > -1) {
        this.packingItems.splice(idx, 1);
      }
    },

    resetPackingList() {
      this.loadPackingPreset(this.currentPackingPreset);
    },

    answerQuizStep(vibe: string) {
      this.quiz.selectedVibes.push(vibe);
      if (this.quiz.currentStep < QUIZ_QUESTIONS.length - 1) {
        this.quiz.currentStep++;
      } else {
        this.calculateQuizRecommendation();
      }
    },

    calculateQuizRecommendation() {
      let bestMatch = this.destinations[0];
      let maxScore = -1;

      this.destinations.forEach((dest) => {
        let score = 0;
        dest.vibeTags.forEach((v) => {
          if (this.quiz.selectedVibes.includes(v)) {
            score += 1;
          }
        });

        if (score > maxScore) {
          maxScore = score;
          bestMatch = dest;
        }
      });

      this.quiz.recommendedDestId = bestMatch.id;
      this.quiz.matchScore = Math.min(98, 85 + (maxScore * 4));
      this.quiz.currentStep = QUIZ_QUESTIONS.length;
    },

    resetQuiz() {
      this.quiz.currentStep = 0;
      this.quiz.selectedVibes = [];
      this.quiz.recommendedDestId = null;
    },

    setActiveMapDestination(destId: string) {
      this.activeMapDestId = destId;
    },

    setOriginHub(hub: 'NYC' | 'London') {
      this.selectedOriginHub = hub;
    },

    toggleSaveOfflinePost(postId: string) {
      const idx = this.savedOfflinePostIds.indexOf(postId);
      if (idx > -1) {
        this.savedOfflinePostIds.splice(idx, 1);
      } else {
        this.savedOfflinePostIds.push(postId);
      }
    },

    isPostSavedOffline(postId: string): boolean {
      return this.savedOfflinePostIds.includes(postId);
    },

    updateReadingProgress(postId: string, progress: number) {
      this.readingProgress[postId] = Math.min(100, Math.max(0, Math.round(progress)));
    },

    clearAllSavedOfflinePosts() {
      this.savedOfflinePostIds = [];
    },

    setSelectedSeason(season: SeasonKey) {
      this.selectedSeason = season;
    },

    toggleTempUnit() {
      this.tempUnit = this.tempUnit === 'C' ? 'F' : 'C';
    },

    submitGuestTravelStory(story: {
      destinationId: string;
      authorName: string;
      tripDate: string;
      rating: number;
      storyTitle: string;
      storyContent: string;
      userPhotoUrl?: string;
    }) {
      const newStory: GuestTravelStory = {
        id: `story-${Date.now()}`,
        destinationId: story.destinationId,
        authorName: story.authorName || 'Anonymous Traveler',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        tripDate: story.tripDate || new Date().toISOString().split('T')[0],
        rating: Math.max(1, Math.min(5, story.rating)),
        storyTitle: story.storyTitle.trim(),
        storyContent: story.storyContent.trim(),
        userPhotoUrl: story.userPhotoUrl || undefined,
        verifiedVisitor: true
      };

      this.guestStories.unshift(newStory);
    },

    selectAudioTrack(trackId: string) {
      this.activeAudioTrackId = trackId;
      this.audioCurrentTimeSeconds = 0;
      this.isAudioPlaying = true;
    },

    toggleAudioPlayback() {
      this.isAudioPlaying = !this.isAudioPlaying;
    },

    seekAudioTime(seconds: number) {
      this.audioCurrentTimeSeconds = seconds;
    },

    setPlaybackRate(rate: number) {
      this.playbackRate = rate;
    },

    exportItineraryCsv(destId: string): string {
      const dest = this.destinations.find((d) => d.id === destId) || this.destinations[0];
      const days = this.getItineraryForDestination(destId);
      
      let csv = `Destination,Day Number,Day Title,Time Slot,Activity Title,Location,Category,Estimated Cost (USD)\n`;
      days.forEach((d) => {
        d.activities.forEach((act) => {
          csv += `"${dest.name}","Day ${d.dayNumber}","${d.title}","${act.timeSlot}","${act.title}","${act.location}","${act.category}",${act.estimatedCostUsd}\n`;
        });
      });
      return csv;
    },

    exportBudgetJson(destId: string): string {
      const dest = this.destinations.find((d) => d.id === destId) || this.destinations[0];
      const budget = this.calculateDestinationBudget(destId);

      const payload = {
        exportDate: new Date().toISOString(),
        destination: { id: dest.id, name: dest.name, country: dest.country, region: dest.region },
        tripDurationDays: this.budgetConfig.tripDays,
        travelStyle: this.budgetConfig.travelStyle,
        currency: budget.currencyCode,
        dailyCost: budget.dailyCost,
        totalBudget: budget.totalBudget,
        expenseBreakdown: budget.breakdown
      };
      return JSON.stringify(payload, null, 2);
    },

    exportPackingListCsv(): string {
      let csv = `Preset,Category,Item Name,Essential,Packed\n`;
      this.packingItems.forEach((item) => {
        csv += `"${this.currentPackingPreset}","${item.category}","${item.name}",${item.essential ? 'Yes' : 'No'},${item.checked ? 'Yes' : 'No'}\n`;
      });
      return csv;
    },

    // Destination Comparator Actions
    setCompareDestinationA(destId: string) {
      this.compareDestIdA = destId;
    },

    setCompareDestinationB(destId: string) {
      this.compareDestIdB = destId;
    },

    swapCompareDestinations() {
      const temp = this.compareDestIdA;
      this.compareDestIdA = this.compareDestIdB;
      this.compareDestIdB = temp;
    }
  }
});
