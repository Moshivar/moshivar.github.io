<!-- src/pages/Gordath.vue -->
<template>
  <div class="gordath-page">
    <h1>Gordath</h1>
    <p>
      Welcome to Gordath! This is a placeholder page for future content related to Gordath. Stay tuned for updates.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Gordath',
});

export const meta = {
  label: "Gordath",               // Title
  icon: "./gordath.png", // path to your shortcut icon
  version: "0.0.1",            // (optional) for any future updater UI
};
</script>

<style scoped>
.gordath-page {
  color: var(--snow);
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>
