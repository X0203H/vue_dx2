<template>
<div id="AccountList">
  <div class="addClass">
    <p class="title">账号列表</p>
  </div>
  <AccountListTable></AccountListTable>
</div>
</template>

<script>
import AccountListTable from '../../../../components/AccountListTable/AccountListTable.vue';

export default {
  name: 'AccountList',
  components: {
    AccountListTable,
  },
};
</script>

<style lang="less" scoped>
#AccountList{
  width: 98%;
  margin: 1%;
  height: 88vh;
  background-color: #fff;
  .addClass{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .title{
      padding: 20px 0 20px 20px;
    }
    .el-button{
      margin-right: 10px;
    }
  }
}
</style>
