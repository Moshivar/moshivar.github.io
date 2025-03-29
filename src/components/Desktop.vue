<script setup lang="ts">
</script>

<template>
  <div class="desktop">
    <div class="menu"></div>
  </div>
</template>

<style scoped>
.desktop {
  position: absolute; /* ✅ More flexible than fixed */
  inset: 0; /* ✅ Sets top, bottom, left, right to 0 */
  width: 100vw;
  height: 100vh;
  background: #222;
  display: flex; /* ✅ Allows easy child alignment */
  align-items: center;
  justify-content: center;
}
</style>
