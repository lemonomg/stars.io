import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Component from 'vue-class-component'

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
}).$mount('#app')
