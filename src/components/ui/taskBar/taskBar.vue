<!-- src/components/ui/taskBar/taskbar.vue -->
<template>
  <div class="taskbar">
    <div class="taskbar-left">
      <!-- Start button toggles the TaskbarMenu -->
      <button class="start-button" @click="toggleTaskbarMenu">☰</button>
      
      <!-- Window tabs area: either normal or collapsed -->
      <template v-if="!isCollapsed">
        <div class="open-windows">
          <div
            v-for="win in windows"
            :key="win.id"
            class="window-tab"
            @click="activateWindow(win)"
          >
            {{ win.title }}
          </div>
        </div>
      </template>
      <template v-else>
        <button class="windows-dropdown-button" @click="toggleWindowsDropdown">
          Windows
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
    <!-- TaskbarMenu remains as before -->
    <TaskbarMenu v-if="showTaskbarMenu" @close="toggleTaskbarMenu" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';
import { useWindowStore } from '@/components/windows/windowStore.ts';
import { storeToRefs } from 'pinia';
import TaskbarMenu from '@/components/ui/taskBar/taskbarMenu.vue';

export default defineComponent({
  name: 'Taskbar',
  components: { TaskbarMenu },
  setup() {
    const windowStore = useWindowStore();
    const { windows } = storeToRefs(windowStore);

    // Clock logic
    const currentTime = ref(new Date().toLocaleTimeString());
    let interval: number;
    const updateTime = () => {
      currentTime.value = new Date().toLocaleTimeString();
    };
    onMounted(() => {
      interval = window.setInterval(updateTime, 1000);
      updateWidth(); // set initial value
      window.addEventListener('resize', updateWidth);
    });
    onUnmounted(() => {
      clearInterval(interval);
      window.removeEventListener('resize', updateWidth);
    });

    // Reactive property for window width
    const windowWidth = ref(window.innerWidth);
    const updateWidth = () => {
      windowWidth.value = window.innerWidth;
    };

    // Collapse threshold (adjust as needed; here, if width is below 400px)
    const COLLAPSE_THRESHOLD = 400;
    const isCollapsed = computed(() => windowWidth.value < COLLAPSE_THRESHOLD);

    // TaskbarMenu toggle
    const showTaskbarMenu = ref(false);
    const toggleTaskbarMenu = () => {
      showTaskbarMenu.value = !showTaskbarMenu.value;
    };

    // Windows dropdown state (for collapsed view)
    const showWindowsDropdown = ref(false);
    const toggleWindowsDropdown = () => {
      showWindowsDropdown.value = !showWindowsDropdown.value;
    };

    // Activate window tab: restore if minimized and bring to front
    const activateWindow = (win: any) => {
      if (win.isMinimized) {
        windowStore.restoreWindow(win.id);
      }
      windowStore.focusWindow(win.id);
    };

    return {
      windows,
      currentTime,
      showTaskbarMenu,
      toggleTaskbarMenu,
      activateWindow,
      isCollapsed,
      showWindowsDropdown,
      toggleWindowsDropdown,
    };
  },
});
</script>

<style scoped>
.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: var(--jet);
  color: var(--snow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.taskbar-left,
.taskbar-right {
  display: flex;
  align-items: center;
}

/* Start button styling */
.start-button {
  background-color: var(--persian-green);
  color: var(--night);
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 10px;
}

/* Normal open windows tab area */
.open-windows {
  display: flex;
  gap: 10px;
}

.window-tab {
  padding: 5px 10px;
  background-color: var(--jet);
  cursor: pointer;
  border: 1px solid var(--tiffany-blue);
  border-radius: 3px;
}

.window-tab:hover {
  border: 1px solid var(--snow);
}

/* Collapsed view dropdown for windows */
.windows-dropdown-button {
  padding: 5px 10px;
  background-color: var(--jet);
  border: 1px solid var(--tiffany-blue);
  border-radius: 3px;
  cursor: pointer;
}

.windows-dropdown {
  position: absolute;
  bottom: 45px; /* Adjust to appear above the taskbar */
  left: 70px; /* Adjust based on layout */
  background-color: var(--jet);
  border: 1px solid var(--tiffany-blue);
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  z-index: 1100;
}

.window-dropdown-item {
  padding: 5px 10px;
  cursor: pointer;
}

.window-dropdown-item:hover {
  background-color: var(--persian-green);
}

/* Clock styling */
.clock {
  font-family: 'Courier New', Courier, monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
  padding-right: 20px;
}
</style>
