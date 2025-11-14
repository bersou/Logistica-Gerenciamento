// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'), 
  },
  {
    path: '/entregas',
    name: 'Entregas',
    component: () => import('@/views/Entregas.vue'),
  },
  {
    path: '/mapa',
    name: 'Mapa',
    component: () => import('@/views/Mapa.vue'),
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: () => import('@/views/Clientes.vue'),
  },

  // --- ROTA ADICIONADA ---
  {
    path: '/perfil', // A nova URL
    name: 'Perfil',
    // Carrega o arquivo que acabamos de criar
    component: () => import('@/views/Perfil.vue'),
  },
  // --- FIM DA ROTA ADICIONADA ---
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router