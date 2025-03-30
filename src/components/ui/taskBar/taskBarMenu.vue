<!-- src/components/ui/taskBar/taskbarMenu.vue -->
<template>
  <div class="taskbar-menu" ref="menuRef">
    <div class="menu-items">
      <!-- Applications Section (Top) -->
      <div class="menu-item applications" @click="toggleAppsMenu">
        Applications
        <div v-if="showAppsMenu" class="dropdown apps-dropdown">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search..."
            class="search-bar"
            @mousedown.stop
            @mouseup.stop
            @click.stop
          />
          <div
            class="dropdown-item"
            v-for="app in filteredApps"
            :key="app"
            @click="handleLaunchApp(app)"
          >
            {{ app }}
          </div>
        </div>
      </div>
      <!-- Settings Section (Middle) -->
      <div class="menu-item settings" @click="openSettings">
        ⚙️ Settings
      </div>
      <!-- Power Section (Bottom) -->
      <div class="menu-item power" @click="togglePowerMenu">
        ⏻ Power
        <div v-if="showPowerMenu" class="dropdown power-dropdown">
          <div class="dropdown-item" @click="restart">Restart</div>
          <div class="dropdown-item" @click="shutdown">Shutdown</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useWindowStore } from '../../../components/windows/windowStore';
import About from '../../../pages/About.vue';
import Projects from '../../../pages/Projects.vue';
import Gordath from '../../../pages/Gordath.vue';

export default defineComponent({
  name: 'TaskbarMenu',
  emits: ['close'],
  setup(_, { emit }) {
    const menuRef = ref<HTMLElement | null>(null);

    // Dropdown toggles
    const showPowerMenu = ref(false);
    const showAppsMenu = ref(false);
    const searchQuery = ref('');

    // List of available applications (dummy) sorted alphabetically
    const apps = ref(['About', 'Gordath', 'Projects']);
    apps.value.sort();

    const filteredApps = computed(() => {
      if (!searchQuery.value) return apps.value;
      return apps.value.filter(app =>
        app.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Map app names to their components
    const appComponents: Record<string, any> = {
      About,
      Projects,
      Gordath,
    };

    const windowStore = useWindowStore();

    const togglePowerMenu = () => {
      showPowerMenu.value = !showPowerMenu.value;
      if (showPowerMenu.value) showAppsMenu.value = false;
    };

    const toggleAppsMenu = () => {
      showAppsMenu.value = !showAppsMenu.value;
      if (showAppsMenu.value) showPowerMenu.value = false;
    };

    const openSettings = () => {
      console.log('Settings clicked');
    };

    const handleLaunchApp = (app: string) => {
      // Launch the application using the store's addWindow method.
      const componentToLaunch = appComponents[app];
      if (componentToLaunch) {
        windowStore.addWindow(app, componentToLaunch);
      } else {
        console.warn(`No component found for app: ${app}`);
      }
      toggleAppsMenu(); // close the dropdown after launching
    };

    // Shutdown effect: create a full-screen black overlay.
    const shutdown = () => {
      console.log('Shutdown initiated');
      const overlay = document.createElement('div');
      overlay.id = 'shutdown-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = '#000';
      overlay.style.zIndex = '9999';
      document.body.appendChild(overlay);
    };

    // Restart: simulate reboot by shutdown effect then reload the page.
    const restart = () => {
      console.log('Restart initiated');
      const overlay = document.createElement('div');
      overlay.id = 'shutdown-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = '#000';
      overlay.style.zIndex = '9999';
      document.body.appendChild(overlay);
      setTimeout(() => {
        location.reload();
      }, 3000);
    };

    // Close the entire menu if click occurs outside of it.
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
        emit('close');
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside, true);
    });
    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside, true);
    });

    return {
      menuRef,
      showPowerMenu,
      showAppsMenu,
      searchQuery,
      filteredApps,
      togglePowerMenu,
      toggleAppsMenu,
      openSettings,
      shutdown,
      restart,
      handleLaunchApp,
    };
  },
});
</script>

<style scoped>
.taskbar-menu {
  position: absolute;
  bottom: 40px; /* Positioned above the taskbar */
  left: 10px;
  background-color: var(--jet);
  color: var(--snow);
  border: 1px solid var(--tiffany-blue);
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  z-index: 1100;
}

/* Menu items are stacked vertically and left-aligned */
.menu-items {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.menu-item {
  cursor: pointer;
  position: relative;
  padding: 5px 10px;
  width: 100%;
}

/* Dropdowns open to the right side of the parent menu item */
.dropdown {
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 5px;
  background-color: var(--jet);
  border: 1px solid var(--tiffany-blue);
  border-radius: 3px;
  padding: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  z-index: 1200;
}

.dropdown .dropdown-item {
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown .dropdown-item:hover {
  background-color: var(--persian-green);
}

/* Applications dropdown styling */
.apps-dropdown {
  width: 200px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}

.search-bar {
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid var(--tiffany-blue);
  border-radius: 3px;
  background-color: var(--jet);
  color: var(--snow);
}
</style>
