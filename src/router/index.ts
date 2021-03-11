import VueRouter from 'vue-router';
import Vue from 'vue'
import routes from './routes'
// import { getToken } from "@/utils/auth";
import Nprogress from 'nprogress';
import "nprogress/nprogress.css";


Vue.use(VueRouter);

const router: VueRouter = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    Nprogress.start()
    document.title = to.meta.title

    next()
})
router.afterEach(() => {
    Nprogress.done()
})

export default router
