import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/reset.css'
import 'vant/lib/index.css'
import '@/assets/iconFont/iconfont.css'
import publicDatas from './publicData'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// import VConsole from 'vconsole';
// const con = new VConsole()
const app = createApp(App);

for (const key in publicDatas) {
    if (Object.prototype.hasOwnProperty.call(publicDatas, key)) {
        console.log(key,publicDatas[key])
        app.config.globalProperties[`$${key}`] = publicDatas[key];
    }
}

app.use(pinia).use(router).mount('#app')