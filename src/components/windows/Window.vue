<template>
  <div class="window" :style="{ width: width + 'px', height: height + 'px', top: y + 'px', left: x + 'px' }" @mousedown="bringToFront">
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

<script setup>
import { ref } from "vue";

const props = defineProps({
  id: { type: Number, required: true },
  title: String,
});

const emit = defineEmits(["close"]);

// Window position and size
const x = ref(100);
const y = ref(100);
const width = ref(400);
const height = ref(300);
let maxZIndex = ref(10);

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
  const windowElement = event.target.closest(".windows"); // Bring to front
  if (!windowElement) return;

  maxZIndex.value += 1;
  windowElement.style.zIndex = maxZIndex.value;
};

</script>

<style scoped>
.window {
  position: absolute;
  background: #222;
  border: 2px solid #333;
  border-radius: 2px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
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
  background: #ff4444;
  border: none;
  color: white;
  font-weight: bold;
  padding: 2px 8px;
  cursor: pointer;
  border-radius: 2px;
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
  bottom: 0;
  right: 0;
  width: 15px;
  height: 15px;
  cursor: nwse-resize;
  background: #666;
}
</style>
