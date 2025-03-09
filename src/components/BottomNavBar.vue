<template>
  <nav class="bottom-nav">
    <router-link to="/home" class="nav-item">
    <span>Home</span>
    </router-link>
    <router-link to="/shop" class="nav-item">
      <span>Shop</span>
    </router-link>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: black;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 12px;
  padding: 5px;
  transition: opacity 0.3s;
}

.nav-item img {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.nav-item:hover {
  opacity: 0.7;
}

/* Active state */
.router-link-active {
  color: #facc15; /* Yellow highlight */
}
</style>
