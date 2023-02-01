import { defineStore } from "pinia";

// 匯入statusStore
import statusStore from '@/stores/statusStore';

export default defineStore('loginStore', {
  state: () => ({
    adminData: {},
  }),
  getters: {
  },
  actions: {
    // 登入
    signin() {
      const api = {
        url: 'https://vue3-course-api.hexschool.io/v2',
        path: 'vue2022ron',
      };
      const status = statusStore(); // 建立statusStore實體
      if (this.adminData.username === undefined || this.adminData.password === undefined) return;
      (async () => {
        try {
          const res1 = await this.axios.post(`${api.url}/admin/signin`, this.adminData);
          this.cleanInputValue();
          const { expired, message, token } = res1.data;
          // 把token、expired存入cookie
          document.cookie = `myToken = ${token}; expires = ${new Date(expired)};`;
          // 跳出狀態提示（加await轉為同步行為，已改為promise base）
          await status.swAlert('center', 'success', message, false, false);
          // 轉跳admin頁面
          this.router.push('/admin/products');
        } catch (err) {
          const { message } = err.response.data;
          this.cleanInputValue();
          // 跳出狀態提示
          status.swAlert('center', 'error', message, false, false);
        }
      })();
    },
    // 清除輸入欄
    cleanInputValue() {
      this.adminData.username = undefined;
      this.adminData.password = undefined;
    },
  },
});
