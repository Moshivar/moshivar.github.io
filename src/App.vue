<template>
  <div class="desktop">
    <BottomNavBar :openWindow="openWindow" />

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
import BottomNavBar from "@/components/BottomNavBar.vue";

// State to manage open windows
const openWindows = ref([]);

const openWindow = (title) => {
  if (openWindows.value.some((win) => win.title === title)) {
    return; // Prevent opening the same window multiple times
  }
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
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #222;
}
</style>