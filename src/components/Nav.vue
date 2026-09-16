<template>
  <header class="border-b border-white/15 bg-ink text-white shadow-lg">
    <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3">
        <span class="grid h-10 w-10 place-items-center rounded-xl bg-gold font-bold text-ink">KB</span>
        <span>
          <span class="block text-xs font-semibold uppercase tracking-[0.18em] text-gold">Kellogg</span>
          <span class="block text-base font-semibold leading-tight">Board Fellows Optimizer</span>
        </span>
      </RouterLink>
      <nav class="flex items-center gap-1 rounded-xl bg-white/10 p-1" aria-label="Main navigation">
        <RouterLink to="/" class="nav-link">Optimizer</RouterLink>
        <RouterLink to="/qualtrics" class="nav-link">Qualtrics converter</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  @apply rounded-lg px-3 py-2 text-sm font-medium text-indigo-100 transition hover:bg-white/10 hover:text-white;
}
.router-link-exact-active {
  @apply bg-white text-ink shadow-sm hover:bg-white hover:text-ink;
}
</style>
