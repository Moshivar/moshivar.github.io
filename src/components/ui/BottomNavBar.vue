<template>
  <nav class="bottom-nav">
    <button class="taskbar-item" @click="openWindow('Home')">
      Home
    </button>
    <button class="taskbar-item" @click="openWindow('Shop')">
      Shop
    </button>
    <button class="taskbar-item" @click="openWindow('Gordath')">
      Gordath
    </button>
  </nav>
</template>

<script setup>
defineProps({
  openWindow: Function,
});
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #333;
  display: flex;
  align-items: center;
  padding: 5px;
  border-top: 2px solid #111;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
}

.taskbar-item {
  background: #444;
  color: white;
  border: 1px solid #666;
  padding: 5px 15px;
  margin-right: 5px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 3px;
  box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.5);
}

.taskbar-item:hover {
  background: #555;
}
</style>
