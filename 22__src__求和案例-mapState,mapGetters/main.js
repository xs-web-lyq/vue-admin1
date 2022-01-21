// 引入vue
import Vue from 'vue'
// 引入app组件
import App from './App.vue'
// 引入store
import store from './store/index'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
