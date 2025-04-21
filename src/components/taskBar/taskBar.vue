<!-- src/components/ui/taskBar/taskbar.vue -->
<template>
  <div class="taskbar">
    <div class="taskbar-left">
      <!-- Start button -->
      <button class="start-button" @click="toggleTaskbarMenu">
        <!-- You could swap this for a “Windows” logo SVG if you like -->
        <span class="start-icon">≡</span>
      </button>

      <!-- Window tabs area -->
      <template v-if="!isCollapsed">
        <div class="open-windows">
          <div
            v-for="win in windows"
            :key="win.id"
            class="window-tab"
            :class="{ active: win.zIndex === maxZ }"
            @click="activateWindow(win)"
          >
            {{ win.title }}
          </div>
        </div>
      </template>
      <template v-else>
        <button class="windows-dropdown-button" @click="toggleWindowsDropdown">
          Windows ▾
        </button>
        <div v-if="showWindowsDropdown" class="windows-dropdown">
          <div
            v-for="win in windows"
            :key="win.id"
            class="window-dropdown-item"
            @click="activateWindow(win); toggleWindowsDropdown()"
          >
            {{ win.title }}
          </div>
        </div>
      </template>
    </div>

    <div class="taskbar-right">
      <div class="clock">{{ currentTime }}</div>
    </div>

    <!-- TaskbarMenu -->
    <TaskbarMenu v-if="showTaskbarMenu" @close="toggleTaskbarMenu" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';
import { useWindowStore } from '../windows/windowStore';
import { storeToRefs } from 'pinia';
import TaskbarMenu from './taskbarMenu.vue';

export default defineComponent({
  name: 'Taskbar',
  components: { TaskbarMenu },
  setup() {
    const windowStore = useWindowStore();
    const { windows } = storeToRefs(windowStore);

    // For detecting which window is on top
    const maxZ = computed(() =>
      windows.value.reduce((max, w) => (w.zIndex > max ? w.zIndex : max), 0)
    );

    // Clock logic
    const currentTime = ref(new Date().toLocaleTimeString());
    let interval: number;
    const updateTime = () => {
      currentTime.value = new Date().toLocaleTimeString();
    };
    onMounted(() => {
      interval = window.setInterval(updateTime, 1000);
      updateTime();
      window.addEventListener('resize', updateWidth);
    });
    onUnmounted(() => {
      clearInterval(interval);
      window.removeEventListener('resize', updateWidth);
    });

    // Collapse logic
    const windowWidth = ref(window.innerWidth);
    const updateWidth = () => (windowWidth.value = window.innerWidth);
    const COLLAPSE_THRESHOLD = 500;
    const isCollapsed = computed(() => windowWidth.value < COLLAPSE_THRESHOLD);

    // Dropdown & menu toggles
    const showTaskbarMenu = ref(false);
    const toggleTaskbarMenu = () => (showTaskbarMenu.value = !showTaskbarMenu.value);
    const showWindowsDropdown = ref(false);
    const toggleWindowsDropdown = () => (showWindowsDropdown.value = !showWindowsDropdown.value);

    // Activate (focus/restore) windows
    const activateWindow = (win: any) => {
      if (win.isMinimized) windowStore.restoreWindow(win.id);
      windowStore.focusWindow(win.id);
    };

    return {
      windows,
      maxZ,
      currentTime,
      isCollapsed,
      showTaskbarMenu,
      toggleTaskbarMenu,
      showWindowsDropdown,
      toggleWindowsDropdown,
      activateWindow,
    };
  },
});
</script>

<style scoped>
.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 0 12px;
  background: var(--dark-gray);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;

  /* remove shadows */
  box-shadow: none;
  /* allow the animated top bar to show */
  overflow: visible;
}

/* animated “slow wave” top border */
.taskbar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    #ff0000,
    #ff7f00,
    #ffff00,
    #00ff00,
    #0000ff,
    #4b0082,
    #8f00ff,
    #ff0000
  );
  background-size: 400% 100%;
  animation: rainbow-wave 15s linear infinite;
}

@keyframes rainbow-wave {
  0% {
    background-position:   0% 0%;
  }
  50% {
    background-position: 100% 0%;
  }
  100% {
    background-position:   0% 0%;
  }
}

.taskbar-left,
.taskbar-right {
  display: flex;
  align-items: center;
  height: 100%;
}

/* START BUTTON */
.start-button {
  width: 30px;
  height: 30px;
  background: var(--jet);
  border: 1px solid #555;
  border-radius: 4px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.start-button:hover {
  background: #555;
  border-color: #666;
}
.start-icon {
  color: #ddd;
  font-size: 1.2rem;
  line-height: 1;
}

/* OPEN WINDOWS TABS */
.open-windows {
  display: flex;
  gap: 8px;
}

.window-tab {
  padding: 6px 12px;
  background: #333;
  color: #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
}
.window-tab:hover {
  background: #444;
  color: #fff;
}
.window-tab.active {
  background: #1e90ff;
  color: #fff;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.5);
}

/* COLLAPSED DROPDOWN */
.windows-dropdown-button {
  padding: 6px 10px;
  background: #333;
  color: #ccc;
  border: 1px solid #555;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
.windows-dropdown-button:hover {
  background: #444;
  color: #fff;
}

.windows-dropdown {
  position: absolute;
  bottom: 50px;
  left: 60px;
  background: #2b2b2b;
  border: 1px solid #444;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
  overflow: hidden;
}
.window-dropdown-item {
  padding: 8px 12px;
  color: #ddd;
  cursor: pointer;
  transition: background 0.2s;
}
.window-dropdown-item:hover {
  background: #444;
  color: #fff;
}

/* CLOCK */
.clock {
  color: #ccc;
  font-size: 1rem;
  padding: 0 12px;
}
</style>
