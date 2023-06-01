<template>
  <div id="Nav">
    <div class="title">
      <img src="/image/logo.png" alt="logo">
      <span>外卖商家中心</span>
    </div>
    <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        router
        @close="handleClose">
      <el-menu-item index="/index/backstage">
        <i class="el-icon-location"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <el-menu-item index="/index/order">
        <i class="el-icon-menu"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-submenu index="3">
        <template v-slot:title>
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group style="background-color: #202f3f">
          <el-menu-item index="/index/comlist">商品列表</el-menu-item>
          <el-menu-item index="/index/comadd">商品添加</el-menu-item>
          <el-menu-item index="/index/comclassify">商品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/index/shopadmin">
        <i class="el-icon-setting"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template v-slot:title>
          <i class="el-icon-location"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item-group style="background-color: #202f3f">
          <el-menu-item index="/index/accountlist">账号列表</el-menu-item>
          <el-menu-item index="/index/accountadd">添加账号</el-menu-item>
          <el-menu-item index="/index/changepwd">修改密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template v-slot:title>
          <i class="el-icon-location"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item-group style="background-color: #202f3f">
          <el-menu-item index="/index/comstatistics">商品统计</el-menu-item>
          <el-menu-item index="/index/orderstatistics">订单统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
#Nav {
  width: 240px;
  height: 100vh;
  background-color: #304156;
  // 标题
  .title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;

    img {
      width: 40px;
      height: 40px;
      margin-left: 10px;
    }

    span {
      font-size: 20px;
      color: #fff;
      margin-left: 10px;
    }
  }

  .el-menu {
    background-color: #304156;
    border-right: 1px solid #304156;

    .el-menu-item {
      color: #fff;

      &:hover {
        color: #1890ff;
        background: none;
      }
    }

    .is-active {
      color: #1890ff;
      background: none;
    }

    ::v-deep .el-submenu__title {
      background: none;
      color: #fff;

      &:hover {
        color: #1890ff;
      }

      .el-menu {
        color: black;
        background-color: black;
      }
    }
  }
}
</style>
