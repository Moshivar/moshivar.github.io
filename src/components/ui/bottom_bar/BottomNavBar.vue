<template>
  <nav class="bottom-nav">
    <button class="menu-button" @click="toggleMenu">Menu</button>
    <DropMenu v-if="isMenuOpen" @closeMenu="isMenuOpen = false" :openWindow="openWindow" />
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DropMenu from "./DropMenu.vue";

defineProps<{ openWindow: (title: string) => void }>();

// ✅ Track menu visibility
const isMenuOpen = ref(false);

// ✅ Toggle menu visibility
const toggleMenu = (event: MouseEvent) => {
  event.stopPropagation(); // ✅ Prevents immediate closing

  isMenuOpen.value = !isMenuOpen.value;

  console.log("Menu Open:", isMenuOpen.value);

  if (isMenuOpen.value) {
    document.addEventListener("click", closeMenu);
  } else {
    document.removeEventListener("click", closeMenu);
  }
};

// ✅ Close menu when clicking anywhere
const closeMenu = () => {
  isMenuOpen.value = false;
  console.log("Menu Closed");

  document.removeEventListener("click", closeMenu); // ✅ Ensure event listener is removed
};


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
  z-index: 1000;
}

.menu-button {
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

.menu-button:hover {
  background: #555;
}
</style>
