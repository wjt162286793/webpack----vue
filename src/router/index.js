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
                component: () => import('pages/entiry/index.vue'),
                children: [
                    {
                        path: '/dashboard/entiry/entiryList',
                        name: 'entiryList',
                        meta: {
                            name: '列表'
                        },
                        component: () => import('pages/entiry/components/entiryList.vue')
                    },
                    {
                        path: '/dashboard/entiry/entiryAdd',
                        name: 'entiryAdd',
                        meta: {
                            name: '新增'
                        },
                        component: () => import('pages/entiry/components/entiryAdd.vue')
                    },
                    {
                        path: '/dashboard/entiry/entiryEdit',
                        name: 'entiryEdit',
                        meta: {
                            name: '编辑'
                        },
                        component: () => import('pages/entiry/components/entiryEdit.vue')
                    },
                    {
                        path: '/dashboard/entiry/entiryDetail',
                        name: 'entiryDetail',
                        meta: {
                            name: '查看'
                        },
                        component: () => import('pages/entiry/components/entiryDetail.vue')
                    }
                ]
            },
            {
                path: '/dashboard/valueflow',
                name: 'valueflow',
                meta: {
                    name: '价值流'
                },
                component: () => import('pages/valueflow/index.vue'),
                children: [
                    {
                        path: '/dashboard/valueflow/valueflowList',
                        name: 'valueflowList',
                        meta: {
                            name: '列表'
                        },
                        component: () => import('pages/valueflow/components/valueflowList.vue')
                    },
                    {
                        path: '/dashboard/valueflow/valueflowAdd',
                        name: 'valueflowAdd',
                        meta: {
                            name: '新增'
                        },
                        component: () => import('pages/valueflow/components/valueflowAdd.vue')
                    },
                    {
                        path: '/dashboard/valueflow/valueflowEdit',
                        name: 'valueflowEdit',
                        meta: {
                            name: '编辑'
                        },
                        component: () => import('pages/valueflow/components/valueflowEdit.vue')
                    },
                    {
                        path: '/dashboard/valueflow/valueflowDetail',
                        name: 'valueflowDetail',
                        meta: {
                            name: '查看'
                        },
                        component: () => import('pages/valueflow/components/valueflowDetail.vue')
                    }
                ]
            },
            {
                path: '/dashboard/task',
                name: 'task',
                meta: {
                    name: '任务管理'
                },
                component: () => import('pages/task/index.vue'),
                children: [
                    {
                        path: '/dashboard/task/taskList',
                        name: 'taskList',
                        meta: {
                            name: '列表'
                        },
                        component: () => import('pages/task/components/taskList.vue')
                    },
                    {
                        path: '/dashboard/task/taskAdd',
                        name: 'taskAdd',
                        meta: {
                            name: '新增'
                        },
                        component: () => import('pages/task/components/taskAdd.vue')
                    },
                    {
                        path: '/dashboard/task/taskEdit',
                        name: 'taskEdit',
                        meta: {
                            name: '编辑'
                        },
                        component: () => import('pages/task/components/taskEdit.vue')
                    },
                    {
                        path: '/dashboard/task/taskDetail',
                        name: 'taskDetail',
                        meta: {
                            name: '查看'
                        },
                        component: () => import('pages/task/components/taskDetail.vue')
                    }
                ]
            },
            {
                path: '/dashboard/risk',
                name: 'risk',
                meta: {
                    name: '风险管理'
                },
                component: () => import('pages/risk/index.vue')
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
                            name: '组织结构'
                        },
                        component: () => import('pages/graph/components/person.vue'),
                    },
                    {
                        path: '/dashboard/graph/entiryStatic',
                        name: 'entiryStatic',
                        meta: {
                            name: '实体分布'
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
            {
                path: '/dashboard/permission',
                name: 'permission',
                meta: {
                    name: '权限管理'
                },
                component: () => import('pages/permission/index.vue')
            },
            {
                path: '/dashboard/editor',
                name: 'editor',
                meta: {
                    name: '文本编辑'
                },
                component: () => import('pages/editor/index.vue')
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