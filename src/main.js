// const body = document.querySelector('body')
// const main = document.createElement('div')
// body.appendChild(main)
// main.className = 'main'

//主题模块
// import 'element-plus/theme-chalk/dark/css-vars.css'
// const htmlNode = document.querySelector('html')
// htmlNode.className = 'dark'

import './style/global.css'
import './style/reset.css'
// import './style/theme.css'
import './style/elmentPlus-theme.css'
import './style/theme/blue.css'
import './style/theme/deepBlue.css'
import './style/theme/deepPurple.css'
import './style/theme/green.css'
import './style/theme/purple.css'
import './style/theme/red.css'

//element-plus模块
const ElementPlus = require('element-plus')
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//echarts模块
import echarts from './javascript/chart';
// import "echarts-gl";

//graph图谱
const RelationGraph = require('relation-graph/vue3')

//vue3TreeOrg关系图库

//富文本编辑器
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

//路由
import router from './router/index'
import './router/guardRouter'

//vuex
import store from './store/index'

//vxe-table
const VXETable = require('vxe-table')
import 'vxe-table/lib/style.css'
function useTble(app) {
  app.use(VXETable)
}

//创建实例
import request from './utils/requestUtils'
import Main from './main.vue'
// export const mainVue = createApp(Main)
const Vue = require('vue')
export const mainVue = Vue.createApp(Main)

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
mainVue.use(useTble)
mainVue.config.globalProperties.$axios = request;
mainVue.config.globalProperties.$echarts = echarts
mainVue.mount('.main')


// 监控溢出报错 (error1)
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}




