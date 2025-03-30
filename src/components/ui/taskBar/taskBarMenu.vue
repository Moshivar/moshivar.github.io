<!-- src/components/ui/taskBar/taskbarMenu.vue -->
<template>
  <div class="taskbar-menu">
    <ul>
      <li @click="openApp('About')">About</li>
      <li @click="openApp('Projects')">Projects</li>
      <li @click="openApp('Gordath')">Gordath</li>
      <li @click="openSettings">Settings</li>
      <li @click="shutdown">Shutdown</li>
    </ul>
    <button class="close-button" @click="$emit('close')">Close</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TaskbarMenu',
  setup() {
    const openApp = (app: string) => {
      console.log('Opening app from TaskbarMenu:', app);
      // Later integrate with window manager logic
    };

    const openSettings = () => {
      console.log('Opening settings...');
      // Add settings functionality here
    };

    const shutdown = () => {
      console.log('Shutdown initiated...');
      // Add shutdown logic here
    };

    return { openApp, openSettings, shutdown };
  },
});
</script>

<style scoped>
.taskbar-menu {
  position: absolute;
  bottom: 40px; /* Adjust based on taskbar height */
  left: 10px;
  background-color: var(--jet);
  color: var(--snow);
  border: 1px solid var(--tiffany-blue);
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.taskbar-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.taskbar-menu li {
  padding: 5px 0;
  cursor: pointer;
}

.taskbar-menu li:hover {
  background-color: var(--persian-green);
}

.close-button {
  margin-top: 10px;
  background-color: var(--persian-green);
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  color: var(--night);
}
</style>
