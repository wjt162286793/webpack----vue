const role = {
     state:{
       asyncRouteFinish:false, //动态路由添加完毕的标识
       rolePermission:{},  //角色的权限集合:
       menuPermissionList:[]  //菜单权限
     },
     mutations:{
        CHANGE_ASYNCROUTEFINISH:(state,info)=>{
            state.asyncRouteFinish = info
        },
        CHANGE_ROLEPERMISSION:(state,info)=>{
            state.rolePermission = info
        },
        CHANGE_MENUPERMISSIONLIST:(state,info)=>{
            state.menuPermissionList = info
        }
     },
     actions:{
        changeAsyncRouteFinish({commit},data){
            commit('CHANGE_ASYNCROUTEFINISH',data)
        },
        changeRolePermission({commit},data){
            commit('CHANGE_ROLEPERMISSION',data)
        },
        changeMenuPermissionList({commit},data){
            commit('CHANGE_MENUPERMISSIONLIST',data)
        }
     }
}
export default role