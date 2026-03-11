import Vue from 'vue'
import App from './App'
import uView from "ui/uview-ui"
let vuexStore = require("@/store/$u.mixin.js")
import store from '@/store'

Vue.use(uView)
Vue.mixin(vuexStore)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()
