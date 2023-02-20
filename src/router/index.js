import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/week05',
    name: 'week05',
    component: () => import('../components/Week05Component.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/admin/LoginComponent.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    children: [
      {
        path: '/admin/products',
        name: 'products',
        component: () => import('../components/admin/productsComponent.vue'),
      },
      {
        path: '/admin/orders',
        name: 'orders',
        component: () => import('../components/admin/OrdersComponent.vue'),
      },
      {
        path: '/admin/coupon',
        name: 'coupon',
        component: () => import('../components/admin/CouponComponent.vue'),
      },
      {
        path: '/admin/article',
        name: 'article',
        component: () => import('../components/admin/ArticleComponent.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
