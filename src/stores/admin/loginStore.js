import { defineStore } from "pinia";

// 匯入statusStore
import statusStore from '@/stores/statusStore';

export default defineStore('loginStore', {
  state: () => ({
    adminData: {
      username: '',
      password: '',
    },
  }),
  getters: {
  },
  actions: {
    searchContacts(fn) {
      fn();
    },
    test(attr) {
      const obj = {
        fn1: () => {
          console.log('a');
        },
        fn2: () => {
          console.log('b');
        },
      };
      this.searchContacts(obj[attr]);      
    },
    // 登入
    signin() {
      const api = {
        url: 'https://vue3-course-api.hexschool.io/v2',
        path: 'vue2022ron',
      };
      const status = statusStore(); // 建立statusStore實體
      const { swAlert } = status; // 把statusStore actions方法解構
      if (this.adminData.username === undefined || this.adminData.password === undefined) return;
      (async () => {
        try {
          const res1 = await this.axios.post(`${api.url}/admin/signin`, this.adminData);
          this.cleanInputValue();
          const { expired, message, token } = res1.data;
          // 把token、expired存入cookie
          document.cookie = `myToken = ${token}; expires = ${new Date(expired)};`;
          // 跳出狀態提示（加await轉為同步行為，已改為promise base）
          await swAlert('center', 'success', message, false, false);
          // 轉跳admin頁面
          this.router.push('/admin/products');
        } catch (err) {
          const { message } = err.response.data;
          this.cleanInputValue();
          // 跳出狀態提示
          swAlert('center', 'error', message, false, false);
        }
      })();
    },
    // 清除輸入欄
    cleanInputValue() {
      this.adminData.username = '';
      this.adminData.password = '';
    },
    // VeeValidate表單驗證rules
    isPassword(value) {
      // ^[a-zA-Z]：開頭為字母
      // \w：任何數字字元字母底線，等於[A-Za-z0-9_]
      // {6,8}$：長度6~8個字元之間
      const pwdRule = /^[a-zA-Z]\w{8,10}$/;
      return pwdRule.test(value) ? true : '密碼為字母開頭，長度8~10字元';
    },
  },
  debounce: {
    // 让 action searchContacts 防抖 300ms
    searchContacts: 1000,
  },
});
