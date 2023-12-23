import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入  组件库
import '@/utils/vant-ui'

import '@/styles/common.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
