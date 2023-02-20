import { defineStore } from "pinia";

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
          this.Swal.fire({
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
      this.Swal.fire({
        title: `刪除產品『${product.title}』?`,
        text: "資料刪除後，將無法恢復！",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認刪除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(`${this.api.url}/api/${this.api.path}/admin/product/${product.id}`)
            .then((res) => {
              this.Swal.fire(
                res.data.message,
                '你的資料已被刪除',
                'success'
              );
              const admin = adminStore();  // 建立adminStore實體
              // 資料刪除後再重新取得產品資料(category代入分類選單的值)
              this.axios.get(`${this.api.url}/api/${this.api.path}/admin/products/?category=${admin.selectEl.value}`)
                .then(res => {
                  // 取得對應分類選單的產品資料
                  admin.tempProducts = res.data.products;
                })
                .catch(err => {
                  this.swAlert('center', 'error', err.response.data.message, false, true);
                })
            })
            .catch((err) => {
              this.Swal.fire(
                err.response.data.message,
                '你的資料尚未被刪除',
                'error'
              );
            });
        }
      })
    },
    // 登出
    logout() {
      this.Swal.fire({
        title: `是否『登出』後台`,
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認登出',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.post(`${this.api.url}/logout`)
            .then(res => {
              this.Swal.fire(
                res.data.message,
                '',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                  // 轉跳login頁面
                  this.router.push('/login');
                }
              });
            })
            .catch(err => {
              this.Swal.fire(
                err.response.data.message,
                '',
                'error'
              );
            });
        }
      })
    },
  },
});