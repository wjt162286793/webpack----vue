// const body = document.querySelector('body')
// const main = document.createElement('div')
// body.appendChild(main)
// main.className = 'main'
document.body.dataset.theme = 'purple'
import './style/global.css'
import './style/reset.css'
import './style/theme.css'
import './style/elmentPlus-theme.css'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import './router/guardRouter'
import store from './store/index'


import { createApp } from 'vue'
import request from './utils/requestUtils'
import Main from './main.vue'
const mainVue = createApp(Main)

mainVue.use(router)
mainVue.use(ElementPlus)
mainVue.use(store)
mainVue.config.globalProperties.$axios = request;
mainVue.mount('.main')






