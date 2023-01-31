import { defineStore } from "pinia";

// 匯入axios
import axios from 'axios';

// 匯入statusStore
import statusStore from '@/stores/statusStore';
const status = statusStore();

export default defineStore('adminStore', {
  state: () => ({
    checkResult: null,
    // 遠端取得的products資料
    tempProducts: [],
    // api資料
    api: {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'vue2022ron',
    },
    // 新增產品資料
    tempData: {},
    // 所有產品分類
    AllCategory: [''],
    // 模式新增'add'或修改'edit'
    operateMode: '',
    pagination: {},
    // 分類選單Dom
    selectEl: null, 
    test: 0,
  }),
  getters: {
  },
  actions: {
    // 取得所有產品分類
    getAllCategory() {
      axios.get(`${this.api.url}/api/${this.api.path}/admin/products/all`)
        .then(res => {
          // 取得所有商品物件資料
          const allProducts = res.data.products
          // 取得所有商品物件屬性
          const allAttr = Object.keys(allProducts);
          // 所有商品物件屬性，進行forEach
          allAttr.forEach(value => {
            let repeatNum = 0;
            // 陣列AllCategory進行forEach
            this.AllCategory.forEach(item => {
              // 陣列AllCategory的每個item，跟allProducts[value].category做比對
              item === allProducts[value].category ? repeatNum ++ : repeatNum += 0;
            });
            // 如果都沒有相同的，就把allProducts[value].category『push』到所有產品分類AllCategory
            repeatNum === 0 ? this.AllCategory.push(allProducts[value].category) : '';
          });
        })
        .catch(err => {
          const { message } = err.response.data;
          status.swAlert('center', 'error', message, false, false);
        });
    },
    // 改變分類取得商品資料
    selectOnChange(e) {
      // change行為得到select的值，代入
      this.getProducts(e.target.value);
    },
    // 取得全部商品
    getProducts(category = '') {
      axios.get(`${this.api.url}/api/${this.api.path}/admin/products/?category=${category}`)
        .then(res => {
          // 取得對應分類選單的產品資料、分頁資料
          this.tempProducts = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch(err => {
          const { message } = err.response.data;
          status.swAlert('center', 'error', message, false, false);
        });
    },
    // 驗證登入
    checkStatus() {
      (async () => {
        // 從cookie取得token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common["Authorization"] = token;
        try {
          // 驗證登入狀態
          const res1 = await axios.post(`${this.api.url}/api/user/check`)
          // 取得驗證確認
          this.checkResult = res1.data.success;
          // 取得資料
          this.getProducts();
        } catch (error) {
          const { message } = error.response.data;
          await status.swAlert('center', 'error', message, false, false);
          // 轉跳login頁面
          this.router.push('/login');
        }
      })();
    },
    // 新增資料至遠端
    add(tempData) {
      (async () => {
        try {
          // 新增商品內容
          const res1 = await axios.post(`${this.api.url}/api/${this.api.path}/admin/product`, { data: tempData });
          // 取得資料，代入category參數（根據分類選單的值）
          this.getProducts(this.selectEl.value);
          // 跳出狀態提示
          status.swAlert('top-end', 'success', res1.data.message, false, true);
        } catch (error) {
          status.swAlert('top-end', 'error', error.response.data.message, false, true);
        }
      })();
    },
    // 更改遠端資料
    put(id, putData) {
      (async () => {
        try {
          // 修改商品內容
          const res1 = await axios.put(`${this.api.url}/api/${this.api.path}/admin/product/${id}`, { data: putData });
          // 取得資料，代入category參數（根據分類選單的值）
          this.getProducts(this.selectEl.value);
          // 跳出狀態提示
          await status.swAlert('top-end', 'success', res1.data.message, false, true);
        } catch (error) {
          status.swAlert('top-end', 'error', error.response.data.message, false, true);
        };
      })();
    },
    // 換頁
    changePage(page) {
      // 取得全部商品
      axios.get(`${this.api.url}/api/${this.api.path}/admin/products/?page=${page}`)
        .then(res => {
          // 取得全部商品
          this.tempProducts = res.data.products;
          // 取得分頁資料
          this.pagination = res.data.pagination;
        })
        .catch(err => {
          status.swAlert('top-end', 'error', err.response.data, false, true);
        })
    },
    // 變更啟用狀態
    changeStatus(item) {
      const { id } = item;
      let itemData = {...item};
      // 更改產品is_enable的布林值
      itemData.is_enabled = !itemData.is_enabled;
      this.put(id, itemData);
    },
    // 確認產品
    confirmProduct() {
      const { id } = this.tempData;
      if (this.operateMode === 'edit') {
        this.put(id, this.tempData);
      } else if (this.operateMode === 'add') {
        this.add(this.tempData);
      }
    },
    // 產品列表項目排序
    itemSort(attr) {
      this.tempProducts.sort((a, b) => {
        return b[attr] - a[attr];
      })
    },
  },
});