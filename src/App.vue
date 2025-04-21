<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- Display the boot animation until it's finished -->
    <BootSplash v-if="!bootComplete" @bootFinished="handleBootFinished" />
    <!-- Once boot is complete, show the desktop -->
    <Desktop v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BootSplash from './components/BootSplash.vue';
import Desktop from './components/Desktop.vue';

export default defineComponent({
  name: 'App',
  components: {
    BootSplash,
    Desktop,
  },
  setup() {
    // Reactive flag to determine if boot animation is complete
    const bootComplete = ref(false);

    // Handler to update the flag when the boot sequence finishes
    const handleBootFinished = () => {
      bootComplete.value = true;
    };

    return { bootComplete, handleBootFinished };
  },
});
</script>

<style>
/* Global styles or app-wide styles can go here */
</style>
