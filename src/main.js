// const body = document.querySelector('body')
// const main = document.createElement('div')
// body.appendChild(main)
// main.className = 'main'

//主题模块
// import 'element-plus/theme-chalk/dark/css-vars.css'
// const htmlNode = document.querySelector('html')
// htmlNode.className = 'dark'
document.body.dataset.theme = 'blue'

import './style/global.css'
import './style/reset.css'
import './style/theme.css'
import './style/elmentPlus-theme.css'

//element-plus模块
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//echarts模块
import echarts from './javascript/chart';

//graph图谱
import RelationGraph from 'relation-graph/vue3'

//vue3TreeOrg关系图库

//富文本编辑器
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' 

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
mainVue.use(RelationGraph)
mainVue.use(Editor)
mainVue.use(Toolbar)
mainVue.config.globalProperties.$axios = request;
mainVue.config.globalProperties.$echarts = echarts
mainVue.mount('.main')






