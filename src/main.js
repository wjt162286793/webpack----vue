// const body = document.querySelector('body')
// const main = document.createElement('div')
// body.appendChild(main)
// main.className = 'main'

//主题模块
document.body.dataset.theme = 'purple'
import './style/global.css'
import './style/reset.css'
import './style/theme.css'
import './style/elmentPlus-theme.css'

//element-plus模块
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//路由
import router from './router/index'
import './router/guardRouter'

//vuex
import store from './store/index'

//创建实例
import { createApp } from 'vue'
import request from './utils/requestUtils'
import Main from './main.vue'
const mainVue = createApp(Main)

//注册模块
mainVue.use(router)
mainVue.use(ElementPlus, {
    locale: zhCn,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    mainVue.component(key, component)
}
mainVue.use(store)
mainVue.config.globalProperties.$axios = request;
mainVue.mount('.main')






