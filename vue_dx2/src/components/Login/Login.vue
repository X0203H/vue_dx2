<template>
  <transition name="login" appear>
    <div id="Login">
      <div class="content">
        <h2>系统登录</h2>
        <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-user-solid"
            v-model="user">
        </el-input>
        <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="pwd" show-password></el-input>
        <el-button type="primary" @click="In">登录</el-button>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'LogIn',
  data() {
    return {
      pwd: localStorage.getItem('pwd'),
      user: localStorage.getItem('account'),
    };
  },
  methods: {
    In() {
      if (this.pwd === '' && this.user === '') {
        this.$message({
          message: '内容不能为空',
          type: 'error',
        });
      } else {
        this.$request.post('/users/checkLogin', {
          account: this.user,
          password: this.pwd,
        }).then((res) => {
          // console.log(1111);
          console.log(res);
          if (res.code === 0) {
            if (localStorage.getItem('token')) {
              this.$message({
                message: '登录成功',
                type: 'success',
              });
              localStorage.setItem('pwd', this.pwd);
              setTimeout(() => {
                this.$router.push('/index/backstage');
              }, 2000);
            } else {
              this.$message({
                message: '正在将账号与密码进行存储',
                type: 'info',
              });
              localStorage.setItem('account', this.user);
              localStorage.setItem('pwd', this.pwd);
              localStorage.setItem('token', res.token);
              if (localStorage.getItem('account') === this.user && localStorage.getItem('pwd') === this.pwd) {
                setTimeout(() => {
                  this.$message({
                    message: '存储完毕，正在为您登录，请稍等...',
                    type: 'info',
                  });
                  this.$router.push('/index/backstage');
                }, 3000);
              }
            }
          } else {
            alert('参数错误');
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes loginShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.login-enter-active {
  animation: loginShow 1s;
}

.login-leave-active {
  animation: loginShow 1s reverse;
}

//.login
#Login {
  position: relative;
  width: 100%;
  height: 100vh;
  //background-color: red;
  background: url("../public/image/bg.png") 100% center;

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 300px;
    transform: translate(-50%, -50%);

    h2 {
      text-align: center;
      color: #fff;
    }

    .el-input {
      margin: 15px 0;

      &:nth-of-type(1) {
        margin-top: 50px;
      }
    }

    .el-button {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
