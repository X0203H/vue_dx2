<template>
  <div id="Broken" style="width: 100%;height: 50vh;margin: 0 1%;padding: 1% 0"></div>
</template>

<script>
export default {
  name: 'BroKen',
  data() {
    return {
      dataE: this.$store.state.echartsData,
    };
  },
  methods: {
    Echarts() {
      const chartDom = document.getElementById('Broken');
      const myChart = this.$echarts.init(chartDom);

      const option = {
        title: {
          text: '数据统计',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['订单', '销售额', '注册人数', '管理员人数'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        // 右上角的下载图标
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.dataE.xData,
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
          },
        },
        series: [
          {
            name: '订单',
            type: 'line',
            stack: 'Total',
            data: this.dataE.amountData,
            color: '#c53e3a',
          },
          {
            name: '注册人数',
            type: 'line',
            stack: 'Total',
            data: this.dataE.orderData,
            color: '#6aa6ad',
          },
          {
            name: '管理员人数',
            type: 'line',
            stack: 'Total',
            data: this.dataE.amountData,
            color: '#d48265',
          },
          {
            name: '销售额',
            type: 'line',
            stack: 'Total',
            data: this.dataE.orderData,
            color: '#394e5c',
          },
        ],
      };

      myChart.setOption(option);
    },
  },
  // created() {
  //   // this.$store.dispatch('SendEcharts');
  //   console.log(this.dataE);
  // },
  mounted() {
    this.Echarts();
    // console.log(this.$store.state.echartsData);
  },
};
</script>
