import Login from '@/views/auth/login.vue';
import Register from '@/views/auth/register.vue'
import Home from '@/views/home/home.vue';
import My from '@/views/my/index.vue'
import Layout from "@/views/layout/index.vue";
import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
    {
        path: '/login',
        component: Login,
        meta: { title: '登录' }
    },
    {
        path: '/register',
        component: Register,
        meta: { title: '注册' }
    },
    {

        path: '/',
        component: Layout,
        redirect: '/home',
        meta: { title: '首页' },
        children: [{
            path: 'home',
            component: Home,
            meta: { title: '首页' }
        },
        {
            path: 'search',
            component: () => import('@/views/search/index.vue'),
            meta: { title: '搜索' }

        },
        {
            path: 'message',
            component: () => import('@/views/message/index.vue'),
            meta: { title: '消息' }
        },
        {
            path: 'my',
            component: My,
            meta: { title: '我的' }
        }]
    },

]

export default routes