import router from './index'

//导航守卫 token校验
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    if (token) {
        console.log('没进去吗?')
        next()
    } else {
        if (to.meta.noAuth) {
            next()
        } else {
            console.log('怎么进这里了??')
            next('/login')
        }
    }

})