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
    addWindow(title: string, component: any, x = 100, y = 100, width = 400, height = 300) {
      // Prevent duplicate windows
      const existingWindow = this.windows.find(w => w.title === title);
      if (existingWindow) {
        if (existingWindow.isMinimized) {
          existingWindow.isMinimized = false;
        }
        this.focusWindow(existingWindow.id);
        return existingWindow;
      }
      // Calculate diagonal offset
      const offset = this.windows.length * 30;
      let newX = x + offset;
      let newY = y + offset;
      if (newX + width > window.innerWidth) {
        newX = x;
      }
      if (newY + height > window.innerHeight) {
        newY = y;
      }
      const windowData: WindowData = {
        id: this.nextWindowId++,
        title,
        // Mark the component as raw to prevent reactivity
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
      if (win) {
        win.isMinimized = true;
      }
    },
    restoreWindow(id: number) {
      const win = this.windows.find(w => w.id === id);
      if (win) {
        win.isMinimized = false;
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
