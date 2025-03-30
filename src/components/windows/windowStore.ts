// src/components/windows/windowStore.ts
import { defineStore } from 'pinia';

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
    addWindow(title: string, component: any, x = 100, y = 100, width = 400, height = 300) {
      // Compute a diagonal offset based on the number of windows already open.
      const offset = this.windows.length * 30;
      let newX = x + offset;
      let newY = y + offset;
      // Ensure the new window fits on-screen; if not, reset to defaults.
      if (newX + width > window.innerWidth) {
        newX = x;
      }
      if (newY + height > window.innerHeight) {
        newY = y;
      }
      const windowData: WindowData = {
        id: this.nextWindowId++,
        title,
        component,
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
      if (win) {
        win.isMinimized = true;
      }
    },
    maximizeWindow(id: number) {
      const win = this.windows.find(w => w.id === id);
      if (win) {
        win.isMaximized = !win.isMaximized;
      }
    },
    focusWindow(id: number) {
      const win = this.windows.find(w => w.id === id);
      if (win) {
        win.zIndex = this.nextZIndex++;
      }
    },
  },
});
