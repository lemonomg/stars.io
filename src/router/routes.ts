import Login from '@/views/auth/login.vue';
import Home from '@/views/home/home.vue';
import My from '@/views/my/my.vue'
import Layout from "@/views/layout/index.vue";
import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
    {
        path: '/login',
        component: Login,
        meta: { title: '登录' }
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
        }, {
            path: 'my',
            component: My,
            meta: { title: '我的' }
        }]
    },

]

export default routes