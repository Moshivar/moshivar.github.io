<!-- src/components/ui/taskBar/taskbar.vue -->
<template>
  <div class="taskbar">
    <div class="taskbar-left">
      <!-- Start button toggles the taskbar menu -->
      <button class="start-button" @click="toggleTaskbarMenu">Start</button>
      <!-- Display a list of open window icons (dummy data for now) -->
      <div class="open-windows">
        <div
          v-for="(window, index) in openWindows"
          :key="index"
          class="window-icon"
          @click="focusWindow(window.id)"
        >
          {{ window.title }}
        </div>
      </div>
    </div>
    <div class="taskbar-right">
      <!-- Display current time -->
      <div class="clock">{{ currentTime }}</div>
    </div>
    <!-- Render the taskbar menu when toggled -->
    <TaskbarMenu v-if="showTaskbarMenu" @close="toggleTaskbarMenu" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import TaskbarMenu from './taskBarMenu.vue';

export default defineComponent({
  name: 'Taskbar',
  components: { TaskbarMenu },
  setup() {
    // State to control the visibility of the TaskbarMenu
    const showTaskbarMenu = ref(false);
    // Dummy list of open windows; this can later be managed via Pinia
    const openWindows = ref([
      { id: 1, title: 'About' },
      { id: 2, title: 'Projects' },
    ]);

    // Clock logic: update every second
    const currentTime = ref(new Date().toLocaleTimeString());
    let interval: number;

    const updateTime = () => {
      currentTime.value = new Date().toLocaleTimeString();
    };

    onMounted(() => {
      interval = setInterval(updateTime, 1000);
    });
    onUnmounted(() => {
      clearInterval(interval);
    });

    // Toggle the visibility of the taskbar menu
    const toggleTaskbarMenu = () => {
      showTaskbarMenu.value = !showTaskbarMenu.value;
    };

    // Dummy function to simulate focusing a window
    const focusWindow = (id: number) => {
      console.log('Focusing window with id:', id);
      // Add logic to bring the window with given id to the front
    };

    return { showTaskbarMenu, openWindows, currentTime, toggleTaskbarMenu, focusWindow };
  },
});
</script>

<style scoped>
.taskbar {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: var(--jet);
  color: var(--snow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
}

.taskbar-left,
.taskbar-right {
  display: flex;
  align-items: center;
}

.start-button {
  background-color: var(--persian-green);
  color: var(--night);
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 10px;
}

.open-windows {
  display: flex;
  gap: 10px;
}

.window-icon {
  padding: 5px;
  background-color: var(--jet);
  cursor: pointer;
  border: 1px solid transparent;
}

.window-icon:hover {
  border: 1px solid var(--tiffany-blue);
}

.clock {
  font-family: 'Courier New', Courier, monospace;
}
</style>
