import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/recuperarsenha',
    name: 'Recuperarsenha',
    component: () => import('../views/Recuperarsenha.vue')
  },
  {
    path: '/periodo',
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
    path: '/manuais',
    name: 'Manuais',
    component: () => import('../views/Manuais.vue')
  },
  {
    path: '/agendamento',
    name: 'Agendamento',
    component: () => import('../views/Agendamento.vue')
  },
  {
    path: '/evidencias',
    name: 'Evidencias',
    component: () => import('../views/Evidencias.vue')
  },
  {
    path: '/salas',
    name: 'Salas',
    component: () => import('../views/Salas.vue')
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import('../views/Status.vue')
  },
  {
    path: '/calendario',
    name: 'Calendario',
    component: () => import('../views/Calendario.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
