// 引入vue
import Vue from 'vue'
// 引入app组件
import App from './App.vue'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
