import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Periodo',
    component: () => import('../views/Periodo.vue')
  },
  {
    path: '/disciplinas',
    name: 'Disciplinas',
    component: () => import('../views/Disciplinas.vue')
  },
  {
    path: '/academico',
    name: 'Academico',
    component: () => import('../views/Academico.vue')
  },
  {
    path: '/professor',
    name: 'Professor',
    component: () => import('../views/Professor.vue')
  },
  {
    path: '/subgrupo',
    name: 'Subgrupo',
    component: () => import('../views/Subgrupo.vue')
  },
  {
    path: '/salas',
    name: 'Salas',
    component: () => import('../views/Salas.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
