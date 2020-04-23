
import Vue from 'vue';
import { router } from './config/router';
import Axios from 'axios'
import './assets/style/reset.css'
import './assets/style/border.css'
import './assets/style/iconfont.css'
// import fastClick from 'fastclick'
import './config/rem';
import App from './App.vue';
import VueLazyload from 'vue-lazyload'
import components from './config/components.js';
Vue.config.productionTip = false
Vue.use(components);
// fastClick.attach(document.body)
// fastClick导致vant的滑动轮播时触发了 click 事件：
// fastclick的原理是通过 Touch 事件模拟出 click 事件
// 而 Swipe 内部默认会阻止 touchmove 事件冒泡，干扰了 fastclick 的判断，导致出现这个问题。
// 将 Swipe 组件的 stop-propagation 属性设置为 false 即可避免该问题。但需要v2.2.13

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