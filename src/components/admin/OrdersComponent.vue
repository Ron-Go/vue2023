<template lang="">
  <div class="container">
    <div class="row">
      <div class="col-11 mx-auto">
        <table class="table table-hover mt-5">
          <thead>
            <tr>
              <th width="150">下單時間</th>
              <th width="150">Email</th>
              <th width="200">購買內容</th>
              <th width="120">應付金額</th>
              <th width="120">付款狀態</th>
              <th width="120">訂單管理</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in order.tempOrders" :key="'item' + key">
              <td class="text-start">{{ convertDate(item.create_at) }}</td>
              <td class="text-start">{{ item.user.email }}</td>
              <td>
                <ul class="list-unstyled" v-for="(item, key) in item.products" :key="'list' + key">
                  <li class="text-start fs-6">{{ item.product.title }} / 數量：{{ item.qty }}{{ item.product.unit }}</li>
                </ul>
              </td>
              <td class="text-center">{{ thousandths(item.total) }}</td>
              <!-- 是否付款 -->
              <td>
                <span
                  :class="{
                    'text-success':item.is_paid,
                    'text-danger': !item.is_paid,
                    'fw-bold': !item.is_paid,
                  }"
                >{{ `${item.is_paid ? '已付款' : '未付款'}` }}</span>
              </td>
              <!-- 編輯 -->
              <td>
                <div class="btn-group">
                  <button type="button"
                    class="btn btn-outline-success btn-sm"
                    @click="checkOrder(item)"
                    >檢視</button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    >刪除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <order-modal></order-modal>
</template>

<script>
// 匯入ref
import { ref, onMounted } from 'vue';
// 匯入oredersStore
import ordersStore from '@/stores/admin/ordersStore.js'
// 匯入bootstrap Modal
import Modal from 'bootstrap/js/src/modal.js';
// 匯入productModal
import orderModal from '@/components/admin/OrderModal';
// 匯入mixin方法（價格千分位、轉換時間）
import { thousandths, convertDate } from '../../mixins/mixinsFunc.js'

  export default {
    components: {
      orderModal,
    },
    props: ['store'],
    setup(props) {
      // 從外層adminView取得statusStore實體
      const { status } = props.store;
      // 建立ordersStore實體
      const order = ordersStore();
      // 開啟modal視窗
      const openModal = () => {
        const orderModal = new Modal(document.getElementById('orderModal'));
        orderModal.show();
      };
      const checkOrder = (item) => {
        openModal();
        order.tempData = item;
      };
      // 掛載組件後調用
      onMounted(() => {
        // 取得訂單資料
        order.getOrders();
      })
      return {
        order,
        thousandths,
        convertDate,
        openModal,
        checkOrder,
      };
    },
  };
</script>