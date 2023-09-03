import { mainVue } from '@/main'
import store from '@/store/index'
let routesName = store.state.role.flatRoutesName
console.log(routesName, '???routesName')
mainVue.directive('btnRole', (el, binding) => {

})