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
import Http from './request/http'

const echarts = require('echarts')

Vue.directive('dialogDrag', dialogDrag)
Vue.use(viewUI)

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment
Vue.prototype.$axios = Http



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
