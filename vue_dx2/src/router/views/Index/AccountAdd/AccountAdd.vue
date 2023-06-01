<template>
<div id="AccountAdd">
  <div class="addClass">
    <p class="title">添加账号</p>
  </div>
  <AccountAddFrom></AccountAddFrom>
</div>
</template>

<script>
import AccountAddFrom from '../../../../components/AccountAddFrom/AccountAddFrom.vue';

export default {
  name: 'AccountAdd',
  components: {
    AccountAddFrom,
  },
};
</script>

<style lang="less" scoped>
#AccountAdd{
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
