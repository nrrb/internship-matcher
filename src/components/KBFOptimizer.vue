<template>
  <section class="space-y-7">
    <div class="hero-panel max-w-4xl overflow-hidden rounded-3xl px-6 py-8 sm:px-9"><p class="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-gold">Kellogg Board Fellows</p><h1 class="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Match MBA talent to corporate board internships, optimally.</h1><p class="mt-3 max-w-3xl text-lg leading-8 text-indigo-100">Import each student's ranked internship preferences from Qualtrics and generate the assignment set that maximizes overall satisfaction.</p><div class="mt-6 flex items-center gap-3 text-sm font-semibold text-white/90"><span class="h-px w-8 bg-gold"></span> Transparent, defensible, mathematically optimal matching</div></div>
    <ol class="grid gap-3 sm:grid-cols-4" aria-label="Optimizer progress"><li v-for="(step, index) in steps" :key="step" class="rounded-xl border px-4 py-3 transition" :class="index <= currentStep ? 'border-purple-200 bg-purple-50 text-ink shadow-sm' : 'border-slate-200 bg-white text-slate-500'"><span class="mr-2 inline-grid h-6 w-6 place-items-center rounded-full text-xs font-bold" :class="index <= currentStep ? 'bg-plum text-white' : 'bg-slate-200 text-slate-500'">{{ index < currentStep ? '✓' : index + 1 }}</span><span class="text-sm font-semibold">{{ step }}</span></li></ol>
    <article class="card overflow-hidden">
      <div class="border-b border-slate-100 bg-gradient-to-r from-white to-purple-50 px-5 py-5 sm:px-7"><div class="flex flex-wrap items-start justify-between gap-4"><div><p class="text-sm font-bold text-plum">Step 1 · Add preferences</p><h2 class="mt-1 text-xl font-bold text-ink">Paste student internship preferences</h2><p class="mt-1 max-w-2xl text-sm leading-6 text-slate-600">Use CSV or tab-separated values. The first row contains corporate board internships; the first column contains student names.</p></div><div class="text-right"><button class="secondary-button text-sm" type="button" @click="loadSample">Explore an example</button><p class="mt-2 text-xs text-slate-500">See a complete workflow in seconds.</p></div></div></div>
      <div class="p-5 sm:p-7"><label class="field-label" for="rankings">Student internship preferences</label><textarea id="rankings" v-model="csvRankings" rows="11" class="text-input font-mono text-sm leading-6" placeholder="Student Name,Board Internship A,Board Internship B&#10;Avery Chen,1,2&#10;Jordan Smith,2,1" @input="clearValidation"></textarea><div class="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm"><p class="text-slate-500">Blank preference cells are treated as unranked.</p><p v-if="summary" class="font-semibold text-slate-600">{{ summary.students }} students · {{ summary.companies }} internships</p></div><div v-if="summary && !errors.length" class="mt-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"><span class="grid h-6 w-6 place-items-center rounded-full bg-emerald-600 font-bold text-white">✓</span><span><strong>Looking good.</strong> We found {{ summary.students }} students and {{ summary.companies }} internships ready to match.</span></div>
        <div v-if="errors.length" class="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert"><p class="font-bold">Please correct the data before matching:</p><ul class="mt-1 list-disc space-y-1 pl-5"><li v-for="error in errors" :key="error">{{ error }}</li></ul></div>
        <div class="mt-6 flex flex-wrap items-center gap-3"><button class="primary-button" type="button" :disabled="isWorking" @click="compute"><span>{{ isWorking ? 'Generating optimal matches…' : 'Generate optimal matches' }}</span><span aria-hidden="true">→</span></button><button v-if="csvRankings" class="secondary-button" type="button" @click="reset">Clear data</button></div>
        <details class="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"><summary class="cursor-pointer font-semibold text-slate-700 marker:text-plum">About this matching model</summary><div class="mt-3 max-w-3xl space-y-3 leading-6"><p>Students rank up to 10 corporate board internships, and several students may prefer the same opportunity. The optimizer weighs every preference together and finds the assignment set with the highest possible overall satisfaction.</p><p>Previously, a Board Fellows administrator would compare rankings by hand in Excel, a time-consuming process that made difficult tradeoffs hard to see and could not guarantee the best overall result. This tool provides a transparent, mathematically optimal alternative.</p></div></details>
      </div>
    </article>
    <article v-if="assignments.length" ref="resultsPanel" class="card overflow-hidden result-card" aria-live="polite"><div class="border-b border-slate-100 px-5 py-5 sm:px-7"><div class="flex flex-wrap items-start justify-between gap-4"><div><p class="text-sm font-bold text-plum">Step 3 · Review assignments</p><h2 class="mt-1 text-xl font-bold text-ink">Your optimal matches are ready.</h2><p class="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-800"><span class="grid h-5 w-5 place-items-center rounded-full bg-emerald-600 text-xs text-white">✓</span> Optimality confirmed: no other assignment achieves higher overall preference satisfaction.</p></div><button class="primary-button" type="button" @click="download">Download CSV <span aria-hidden="true">↓</span></button></div></div><div class="grid gap-px border-b border-slate-100 bg-slate-100 sm:grid-cols-5"><div class="bg-white px-5 py-4"><p class="text-xs font-bold uppercase tracking-wide text-slate-500">Students matched</p><p class="mt-1 text-2xl font-bold text-ink">{{ assignments.length }}</p></div><div class="bg-white px-5 py-4"><p class="text-xs font-bold uppercase tracking-wide text-slate-500">Internships used</p><p class="mt-1 text-2xl font-bold text-ink">{{ matchedCompanies }}</p></div><div class="bg-white px-5 py-4"><p class="text-xs font-bold uppercase tracking-wide text-slate-500">Average matched preference</p><p class="mt-1 text-2xl font-bold text-ink">#{{ averageRank }}</p></div><div class="bg-white px-5 py-4"><p class="text-xs font-bold uppercase tracking-wide text-slate-500">Matched to first choice</p><p class="mt-1 text-2xl font-bold text-ink">{{ firstChoiceRate }}%</p></div><div class="bg-white px-5 py-4"><p class="text-xs font-bold uppercase tracking-wide text-slate-500">Matched within top three</p><p class="mt-1 text-2xl font-bold text-ink">{{ topThreeRate }}%</p></div></div><div class="p-5 sm:p-7"><ResultsKBF :assignments="assignments" /></div></article>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import Papa from 'papaparse'
