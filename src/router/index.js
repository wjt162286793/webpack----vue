import { createRouter, createWebHashHistory } from 'vue-router'

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
        meta: {
            noAuth: true
        }
    },
    // {
    //     path: '*',
    //     name: 'nofound',
    //     meta: {
    //         name: '不存在页面'
    //     },
    //     component: () => import('pages/nofound/index.vue')
    // },
]

const asyncRoutes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
            name: '主页'
        },
        component: () => import('pages/dashboard/index.vue'),
        children: [
            {
                path: '/dashboard/business',
                name: 'business',
                meta: {
                    name: '业务领域'
                },
                component: () => import('pages/business/index.vue'),
                children: [
                    {
                        path: '/dashboard/business/businessList',
                        name: 'businessList',
                        meta: {
                            name: '列表'
                        },
                        component: () => import('pages/business/components/businessList.vue')
                    },
                    {
                        path: '/dashboard/business/newBusiness',
                        name: 'newBusiness',
                        meta: {
                            name: '新增'
                        },
                        component: () => import('pages/business/components/newBusiness.vue')
                    },
                    {
                        path: '/dashboard/business/editBusiness',
                        name: 'editBusiness',
                        meta: {
                            name: '编辑'
                        },
                        component: () => import('pages/business/components/editBusiness.vue')
                    },
                ]
            },
            {
                path: '/dashboard/entiry',
                name: 'entiry',
                meta: {
                    name: '实体'
                },
                component: () => import('pages/entiry/index.vue')
            },
            {
                path: '/dashboard/valueflow',
                name: 'valueflow',
                meta: {
                    name: '价值流'
                },
                component: () => import('pages/valueflow/index.vue')
            },
            {
                path: '/dashboard/graph',
                name: 'graph',
                meta: {
                    name: '统计图表'
                },
                component: () => import('pages/graph/index.vue'),
                redirect: '/dashboard/graph/list',
                children: [
                    {
                        path: '/dashboard/graph/list',
                        name: 'list',
                        meta: {
                            name: '列表'
                        },
                        component: () => import('pages/graph/components/list.vue'),
                    },
                    {
                        path: '/dashboard/graph/financeStatic',
                        name: 'financeStatic',
                        meta: {
                            name: '财务统计'
                        },
                        component: () => import('pages/graph/components/finance.vue'),
                    },
                    {
                        path: '/dashboard/graph/personStatic',
                        name: 'personStatic',
                        meta: {
                            name: '人员统计'
                        },
                        component: () => import('pages/graph/components/person.vue'),
                    },
                    {
                        path: '/dashboard/graph/entiryStatic',
                        name: 'entiryStatic',
                        meta: {
                            name: '实体统计'
                        },
                        component: () => import('pages/graph/components/entiry.vue'),
                    },
                    {
                        path: '/dashboard/graph/dataStatic',
                        name: 'dataStatic',
                        meta: {
                            name: '数据统计'
                        },
                        component: () => import('pages/graph/components/data.vue'),
                    },
                    {
                        path: '/dashboard/graph/commutationStatic',
                        name: 'commutationStatic',
                        meta: {
                            name: '通信统计'
                        },
                        component: () => import('pages/graph/components/commutation.vue'),
                    },
                    {
                        path: '/dashboard/graph/materialStorage',
                        name: 'materialStorage',
                        meta: {
                            name: '物资仓库'
                        },
                        component: () => import('pages/graph/components/material.vue'),
                    },
                ]
            },
        ]
    },
]
const routes = new Array().concat(globalRoutes).concat(asyncRoutes)
const router = createRouter({
    routes,
    history: createWebHashHistory()
})
console.log(router, '路由')

export default router