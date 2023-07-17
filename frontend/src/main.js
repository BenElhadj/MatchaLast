import { createApp } from 'vue'
import vClickOutside from 'v-click-outside'
import { createPinia } from 'pinia'
import io from 'socket.io-client'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import { Quasar } from 'quasar'
import quasarUserOptions from '../quasar.config.js'
import 'quasar/dist/quasar.css'

const app = createApp(App)
app.use(createPinia())
app.use(vClickOutside)

app.use(Quasar, quasarUserOptions)

const socket = io('http://localhost:3000', {
  withCredentials: true
})

app.config.globalProperties.$socket = socket

// Add the socket instance to the store
store.$socket = socket

// eslint-disable-next-line
String.prototype.escapeHtml = function () {
  return this
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

app.use(router)
app.use(store)
app.mount('#app')
