<!-- src/components/Desktop.vue -->
<template>
  <div class="desktop">
    <!-- Container for desktop shortcuts -->
    <div class="shortcuts">
      <div
        class="shortcut"
        v-for="(app, index) in apps"
        :key="index"
        @click="openApp(app)"
      >
        <div class="icon">{{ app.icon }}</div>
        <div class="label">{{ app.label }}</div>
      </div>
    </div>
    <!-- Render WindowManager to display open windows -->
    <WindowManager />
    <!-- Taskbar -->
    <Taskbar />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Taskbar from './ui/taskBar/taskBar.vue';
import WindowManager from './windows/WindowManager.vue';
import About from '../pages/About.vue';
import Projects from '../pages/Projects.vue';
import Gordath from '../pages/Gordath.vue';
import { useWindowStore } from './windows/windowStore';

export default defineComponent({
  name: 'Desktop',
  components: {
    Taskbar,
    WindowManager,
  },
  setup() {
    // Example applications to display as shortcuts on the desktop
    const apps = ref([
      { label: 'About', icon: '📄', route: '/about' },
      { label: 'Projects', icon: '🖥️', route: '/projects' },
      { label: 'Gordath', icon: '⚙️', route: '/gordath' },
    ]);

    // Get the window store instance
    const windowStore = useWindowStore();

    // Function to handle a single click on a shortcut and open the corresponding window
    const openApp = (app: { label: string; icon: string; route: string }) => {
      console.log('Opening app:', app);
      let componentToOpen;
      switch (app.route) {
        case '/about':
          componentToOpen = About;
          break;
        case '/projects':
          componentToOpen = Projects;
          break;
        case '/gordath':
          componentToOpen = Gordath;
          break;
        default:
          console.warn('Unknown route:', app.route);
          return;
      }
      // Add a new window to the store with the corresponding component
      windowStore.addWindow(app.label, componentToOpen);
    };

    return { apps, openApp };
  },
});
</script>

<style scoped>
.desktop {
  background-color: var(--jet);
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

/* Container for shortcut icons */
.shortcuts {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

/* Style for each shortcut icon */
.shortcut {
  width: 80px;
  text-align: center;
  cursor: pointer;
  color: var(--snow);
  user-select: none; /* Prevent text selection on click */
}

.shortcut .icon {
  font-size: 2rem;
}
</style>
