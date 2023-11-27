import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('./views/HomePage.vue'),
  },
  {
    path: '/products',
    component: () => import('./views/ProductsPage.vue'),
  },
  {
    path: '/product/:id',
    name: 'productDetails',
    component: () => import('./views/ProductDetailsPage.vue'),
  },
  {
    path: '/cart',
    component: () => import('./views/CartPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;