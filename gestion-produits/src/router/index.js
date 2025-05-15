import { createRouter, createWebHistory } from 'vue-router'
import ProductListView from '../views/ProductListView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProductListView
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetailView
  },
  {
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: () => import('../views/NotFoundView.vue')
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router