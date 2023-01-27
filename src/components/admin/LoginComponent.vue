<template>
  <div class="container">
      <div class="row vh-100 d-flex flex-column align-items-center">
        <div class="col-4 mt-auto mb-auto">
          <form>
            <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="account" placeholder="name@example.com" v-model="login.adminData.username">
              <label for="account">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="password" placeholder="Password" v-model="login.adminData.password">
              <label for="password">Password</label>
            </div>
            <button type="submit" class="btn btn-lg btn-primary mt-3 w-100" @click="login.signin()">登入</button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
// 匯入loginStore
import loginStore from '@/stores/admin/loginStore';



export default {
  setup() {
    const login = loginStore();
    return{
      login,
    };
  },
};
</script>
