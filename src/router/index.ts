import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/product/:id',
      name: 'product-details',
      component: () => import('@/modules/products/views/ProductDetailView.vue')
    },
  ],
})

export default router
