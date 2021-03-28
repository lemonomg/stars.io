import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Component from 'vue-class-component'

import "@/icons"

Vue.config.productionTip = false
// 注册组件路由钩子
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
