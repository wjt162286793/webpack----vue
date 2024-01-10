// import { createRouter, createWebHashHistory } from 'vue-router'
import * as VueRouter from "vue-router"
const globalRoutes = [
    {
        path: '/brochure',
        name: 'brochure',
        meta: {
            name: '导览',
            noAuth: true
        },
        component: () => import('pages/brochure/index.vue')

    },
    {
        path: '/login',
        name: 'login',
        meta: {
            name: '登录',
            noAuth: true
        },
        component: () => import('pages/login/index.vue')
    },
    {
        path: '/',
        component: () => import('pages/brochure/index.vue'),
        name: 'direct',
        meta: {
            noAuth: true
        }
    },
    {
        path: '/nofound',
        name: 'nofound',
        meta: {
            name: '不存在页面'
        },
        component: () => import('pages/nofound/index.vue')
    },
]

const routes = new Array().concat(globalRoutes)
const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})

export default router