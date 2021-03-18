import VueRouter from 'vue-router';
import Vue from 'vue'
import routes from './routes'
import { getToken } from "@/utils/auth";
import { Toast } from 'vant';
import Nprogress from 'nprogress';
import "nprogress/nprogress.css";


Vue.use(VueRouter);

const router: VueRouter = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach(async (to, from, next) => {
    Nprogress.start()
    document.title = to.meta.title
    const hasToken = getToken()
    if (hasToken) {
        next()
    } else {
        if (to.path === "/my") {
            Toast.fail('请先去登录哦')
        }
        next()
    }

})
router.afterEach(() => {
    Nprogress.done()
})

export default router
