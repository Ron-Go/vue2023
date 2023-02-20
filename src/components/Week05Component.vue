<template>
  <div class="container"
    :style="{
      opacity: admin.tempProducts.length ? 1 : 0,
    }"
    style="transition: all 3s">
    <div class="mt-4">
      <!-- 產品Modal -->

      <!-- 產品Modal -->

      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th class="text-start ps-6">商品名稱</th>
            <th class="text-start ps-6">價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in admin.tempProducts" :key="'item' + key">
            <td style="width: 200px">
              <img
                :src="item.imageUrl"
                :alt="'img' + (key + 1)"
                style="height: 100px; background-size: cover; background-position: center"
              />
            </td>
            <td class="text-start ps-6">{{ item.title }}</td>
            <td class="align-middle text-start ps-6">
              <p class="h5">
                <del class="h6 text-muted">原價 {{ thousandths(item.origin_price) }} 元</del>
              </p>
              <p class="h5 text-danger">現在只要 {{ thousandths(item.price) }} 元</p>
            </td>
            <td class="align-middle">
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary" @click="openModal(item)">
                  <i class="fas fa-spinner fa-pulse"></i>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="cart.addCart(item.id)">
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 購物車列表 -->
      <div v-if="!cart.tempCart.carts?.length">
        <h4 class="text-center my-5">購物車為空的</h4>
      </div>
      <div v-else>
        <div class="text-end">
          <button class="btn btn-outline-danger position-relative" type="button" @click="cart.delCartItems()">
            清空購物車
          </button>
        </div>
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th width="150">數量/單位</th>
              <th width="200">單價</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="(item, key) in cart.tempCart.carts" :key="'item' + key">
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-md"
                    @click="cart.delCartItem(item.id)"
                  >X</button>
                </td>
                <td class="align-middle">
                  {{ item.product.title }}
                  <div v-if="item.coupon?.is_enabled" class="text-success">已套用優惠券</div>
                </td>
                <td class="align-middle">
                  <div class="input-group input-group-sm">
                    <div class="input-group my-2">
                      <input
                        min="1"
                        type="number"
                        class="form-control"
                        v-model.number="item.qty"
                        @change="cart.changeQty(item)"/>
                      <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-end align-middle text-center">
                  <small v-if="item.coupon?.is_enabled" class="text-success">折扣價：</small>
                  {{ thousandths(item.final_total) }}
                </td>
              </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-center fw-bold">{{ thousandths(cart.tempCart.final_total) }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-center fw-bold text-success">{{ thousandths(cart.tempCart.final_total) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    
    <div v-if="cart.tempCart.carts?.length" class="my-5 row justify-content-center">
      <v-form class="col-md-6" id="form" v-slot="{ errors }" @submit="submit">
        <!-- email -->
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <v-field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="submitData.user.email"
          ></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>
        <!-- name -->
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="submitData.user.name"
          ></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>
        <!-- tel -->
        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field
            id="tel"
            name="電話"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="required"
            v-model="submitData.user.tel"
          ></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="submitData.user.address"
          ></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="submitData.message"
            ></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </v-form>
    </div>
  </div>
  <div
    class="modal fade"
    id="productModal"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ admin.tempData.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="admin.tempData.imageUrl" :alt="'img' + admin.tempData.num" />
            </div>
            <div class="col-sm-6 text-start">
              <span class="badge bg-primary rounded-pill">{{ admin.tempData.category }}</span>
              <p>
                <span class="fw-bold">商品描述：</span>
                {{ admin.tempData.description }}
              </p>
              <p>
                <span class="fw-bold">商品內容：</span>
                {{ admin.tempData.content }}
              </p>
              <div class="h5">{{ admin.tempData.price }} 元</div>
              <del class="h6">原價 {{ admin.tempData.origin_price }} 元</del>
              <div class="h5">現在只要 {{ admin.tempData.price }} 元</div>
              <div>
                <div class="input-group">
                  <input type="number" class="form-control" min="1" v-model="admin.tempData.qty" />
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    @click="cart.addCart(admin.tempData.id, admin.tempData.qty)">加入購物車</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 匯入ref
import { onMounted } from 'vue';
// 匯入storeToRefs
import { storeToRefs } from 'pinia';
// 匯入adminStore
import adminStore from '@/stores/admin/adminStore';
// 匯入cartStore
import cartStore from '@/stores/cartStore.js';
// 匯入orderStore
import orderStore from '@/stores/admin/ordersStore.js';
// 匯入bootstrap Modal
import Modal from 'bootstrap/js/src/modal.js';
// 匯入useLoading
import { useLoading } from 'vue3-loading-overlay';
// 匯入mixin方法（價格千分位、轉換時間）
import { thousandths, convertDate } from '../mixins/mixinsFunc.js'

export default {
  setup() {
    const admin = adminStore(); // adminStore實體
    const cart = cartStore(); // cartStore實體
    const order = orderStore(); // orderStore實體
    const { submitData } = storeToRefs(order);
    // 產品查看更多
    const openModal = (item) => {
      admin.tempData = { ...item };
      admin.tempData.qty = 1;
      const productModal = new Modal(document.getElementById('productModal'));
      productModal.show();
    };
    // 監聽adminStore的actions
    admin.$onAction(({ name, after }) => {
      // actions的getProducts結束時，關掉loading圖示
      if (name === 'getProducts') {
        after(() => {
          vueLoading.hide();
        });
      };
    });
    // 送出訂單
    const submit = async () => {
      await order.submit();
      setTimeout(() => {
        order.$reset(); // orderStore的資料回初始值
      }, 1000);
    }
    // 建立閉包私有方法（vue3-loading-overlay實體，loader.show()並帶入物件參數{}）
    const loading = () => {
      let loader = useLoading();
      return {
        show: (container) => {
          //vue-loading-overlay出現的DOM元素
          const containerDom = document.querySelector(container);
          loader.show({
            // Optional parameters
            container: containerDom ? containerDom : null,
            canCancel: false,
            // onCancel: onCancel,
            loader: 'Bars', //spinner/dots/bars
            color: 'green',
            width: 50,
            height: 50,
            backgroundColor: '#ffffff',
            opacity: 1.0,
            zIndex: 999,
          });
        },
        hide: () => {
          setTimeout(() => {
            loader.hide();
          }, 1000);
        }
      }    
    };
    // vue-loading-overlay實體賦予給loader
    const vueLoading = loading();
    // 掛載組件後調用
    onMounted(() => {
      // 檢查登入狀態，取得產品資料
      admin.checkStatus();
      // 取得購物車內容
      cart.getCart();
      vueLoading.show();
    });
    return {
      admin,
      cart,
      order,
      openModal,
      submit,
      submitData,
      thousandths,
    };
  },
};
</script>
