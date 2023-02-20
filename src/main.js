/* all import */
import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
// router
import router from './router';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// sweet alert2
import Swal from 'sweetalert2/dist/sweetalert2.js';
// vee-validate
import { Form, Field, ErrorMessage } from 'vee-validate';
import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules/dist/vee-validate-rules.js';
import { configure } from 'vee-validate';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
// lodash函式庫的debounce
import debounce from 'lodash/debounce';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

/* 建立實體 */
const pinia = createPinia(); // pinia實體
const app = createApp(App); // app實體

/* app.use */
app.use(router);
app.use(VueAxios, axios);
app.use(pinia);

// 在每個pinia store添加router、axios、sweet alert2
pinia.use(({ store }) => {
 store.router = markRaw(router);
 store.axios = markRaw(axios);
 store.Swal = markRaw(Swal);
 store.$subscribe(() => {
  // 訂閱store變化
 });
 store.$onAction(() => {
  // 訂閱store actions
 })
});

pinia.use(({ options, store }) => {
 if (options.debounce) {
  // 我们正在用新的 action 来覆盖这些 action
  return Object.keys(options.debounce).reduce((debouncedActions, action) => {
   debouncedActions[action] = debounce(
    store[action],
    options.debounce[action]
   )
   return debouncedActions
  }, {})
 }
});

/* vee-validate設定 */
// 定義所有可用規則
Object.keys(AllRules).forEach((rule) => {
 defineRule(rule, AllRules[rule]);
});
// 進行configure設定
configure({
 generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
 validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

/* app.use */
// 註冊全域表單驗證元件（vee-validate）
app.component('vForm', Form);
app.component('vField', Field);
app.component('ErrorMessage', ErrorMessage);

/* app.mount */
app.mount('#app');
