<template lang="">
  <!-- v-for用.total_pages去渲染所有頁數 -->
  <!-- 點擊頁數、前一頁、後一頁，透過emit觸發外層根元件『同一個』methods -->
  <!-- 點擊頁數，把頁數作為參數用emit代入外層根元件methods，取得對應頁數的商品資料 -->
  <!-- 點擊前一頁、後一頁，把當前頁數current_page加減後，作為參數用emit代入外層根元件methods -->

  <ul class="pagination">
    <li class="page-item" :class="{ disabled: !pagination.has_pre }">
      <a class="page-link" href="#" aria-label="Previous"
      @click.prevent="admin.changePage(pagination.current_page - 1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li v-for="(page, key) in pagination?.total_pages" :key="'key' + page" class="page-item">
      <a class="page-link" href="#"
      :class="{ active: pagination.current_page === page}"
      @click.prevent="admin.changePage(page)">
        {{ page }}
      </a>
    </li>
    <li class="page-item" :class="{ disabled: !pagination.has_next }">
      <a class="page-link" href="#" aria-label="Next"
      @click.prevent="admin.changePage(pagination.current_page + 1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</template>

<script>
  import { ref, watch } from 'vue';
  // 匯入adminStore
  import adminStore from '@/stores/admin/adminStore';

  export default {
    setup() {
      const admin = adminStore();
      // 將admin.pagination物件分頁資料，轉成ref物件，已便watch時更新
      const pagination = ref(admin.pagination);
      // 深層監聽admin，有變動時更新pagination物件
      watch(admin, (newValue) => {
        pagination.value = newValue.pagination;
      }, {deep: true});
      return {
        pagination,
        admin,
      };
    },
  };
</script>