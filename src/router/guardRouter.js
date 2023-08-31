import router from './index'
import store from '@/store/index'
import request from '@/utils/requestUtils';
import { cloneDeep} from 'lodash';
import { asyncRoutes } from './asyncRoutes'

let allAsyncRoutes = cloneDeep(asyncRoutes)

//导航守卫 token校验
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    if (token) {
        console.log('有token')
        console.log(store.state.role.asyncRouteFinish,'???')
        if(to.path === '/login'){
            console.log('去登录页面')
            next('/dashboard')
        }else{
            if(store.state.role.asyncRouteFinish === true){
                console.log('路由已经动态添加完毕')
                next()
            }else{
                let userInfoJson = JSON.parse(localStorage.getItem('userInfo'))
                if(!userInfoJson){
                    next('/login')
                }else{
                    getRoleFun(userInfoJson,next,to) 
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
 let getRoleFun = (userInfo,next,to)=>{
         localStorage.setItem("userInfo", JSON.stringify(userInfo));
         localStorage.setItem("token", userInfo.token);
         store.dispatch("changeUserInfo", userInfo);
        request.get('/app/userRole/roleList').then(res => {
            if (res.code === 200) {
               let roleList = res.data
               let userRole = roleList.find(item=>item.name === userInfo.role)
            let menuPermissionList = []
            userRole['menuName'].forEach(item=>{
                if(item.flag === true || item.indeterminate === true){
                    menuPermissionList.push(item.name)
                }
            })
            userRole['doneName'].forEach(item=>{
                item.forEach(v=>{
                    if(v.routeName && (v.flag === true || v.indeterminate === true)){
                        menuPermissionList.push(v.routeName)
                    }
                })
            })
            menuPermissionList.push('dashboard')
               store.dispatch("changeRolePermission",userRole)
               store.dispatch("changeMenuPermissionList",menuPermissionList)
               getRolePermission(menuPermissionList,allAsyncRoutes,next,to)
            }
        })
} 

 //根据权限字段数组和全量路由做匹配,重新组织router数据,并且进行跳转
 let getRolePermission = (menuPermissionList,asyncRouteList,next,to)=>{
    let allAsyncRoutesList = cloneDeep(asyncRouteList)
    
    filterAllAsync(menuPermissionList,allAsyncRoutesList)
    store.dispatch('changeFilterAsyncRoutes',allAsyncRoutesList)
    allAsyncRoutesList.forEach(item=>{
        router.addRoute(item)
    })
   store.dispatch('changeAsyncRouteFinish',true)
   
   if(next && to){
       console.log(next,to,'next&&to')
     next({...to,replace:true})
   }
   
   }

function filterAllAsync(strList,routeList){
    console.log(strList,routeList,'递归参数:字段数组和路由数组')
 routeList.forEach((item,index)=>{
    if(strList.findIndex(v=>v === item.name) !== -1){
        console.log(item.name,'符合数据')
        if(item.children && item.children.length>0){
            console.log('内部额item',item)
            filterAllAsync(strList,item.children)
        }
    }else{
        routeList.splice(index,1)
    }
 })
}

//根据字段值重新组织routes数据
function filterRouteFun(list,menuPermissionList,parentName){
    console.log(list,menuPermissionList,'字段数组和全量路由')
 }


 //路由数组扁平化
let flatFun = (alllist)=>{
    let List = []
    alllist.forEach((item,index)=>{
      let newObj = {}
      newObj.path = item.path
      newObj.name = item.name
      newObj.meta = item.meta
      newObj.component = item.component
      List.push(newObj)
      if(item.children && item.children.length>0){
          console.log(item.children,'children===')
          List = List.concat(flatFun(item.children))
      }
    })
    return List
  }