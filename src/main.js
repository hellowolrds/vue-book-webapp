// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
// 导入vuex
import store from './vuex/index.js'
import './assets/css/base.css'
import './assets/font/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(Vuex)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
