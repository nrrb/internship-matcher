<template>
  <div class="overflow-hidden rounded-xl border border-slate-200">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead class="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500"><tr><th class="px-5 py-3">Student</th><th class="px-5 py-3">Company</th><th class="px-5 py-3 text-right">Preference</th></tr></thead>
        <tbody class="divide-y divide-slate-100 bg-white">
          <tr v-for="assignment in assignments" :key="`${assignment.student}-${assignment.company}`" class="hover:bg-purple-50/40">
            <td class="whitespace-nowrap px-5 py-4 font-medium text-slate-800">{{ assignment.student }}</td><td class="whitespace-nowrap px-5 py-4 text-slate-600">{{ assignment.company }}</td><td class="px-5 py-4 text-right"><span class="inline-flex rounded-full bg-purple-100 px-2.5 py-1 text-xs font-bold text-plum">#{{ assignment.ranking }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({ assignments: { type: Array, required: true } })
</script>
