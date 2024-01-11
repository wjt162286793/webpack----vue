export const asyncRoutes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
            name: '主页',
            index:0
        },
        component: () => import(/* webpackChunkName:'dashboard'*/ 'pages/dashboard/index.vue'),
        children: [
            {
                path: '/dashboard/business',
                name: 'business',
                meta: {
                    name: '业务领域'
                },
                component: () => import(/* webpackChunkName:'business'*/ 'pages/business/index.vue'),
                children: [
                    {
                        path: '/dashboard/business/businessList',
                        name: 'businessList',
                        meta: {
                            name: '列表'
                        },
                        component: () => import(/* webpackChunkName:'businessList'*/ 'pages/business/components/businessList.vue')
                    },
                    {
                        path: '/dashboard/business/newBusiness',
                        name: 'newBusiness',
                        meta: {
                            name: '新增'
                        },
                        component: () => import(/* webpackChunkName:'newBusiness'*/ 'pages/business/components/newBusiness.vue')
                    },
                    {
                        path: '/dashboard/business/businessEdit',
                        name: 'businessEdit',
                        meta: {
                            name: '编辑'
                        },
                        component: () => import(/* webpackChunkName:'businessEdit'*/ 'pages/business/components/businessEdit.vue')
                    },
                ]
            },
            {
                path: '/dashboard/entiry',
                name: 'entiry',
                meta: {
                    name: '实体'
                },
                component: () => import(/* webpackChunkName:'entiry'*/ 'pages/entiry/index.vue'),
                children: [
                    {
                        path: '/dashboard/entiry/entiryList',
                        name: 'entiryList',
                        meta: {
                            name: '列表'
                        },
                        component: () => import(/* webpackChunkName:'entiryList'*/ 'pages/entiry/components/entiryList.vue')
                    },
                    {
                        path: '/dashboard/entiry/entiryAdd',
                        name: 'entiryAdd',
                        meta: {
                            name: '新增'
                        },
                        component: () => import(/* webpackChunkName:'entiryAdd'*/ 'pages/entiry/components/entiryAdd.vue')
                    },
                    {
                        path: '/dashboard/entiry/entiryEdit',
                        name: 'entiryEdit',
                        meta: {
                            name: '编辑'
                        },
                        component: () => import(/* webpackChunkName:'entiryEdit'*/ 'pages/entiry/components/entiryEdit.vue')
                    },
                    {
                        path: '/dashboard/entiry/entiryDetail',
                        name: 'entiryDetail',
                        meta: {
                            name: '查看'
                        },
                        component: () => import(/* webpackChunkName:'entiryDetail'*/ 'pages/entiry/components/entiryDetail.vue')
                    }
                ]
            },
            {
                path: '/dashboard/valueflow',
                name: 'valueflow',
                meta: {
                    name: '价值流'
                },
                component: () => import(/* webpackChunkName:'valueflow'*/ 'pages/valueflow/index.vue'),
                children: [
                    {
                        path: '/dashboard/valueflow/valueflowList',
                        name: 'valueflowList',
                        meta: {
                            name: '列表'
                        },
                        component: () => import(/* webpackChunkName:'valueflowList'*/ 'pages/valueflow/components/valueflowList.vue')
                    },
                    {
                        path: '/dashboard/valueflow/valueflowAdd',
                        name: 'valueflowAdd',
                        meta: {
                            name: '新增'
                        },
                        component: () => import(/* webpackChunkName:'valueflowAdd'*/ 'pages/valueflow/components/valueflowAdd.vue')
                    },
                    {
                        path: '/dashboard/valueflow/valueflowEdit',
                        name: 'valueflowEdit',
                        meta: {
                            name: '编辑'
                        },
                        component: () => import(/* webpackChunkName:'valueflowEdit'*/ 'pages/valueflow/components/valueflowEdit.vue')
                    },
                    {
                        path: '/dashboard/valueflow/valueflowDetail',
                        name: 'valueflowDetail',
                        meta: {
                            name: '查看'
                        },
                        component: () => import(/* webpackChunkName:'valueflowDetail'*/ 'pages/valueflow/components/valueflowDetail.vue')
                    }
                ]
            },
            {
                path: '/dashboard/task',
                name: 'task',
                meta: {
                    name: '任务管理'
                },
                component: () => import(/* webpackChunkName:'task'*/ 'pages/task/index.vue'),
                children: [
                    {
                        path: '/dashboard/task/taskList',
                        name: 'taskList',
                        meta: {
                            name: '列表'
                        },
                        component: () => import(/* webpackChunkName:'taskList'*/ 'pages/task/components/taskList.vue')
                    },
                    {
                        path: '/dashboard/task/taskAdd',
                        name: 'taskAdd',
                        meta: {
                            name: '新增'
                        },
                        component: () => import(/* webpackChunkName:'taskAdd'*/ 'pages/task/components/taskAdd.vue')
                    },
                    {
                        path: '/dashboard/task/taskEdit',
                        name: 'taskEdit',
                        meta: {
                            name: '编辑'
                        },
                        component: () => import(/* webpackChunkName:'taskEdit'*/ 'pages/task/components/taskEdit.vue')
                    },
                    {
                        path: '/dashboard/task/taskDetail',
                        name: 'taskDetail',
                        meta: {
                            name: '查看'
                        },
                        component: () => import(/* webpackChunkName:'taskDetail'*/ 'pages/task/components/taskDetail.vue')
                    }
                ]
            },
            {
                path: '/dashboard/risk',
                name: 'risk',
                meta: {
                    name: '风险管理'
                },
                component: () => import(/* webpackChunkName:'risk'*/ 'pages/risk/index.vue'),
                redirect:'/dashboard/risk/riskList',
                children: [
                    {
                        path: '/dashboard/risk/riskList',
                        name: 'riskList',
                        meta: {
                            name: '列表'
                        },
                        component: () => import(/* webpackChunkName:'riskList'*/ 'pages/risk/components/riskList.vue')
                    },
                    {
                        path: '/dashboard/risk/riskModel',
                        name: 'riskModel',
                        meta: {
                            name: '模型'
                        },
                        component: () => import(/* webpackChunkName:'riskModel'*/ 'pages/risk/components/riskModel.vue')
                    }                 
                ]
            },            
            {
                path: '/dashboard/graph',
                name: 'graph',
                meta: {
                    name: '统计图表',
                    scoped:true
                },
                component: () => import(/* webpackChunkName:'graph'*/ 'pages/graph/index.vue'),
                redirect: '/dashboard/graph/list',
                children: [
                    {
                        path: '/dashboard/graph/list',
                        name: 'graphList',
                        meta: {
                            name: '列表'
                        },
                        component: () => import(/* webpackChunkName:'graphList'*/ 'pages/graph/components/list.vue'),
                    },
                    {
                        path: '/dashboard/graph/financeStatic',
                        name: 'financeStatic',
                        meta: {
                            name: '财务统计'
                        },
                        component: () => import(/* webpackChunkName:'financeStatic'*/ 'pages/graph/components/finance.vue'),
                    },
                    {
                        path: '/dashboard/graph/personStatic',
                        name: 'personStatic',
                        meta: {
                            name: '组织结构'
                        },
                        component: () => import(/* webpackChunkName:'personStatic'*/ 'pages/graph/components/person.vue'),
                    },
                    {
                        path: '/dashboard/graph/entiryStatic',
                        name: 'entiryStatic',
                        meta: {
                            name: '实体分布'
                        },
                        component: () => import(/* webpackChunkName:'entiryStatic'*/ 'pages/graph/components/entiry.vue'),
                    },
                    {
                        path: '/dashboard/graph/dataStatic',
                        name: 'dataStatic',
                        meta: {
                            name: '数据统计'
                        },
                        component: () => import(/* webpackChunkName:'dataStatic'*/ 'pages/graph/components/data.vue'),
                    },
                    {
                        path: '/dashboard/graph/commutationStatic',
                        name: 'commutationStatic',
                        meta: {
                            name: '通信统计'
                        },
                        component: () => import(/* webpackChunkName:'commutationStatic'*/ 'pages/graph/components/commutation.vue'),
                    },
                    {
                        path: '/dashboard/graph/materialStorage',
                        name: 'materialStorage',
                        meta: {
                            name: '物资仓库'
                        },
                        component: () => import(/* webpackChunkName:'materialStorage'*/ 'pages/graph/components/material.vue'),
                    },
                ]
            },
            {
                path: '/dashboard/permission',
                name: 'permission',
                meta: {
                    name: '权限管理'
                },
                component: () => import(/* webpackChunkName:'permission'*/ 'pages/permission/index.vue')
            },
            {
                path: '/dashboard/editor',
                name: 'editor',
                meta: {
                    name: '文本编辑'
                },
                component: () => import(/* webpackChunkName:'editor'*/ 'pages/editor/index.vue')
            },
        ]
    },
]