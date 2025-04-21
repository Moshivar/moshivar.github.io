<template>
  <div class="desktop">
    <Background />
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
import Background from './Background.vue';

export default defineComponent({
  name: 'Desktop',
  components: {
    Background,
    ShortcutManager,
    WindowManager,
    Taskbar,
  }
});
</script>

<style scoped>
.desktop {
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
