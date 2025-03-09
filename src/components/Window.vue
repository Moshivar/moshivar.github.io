<template>
  <div
      class="window"
      :style="{ width: width + 'px', height: height + 'px', top: y + 'px', left: x + 'px' }"
      @mousedown="bringToFront"
  >
    <div class="title-bar" @mousedown="startDrag">
      <span>{{ title }}</span>
      <button @click="$emit('close', id)">✖</button>
    </div>
    <div class="content">
      <slot></slot> <!-- This is where the loaded page will appear -->
    </div>
    <div class="resize-handle" @mousedown="startResize"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  id: Number, // Unique ID for each window
  title: String, // Window title
});

const emit = defineEmits(["close"]);

// Window position and size
const x = ref(100);
const y = ref(100);
const width = ref(400);
const height = ref(300);

const startDrag = (event) => {
  const startX = event.clientX - x.value;
  const startY = event.clientY - y.value;

  const move = (e) => {
    x.value = e.clientX - startX;
    y.value = e.clientY - startY;
  };

  const stopMove = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", stopMove);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", stopMove);
};

const startResize = (event) => {
  event.stopPropagation();
  const startX = event.clientX;
  const startY = event.clientY;
  const startWidth = width.value;
  const startHeight = height.value;

  const resize = (e) => {
    width.value = Math.max(200, startWidth + (e.clientX - startX));
    height.value = Math.max(150, startHeight + (e.clientY - startY));
  };

  const stopResize = () => {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  };

  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
};

const bringToFront = (event) => {
  event.target.closest(".window").style.zIndex = 1000; // Bring to front
};
</script>

<style scoped>
.window {
  position: absolute;
  background: black;
  border: 2px solid #333;
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.title-bar {
  background: #444;
  color: white;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  cursor: grab;
  user-select: none;
}
.content {
  padding: 10px;
}
.resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 15px;
  height: 15px;
  cursor: nwse-resize;
  background: #ccc;
}
</style>
