<template>
<div id="ChangePwd">
  <div class="addClass">
    <p class="title">修改密码</p>
  </div>
  <ChangeFrom></ChangeFrom>
</div>
</template>

<script>
import ChangeFrom from '../../../../components/ChangeFrom/ChangeFrom.vue';

export default {
  name: 'ChangePwd',
  components: {
    ChangeFrom,
  },
};
</script>

<style lang="less" scoped>
#ChangePwd{
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
