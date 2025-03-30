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
  height: 40px; /* Set navbar height */
  background: #6d7677;
  display: flex;
  align-items: center;
  padding: 0;
  border-top: 2px solid #111;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.menu-button {
  height: 100%;
  background: inherit;
  border: none;
  border-right: 2px solid #111;
  color: #000000;
  padding: 0 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease-in-out;
}

.menu-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

</style>
