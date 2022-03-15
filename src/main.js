import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dialogDrag from './utils/dialogDrag.js'
import 'element-ui/lib/theme-chalk/index.css'

const ElementUI = require('element-ui')
const echarts = require('echarts')

Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
Vue.directive('dialogDrag', dialogDrag)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
