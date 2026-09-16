<template>
  <div class="min-h-screen">
    <Nav />
    <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <router-view />
    </main>
    <footer class="mt-8 border-t border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8">
        <p>Built for Kellogg Board Fellows.</p>
        <p>Thoughtful matching, made simpler.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Nav from "../components/Nav.vue";
</script>
