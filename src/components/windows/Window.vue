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
    // Position and size states
    const x = ref(props.initialX);
    const y = ref(props.initialY);
    const isMaximized = ref(false);

    // Compute the window style based on its state
    const windowStyle = computed(() => ({
      top: isMaximized.value ? '0' : `${y.value}px`,
      left: isMaximized.value ? '0' : `${x.value}px`,
      width: isMaximized.value ? '100%' : `${props.width}px`,
      height: isMaximized.value ? '100%' : `${props.height}px`,
      position: 'absolute',
      zIndex: 1,
    }));

    // Drag state for moving the window
    const dragging = ref(false);
    const dragOffset = ref({ x: 0, y: 0 });

    // Start dragging the window
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
        x.value = event.clientX - dragOffset.value.x;
        y.value = event.clientY - dragOffset.value.y;
      }
    };

    const stopDrag = () => {
      dragging.value = false;
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    // Window control actions
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

    // Bring the window to the front when clicked
    const bringToFront = () => {
      emit('focus', props.id);
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
    };
  },
});
</script>

<style scoped>
.window {
  background-color: var(--jet);
  border: 1px solid var(--tiffany-blue);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
</style>
