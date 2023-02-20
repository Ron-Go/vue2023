import { defineStore } from "pinia";
// 匯入statusStore
import statusStore from '@/stores/statusStore';
// 匯入cartStore
import cartStore from '@/stores/cartStore';


export default defineStore('orderStore', {
  state: () => ({
    // 欲送出的訂單資料
    submitData: {
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      message: '',
    },
    // 遠端取得的orders資料
    tempOrders: [],
    // 檢視訂單資料
    tempData: {},
    // orders分頁資料
    pagination: {},
    // api資料
    api: {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'vue2022ron',
    },
  }),
  getters: {

  },
  actions: {
    // 取得訂單資料
    getOrders() {
      this.axios.get(`${this.api.url}/api/${this.api.path}/admin/orders`)
        .then(res => {
          // 取得對應分類選單的產品資料、分頁資料
          this.tempOrders = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch(err => {
          const status = statusStore(); // 建立statusStore實體
          status.swAlert('center', 'error', err.response.data.message, false, false);
        });
    },
    // 驗證登入
    checkStatus() {
      (async () => {
        // 從cookie取得token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        this.axios.defaults.headers.common["Authorization"] = token;
        try {
          // 驗證登入狀態
          const res1 = await this.axios.post(`${this.api.url}/api/user/check`)
          // 取得驗證確認
          this.checkResult = res1.data.success;
          // 取得資料
          this.getProducts();
        } catch (error) {
          const status = statusStore(); // 建立statusStore實體
          await status.swAlert('center', 'error', error.response.data.message, false, false);
          // 轉跳login頁面
          this.router.push('/login');
        }
      })();
    },
    // 送出訂單
    submit() {
      const status = statusStore();
      const cart = cartStore();
      this.axios.post(`${this.api.url}/api/${this.api.path}/order`, { data: this.submitData })
        .then(res => {
          cart.getCart(); // 重新取得購物車資料
          // 跳出狀態提示
          status.swAlert('center', 'success', `訂購的商品${res.data.message}`, false, false);
        })
        .catch(err => {
          status.swAlert('center', 'error', err.response.data.message , false, false);
        })
    },
    //變更付款狀態
    changePaid() {
      this.axios.put(`${this.api.url}/api/${this.api.path}/admin/order/${this.tempData.id}`, { data: this.tempData })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 更改產品遠端資料
    async put() {
      const status = statusStore(); // 建立statusStore實體
      try {
        // 修改商品內容
        const res1 = await this.axios.put(`${this.api.url}/api/${this.api.path}/admin/product/${id}`, { data: putData });
        // 根據分類選單的值，代入category參數，取得資料
        this.getProducts(this.selectEl.value);
        // 跳出狀態提示
        await status.swAlert('top-end', 'success', res1.data.message, false, true);
      } catch (error) {
        status.swAlert('top-end', 'error', error.response.data.message, false, true);
      };
    },
  }
})