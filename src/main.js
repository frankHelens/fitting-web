// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/custom.css'
import 'babel-polyfill'

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

Vue.use(VueRouter)
Vue.use(ElementUI)

// const colorPalette = ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#96dee8']
// const colorPalette = ['#d87c7c', '#919e8b', '#d7ab82', '#6e7074', '#61a0a8', '#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b']

const colorPalette = [
  '#48b0f7',
  '#f55753',
  '#f8d053',
  '#ff783c',
  '#6d5cae',
  '#10cfbd',
  '#2bc164',
  '#b1b3b5'
]
echarts.registerTheme('vintage', {
  color: colorPalette,
  // backgroundColor: '#fef8ef',
  graph: {
    color: colorPalette
  }
})

Vue.prototype.$echarts = echarts

// Vue.config.productionTip = false
const App = {
  template: '<router-view></router-view>'
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
