import Vue from 'vue';
import ElementUI from 'element-ui';
// 引入axios请求
import * as echarts from 'echarts';
// 引入echarts图标
// import axios from 'axios';
import request from './utils/request';
import App from './App.vue';
// 引入element-ui组件库
import 'element-ui/lib/theme-chalk/index.css';
// 引入路由
import router from './router';
// 引入vuex
import store from './store';
// 引入axios拦截器

// 默认配置域名地址
// axios.defaults.baseURL = 'http://127.0.0.1:5000';
Vue.use(ElementUI);
// 关闭生产提示
Vue.config.productionTip = false;
// 添加$echarts到Vue原型对象上
Vue.prototype.$echarts = echarts;
// 添加axios拦截器在vue原型对象上
Vue.prototype.$request = request;

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
console.log(vm);
