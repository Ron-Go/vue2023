<template>
  <div class="body__container d-flex">
    <aside class="aside d-flex flex-column py-5 fixed-top">
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
    <main class="position-relative ms-auto me-3" ref="contentDom">
      <!-- adminStore、statusStore實體傳入router-view -->
      <router-view :store="{admin, status}"></router-view>
    </main>
  </div>
</template>

<script>
// 匯入adminStore
import adminStore from '@/stores/admin/adminStore';
// 匯入ordersStore
import ordersStore from '@/stores/admin/ordersStore';
// 匯入statusStore
import statusStore from '@/stores/statusStore';
// 匯入ref
import { ref } from 'vue';
// 匯入useLoading
import { useLoading } from 'vue3-loading-overlay';


export default {
  components: {
    },
  setup() { 
    // 建立statusStore實體
    const status = statusStore();
    // 建立adminStore實體
    const admin = adminStore();
    // 建立ordersStore實體
    const order = ordersStore();
    // 監聽adminStore的actions
    admin.$onAction(({ name, after, onError }) => {
      if (name === 'checkStatus' || name === 'changePage') {
        loader.show();
        after(() => {
          loader.hide();
        });
      };
    });
    // 監聽ordersStore的actions
    order.$onAction(({ name, after, onError }) => {
      if (name === 'getOrders') {
        loader.show();
        after(() => {
          loader.hide();
        });
      };
    });
    //vue-loading-overlay出現的DOM元素
    let contentDom = ref(null);
    // 建立閉包私有方法（vue-loading-overlay實體並帶入物件參數）
    const loading = (containerDom) => {
      // const fullPage = false;
      const loader = useLoading({
        // Optional parameters
        container: containerDom.value,
        canCancel: false,
        // onCancel: onCancel,
        loader: 'Bars', //spinner/dots/bars
        color: 'green',
        width: 50,
        height: 50,
        backgroundColor: '#ffffff',
        //isFullPage: true,
        opacity: .8,
        zindex: 999
      });
      return {
        show: () => {
          loader.show();
        },
        hide: () => {
          setTimeout(() => {
            loader.hide();
          }, 1000);
        }
      }    
    };
    // vue-loading-overlay實體賦予給loader
    const loader = loading(contentDom);
    return {
      admin,
      status,
      contentDom,
      loader,
    }
  },
};
</script>
