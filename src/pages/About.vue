<!-- src/pages/About.vue -->
<template>
  <div class="about-page">
    <h1>About Wizard Cat OS</h1>
    <p>
      Welcome to Wizard Cat OS, a demo operating system built for the web. Explore our features and enjoy the desktop experience.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'About',
});

export const meta = {
  label: "About",               // Title
  icon: "📄", // path to your shortcut icon
  version: "0.0.1",            // (optional) for any future updater UI
};
</script>

<style scoped>
.about-page {
  color: var(--snow);
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>
