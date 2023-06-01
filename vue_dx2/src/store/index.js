import VuexEsm from 'vuex';
import Vue from 'vue';
// vuex中发送axios请求
import axios from 'axios';

Vue.use(VuexEsm);

export default new VuexEsm.Store({
  actions: {
    // echarts图表
    SendEcharts(context) {
      axios.get('/order/totaldata').then((res) => {
        // console.log(res);
        context.commit('SENDECHARTS', res);
      });
    },
    //   商品分类请求数据
    ComClass(context) {
      axios.get('/goods/catelist', {
        params: {
          currentPage: 1,
          pageSize: 100,
        },
      }).then((res) => {
        // console.log(res);
        context.commit('COMCLASS', res.data);
      });
    },
  },
  mutations: {
    SENDECHARTS(state, value) {
      state.echartsData = value;
      // console.log(state.echartsData);
    },
    COMCLASS(state, value) {
      state.ComClassify = value;
    },
  },
  state: {
    // echarts图表
    echartsData: [],
    //   商品分类的数据
    ComClassify: [],
  },
  getters: {},
});
