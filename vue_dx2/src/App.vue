<template>
  <div id="App">
    <router-view></router-view>
  </div>
</template>

<script>
import '../public/css/base.css';

export default {
  name: 'App',
  created() {
    // 异步请求要在最先加载的组件里面进行调用
    this.$store.dispatch('SendEcharts');
    // console.log(this.$store.state.echartsData);
    // this.$store.dispatch('SendOrder');
  },
};
</script>
