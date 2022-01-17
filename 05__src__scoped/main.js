// 引入vue
import Vue from 'vue'
// 引入app组件
import App from './App.vue'
// 引入插件
import plugins from './plugins'

Vue.config.productionTip = false
Vue.use(plugins)
new Vue({
  render: h => h(App),
}).$mount('#app')
