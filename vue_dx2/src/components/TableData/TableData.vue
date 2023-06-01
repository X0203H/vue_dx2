<template>
<div id="TableData">
  <el-table
      :data="tableData.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
      border
      style="width: 100%">
    <el-table-column
        prop="orderNo"
        label="订单号"
        width="150">
    </el-table-column>
    <el-table-column
        prop="orderTime"
        label="下单时间"
        width="120">
    </el-table-column>
    <el-table-column
        prop="phone"
        label="手机号"
        width="120">
    </el-table-column>
    <el-table-column
        prop="consignee"
        label="收货人"
        width="120">
    </el-table-column>
    <el-table-column
        prop="deliverAddress"
        label="配送地址"
        width="300">
    </el-table-column>
    <el-table-column
        prop="deliveryTime"
        label="送达时间"
        width="120">
    </el-table-column>
    <el-table-column
        prop="remarks"
        label="用户备注"
        width="120">
    </el-table-column>
    <el-table-column
        prop="orderAmount"
        label="订单金额"
        width="120">
    </el-table-column>
    <el-table-column
        prop="orderState"
        label="订单状态"
        width="120">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="100">
      <template v-slot="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
<!--  分页器-->
  <el-pagination
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="tableData.length">
  </el-pagination>
</div>
</template>

<script>
import eventBus from '../../eventBus';

export default {
  name: 'TableData',
  props: ['formData'],
  data() {
    return {
      // 分页
      currentPage1: 1,
      pageSize: 6,
      tableData: [],
      tableData1: [],
    };
  },
  created() {
    this.$request.get('/order/list', {
      params: {
        currentPage: this.currentPage1,
        pageSize: 21,
        orderNo: this.formData.OrderNumber,
        consignee: this.formData.consignee,
        phone: this.formData.phoneInput,
        orderState: this.formData.OrderStatus,
        date: this.formData.value1,
      },
    }).then((res) => {
      console.log(res);
      this.tableData1 = res.data;
      this.tableData = this.tableData1;
    });
    eventBus.$on('acceptQuery', (value) => {
      this.tableData = value;
    });
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    // 分页回调
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage1 = val;
    },
  },
};
</script>

<style lang="less" scoped>
#TableData{
  margin: 20px 0;
}
</style>
