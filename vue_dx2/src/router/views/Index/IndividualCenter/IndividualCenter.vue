<template>
<div id="IndividualCenter">
  <div class="addClass">
    <div class="seclectTime">
      <p class="title">管理员信息</p>
    </div>
  </div>
  <div class="content">
    <p>管理员ID：<span>{{administrator.id}}</span></p>
    <el-divider></el-divider>
    <p>账号：<span>{{administrator.account}}</span></p>
    <el-divider></el-divider>
    <p>用户组：<span>{{administrator.userGroup}}</span></p>
    <el-divider></el-divider>
    <p>创建时间：<span>{{administrator.ctime}}</span></p>
    <el-divider></el-divider>
    <p>管理员头像：
      <el-image
        style="width: 100px; height: 100px"
        :src="administrator.imgUrl">
      </el-image>
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'IndividualCenter',
  data() {
    return {
      administrator: {},
    };
  },
  created() {
    this.$request.get('/users/info').then((res) => {
      // console.log(res);
      this.administrator = res;
      console.log(this.administrator);
    });
  },
};
</script>

<style lang="less" scoped>
#IndividualCenter{
  width: 98%;
  margin: 1%;
  //height: 50vh;
  background-color: #fff;
  .addClass {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;

    .title {
      padding: 20px 0 20px 20px;
    }
  }
  .content{
    p{
      display: block;
      height: 60px;
      line-height: 60px;
      margin-left: 20px;
      &:last-of-type{
        display: flex;
        align-items: center;
        height: 100px;
        padding: 10px 0;
        .el-image{
          margin-left: 20px;
        }
      }
    }
    .el-divider{
      margin: 0;
    }
  }
}
</style>
