import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
pinia.use(({ store }) => {
 store.router = markRaw(router);
})
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
