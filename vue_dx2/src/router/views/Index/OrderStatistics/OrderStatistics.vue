<template>
<div id="OrderStatistics">
  <div class="addClass">
    <div class="seclectTime">
      <span>时间范围</span>
      <el-date-picker
          style="margin: 0 10px"
          v-model="value1"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
      </el-date-picker>
      <el-button type="primary">查询</el-button>
    </div>
  </div>
  <OrderEcharts></OrderEcharts>
</div>
</template>

<script>
import OrderEcharts from '../../../../components/Echarts/OrderEcharts/OrderEcharts.vue';

export default {
  name: 'OrderStatistics',
  components: {
    OrderEcharts,
  },
  data() {
    return {
      value1: [],
    };
  },
};
</script>

<style lang="less" scoped>
#OrderStatistics{
  width: 98%;
  margin: 1%;
  //height: 88vh;
  .addClass{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;
    padding: 10px 0;
    //border-bottom: 1px solid #ccc;
    .title{
      padding: 20px 0 20px 20px;
    }
  }
}
</style>
