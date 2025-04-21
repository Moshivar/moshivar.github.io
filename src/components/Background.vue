<template>
  <div class="star-background">
    <div class="stars"></div>
    <div class="stars stars2"></div>
    <div class="stars stars3"></div>
    <div class="stars stars4"></div>
    <div class="stars stars5"></div>
    <div class="stars stars6"></div>
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
  background-image: radial-gradient(circle, white 1px, transparent 1px);
  background-size: 50px 50px;
  animation: scrollStars linear infinite;
}

.stars {
  animation-duration: 120s;
  opacity: 0.55;
  background-position: 0 0;
}

.stars2 {
  animation-duration: 120s;
  opacity: 0.55;
  background-position: 25px 25px;
}

.stars3 {
  animation-duration: 120s;
  opacity: 0.2;
  background-position: 12.5px 12.5px;
}
.stars4 {
  animation-duration: 120s;
  opacity: 0.2;
  background-position: 37.5px 37.5px;
}
.stars5 {
  animation-duration: 120s;
  opacity: 0.2;
  background-position: 12.5px 37.5px;
}
.stars6 {
  animation-duration: 120s;
  opacity: 0.2;
  background-position: 37.5px 12.5px;
}
@keyframes scrollStars {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0%); }
}
</style>
