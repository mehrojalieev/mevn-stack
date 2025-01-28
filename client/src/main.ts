import { createApp } from 'vue';
import './style.scss';
import Toast from "vue-toastification"
import App from './App.vue';
import routes from './routes'; 
import naive from "naive-ui"
import 'primeicons/primeicons.css'
import "vue-toastification/dist/index.css";
import {createPinia} from "pinia"
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import i18n from './i18n';


const pinia = createPinia()

const app = createApp(App);
pinia.use(piniaPluginPersistedState)

app.use(i18n)
app.use(routes);
app.use(Toast);
app.use(naive)
app.use(pinia)


// Mount the app
app.mount('#app');
