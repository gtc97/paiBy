import Vue from 'vue'
import App from './App'
import router from './router'

// 导入vant
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

import CommonHeader from './components/CommonHeader'

Vue.component('common-header', CommonHeader)

// 倒入 http 文件夹下的 index.js
import api from '@/http/index'

Vue.use(api)

// rem适配导入
import '@/assets/js/flexible.js'

// 路由拦截
import '@/permission.js'

// 引入通用样式
import '@/styles/base.less'

// 图片预览
import VueImageSwipe from 'vue-image-swipe'
import 'vue-image-swipe/dist/vue-image-swipe.css'

Vue.use(VueImageSwipe)

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 分页
// import Pagination from 'vue-pagination';
// Vue.component(Pagination);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
