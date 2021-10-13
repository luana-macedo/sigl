import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import EsqueceuSenha from '../views/EsqueceuSenha.vue'
import About from '../views/About.vue'
import Inicio from '../views/Inicio.vue'
import Professor from '../views/Professor.vue'
import Salas from '../views/Salas.vue'
import Disciplinas from '../views/Disciplinas.vue'
import Academico from '../views/Academico.vue'
import Subgrupo from '../views/Subgrupo.vue'
import Periodo from '../views/Periodo.vue'
import Recuperar from '../views/Recuperar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/esqueceusenha',
    name: 'EsqueceuSenha',
    component: EsqueceuSenha
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/professor',
    name: 'Professor',
    component: Professor
  },
  {
    path: '/salas',
    name: 'Salas',
    component: Salas
  },
  {
    path: '/periodo',
    name: 'periodo',
    component: Periodo
  },
  {
    path: '/disciplinas',
    name: 'Disciplinas',
    component: Disciplinas
  },
  {
    path: '/academico',
    name: 'Academico',
    component: Academico
  },
  {
    path: '/subgrupo',
    name: 'Subgrupo',
    component: Subgrupo
  },
  {
    path: '/Recuperar',
    name: 'Recuperar',
    component: Recuperar
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
