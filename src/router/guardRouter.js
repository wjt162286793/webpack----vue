import router from './index'
import store from '@/store/index'
import request from '@/utils/requestUtils';
import { cloneDeep } from 'lodash';
import { asyncRoutes } from './asyncRoutes'
import { mainVue } from '@/main'

let allAsyncRoutes = cloneDeep(asyncRoutes)

//导航守卫 token校验
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    if (token) {
        console.log('有token')
        console.log(store.state.role.asyncRouteFinish, '???')
        if (to.path === '/login') {
            console.log('去登录页面')
            next('/dashboard')
        } else {
            if (store.state.role.asyncRouteFinish === true) {
                console.log('路由已经动态添加完毕', to)
                if (store.state.role.flatRoutesName.includes(to.name)) {
                    next()
                } else {
                    //   next('/notfound')
                    alert('您指定的页面出现了错误,无法进行跳转')
                    next(from.path)
                }

            } else {
                let userInfoJson = JSON.parse(localStorage.getItem('userInfo'))
                if (!userInfoJson) {
                    next('/login')
                } else {
                    getRoleFun(userInfoJson, next, to)
                }

            }
        }
    } else {
        if (to.meta.noAuth) {
            next()
        } else {
            console.log('没token')
            next('/login')
        }
    }

})




//获取权限的字段数组
let getRoleFun = (userInfo, next, to) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("token", userInfo.token);
    store.dispatch("changeUserInfo", userInfo);
    request.get('/app/userRole/roleList').then(res => {
        if (res.code === 200) {
            let roleList = res.data
            let userRole = roleList.find(item => item.name === userInfo.role)
            let menuPermissionList = []
            userRole['menuName'].forEach(item => {
                if (item.flag === true || item.indeterminate === true) {
                    menuPermissionList.push(item.name)
                }
            })
            userRole['doneName'].forEach(item => {
                item.forEach(v => {
                    if (v.routeName && (v.flag === true || v.indeterminate === true)) {
                        menuPermissionList.push(v.routeName)
                    }
                })
            })
            menuPermissionList.push('dashboard')
            store.dispatch("changeRolePermission", userRole)
            store.dispatch("changeMenuPermissionList", menuPermissionList)
            getRolePermission(menuPermissionList, allAsyncRoutes, next, to)
        }
    })
}

//根据权限字段数组和全量路由做匹配,重新组织router数据,并且进行跳转
let getRolePermission = (menuPermissionList, asyncRouteList, next, to) => {
    let allAsyncRoutesList = cloneDeep(asyncRouteList)

    let filterEndList = []
    let flatRoutesName = []
    filterAllAsync(menuPermissionList, allAsyncRoutesList, filterEndList, flatRoutesName)
    console.log(filterEndList, '符合路由')
    console.log(flatRoutesName, '符合字段值')
    store.dispatch('changeFilterAsyncRoutes', filterEndList)
    store.dispatch('changeFlatRoutesName', flatRoutesName)
    mainVue.directive('btnRole', (el, binding) => {
        console.log(el, '元素------', binding
        )
        if (!flatRoutesName.includes(binding.value)) {
            el.style.display = 'none'
        }
    })
    filterEndList.forEach(item => {
        router.addRoute(item)
    })
    store.dispatch('changeAsyncRouteFinish', true)

    if (next && to) {
        console.log(next, to, 'next&&to')
        next({ ...to, replace: true })
    }

}

function filterAllAsync(strList, routeList, filterEndList, flatRoutesName) {
    routeList.forEach((item, index) => {
        if (strList.findIndex(v => v === item.name) !== -1) {
            flatRoutesName.push(item.name)
            let newItem = cloneDeep(item)
            filterEndList.push(newItem)
            if (item.meta.scoped) {
                newItem.children = item.children
                item.children.forEach(v => {
                    flatRoutesName.push(v.name)
                })
                filterAllAsync(strList, item.children, newItem.children, flatRoutesName)
            } else {
                if (item.children && item.children.length > 0) {
                    newItem.children = []
                    filterAllAsync(strList, item.children, newItem.children, flatRoutesName)
                }
            }
        }
    })
}

//根据字段值重新组织routes数据
function filterRouteFun(list, menuPermissionList, parentName) {
    console.log(list, menuPermissionList, '字段数组和全量路由')
}


//路由数组扁平化
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