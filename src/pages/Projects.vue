<!-- src/pages/Projects.vue -->
<template>
  <div class="projects-page">
    <h1>Projects</h1>
    <p>
      Here are some exciting projects developed under Wizard Cat OS. More details will be added as the project evolves.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Projects',
});

export const meta = {
  label: "Projects",               // Title
  icon: "🖥️", // path to your shortcut icon
  version: "0.0.1",            // (optional) for any future updater UI
};
</script>

<style scoped>
.projects-page {
  color: var(--snow);
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>
