<template lang="">
  <div
    class="modal fade"
    id="orderModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="exampleModalLabel"
          >
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="order.tempData.user" class="container">
            <div class="row">
              <div class="col-6">
                <h5>用戶資料</h5>
                <table class="table">
                  <tbody>
                    <tr>
                      <th style="width: 100px">姓名</th>
                      <td>{{ order.tempData.user.name }}</td>
                    </tr>
                    <tr>
                      <th>E-mail</th>
                      <td>{{ order.tempData.user.email }}</td>
                    </tr>
                    <tr>
                      <th>電話</th>
                      <td>{{ order.tempData.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>地址</th>
                      <td>{{ order.tempData.user.address }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-6">
                <h5>訂單細節</h5>
                <table class="table">
                  <tbody>
                    <tr>
                      <th style="width: 100px">訂單編號</th>
                      <td>{{ order.tempData.id }}</td>
                    </tr>
                    <tr>
                      <th>下單時間</th>
                      <td>{{ convertDate(order.tempData.create_at) }}</td>
                    </tr>
                    <tr>
                      <th>付款狀態</th>
                      <td
                        class="fw-bold"
                        :class="{
                          'text-success': order.tempData.is_paid,
                          'text-danger': !order.tempData.is_paid,
                        }">
                        {{ `${order.tempData.is_paid ? '已付款' : '尚未付款'}` }}
                      </td>
                    </tr>
                    <tr v-if="order.tempData.paid_date">
                      <th>付款時間</th>
                      <td class="fw-bold">
                        <span class="text-success">{{
                          convertDate(order.tempData.paid_date)
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>總金額</th>
                      <td :class="{
                          'text-success': order.tempData.is_paid,
                          'text-danger': !order.tempData.is_paid,
                        }"
                        class="fw-bold">${{ thousandths(order.tempData.total) }}</td>
                    </tr>
                  </tbody>
                </table>
                <h5>選購商品</h5>
                <div
                  v-for="(item, key) in order.tempData.products"
                  :key="'product' + key"
                  class="card w-75 mb-3"
                >
                  <div class="card-body">
                    <h5 class="card-title">{{ item.product.title }}</h5>
                    <p class="card-text">
                      單價：<span class="pe-3">${{ thousandths(item.product.price) }}</span> 數量：<span
                        class="pe-3"
                        >{{ `${item.qty}${item.product.unit}` }}</span>
                      總價：<span class="text-danger fw-bold">${{ thousandths(item.total) }}</span>
                    </p>
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <p class="pe-3">變更付款狀態</p>
                  <div class="form-check form-switch">
                    <label class="form-check-label" :for="order.tempData.id">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="order.tempData.id"
                        v-model="order.tempData.is_paid"
                      />
                      <span class="fw-bold"
                      :class="{ 'text-success': order.tempData.is_paid }">
                        {{ `${order.tempData.is_paid ? '已付款' : '未付款'}` }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="order.changePaid()">
            變更付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 匯入loginStore
import ordersStore from '@/stores/admin/ordersStore';
// 匯入mixin方法（價格千分位、轉換時間）
import { thousandths, convertDate } from '../../mixins/mixinsFunc.js'

export default {
  setup() {
    const order = ordersStore();
    return {
      order,
      thousandths,
      convertDate,
    };
  },
}
</script>
