import { createRouter, createWebHistory } from 'vue-router'
import Base from '../views/Base.vue'
import QualtricsConverter from '../components/QualtricsConverter.vue'
import KBFOptimizer from '../components/KBFOptimizer.vue'

const routes = [
  {
    path: '/',
    component: Base,
    children: [
      { path: '', component: KBFOptimizer },
      { path: 'qualtrics', component: QualtricsConverter }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
