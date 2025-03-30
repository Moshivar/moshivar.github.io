<!-- src/components/windows/WindowManager.vue -->
<template>
  <div class="window-manager">
    <Window
      v-for="win in windows"
      :key="win.id"
      :id="win.id"
      :title="win.title"
      :initialX="win.x"
      :initialY="win.y"
      :width="win.width"
      :height="win.height"
      :style="{ zIndex: win.zIndex }"
      v-show="!win.isMinimized"
      @close="handleClose"
      @minimize="handleMinimize"
      @maximize="handleMaximize"
      @focus="handleFocus"
    >
      <!-- Dynamically render the component assigned to this window -->
      <component :is="win.component" />
    </Window>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useWindowStore } from './windowStore';
import { storeToRefs } from 'pinia';
import Window from './Window.vue';

export default defineComponent({
  name: 'WindowManager',
  components: {
    Window,
  },
  setup() {
    const windowStore = useWindowStore();
    // Use storeToRefs to ensure reactivity
    const { windows } = storeToRefs(windowStore);

    const handleClose = (id: number) => {
      console.log('Closing window:', id);
      windowStore.closeWindow(id);
    };

    const handleMinimize = (id: number) => {
      console.log('Minimizing window:', id);
      windowStore.minimizeWindow(id);
    };


    const handleMaximize = (id: number) => {
      console.log('Maximizing window:', id);
      windowStore.maximizeWindow(id);
    };

    const handleFocus = (id: number) => {
      console.log('Focusing window:', id);
      windowStore.focusWindow(id);
    };

    return { windows, handleClose, handleMinimize, handleMaximize, handleFocus };
  },
});
</script>

<style scoped>
.window-manager {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Prevent the container from intercepting clicks when no window is present */
  pointer-events: none;
}

/* Allow pointer events on individual windows */
.window-manager > * {
  pointer-events: auto;
}
</style>
