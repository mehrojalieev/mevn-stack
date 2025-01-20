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


const pinia = createPinia()

const app = createApp(App);
pinia.use(piniaPluginPersistedState)

app.use(routes);
app.use(Toast);
app.use(naive)
app.use(pinia)


// Mount the app
app.mount('#app');
