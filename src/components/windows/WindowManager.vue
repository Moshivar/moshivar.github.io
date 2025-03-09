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

<script setup lang="ts">
import { ref, markRaw, defineComponent } from "vue";
import Window from "@/components/windows/Window.vue";
import Shop from "@/views/Shop.vue";
import Home from "@/views/Home.vue";
import Gordath from "@/views/Gordath.vue";
import BottomNavBar from "@/components/ui/BottomNavBar.vue";

// Define the structure for a windows
interface WindowData {
  id: number;
  title: string;
  component: ReturnType<typeof defineComponent>; // Type for Vue components
}

// State to manage open windows
const openWindows = ref<WindowData[]>([]);

const openWindow = (title: string) => {  // Explicitly define 'title' as a string
  if (openWindows.value.some((win) => win.title === title)) {
    return; // Prevent opening duplicate windows
  }

  let component: ReturnType<typeof defineComponent> | undefined;
  if (title === "Shop") component = markRaw(Shop);
  if (title === "Home") component = markRaw(Home);
  if (title === "Gordath") component = markRaw(Gordath);

  openWindows.value.push({
    id: Date.now(), // Unique ID
    title,
    component: component as ReturnType<typeof defineComponent>, // Ensure correct typing
  });
};

const closeWindow = (id: number) => {
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