<template>
<div id="CommodityList">
  <p>商品列表</p>
  <ComListTable></ComListTable>
</div>
</template>

<script>
import ComListTable from '../../../../components/ComListTable/ComListTable.vue';

export default {
  name: 'CommodityList',
  components: {
    ComListTable,
  },
};
</script>

<style lang="less" scoped>
#CommodityList{
  width: 98%;
  margin: 1%;
  height: 88vh;
  background-color: #fff;
  p{
    padding: 10px ;
  }
}
</style>
