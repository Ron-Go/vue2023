import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
// 在每個pinia store添加router
pinia.use(({ store }) => {
 store.router = markRaw(router);
});
// 把axios、sweet alert2加入全部的store
pinia.use(() => {
 return{
  axios,
  Swal,
 }
});
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
