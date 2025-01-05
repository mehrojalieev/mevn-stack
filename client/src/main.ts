import { createApp } from 'vue';
import './style.scss';
import Toast from "vue-toastification"
import App from './App.vue';
import routes from './routes'; 

// import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'primeicons/primeicons.css'
import "vue-toastification/dist/index.css";



const app = createApp(App);

app.use(routes);
app.use(Toast);


// Mount the app
app.mount('#app');
