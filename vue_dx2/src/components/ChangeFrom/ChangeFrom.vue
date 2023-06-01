<template>
<div id="ChangeFrom">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="原密码" prop="OldPwd">
      <el-input style="width: 300px" v-model="ruleForm.OldPwd" @blur="ExaminePwd" show-password></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="NewPwd">
      <el-input style="width: 300px" v-model="ruleForm.NewPwd" show-password></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="ConfirmPwd">
      <el-input style="width: 300px" v-model="ruleForm.ConfirmPwd" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handlerAdd(ruleForm)">确定</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'ChangeFrom',
  data() {
    return {
      // 存储用户输入的值
      ruleForm: {
        OldPwd: '',
        NewPwd: '',
        ConfirmPwd: '',
      },
      // 提示信息
      rules: {
        OldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          {
            min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur',
          },
        ],
        NewPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur',
          },
        ],
        ConfirmPwd: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          {
            min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    // 检查旧密码是否正确
    ExaminePwd() {
      this.$request.get('/users/checkoldpwd', {
        params: {
          oldPwd: this.ruleForm.OldPwd,
        },
      }).then((res) => {
        // console.log(res);
        if (res.code === '00') {
          this.$message({
            message: '旧密码正确！',
            type: 'success',
          });
        } else {
          this.$message({
            message: '旧密码错误！',
            type: 'error',
          });
        }
      });
    },
    // 修改密码回调
    handlerAdd(ruleForm) {
      // console.log(ruleForm)
      this.$request.post('/users/editpwd', {
        newPwd: ruleForm.NewPwd,
      }).then((res) => {
        // console.log(res);
        if (res.code === 0) {
          if (ruleForm.NewPwd === ruleForm.ConfirmPwd) {
            this.$message({
              message: res.msg,
              type: 'success',
            });
            // 修改密码成功，清空本地存储的内容
            // localStorage.clear();
            localStorage.removeItem('pwd');
            setTimeout(() => {
              this.$router.push('/login');
            }, 2000);
          }
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
#ChangeFrom{
  margin: 20px 0 0 0 ;
}
</style>
