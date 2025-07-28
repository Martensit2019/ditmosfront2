<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="page">
    <TheHeader />
    <main class="main">
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
  @media (max-width: 780px) {
    margin-left: 16px;
    margin-right: 16px;
  }
}
.main {
  flex: 1;
  margin-top: 100px;
}
</style>
