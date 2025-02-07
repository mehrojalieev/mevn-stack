import './style.scss';
import i18n from './i18n';
import App from './App.vue';
import naive from "naive-ui"
import routes from './routes'; 
import { createApp } from 'vue';
import {createPinia} from "pinia"
import 'primeicons/primeicons.css'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css";
import piniaPluginPersistedState from "pinia-plugin-persistedstate"


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
