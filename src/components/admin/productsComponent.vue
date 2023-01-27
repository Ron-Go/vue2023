<template>
  <!-- v-if條件：取得產品資料 && 通過登入驗證(token) -->
  <div v-if="admin.tempProducts.length && admin.checkResult" class="container px-0">
    <div class="text-end mt-4">
      <button class="btn btn-success" @click="addItem()">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120" @click="admin.itemSort('origin_price')">
            原價
          </th>
          <th width="120" @click="admin.itemSort('price')">
            售價
          </th>
          <th width="100" @click="admin.itemSort('is_enabled')">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in admin.tempProducts" :key="item.id">
          <td width="120">{{ item.category }}</td>
          <td width="100">{{ item.title }}</td>
          <td class="" width="120">{{ item.origin_price }}</td>
          <td class="" width="120">{{ item.price }}</td>
          <td>
            <span 
            :class="{ 
              'text-success': item.is_enabled,
              'text-danger': !item.is_enabled 
            }"
            @click="admin.changeStatus(item)">{{item.is_enabled ? '啟用' : '未啟用'}}</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="editItem(item)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="status.swDelect(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component :pagination="admin.pagination"></pagination-component>
  </div>
  <product-modal></product-modal>
</template>

<script>
  import { ref, reactive } from 'vue';
  // 匯入bootstrap Modal
  import Modal from 'bootstrap/js/src/modal.js';
  // 匯入productModal
  import productModal from '@/components/admin/productModal';
  // 匯入productModal
  import paginationComponent from '@/components/admin/paginationComponent';
  // 匯入adminStore
  import adminStore from '@/stores/admin/adminStore';
  // 匯入statusStore
  import statusStore from '@/stores/statusStore';
  // 匯入生命週期onMounted
  import { onMounted } from 'vue';
  
  export default {
    components: {
      productModal,
      paginationComponent,
    },
    setup() {
      const admin = adminStore();
      const status = statusStore();
      // 開啟modal視窗
      const openModal = () => {
        const productModal = new Modal(document.getElementById('productModal'));
        productModal.show();
      };
      // 新增商品
      const addItem = () => {
        admin.operateMode = '';
        admin.tempData = {};
        openModal();
        admin.operateMode = 'add';
      };
      // 修改商品
      const editItem = (item) => {
        admin.operateMode = '';
        admin.tempData = {};
        openModal();
        admin.operateMode = 'edit';
        // 把代入的產品資料，傳到adminStore
        admin.tempData = {...item};
      };
      onMounted(() => {
        // 檢查登入狀態
        admin.checkStatus();
      });
      return {
        admin,
        status,
        openModal,
        addItem,
        editItem,
      };
    },
  };
</script>