import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'view-design/dist/styles/iview.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import viewUI from 'view-design'
import dialogDrag from './utils/dialogDrag.js'
import Canvas2Image from './utils/canvas2image.js'
import moment from "moment"
import Http from './request/http'
import './mock/mockServer'
import './register.js'

const echarts = require('echarts')

Vue.directive('dialogDrag', dialogDrag)
Vue.use(viewUI)

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment
Vue.prototype.$axios = Http
Vue.prototype.$Canvas2Image = Canvas2Image


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
