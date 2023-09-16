import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CargarRecetaView from '@/views/CargarRecetaView.vue'
import RecetasGuardadas from '@/views/RecetasGuardadas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/formReceta/:id?',
    name: 'formReceta',
    component: CargarRecetaView
  },
  {
    path: '/recetasGuardadas',
    name: 'recetasGuardadas',
    component: RecetasGuardadas
  },
  {
    path: '/editarReceta',
    name: 'editarReceta',
    props: true,
    component: CargarRecetaView
  }
]

const router = new VueRouter({
  routes
})

export default router
