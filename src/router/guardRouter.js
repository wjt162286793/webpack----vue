import router from './index'

//导航守卫 token校验
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    if (token) {
        console.log('有token')
        next()
    } else {
        if (to.meta.noAuth) {
            next()
        } else {
            console.log('没token')
            next('/login')
        }
    }

})