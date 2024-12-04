import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import routes from './routes'

const app = createApp(App)

app.use(routes)

app.mount('#app')
