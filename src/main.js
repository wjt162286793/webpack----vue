// const body = document.querySelector('body')
// const main = document.createElement('div')
// body.appendChild(main)
// main.className = 'main'


import router from './router/index'
import { createApp } from 'vue'
import Main from './main.vue'
const mainVue = createApp(Main)
mainVue.use(router)
mainVue.mount('.main')


import './style/global.css'
