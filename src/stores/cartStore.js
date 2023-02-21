import { defineStore } from 'pinia';
// 匯入statusStore
import statusStore from '@/stores/statusStore';

export default defineStore('cartStore', {
  state: () => ({
    // api資料
    api: {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'vue2022ron',
    },
    // 取得遠端購物車內容
    tempCart: {}
  }),
  getters: {},
  actions: {
    // 取得購物車內容
    getCart() {
      this.axios.get(`${this.api.url}/api/${this.api.path}/cart`)
        .then(res => {
          // 取得購物車資料
          this.tempCart = res.data.data;
        })
        .catch(err => {
          const status = statusStore(); // 建立statusStore實體
          status.swAlert('center', 'error', err.response.data.message, false, false);
        });
    },
    // 增加到購物車(加入數量，預設值1)
    addCart(id, qty = 1) {
      const status = statusStore(); // 建立statusStore實體
      this.axios.post(`${this.api.url}/api/${this.api.path}/cart`, { 
        data: {
          "product_id": id,
          "qty": qty,
        },
      })
        .then(res => {
          this.getCart();
          // 跳出狀態提示
          status.swAlert('top-end', 'success', `此商品${res.data.message}`, false, true);
        })
        .catch(err => {
          status.swAlert('center', 'error', err.response.data.message, false, false);
        });
    },
    // 更改購物車商品數量
    changeQty(item) {
      const status = statusStore(); // 建立statusStore實體
      this.axios.put(`${this.api.url}/api/${this.api.path}/cart/${item.id}`, {
        data: { 
          "product_id": item.id,
          "qty": item.qty,
        }
      })
        .then(res => {
          this.getCart();
          // 跳出狀態提示
          status.swAlert('top-end', 'success', `${res.data.message}商品數量`, false, true);
        })
        .catch(err => {
          status.swAlert('center', 'error', err.response.data.message, false, false);
        });
    },
    // 刪除購物車商品（單項）
    delCartItem(id) {
      const status = statusStore(); // 建立statusStore實體
      this.axios.delete(`${this.api.url}/api/${this.api.path}/cart/${id}`)
        .then(res => {
          this.getCart(); // 重新取得購物車資料
          // 跳出狀態提示
          status.swAlert('top-end', 'success', `此商品${res.data.message}`, false, true);
        })
        .catch(err => {
          status.swAlert('center', 'error', err.response.data.message, false, false);
        });
    },
    // 刪除購物車商品（全部）
    delCartItems() {
      const status = statusStore(); // 建立statusStore實體
      this.axios.delete(`${this.api.url}/api/${this.api.path}/carts`)
        .then(res => {
          this.getCart(); // 重新取得購物車資料
          // 跳出狀態提示
          status.swAlert('top-end', 'success', `購物車全部${res.data.message}`, false, true);
        })
        .catch(err => {
          status.swAlert('center', 'error', err.response.data.message, false, false);
        });
    },
  },
  // 在actions後面被插件讀取
  // 建立debounce選項，讓action能夠實現防抖
  debounce: {
    // actions 修改購物車商品數量、增加到購物車，防抖500ms
    changeQty: 500,
    addCart: 500,
  },
});