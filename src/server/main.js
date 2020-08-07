/* The Vue build version to load with the `import` command
(runtime-only or standalone) has been set in webpack.base.conf with an alias.*/
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import $ from 'jquery'
import echarts from 'echarts'
import 'echarts/map/js/china'

import index from './components/index/index.vue'
import login from './components/login/index.vue'
import manage from './components/manage/index.vue'
import followUp from './components/followUp/index.vue'
import statistic from './components/statistic/index.vue'
import deploy from './components/deploy/index.vue'
import system from './components/system/index.vue'
//import manageItem from './components/manage/manage.vue'


window.jQuery = $
window.$ = $

Vue.prototype.$echarts = echarts
Vue.use(VueRouter)

const routes = [
  { path: '/index', component: index },
  { path: '/login', component: login },
  { path: '/manage', component: manage },
  { path: '/followUp', component: followUp },
  { path: '/statistic', component: statistic },
  { path: '/deploy', component: deploy },
  { path: '/system', component: system },
  { path: '*', component: index },
  {
    path: '/manage/:id',
    component:manage
  },
  {
    path: '/followUp/:id',
    component:followUp
  }
]

const router = new VueRouter({
  linkExactActiveClass:"",
  routes
})


new Vue({
el: '#app',
router,
components: { App },
template: '<App/>'
})
