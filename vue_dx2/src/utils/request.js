import axios from 'axios';
import { Message } from 'element-ui';
// import { error } from 'echarts/types/src/util/log';

axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.timeout = '5000'; // 超时时间
// 设置请求头跨域
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.create({
//   baseURL: '/api',
// });
// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    const config2 = config;
    const token = localStorage.getItem('token');
    // console.log(token);
    //   config.data里面就是我们的数据
    // console.log(2222);
    if (token) {
      console.log('用户携带token值，可通过');
      config2.headers.Authorization = token;
      // console.log(config2.headers.token);
      // console.log(3333);
    } else {
      console.log('请将本地的token值赋给拦截器');
      // this.$router.push('/login');
      // config2.headers.token = localStorage.getItem('token');
    }
    // console.log('拦截请求成功', config2);
    // 在发送请求之前进行操作
    return config2;
  },
  (error) => {
    console.log(error);
    // 对请求错误进行操作
    return Promise.reject(error);
  },
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // console.log();
    if (response.status !== 200) {
      Message.error('网络连接失败');
      // 对响应数据进行操作
      // return Promise.reject(error);
    }
    // 返回想要的数据，在data里面
    return Promise.resolve(response.data);
  },
  (error) => {
    console.log(error);
    // 对响应错误进行操作
    Promise.reject(error);
  },
);

export default axios;
