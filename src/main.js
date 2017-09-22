// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/iview/iview.css'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/custom.css'

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
  '#3fb1e3',
  '#6be6c1',
  '#626c91',
  '#96dee8',
  '#f3d999',
  '#82b6e9',
  '#2e4783',
  '#6699FF',
  '#38b6b6'
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
