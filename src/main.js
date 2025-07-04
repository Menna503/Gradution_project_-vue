import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { createPinia } from 'pinia';
import router from'./Router/index'
const app = createApp(App);
const pinia = createPinia();

app.use(vuetify).use(pinia).use(router).mount('#app');

