import Vue from 'vue'
import App from './App'

// 导入请求插件
import request from './utils/request'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
// Vue方法: use基本语法,可以传入函数
// 函数内部可以得到一个参数,谁调用use参数就是谁,e就是VUe构造函数
Vue.use(request)
app.$mount()
