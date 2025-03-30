<!-- src/components/windows/Window.vue -->
<template>
  <div class="window" :style="windowStyle" @mousedown="bringToFront">
    <!-- Title bar with window controls -->
    <div class="title-bar" @mousedown="startDrag">
      <span class="title">{{ title }}</span>
      <div class="window-controls">
        <button @click.stop="minimize">_</button>
        <button @click.stop="toggleMaximize">{{ isMaximized ? '🗗' : '🗖' }}</button>
        <button @click.stop="close">X</button>
      </div>
    </div>
    <!-- Window content area -->
    <div class="content">
      <slot />
    </div>
    <!-- Resize handle at bottom-right -->
    <div class="resize-handle" @mousedown.stop="startResize"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'Window',
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      default: 'Window',
    },
    initialX: {
      type: Number,
      default: 100,
    },
    initialY: {
      type: Number,
      default: 100,
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 300,
    },
  },
  emits: ['close', 'minimize', 'maximize', 'focus'],
  setup(props, { emit }) {
    // Define a constant for the taskbar height
    const TASKBAR_HEIGHT = 40;

    // Reactive state for position and size
    const x = ref(props.initialX);
    const y = ref(props.initialY);
    const currentWidth = ref(props.width);
    const currentHeight = ref(props.height);
    const isMaximized = ref(false);

    const windowStyle = computed(() => ({
      top: isMaximized.value ? '0' : `${y.value}px`,
      left: isMaximized.value ? '0' : `${x.value}px`,
      width: isMaximized.value ? '100%' : `${currentWidth.value}px`,
      height: isMaximized.value ? `calc(100% - ${TASKBAR_HEIGHT}px)` : `${currentHeight.value}px`,
      position: 'absolute',
      zIndex: 1,
    }));

    // Drag state for moving the window
    const dragging = ref(false);
    const dragOffset = ref({ x: 0, y: 0 });

    const startDrag = (event: MouseEvent) => {
      if (isMaximized.value) return; // Prevent dragging when maximized
      dragging.value = true;
      dragOffset.value = {
        x: event.clientX - x.value,
        y: event.clientY - y.value,
      };
      bringToFront();
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', stopDrag);
    };

    const onDrag = (event: MouseEvent) => {
      if (dragging.value) {
        const newX = event.clientX - dragOffset.value.x;
        const newY = event.clientY - dragOffset.value.y;
        // Clamp the position so the window stays within the viewport and above the taskbar
        x.value = Math.max(0, Math.min(newX, window.innerWidth - currentWidth.value));
        y.value = Math.max(0, Math.min(newY, window.innerHeight - currentHeight.value - TASKBAR_HEIGHT));
      }
    };

    const stopDrag = () => {
      dragging.value = false;
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    // Window controls
    const minimize = () => {
      emit('minimize', props.id);
    };

    const toggleMaximize = () => {
      isMaximized.value = !isMaximized.value;
      emit('maximize', { id: props.id, maximized: isMaximized.value });
    };

    const close = () => {
      emit('close', props.id);
    };

    const bringToFront = () => {
      emit('focus', props.id);
    };

    // Resize logic
    const resizing = ref(false);
    const resizeStart = ref({ mouseX: 0, mouseY: 0, width: 0, height: 0 });

    const startResize = (event: MouseEvent) => {
      event.stopPropagation();
      resizing.value = true;
      resizeStart.value = {
        mouseX: event.clientX,
        mouseY: event.clientY,
        width: currentWidth.value,
        height: currentHeight.value,
      };
      document.addEventListener('mousemove', onResize);
      document.addEventListener('mouseup', stopResize);
    };

    const onResize = (event: MouseEvent) => {
      if (!resizing.value) return;
      const dx = event.clientX - resizeStart.value.mouseX;
      const dy = event.clientY - resizeStart.value.mouseY;
      // Set minimum dimensions
      const minWidth = 200;
      const minHeight = 100;
      let newWidth = resizeStart.value.width + dx;
      let newHeight = resizeStart.value.height + dy;
      newWidth = Math.max(minWidth, newWidth);
      newHeight = Math.max(minHeight, newHeight);
      // Ensure the window doesn't extend off-screen or cover the taskbar
      newWidth = Math.min(newWidth, window.innerWidth - x.value);
      newHeight = Math.min(newHeight, window.innerHeight - y.value - TASKBAR_HEIGHT);
      currentWidth.value = newWidth;
      currentHeight.value = newHeight;
    };

    const stopResize = () => {
      resizing.value = false;
      document.removeEventListener('mousemove', onResize);
      document.removeEventListener('mouseup', stopResize);
    };

    return {
      x,
      y,
      windowStyle,
      isMaximized,
      startDrag,
      minimize,
      toggleMaximize,
      close,
      bringToFront,
      startResize,
    };
  },
});
</script>

<style scoped>
.window {
  background-color: var(--jet);
  border: 1px solid var(--tiffany-blue);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.title-bar {
  background-color: var(--persian-green);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  cursor: move;
  user-select: none;
}

.title {
  font-weight: bold;
}

.window-controls button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--night);
  margin-left: 5px;
}

.content {
  padding: 10px;
  height: calc(100% - 30px); /* Adjust based on title bar height */
  overflow: auto;
}

/* Resize handle styling */
.resize-handle {
  position: absolute;
  width: 16px;
  height: 16px;
  bottom: 0;
  right: 0;
  cursor: se-resize;
  background-color: var(--tiffany-blue);
}
</style>
