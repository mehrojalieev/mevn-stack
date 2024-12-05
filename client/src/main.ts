import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import routes from './routes'
import PrimeVue from 'primevue/config';

import 'primeicons/primeicons.css'; 


const app = createApp(App)

import  {Column, DataTable, Tag, Button, Rating, Select}  from 'primevue';

app.use(PrimeVue)

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Tag', Tag);
app.component('Button', Button);
app.component('Rating', Rating);
app.component('Select', Select)



app.use(routes)

app.mount('#app')
