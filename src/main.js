import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './register.js'
import viewUI from 'view-design'
import dialogDrag from './utils/dialogDrag.js'
import 'view-design/dist/styles/iview.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import moment from "moment"


const echarts = require('echarts')

Vue.prototype.$echarts = echarts

Vue.use(viewUI)
Vue.prototype.$moment = moment
Vue.directive('dialogDrag', dialogDrag)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
