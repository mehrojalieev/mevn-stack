import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import routes from './routes'; 

// import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'primeicons/primeicons.css'



const app = createApp(App);

app.use(routes);


// Mount the app
app.mount('#app');
