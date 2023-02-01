<template>
  <div class="body__container clearfix">
    <aside class="aside d-flex flex-column py-5 float-start fixed-top">
      <h1 class="aside__logo ml-3">
        <a href="" class="aside__logo__link">logo</a>
      </h1>
      <nav class="mb-auto">
        <ul class="aside__list ps-0 mb-0">
          <li class="aside__list__item">
            <router-link class="item__link d-flex py-1 fw-bold" to="/admin/products">
              <span class="material-symbols-outlined icon--pill me-3">inventory_2</span>
              Products
            </router-link>
          </li>
          <li class="aside__list__item">
            <router-link class="item__link d-flex py-1 fw-bold" to="/admin/orders">
              <span class="material-symbols-outlined icon--pill me-3">order_approve</span>
              Orders
            </router-link>
          </li>
          <li class="aside__list__item">
            <router-link class="item__link d-flex py-1 fw-bold" to="/admin/coupon">
              <span class="material-symbols-outlined icon--pill me-3">local_activity</span>
              Coupon
            </router-link>
          </li>
          <li class="aside__list__item">
            <router-link class="item__link d-flex py-1 fw-bold" to="/admin/article">
              <span class="material-symbols-outlined icon--pill me-3">article</span>
              Article
            </router-link>
          </li>
          <li class="aside__list__item">
            <a class="item__link d-flex py-1 fw-bold" href="" @click.prevent="status.logout()">
              <span class="material-symbols-outlined icon--pill me-3">logout</span>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="float-end mx-3">
      <!-- adminStore、statusStore實體傳入router-view -->
      <router-view :store="{admin, status}"></router-view>  
    </main>
  </div>
</template>

<script>
// 匯入adminStore
import adminStore from '@/stores/admin/adminStore';
// 匯入statusStore
import statusStore from '@/stores/statusStore';

export default {
  components: {
    },
  setup() { 
    // 建立adminStore實體
    const admin = adminStore();
    // 建立statusStore實體
    const status = statusStore();
    return {
      admin,
      status,
    }
  },
};
</script>
