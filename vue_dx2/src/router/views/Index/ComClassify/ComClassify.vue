<template>
<div id="ComClassify">
  <div class="addClass">
    <p class="title">商品分类</p>
    <el-button type="primary" @click="dialogVisible=true">添加分类</el-button>
<!--    添加分类对话框-->
    <el-dialog
        title="添加分类"
        :visible="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div class="Input">
          <span>分类名称</span>
          <el-input
              placeholder="请输入内容"
              v-model="ClassName"
              clearable>
          </el-input>
        </div>
        <div class="Switch" style="margin: 20px 0">
          <span>是否应用</span>
          <el-switch
              style="margin-left: 20px"
              v-model="addSwitch"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
        </div>
      <span style="display: flex;justify-content: flex-end" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ConfirmAddClass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  <ComClassifyTable></ComClassifyTable>
</div>
</template>

<script>
import ComClassifyTable from '../../../../components/ComClassifyTable/ComClassifyTable.vue';

export default {
  name: 'ComClassify',
  components: {
    ComClassifyTable,
  },
  data() {
    return {
      dialogVisible: false,
      // 分类名称
      ClassName: '',
      //   开关
      addSwitch: true,
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    // 确认添加分类
    ConfirmAddClass() {
      this.$request.post('/goods/addcate', {
        cateName: this.ClassName,
        state: this.addSwitch,
      }).then((res) => {
        console.log(res);
        this.dialogVisible = false;
        this.$message({
          message: '添加成功！',
          type: 'success',
        });
        // 在请求一回
        this.$store.dispatch('ComClass');
      });
    },
  },
};
</script>

<style lang="less" scoped>
#ComClassify{
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
  .Input{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    .el-input{
      width: 400px;
    }
  }
}
</style>
