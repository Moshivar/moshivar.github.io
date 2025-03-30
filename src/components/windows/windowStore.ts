// src/components/windows/windowStore.ts
import { defineStore } from 'pinia';

interface WindowData {
  id: number;
  title: string;
  component: any; // This will hold the Vue component (e.g., a page) to be rendered in the window.
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
      const windowData: WindowData = {
        id: this.nextWindowId++,
        title,
        component,
        x,
        y,
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
        // Update the zIndex so the window comes to the front.
        win.zIndex = this.nextZIndex++;
      }
    },
  },
});
