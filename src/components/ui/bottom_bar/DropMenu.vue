<script setup lang="ts">
  defineProps<{ openWindow: (title: string) => void }>();


</script>

<template>
  <div class="drop-menu">
    <button class="taskbar-item" @click="openWindow('About')">
      About
    </button>
    <button class="taskbar-item" @click="openWindow('Projects')">
      Projects
    </button>
    <button class="taskbar-item" @click="openWindow('Gordath')">
      Gordath
    </button>
  </div>
</template>

<style scoped>
.drop-menu {
  position: absolute;
  bottom: 50px; /* ✅ Positioned above the bottom navbar */
  left: 10px;
  width: 150px;
  background: #222;
  border: 1px solid #555;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  color: white;
  z-index: 1000;
}
</style>