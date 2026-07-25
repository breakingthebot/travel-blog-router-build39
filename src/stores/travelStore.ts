// src/stores/travelStore.ts
// Pinia store managing travel destinations, blog posts, photo gallery, bookmarks, and trip budget estimation calculator.
// Connects to: views/*.vue, components/*.vue
// Created: 2026-07-25

import { defineStore } from 'pinia';

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

export type TravelStyle = 'backpacker' | 'explorer' | 'luxury';
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

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
    dailyCostsUsd: {
      backpacker: 55,
      explorer: 130,
      luxury: 320
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
    dailyCostsUsd: {
      backpacker: 75,
      explorer: 180,
      luxury: 450
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
    dailyCostsUsd: {
      backpacker: 90,
      explorer: 210,
      luxury: 520
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
    dailyCostsUsd: {
      backpacker: 110,
      explorer: 260,
      luxury: 680
    }
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
      'The morning air in Kyoto carries a quiet stillness that is difficult to find anywhere else on Earth. Standing at the entrance of Arashiyama Bamboo Grove just before sunrise, the first rays of light filter through towering green stalks.',
      'As the wind blows gently, the rustling bamboo sways in a rhythmic natural symphony. It is one of Japan\'s designated 100 Soundscapes, encouraging visitors to pause and listen to the whisper of nature.',
      'To make the most of your visit, aim to arrive by 6:30 AM before crowds arrive, allowing for peaceful photography and serene mindfulness.'
    ],
    tags: ['Japan', 'Kyoto', 'Nature', 'Photography'],
    comments: [
      { id: 'c-1', author: 'Marcus Vance', text: 'Arashiyama at dawn is truly magical! Great photos.', date: '2026-07-21' }
    ]
  },
  {
    id: 'post-2',
    title: 'Chasing Sunsets in Oia: A Guide to Santorini Island',
    slug: 'chasing-sunsets-in-oia-santorini',
    destinationId: 'dest-2',
    author: { name: 'Liam Sterling', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', role: 'Senior Photographer' },
    publishedDate: '2026-07-18',
    readTimeMinutes: 5,
    excerpt: 'Discover the secret rooftop vantage points for watching the golden Aegean sunset over Oia’s iconic blue domes.',
    coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    content: [
      'Santorini is famous worldwide for its dramatic caldera views, white cliffside buildings, and romantic evening sunsets.',
      'While the Byzantine Castle ruins draw thousands of visitors each evening, walking down the narrow cobble stone alleyways toward Ammoudi Bay reveals quieter, equally stunning perspectives.',
      'Pair your sunset view with local Assyrtiko white wine and fresh grilled octopus for an unforgettable Greek island experience.'
    ],
    tags: ['Greece', 'Island', 'Sunset', 'Culture'],
    comments: []
  }
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  { id: 'gal-1', title: 'Kyoto Red Torii Gates', location: 'Fushimi Inari, Japan', imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', photographer: 'Elena Rostova' },
  { id: 'gal-2', title: 'Oia Blue Domes', location: 'Santorini, Greece', imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', photographer: 'Liam Sterling' },
  { id: 'gal-3', title: 'Matterhorn Alpine Reflections', location: 'Zermatt, Switzerland', imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800', photographer: 'Elena Rostova' },
  { id: 'gal-4', title: 'Wild African Lioness', location: 'Serengeti, Tanzania', imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', photographer: 'Liam Sterling' }
];

export const useTravelStore = defineStore('travel', {
  state: () => ({
    destinations: INITIAL_DESTINATIONS as Destination[],
    posts: INITIAL_POSTS as BlogPost[],
    gallery: INITIAL_GALLERY as GalleryPhoto[],
    selectedRegion: 'All' as string,
    searchQuery: '' as string,
    savedWishlist: [] as string[],
    activeLightboxImage: null as GalleryPhoto | null,

    // Trip Budget Calculator State
    budgetConfig: {
      tripDays: 7 as number,
      travelStyle: 'explorer' as TravelStyle,
      currency: 'USD' as CurrencyCode
    }
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

        // Breakdown distribution: Accom 45%, Food 30%, Transport 15%, Activities 10%
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

    // Budget Calculator Actions
    setTripDays(days: number) {
      this.budgetConfig.tripDays = Math.max(1, Math.min(60, days));
    },

    setTravelStyle(style: TravelStyle) {
      this.budgetConfig.travelStyle = style;
    },

    setCurrency(curr: CurrencyCode) {
      this.budgetConfig.currency = curr;
    }
  }
});
