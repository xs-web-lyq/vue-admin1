// 引入vue
import Vue from 'vue'
// 引入app组件
import App from './App.vue'
// 引入Vue-router
import VueRouter from 'vue-router'
// 引入路由器
import router from './routers'


Vue.config.productionTip = false
Vue.use(VueRouter)
new Vue({
  render: h => h(App),
  router:router

}).$mount('#app')
