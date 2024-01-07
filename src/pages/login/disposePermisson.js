import router from '@/router/index'
import { asyncRoutes } from '@/router/asyncRoutes';
import store from '@/store/index'
import request from '@/utils/requestUtils';
import { cloneDeep } from 'lodash';
;
let flatFun = (alllist) => {
  let List = []
  alllist.forEach((item, index) => {
    let newObj = {}
    newObj.path = item.path
    newObj.name = item.name
    newObj.meta = item.meta
    newObj.component = item.component
    List.push(newObj)
    if (item.children && item.children.length > 0) {
      console.log(item.children, 'children===')
      List = List.concat(flatFun(item.children))
    }
  })
  return List
}

export let getRolePermission = (menuPermissionList, asyncRouteList, next, to) => {
  let allAsyncRoutesList = cloneDeep(asyncRouteList)
  console.log(menuPermissionList, '菜单权限')
  console.log(allAsyncRoutesList, '全部路由')

  let flatRouteList = flatFun(allAsyncRoutesList)
  console.log(flatRouteList, '扁平化后的路由')
  // flatRouteList.forEach(item=>{
  //     router.addRoute(item)
  // })
  let filterRoute = []
  flatRouteList.forEach(Item => {
    if (menuPermissionList.findIndex(item => item.name === Item.name) !== -1) {
      filterRoute.push(Item)
    }
  })
  filterRoute.forEach(item => {
    router.addRoute(item)
  })
  console.log(router.getRoutes(), '得到的路由')
  store.dispatch('changeAsyncRouteFinish', true)
  if (next && to) {
    next({ ...to, replace: true })
  }

}

export let loginSuccessDone = (userInfo, next, to) => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  localStorage.setItem("token", userInfo.token);
  store.dispatch("changeUserInfo", userInfo);
  //  getRolePermission()
  request.get(`/app/userRole/roleList`).then(res => {
    if (res.code === 200) {
      let roleList = res.data
      console.log(roleList, '权限数据')
      let userRole = roleList.find(item => item.name === userInfo.role)
      let menuPermissionList = userRole['menuName']
      store.dispatch("changeRolePermission", userRole)
      store.dispatch("changeMenuPermissionList", menuPermissionList)
      getRolePermission(menuPermissionList, asyncRoutes, next, to)
    }
  })
  console.log(store, 'store的操作')
  router.push({
    path: "/dashboard",
  });
} 