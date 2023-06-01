<template>
<div id="OedeR">
<!--  标题查询-->
  <div class="title">
    <div class="input_select">
      <span>订单号</span>
      <el-input
          placeholder="订单号"
          v-model="formData.OrderNumber"
          clearable>
      </el-input>
    </div>
    <div class="input_select">
      <span>收货人</span>
      <el-input
          placeholder="收货人"
          v-model="formData.consignee"
          clearable>
      </el-input>
    </div>
    <div class="input_select">
      <span>手机号</span>
      <el-input
          placeholder="手机号"
          v-model="formData.phoneInput"
          clearable>
      </el-input>
    </div>
    <div class="input_select">
      <span>订单状态</span>
      <el-select v-model="formData.OrderStatus" clearable placeholder="订单状态">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="input_select timer">
      <span>选择时间</span>
      <el-date-picker
          v-model="formData.value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <el-button type="primary" @click="QueryCb">查询</el-button>
  </div>
<!--  将输入框的内容存为对象传给表格-->
  <TableData :formData="formData"></TableData>
</div>
</template>

<script>
import axios from 'axios';
import TableData from '../../../../components/TableData/TableData.vue';
import eventBus from '../../../../eventBus';

export default {
  name: 'OedeR',
  components: {
    TableData,
  },
  data() {
    return {
      // 查询的参数
      formData: {
        // 订单号
        OrderNumber: '',
        // 收货人
        consignee: '',
        // 手机号
        phoneInput: '',
        // 订单状态
        OrderStatus: '',
        //   时间选择
        value1: '',
      },
      // 订单状态
      options: [{
        value: '派送中',
        label: '派送中',
      }, {
        value: '已受理',
        label: '已受理',
      }],
      //   查询回来的数据
      queryData: [],
    };
  },
  methods: {
    QueryCb() {
      this.$request.get('/order/search', {
        params: {
          currentPage: 1,
          pageSize: 21,
          orderNo: this.formData.OrderNumber,
          consignee: this.formData.consignee,
          phone: this.formData.phoneInput,
          orderState: this.formData.OrderStatus,
          date: this.formData.value1,
        },
      }).then((res) => {
        // console.log(res.data.data);
        this.queryData = res.data;
        eventBus.$emit('acceptQuery', this.queryData);
        this.formData.OrderNumber = '';
        this.formData.consignee = '';
        this.formData.phoneInput = '';
        this.formData.OrderStatus = '';
        this.formData.value1 = '';
      });
    },
  },
};
</script>

<style lang="less" scoped>
#OedeR{
  width: 98%;
  margin: 1%;
  height: 88vh;
  background-color: #fff;
  .title{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 98%;
    margin: 0 1%;
    padding: 1% 0;
    .input_select{
      display: flex;
      align-items: center;
      width: 300px;
      height: 40px;
      span{
        font-size: 14px;
        margin: 0 10px;
      }
      .el-input{
        width: 200px;
        height: 40px;
      }
    }
    .timer{
      width: 480px;
      margin-top: 20px;
    }
    .el-button{
      margin-top: 20px;
    }
  }
}
</style>
