<script setup lang="ts">
import AppHeader from './AppHeader.vue';
</script>

<template>
  <div class="wrapper">
    <AppHeader class="header" />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style>
.wrapper{
  @apply h-screen  flex flex-col;
}
.content{
  @apply flex-1;
}
</style>
