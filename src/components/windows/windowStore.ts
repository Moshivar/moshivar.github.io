// src/components/windows/windowStore.ts
import { defineStore } from 'pinia';
import { markRaw } from 'vue';

interface WindowData {
  id: number;
  title: string;
  component: any;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export const useWindowStore = defineStore('window', {
  state: () => ({
    windows: [] as WindowData[],
    nextZIndex: 1,
    nextWindowId: 1,
  }),
  actions: {
    /**
     * Opens a new window or focuses an existing one.
     * Options can override default position and size.
     */
    addWindow(
      title: string,
      component: any,
      options: Partial<Pick<WindowData, 'x' | 'y' | 'width' | 'height'>> = {}
    ) {
      // Prevent duplicate windows by title
      const existing = this.windows.find(w => w.title === title);
      if (existing) {
        if (existing.isMinimized) existing.isMinimized = false;
        this.focusWindow(existing.id);
        return existing;
      }

      // Compute defaults based on viewport size
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const defaultWidth = Math.floor(viewportW * 0.6);
      const defaultHeight = Math.floor(viewportH * 0.6);
      const defaultX = Math.floor((viewportW - defaultWidth) / 2);
      const defaultY = Math.floor((viewportH - defaultHeight) / 2);

      // Apply options or defaults
      let x = options.x ?? defaultX;
      let y = options.y ?? defaultY;
      let width = options.width ?? defaultWidth;
      let height = options.height ?? defaultHeight;

      // Diagonal offset for each new window
      const offset = this.windows.length * 30;
      let newX = x + offset;
      let newY = y + offset;
      // Clamp within viewport
      if (newX + width > viewportW) newX = x;
      if (newY + height > viewportH) newY = y;

      const windowData: WindowData = {
        id: this.nextWindowId++,
        title,
        component: markRaw(component),
        x: newX,
        y: newY,
        width,
        height,
        isMinimized: false,
        isMaximized: false,
        zIndex: this.nextZIndex++,
      };
      this.windows.push(windowData);
      return windowData;
    },

    closeWindow(id: number) {
      this.windows = this.windows.filter(w => w.id !== id);
    },

    minimizeWindow(id: number) {
      const win = this.windows.find(w => w.id === id);
      if (win) win.isMinimized = true;
    },

    restoreWindow(id: number) {
      const win = this.windows.find(w => w.id === id);
      if (win) win.isMinimized = false;
    },

    maximizeWindow(id: number) {
      const win = this.windows.find(w => w.id === id);
      if (win) win.isMaximized = !win.isMaximized;
    },

    focusWindow(id: number) {
      const win = this.windows.find(w => w.id === id);
      if (win) win.zIndex = this.nextZIndex++;
    },
  },
});
