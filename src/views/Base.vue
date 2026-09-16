<template>
  <div class="min-h-screen">
    <Nav />
    <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <router-view />
    </main>
    <footer class="mt-8 border-t border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8">
        <p>Built for <a class="font-semibold text-plum underline decoration-plum/30 underline-offset-4 transition hover:decoration-plum" href="https://www.kellogg.northwestern.edu/academics-research/golub-capital-board-fellows/" target="_blank" rel="noreferrer">Kellogg Board Fellows</a>.</p>
        <p>Written and maintained by <a class="font-semibold text-plum underline decoration-plum/30 underline-offset-4 transition hover:decoration-plum" href="https://github.com/nrrb/internship-matcher" target="_blank" rel="noreferrer">Nicholas Bennett</a>.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Nav from "../components/Nav.vue";
</script>
