<template>
  <div class="star-background">
    <div class="stars"></div>
    <div class="stars stars2"></div>
    <div class="stars stars3"></div>
  </div>
</template>

<script setup lang="ts">
// Pure CSS-driven starfield; no scripting required
</script>

<style scoped>
.star-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--jet);
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.stars,
.stars2,
.stars3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  background-repeat: repeat;
  /* Pattern of small dots spaced by 50px */
  background-image: radial-gradient(circle, white 1px, transparent 1px);
  background-size: 50px 50px;
  animation: scrollStars linear infinite;
}

.stars {
  /* No offset on first layer */
  background-position: 0 0;
  animation-duration: 120s;
  opacity: 0.6;
}

.stars2 {
  /* Staggered by half-tile */
  background-position: 25px 25px;
  animation-duration: 120s;
  opacity: 0.3;
}

.stars3 {
  /* Staggered by quarter- and three-quarter-tile */
  background-position: 12.5px 12.5px;
  animation-duration: 120s;
  opacity: 0.15;
}

@keyframes scrollStars {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0%); }
}
</style>
