<template>
  <div id="Header">
    <el-breadcrumb separator-class="el-icon-arrow-right" id="BreadCrumbs">
      <el-breadcrumb-item :to="{ path: `${item.path}` }" v-for="(item,index) in $route.matched" :key="index">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="userBox">
      <span>欢迎你，
        <el-dropdown>
          <span class="el-dropdown-link">
            {{U}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="Exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <router-link to="/index/individualcenter"> <img src="/image/user.png" alt="图片加载错误"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaDer',
  data() {
    return {
      U: localStorage.getItem('account'),
    };
  },
  methods: {
    Exit() {
      this.$message({
        message: '退出登录成功，请稍后...',
        type: 'success',
      });
      // localStorage.clear();
      setTimeout(() => {
        this.$router.push('/login');
      }, 2000);
    },
  },
};
</script>

<style lang="less" scoped>
#Header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #fff;
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  #BreadCrumbs {
    margin-left: 20px;
  }

  //用户信息
  .userBox {
    display: flex;
    align-items: center;
    height: 60px;
    margin-right: 20px;

    span {
      font-size: 16px;
      margin-right: 10px;
    }

    img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
