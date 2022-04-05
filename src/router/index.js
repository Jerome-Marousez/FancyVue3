import { createRouter, createWebHistory } from 'vue-router'
import test from '../views/test.vue'

const routes = [
  {
    path: '/',
    name: 'test',
    component: function () {
      return import(/* webpackChunkName: "test" */ '../views/test.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
