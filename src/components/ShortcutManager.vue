<!-- src/components/ShortcutManager.vue -->
<template>
    <div class="shortcut-container">
      <div
        v-for="app in apps"
        :key="app.label"
        class="shortcut"
        @click="openApp(app)"
      >
        <!-- Render either an image or emoji/icon as text -->
        <img
          v-if="isImageIcon(app.icon)"
          :src="app.icon"
          :alt="app.label"
          class="shortcut-icon"
        />
        <span
          v-else
          class="shortcut-icon emoji"
        >
          {{ app.icon }}
        </span>
        <span class="shortcut-label">{{ app.label }}</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useWindowStore } from './windows/windowStore';
  import type { Component } from 'vue';
  
  // Interface for imported page modules and their metadata
  interface AppModule {
    default: Component;
    meta: {
      label: string;
      icon: string;
      version?: string;
      // Optional window sizing/position overrides
      x?: number;
      y?: number;
      width?: number;
      height?: number;
    };
  }
  
  // Interface for desktop shortcut info including optional layout overrides
  interface AppInfo {
    label: string;
    icon: string;
    component: Component;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
  
  // Glob‑import all page components and metadata from src/pages
  const modules = import.meta.glob('../pages/*.vue', { eager: true }) as Record<string, AppModule>;
  
  // Build reactive array of apps
  const apps = ref<AppInfo[]>(
    Object.values(modules)
      .filter(m => m.meta && m.meta.label && m.meta.icon)
      .map(m => ({
        label: m.meta.label,
        icon: m.meta.icon,
        component: m.default,
        x: m.meta.x,
        y: m.meta.y,
        width: m.meta.width,
        height: m.meta.height,
      }))
  );
  
  const windowStore = useWindowStore();
  
  // Determine if the icon string is an image path (vs. an emoji/text)
  function isImageIcon(icon: string): boolean {
    return icon.startsWith('/') ||
           icon.startsWith('http') ||
           /\.(png|jpg|jpeg|svg|gif)$/.test(icon);
  }
  
  // Single-click a shortcut to open its window with optional overrides
  function openApp(app: AppInfo) {
    windowStore.addWindow(
      app.label,
      app.component,
      {
        x: app.x,
        y: app.y,
        width: app.width,
        height: app.height,
      }
    );
  }
  </script>
  
  <style scoped>
  .shortcut-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
    align-items: flex-start;
    padding: 10px;
  }
  
  .shortcut {
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    user-select: none;
    color: var(--snow);
  }
  
  .shortcut-icon {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }
  
  .shortcut-icon.emoji {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .shortcut-label {
    margin-top: 5px;
    font-size: 12px;
    color: var(--snow);
  }
  
  .shortcut:hover {
    transform: scale(1.1);
  }
  </style>
  