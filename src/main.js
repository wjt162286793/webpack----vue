const Vue = require('vue')
import Main from './main.vue'
export const mainVue = Vue.createApp(Main)
// const body = document.querySelector('body')
// const main = document.createElement('div')
// body.appendChild(main)
// main.className = 'main'

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

console.log(process.env,'环境变量-----')


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

//创建实例
import request from './utils/requestUtils'

//注册模块
mainVue.use(router)
mainVue.use(store)
mainVue.use(RelationGraph)
mainVue.use(Editor)
mainVue.use(Toolbar)

mainVue.config.globalProperties.$axios = request;
mainVue.config.globalProperties.$echarts = echarts

//element-plus样式和组件引入
import 'element-plus/dist/index.css'
// 图标和组件需要分开引入
import {componentList,iconList} from '@/javascript/elementPlus'
componentList.forEach(item=>{
    mainVue.component(item.name,item.element)
})
iconList.forEach(item=>{
    mainVue.component(item.name,item.element)
})

//vxe-table的组件引用
import useTable from '@/javascript/vxeTable'
mainVue.use(useTable)

//挂载vue
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




