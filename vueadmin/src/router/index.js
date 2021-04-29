import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        hidden: true,
        redirect: '/groupManage/groupList',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            redirect: '/groupManage/groupList',
            component: () => import('@/views/dashboard/index'),
            meta: { title: 'Dashboard', }
        }]
    },
    {
        path: '/groupManage',
        component: Layout,
        name: 'groupManage',
        redirect: '/groupManage/groupList',
        meta: { title: '群管理', },
        children: [
            {
                path: 'groupList',
                name: 'GroupList',
                component: () => import('@/views/groupManage/index'),
                meta: { title: '群列表', },
                children: []
            },
            {
                path: 'groupDetail',
                name: 'groupDetail',
                hidden: true,
                component: () => import('@/views/groupManage/groupDetail'),
                meta: { title: '群详情', }
            },
            {
                path: 'groupMessage',
                name: 'groupMessage',
                hidden: true,
                component: () => import('@/views/groupManage/groupMessage'),
                meta: { title: '群发消息', }
            },
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
