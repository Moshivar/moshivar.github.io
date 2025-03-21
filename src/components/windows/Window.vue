<template>
  <div class="window" :style="{ width: width + 'px', height: height + 'px', top: y + 'px', left: x + 'px', zIndex: zIndex }" @mousedown="bringToFront">
    <div class="title-bar" @mousedown="startDrag">
      <span class="title">{{ title }}</span>
      <button class="close-btn" @click="$emit('close', id)">✖</button>
    </div>
    <div class="content">
      <slot></slot> <!-- This is where the loaded page will appear -->
    </div>
    <div class="resize-handle" @mousedown="startResize"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, type Ref } from "vue";

const { id, title } = defineProps<{ id: number; title: string }>();

const emit = defineEmits(["close"]);

//initial window width and height
const width = ref(400);
const height = ref(300);

//defines the height of the navbar
const navbarElement = document.querySelector(".bottom-nav") as HTMLElement;
const navbarHeight: number = navbarElement ? navbarElement.offsetHeight : 0;

//take the max z index from the window manager
const maxZIndex = inject<Ref<number>>("maxZIndex");
if (!maxZIndex) {
  throw new Error("maxZIndex is not provided in WindowManager.vue");
}

//when the z index change it increases by one
const zIndex = ref(++maxZIndex.value);

  const getRandomY = (): number => {
    const viewportHeight: number = window.innerHeight;
    const minY: number = viewportHeight * 0.3; // 40% of the screen
    const maxY: number = viewportHeight * 0.7; // 60% of the screen

    return Math.random() * (maxY - minY) + minY;
  };

//initial y is random
const y = ref<number>(getRandomY());

  const getRandomX = (): number => {
    const viewportWidth: number = window.innerWidth;
    const minX: number = viewportWidth * 0.3; // 40% of the screen
    const maxX: number = viewportWidth * 0.7; // 60% of the screen

    return Math.random() * (maxX - minX) + minX;
  };

//initial x is random
const x = ref<number>(getRandomX());

//function that manages window drag
const startDrag = (event: MouseEvent): void => {
  //defines the start x and y as the mouse position minus the current x value
  const startX = event.clientX - x.value;
  const startY = event.clientY - y.value;

  //starts the move of the drag
  const move = (e: MouseEvent): void => {
    //creates references to the height and width of the total window
    const viewportWidth: number = window.innerWidth;
    const viewportHeight: number = window.innerHeight;

    //the new x and y is equal to the mouse position x - the starting position
    let newX: number = e.clientX - startX;
    let newY: number = e.clientY - startY;

    //the new position is equal to the max value between 0 and the minimum between viewport - the width of the window and the new x
    newX = Math.max(0, Math.min(viewportWidth - width.value, newX));
    newY = Math.max(0, Math.min(viewportHeight - navbarHeight - height.value, newY));

    x.value = newX;
    y.value = newY;
  };

  //removes an event listener
  const stopMove = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", stopMove);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", stopMove);
};

const startResize = (event: MouseEvent): void => {
  event.stopPropagation();
  document.body.style.userSelect = "none";

  const startX = event.clientX;
  const startY = event.clientY;
  const startWidth = width.value;
  const startHeight = height.value;

  const resize = (e: MouseEvent): void => {
    const viewportWidth: number = window.innerWidth;
    const viewportHeight: number = window.innerHeight;

    let newWidth: number = startWidth + (e.clientX - startX);
    let newHeight: number = startHeight + (e.clientY - startY);

    newWidth = Math.min(viewportWidth - x.value, Math.max(200, newWidth));
    newHeight = Math.min(viewportHeight - navbarHeight - y.value, Math.max(200, newHeight));

    width.value = newWidth;
    height.value = newHeight;
  };

  const stopResize = () => {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
    document.body.style.userSelect = "";
  };

  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
};

const bringToFront = () => {
  maxZIndex.value += 1; // Increase max z-index
  zIndex.value = maxZIndex.value; // Assign highest z-index to this window
};

</script>

<style scoped>
.window {
  position: absolute;
  background: #222;
  border: 2px solid #575757;
  border-radius: 12px;
  box-shadow: 3px 3px 5px rgba(100, 100, 100, 0.7);
  overflow: hidden;
  font-family: sans-serif;
  color: white;
}

.title-bar {
  background: #444;
  color: white;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  cursor: grab;
  user-select: none;
  height: 25px;
}

.title {
  margin-left: 5px;
}

.close-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d61313;
  height: 25px;
  width: 25px;
  border: 8px white;
  color: white;
  font-weight: bold;
  padding: 2px 8px;
  cursor: pointer;
  border-radius: 6px;
}

.close-btn:hover {
  background: #cc0000;
}

.content {
  display: flex;
  justify-content: center; /* all flex box content is up for deletion because it sucks */
  align-items: center;
  flex-direction: column;
  padding: 10px;
  border-top: 1px solid #444;
}

.resize-handle {
  position: absolute;
  bottom: -5px; /* ✅ Extends outside the window */
  right: -5px;
  width: 15px;
  height: 15px;
  cursor: nwse-resize;
  background: transparent;
}
</style>