import ResultsKBF from './ResultsKBF.vue'
import { saveFile } from '../utils/download'
import kelloggConfetti from '../utils/kellogg-confetti'

const csvRankings = ref(''), errors = ref([]), assignments = ref([]), average = ref(null), isWorking = ref(false), resultsPanel = ref(null)
let worker
const steps = ['Add rankings', 'Validate data', 'Generate matches', 'Download']
const summary = computed(() => { const rows = Papa.parse(csvRankings.value.trim(), { skipEmptyLines: true }).data; return rows.length > 1 && rows[0].length > 1 ? { students: rows.length - 1, companies: rows[0].length - 1 } : null })
const currentStep = computed(() => assignments.value.length ? 3 : csvRankings.value ? 1 : 0)
const averageRank = computed(() => average.value === null ? '–' : Number(average.value).toFixed(1))
const matchedCompanies = computed(() => new Set(assignments.value.map(({ company }) => company)).size)
const firstChoiceRate = computed(() => percentageFor(rank => rank === 1))
const topThreeRate = computed(() => percentageFor(rank => rank <= 3))
function percentageFor(predicate) { return assignments.value.length ? Math.round((assignments.value.filter(({ ranking }) => predicate(ranking)).length / assignments.value.length) * 100) : 0 }
function clearValidation() { errors.value = []; assignments.value = [] }
function reset() { csvRankings.value = ''; errors.value = []; assignments.value = []; average.value = null }
function loadSample() {
  csvRankings.value = [
    'Student Name,Acme Health,BrightPath,CivicWave,Delta Energy,Elevate Foods,FutureLabs,GreenBridge,HarborWorks,Insight Partners,Juniper Finance,Kindred Media,Lumen Mobility',
    'Avery Chen,1,3,6,9,,2,7,10,5,4,8,',
    'Jordan Smith,1,2,,9,4,8,5,,6,3,7,10',
    'Morgan Lee,1,8,3,,6,2,10,5,,7,4,9',
    'Sam Rivera,7,6,10,1,3,9,4,2,,8,5,',
    'Riley Brooks,5,10,9,1,4,,6,8,3,,2,7',
    'Casey Morgan,10,5,2,,8,1,7,3,9,4,,6',
    'Devon Patel,6,1,,5,10,7,3,9,2,,4,8',
    'Taylor Kim,7,4,,10,2,9,6,1,8,5,3,',
    'Quinn Davis,,9,3,6,,5,2,7,4,1,8,10',
    'Parker Jones,9,5,,7,10,4,,6,3,8,1,2',
  ].join('\n')
  clearValidation()
}
function parseAndValidate() {
  const data = Papa.parse(csvRankings.value.trim(), { skipEmptyLines: true }).data.map(row => row.map(cell => String(cell).trim())), issues = []
  if (data.length < 2) issues.push('Add a header row and at least one student row.')
  if (data[0]?.length < 2) issues.push('Add at least one company column after the student-name column.')
  const companies = data[0]?.slice(1) || [], students = data.slice(1).map(row => row[0])
  if (companies.some(company => !company)) issues.push('Every company column needs a name.')
  if (new Set(companies).size !== companies.length) issues.push('Company names must be unique.')
  if (students.some(student => !student)) issues.push('Every student row needs a name.')
  if (new Set(students).size !== students.length) issues.push('Student names must be unique.')
  data.slice(1).forEach((row, rowIndex) => { if (row.length !== data[0].length) issues.push(`Row ${rowIndex + 2} has ${row.length} values; expected ${data[0].length}.`); row.slice(1).forEach((value, col) => { if (value && (!Number.isInteger(Number(value)) || Number(value) < 1)) issues.push(`“${row[0] || `Row ${rowIndex + 2}`}” has an invalid rank in column ${col + 2}.`) }) })
  errors.value = [...new Set(issues)]
  return issues.length ? null : { companies, students, rankings: data.slice(1).map(row => row.slice(1).map(value => value ? Number(value) : 99)) }
}
function compute() { const payload = parseAndValidate(); if (!payload) return; isWorking.value = true; assignments.value = []; worker?.terminate(); worker = new Worker(new URL('../workers/optimizer.worker.js', import.meta.url), { type: 'module' }); worker.onmessage = async ({ data }) => { assignments.value = data.assignments; average.value = data.avgSatisfaction; isWorking.value = false; kelloggConfetti(1.5); await nextTick(); resultsPanel.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }); worker.terminate() }; worker.onerror = () => { errors.value = ['Unable to calculate assignments. Please try again.']; isWorking.value = false }; worker.postMessage(payload) }
function download() { saveFile(`Assignments-${averageRank.value}AvgRanking.csv`, Papa.unparse(assignments.value), 'text/csv') }
onBeforeUnmount(() => worker?.terminate())
</script>
