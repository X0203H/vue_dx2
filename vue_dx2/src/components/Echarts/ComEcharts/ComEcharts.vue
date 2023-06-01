<template>
<div id="ComEcharts">
  <div id="Com" style="width: 100%;height: 60vh"></div>
</div>
</template>

<script>
export default {
  name: 'ComEcharts',
  methods: {
    ComEcharts() {
      const chartDom = document.getElementById('Com');
      const myChart = this.$echarts.init(chartDom);

      const option = {
        title: {
          text: '堆叠区域图',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [120, 132, 101, 134, 90, 230, 210],
            color: '#d4716e',
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [220, 182, 191, 234, 290, 330, 310],
            color: '#6d7c87',
          },
          {
            name: '视频广告',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [150, 232, 201, 154, 190, 330, 410],
            color: '#90bcc2',
          },
          {
            name: '直接访问',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [320, 332, 301, 334, 390, 330, 320],
            color: '#e1a793',
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top',
            },
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            color: '#b2d8c6',
          },
        ],
      };

      myChart.setOption(option);
    },
  },
  mounted() {
    this.ComEcharts();
  },
};
</script>

<style lang="less" scoped>
#ComEcharts{
  width: 100%;
  background-color: #fff;
  padding: 1% 0;
  margin-top: 30px;
}
</style>
