<template>
<div id="AccountAddFrom">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号" prop="account">
      <el-input style="width: 300px" v-model="ruleForm.account"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input style="width: 300px" v-model="ruleForm.pwd" show-password></el-input>
    </el-form-item>
    <el-form-item label="用户组" prop="UserGroup">
      <el-select v-model="ruleForm.UserGroup" placeholder="请选择用户组">
        <el-option label="超级管理员" value="超级管理员"></el-option>
        <el-option label="普通管理员" value="普通管理员"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handlerAdd(ruleForm)">立即添加</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'AccountAddFrom',
  data() {
    return {
      // 存储用户输入的值
      ruleForm: {
        account: '',
        pwd: '',
        UserGroup: '',
      },
      // 提示信息
      rules: {
        account: [
          { required: true, message: '请输入账号名', trigger: 'blur' },
          {
            min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur',
          },
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur',
          },
        ],
        UserGroup: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    // 添加账号回调
    handlerAdd(ruleForm) {
      // console.log(ruleForm);
      this.$request.post('/users/add', {
        account: ruleForm.account,
        password: ruleForm.pwd,
        userGroup: ruleForm.UserGroup,
      }).then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.$message({
            message: '添加成功！',
            type: 'success',
          });
        } else {
          this.$message({
            message: '添加失败！',
            type: 'error',
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
#AccountAddFrom{
  margin: 20px 0 0 0 ;
}
</style>
