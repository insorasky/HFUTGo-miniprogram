import Vue from 'vue'
import App from './App'

// 引入lodash
import _ from 'lodash'
Vue.use(_)

// 引入全局配置
import cfg from './common/data/config.js'
Vue.prototype.$cfg = cfg

// 引入uView
import uView from 'uview-ui'
Vue.use(uView)

// 引入sView
import sView from './components/s-view.js'
Vue.use(sView)

// 引入用户操作
import user from './common/func/user'
Vue.prototype.$user = user

// 引入请求
import request from './common/request/request.js'
Vue.prototype.$request = request

// 引入全局操作
import hfutgo from './common/func/hfutgo.js'
Vue.prototype.$hfutgo = hfutgo
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
