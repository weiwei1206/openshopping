
import Vue from 'vue';
import { router } from './config/router';
import Axios from 'axios'
import './assets/style/reset.css'
import './assets/style/border.css'
import './assets/style/iconfont.css'
import fastClick from 'fastclick'
import './config/rem';
import App from './App.vue';
import VueLazyload from 'vue-lazyload'
import components from './config/components.js';
Vue.config.productionTip = false
Vue.use(components);
fastClick.attach(document.body)

Vue.use(VueLazyload)

// 使用mint-ui 引入全部组件
import Mint from 'mint-ui';
Vue.use(Mint);
// 引入Mint-ui的css文件
import 'mint-ui/lib/style.css'

Axios.defaults.baseURL = 'http://localhost:8080/'
// 配置axios
Vue.prototype.$axios = Axios

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});