<!-- src/components/ui/taskBar/taskbarMenu.vue -->
<template>
  <div class="taskbar-menu" ref="menuRef">
    <div class="menu-items">
      <!-- Applications Section -->
      <div class="menu-item applications" @click="toggleApps">
        Applications ▾
        <div v-if="showApps" class="dropdown apps-dropdown" @click.stop>
          <input
            v-model="searchQuery"
            placeholder="Search..."
            class="search-bar"
          />
          <div
            v-for="label in filteredApps"
            :key="label"
            class="dropdown-item"
            @click="launchApp(label)"
          >
            {{ label }}
          </div>
          <div v-if="!filteredApps.length" class="no-results">
            No applications found.
          </div>
        </div>
      </div>

      <!-- Settings Section -->
      <div class="menu-item settings" @click="openSettings">
        ⚙️ Settings
      </div>

      <!-- Power Section -->
      <div class="menu-item power" @click="togglePower">
        ⏻ Power ▾
        <div v-if="showPower" class="dropdown power-dropdown" @click.stop>
          <div class="dropdown-item" @click="restart">Restart</div>
          <div class="dropdown-item" @click="shutdown">Shutdown</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useWindowStore } from '../windows/windowStore';
import type { Component } from 'vue';

const emit = defineEmits(['close']);

// Discover all page modules & metadata
interface AppModule {
  default: Component;
  meta: { label: string; icon: string; version?: string; x?: number; y?: number; width?: number; height?: number };
}
const modules = import.meta.glob('../../pages/*.vue', { eager: true }) as Record<string, AppModule>;

// Build sorted list of labels
const allApps = Object.values(modules)
  .map(m => m.meta.label)
  .sort((a, b) => a.localeCompare(b));

const searchQuery = ref('');
const showApps = ref(false);
const showPower = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const filteredApps = computed(() =>
  !searchQuery.value
    ? allApps
    : allApps.filter(label =>
        label.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
);

const windowStore = useWindowStore();

// Toggle handlers
function toggleApps() {
  showApps.value = !showApps.value;
  if (showApps.value) showPower.value = false;
}
function togglePower() {
  showPower.value = !showPower.value;
  if (showPower.value) showApps.value = false;
}

// Launch an application window
function launchApp(label: string) {
  const module = Object.values(modules).find(m => m.meta.label === label);
  if (module) {
    windowStore.addWindow(
      label,
      module.default,
      {
        x: module.meta.x,
        y: module.meta.y,
        width: module.meta.width,
        height: module.meta.height,
      }
    );
  }
  showApps.value = false;
  emit('close');
}

// Settings stub
function openSettings() {
  console.log('Open settings...');
  emit('close');
}

// Power actions
function createOverlay() {
  const o = document.createElement('div');
  o.id = 'shutdown-overlay';
  Object.assign(o.style, {
    position: 'fixed',
    top: '0', left: '0', width: '100%', height: '100%',
    backgroundColor: '#000', zIndex: '9999',
  });
  document.body.appendChild(o);
}
function shutdown() {
  createOverlay();
}
function restart() {
  createOverlay();
  setTimeout(() => location.reload(), 2500);
}

// Close menu when clicking outside
function onClickOutside(e: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    emit('close');
  }
}
onMounted(() => document.addEventListener('click', onClickOutside, true));
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside, true));
</script>

<style scoped>
.taskbar-menu {
  position: absolute;
  bottom: 45px; /* matches taskbar height */
  left: 10px;
  background: var(--jet);
  color: var(--snow);
  border: 1px solid var(--tiffany-blue);
  border-radius: 4px;
  padding: 8px;
  overflow: visible;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6); /* restore overall menu shadow */
}

/* Rainbow stripe (unchanged) */
.taskbar-menu::before {
  content: "";
  position: absolute;
  top: -4px; left: 0;
  width: 100%; height: 2px;
  background: linear-gradient(
    90deg,
    #ff0000, #ff7f00, #ffff00,
    #00ff00, #0000ff, #4b0082,
    #8f00ff, #ff0000
  );
  background-size: 400% 100%;
  animation: rainbow-wave 15s linear infinite;
}

/* Top‑level menu items separated */
.menu-items {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.menu-item {
  position: relative;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s, border-color 0.2s;
  border-bottom: 1px solid var(--dark-gray);
}
.menu-item:last-child {
  border-bottom: none;
}
.menu-item:hover {
  background: #333;
}

/* Dropdown now opens upward */
.dropdown {
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 6px;
  transform: translateX(150px);
  background: var(--jet);
  border: 1px solid var(--tiffany-blue);
  border-radius: 4px;
  padding: 6px 0;
  z-index: 1200;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5); /* shadow around dropdown */
}

/* Apps dropdown width */
.apps-dropdown {
  width: 200px;
}

/* Search bar */
.search-bar {
  display: block;
  width: 80%;
  margin-bottom: 8px;
  margin-left: 10px;
  padding: 6px 10px;
  background: var(--dark-gray);
  border: 1px solid var(--tiffany-blue);
  border-radius: 4px;
  color: var(--snow);
  font-size: 0.9rem;
}

/* No results message */
.no-results {
  padding: 6px 12px;
  color: #888;
}

/* Distinct dropdown items */
.dropdown-item {
  padding: 6px 12px;
  color: var(--snow);
  transition: background 0.2s;
  border-bottom: 1px solid var(--dark-gray);
}
.dropdown-item:last-child {
  border-bottom: none;
}
.dropdown-item:hover {
  background: #333;
}

/* Power dropdown narrower */
.power-dropdown {
  width: 140px;
}

/* Rainbow animation keyframes */
@keyframes rainbow-wave {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 0%; }
  100% { background-position: 0% 0%; }
}
</style>

