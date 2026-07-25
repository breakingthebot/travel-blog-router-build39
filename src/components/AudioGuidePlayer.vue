<!-- src/components/AudioGuidePlayer.vue -->
<!-- Interactive Travel Audio Guide & Podcast Player Widget component. -->
<!-- Connects to: stores/travelStore.ts -->
<!-- Created: 2026-07-25 -->

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useTravelStore } from '../stores/travelStore';

const props = defineProps<{
  destinationId?: string;
}>();

const travelStore = useTravelStore();

const audioRef = ref<HTMLAudioElement | null>(null);

const tracks = computed(() => {
  return travelStore.getAudioTracksForDestination(props.destinationId);
});

const currentTrack = computed(() => {
  return travelStore.activeAudioTrack;
});

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

watch(() => travelStore.isAudioPlaying, (playing) => {
  if (!audioRef.value) return;
  if (playing) {
    audioRef.value.play().catch(() => {});
  } else {
    audioRef.value.pause();
  }
});

watch(() => travelStore.playbackRate, (rate) => {
  if (audioRef.value) {
    audioRef.value.playbackRate = rate;
  }
});

function onTimeUpdate() {
  if (audioRef.value) {
    travelStore.audioCurrentTimeSeconds = audioRef.value.currentTime;
  }
}

function handleScrub(e: Event) {
  const target = e.target as HTMLInputElement;
  const val = Number(target.value);
  travelStore.seekAudioTime(val);
  if (audioRef.value) {
    audioRef.value.currentTime = val;
  }
}
</script>

<template>
  <div class="audio-guide-widget card">
    <div class="widget-header">
      <div>
        <h3>🎧 Immersive Walking Audio Guides</h3>
        <p class="subtitle">Listen to narrated walking tours, historical background, and local soundscapes.</p>
      </div>

      <div class="speed-picker">
        <span class="lbl">Speed:</span>
        <button 
          v-for="rate in [1.0, 1.25, 1.5, 2.0]" 
          :key="rate"
          @click="travelStore.setPlaybackRate(rate)"
          class="rate-btn"
          :class="{ active: travelStore.playbackRate === rate }"
        >
          {{ rate }}x
        </button>
      </div>
    </div>

    <!-- Hidden Native Audio Element -->
    <audio 
      ref="audioRef"
      :src="currentTrack.audioUrl" 
      @timeupdate="onTimeUpdate"
      @ended="travelStore.isAudioPlaying = false"
    ></audio>

    <!-- Active Player Control Console -->
    <div class="player-console card">
      <img :src="currentTrack.coverImage" :alt="currentTrack.title" class="track-cover" />

      <div class="console-body">
        <div class="track-info">
          <span class="narrator-chip">Narrator: {{ currentTrack.narrator }}</span>
          <h4 class="track-title">{{ currentTrack.title }}</h4>
          <p class="track-desc">{{ currentTrack.description }}</p>
        </div>

        <!-- Scrubber Bar -->
        <div class="scrubber-row">
          <span class="time-lbl">{{ formatTime(travelStore.audioCurrentTimeSeconds) }}</span>
          <input 
            type="range" 
            min="0" 
            :max="currentTrack.durationSeconds" 
            :value="travelStore.audioCurrentTimeSeconds"
            @input="handleScrub"
            class="scrubber-input"
          />
          <span class="time-lbl">{{ formatTime(currentTrack.durationSeconds) }}</span>
        </div>

        <!-- Playback Controls -->
        <div class="controls-row">
          <button @click="travelStore.toggleAudioPlayback()" class="btn-play">
            {{ travelStore.isAudioPlaying ? '⏸️ Pause Guide' : '▶️ Play Audio Guide' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Chapter Jump Markers -->
    <div v-if="currentTrack.chapters.length > 0" class="chapters-card card">
      <h4>📍 Audio Chapter Markers</h4>
      <div class="chapters-list">
        <button 
          v-for="ch in currentTrack.chapters" 
          :key="ch.timeSeconds"
          @click="travelStore.seekAudioTime(ch.timeSeconds); if (audioRef) audioRef.currentTime = ch.timeSeconds;"
          class="chapter-btn"
        >
          {{ ch.title }}
        </button>
      </div>
    </div>

    <!-- Available Tracks List -->
    <div class="tracks-list-card card">
      <h4>📻 Select Audio Guide Track</h4>
      <div class="tracks-grid">
        <div 
          v-for="t in tracks" 
          :key="t.id"
          @click="travelStore.selectAudioTrack(t.id)"
          class="track-item card"
          :class="{ active: t.id === currentTrack.id }"
        >
          <img :src="t.coverImage" :alt="t.title" class="item-img" />
          <div class="item-info">
            <h5 class="item-title">{{ t.title }}</h5>
            <span class="item-dur">⏱️ {{ formatTime(t.durationSeconds) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.audio-guide-widget {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, rgba(76, 201, 240, 0.08), rgba(28, 37, 65, 0.8));
  border-color: rgba(76, 201, 240, 0.35);
}

.widget-header {
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.widget-header h3 { font-size: 22px; color: var(--text-primary); }
.subtitle { font-size: 14px; color: var(--text-secondary); }

.speed-picker {
  display: flex;
  align-items: center;
  gap: 6px;
}

.speed-picker .lbl { font-size: 12px; color: var(--text-muted); }

.rate-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  cursor: pointer;
}

.rate-btn.active {
  background: var(--accent-cyan);
  color: #000;
  border-color: var(--accent-cyan);
  font-weight: 700;
}

.player-console {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.35);

  @media (min-width: 640px) {
    grid-template-columns: 180px 1fr;
  }
}

.track-cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: var(--radius-md);
}

.console-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.narrator-chip {
  font-size: 11px;
  font-weight: 700;
  background: rgba(76, 201, 240, 0.2);
  color: var(--accent-cyan);
  padding: 2px 8px;
  border-radius: 4px;
}

.track-title { font-size: 18px; color: var(--text-primary); margin-top: 4px; }
.track-desc { font-size: 13px; color: var(--text-muted); line-height: 1.4; }

.scrubber-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.time-lbl { font-size: 12px; font-weight: 600; color: var(--text-muted); width: 45px; }

.scrubber-input {
  flex: 1;
  accent-color: var(--accent-cyan);
  cursor: pointer;
}

.btn-play {
  padding: 10px 20px;
  background: var(--accent-cyan);
  color: #000;
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 700;
  cursor: pointer;
  align-self: flex-start;
}

.chapters-card {
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chapters-card h4 { font-size: 14px; color: var(--text-primary); }

.chapters-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chapter-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  cursor: pointer;
}

.chapter-btn:hover { border-color: var(--accent-cyan); color: var(--accent-cyan); }

.tracks-list-card {
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tracks-list-card h4 { font-size: 14px; color: var(--text-primary); }

.tracks-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
}

.track-item {
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.track-item:hover { background: rgba(76, 201, 240, 0.1); }
.track-item.active { border-color: var(--accent-cyan); background: rgba(76, 201, 240, 0.15); }

.item-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.item-title { font-size: 13px; color: var(--text-primary); line-height: 1.2; }
.item-dur { font-size: 11px; color: var(--text-muted); }
</style>
