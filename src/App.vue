<template>
  <div class="desktop">
    <nav>
      <button @click="openWindow('Shop')">Open Shop</button>
      <button @click="openWindow('Home')">Open Home</button>
    </nav>

    <Window
        v-for="win in openWindows"
        :key="win.id"
        :id="win.id"
        :title="win.title"
        @close="closeWindow"
    >
      <component :is="win.component" />
    </Window>
  </div>
</template>

<script setup>
import { ref, markRaw } from "vue";
import Window from "@/components/Window.vue";
import Shop from "@/views/Shop.vue";
import Home from "@/views/Home.vue";

// State to manage open windows
const openWindows = ref([]);

const openWindow = (title) => {
  let component;
  if (title === "Shop") component = markRaw(Shop);
  if (title === "Home") component = markRaw(Home);

  openWindows.value.push({
    id: Date.now(), // Unique ID
    title,
    component,
  });
};

const closeWindow = (id) => {
  openWindows.value = openWindows.value.filter((win) => win.id !== id);
};
</script>

<style>
.desktop {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #222;
  overflow: hidden;
}
nav {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
}
</style>
