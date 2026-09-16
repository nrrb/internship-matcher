<template>
  <div class="min-h-screen">
    <Nav />
    <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Nav from "../components/Nav.vue";
</script>
