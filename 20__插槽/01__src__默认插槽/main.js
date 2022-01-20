// 引入vue
import Vue from 'vue'
// 引入app组件
import App from './App.vue'
// 引入vue-resource
import vueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(vueResource)
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
