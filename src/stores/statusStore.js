import { defineStore } from "pinia";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';

// 匯入adminStore
import adminStore from '@/stores/admin/adminStore';


export default defineStore('statusStore', {
  state: () => ({
    // api資料
    api: {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'vue2022ron',
    },
  }),
  getters: {
  },
  actions: {
    // sweet Alert2套件
    swAlert(pos, icon, title, showConfirmBtn, toast) {
      // 用Promise base包起來，調用的時候加上await轉為同步
      return new Promise((resolve, reject) => {
        resolve(
          Swal.fire({
            position: pos,    // 出現位置
            icon: icon,
            title: title,
            showConfirmButton: showConfirmBtn,
            timer: 2500,  // 出現時間
            toast: toast, // false: toast; true: alert
          })
        );
      })
    },
    swDelect(product) {
      Swal.fire({
        title: `確認刪除『${product.title}』?`,
        text: "資料刪除後，你將無法恢復！",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認刪除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${this.api.url}/api/${this.api.path}/admin/product/${product.id}`)
            .then((res) => {
              console.log(res);
              Swal.fire(
                res.data.message,
                '你的資料已被刪除',
                'success'
              );
              // 建立adminStore實體
              const admin = adminStore();
              // category代入分類選單的值
              axios.get(`${this.api.url}/api/${this.api.path}/admin/products/?category=${admin.selectEl.value}`)
                .then(res => {
                  // 取得對應分類選單的產品資料
                  admin.tempProducts = res.data.products;
                })
                .catch(err => {
                  this.swAlert('center', 'error', err.response.data.message, false, true);
                })
            })
            .catch((err) => {
              console.log(err);
              Swal.fire(
                err.response.data.message,
                '你的資料尚未被刪除',
                'error'
              );
            });
        }
      })
    }
  },
});