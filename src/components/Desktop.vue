<template>
  <div class="desktop">
    <!-- Container for desktop shortcuts -->
    <ShortcutManager />
    <!-- Render WindowManager to display open windows -->
    <WindowManager />
    <!-- Taskbar -->
    <Taskbar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ShortcutManager from './ShortcutManager.vue';
import WindowManager from './windows/WindowManager.vue';
import Taskbar from './taskBar/taskBar.vue';
import { useWindowStore } from './windows/windowStore';

export default defineComponent({
  name: 'Desktop',
  components: {
    ShortcutManager,
    WindowManager,
    Taskbar,
  },
  setup() {
    // Ensure window store is initialized (if needed)
    const windowStore = useWindowStore();
    return {};
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
