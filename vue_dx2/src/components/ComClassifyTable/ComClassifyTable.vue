<template>
<div id="ComClassifyTable">
  <el-table
      :data="$store.state.ComClassify.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
      style="width: 100%">
    <el-table-column
        prop="id"
        label="序号"
        width="350">
    </el-table-column>
    <el-table-column
        prop="cateName"
        label="分类名称"
        width="350">
      <template v-slot="scope">
        <span v-if="!isShow[scope.$index]">{{scope.row.cateName}}</span>
        <el-input
            ref="InputName"
            v-if="isShow[scope.$index]"
            placeholder="请输入内容"
            v-model="scope.row.cateName"
            clearable>
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
        prop="state"
        label="是否应用"
        width="350">
      <template v-slot="scope">
        <el-switch
            v-model="scope.row.state"
            @change="handleChange(scope.row,scope.$index)"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
        label="操作"
        width="350">
      <template v-slot="scope">
        <el-button v-if="!isShow[scope.$index]" @click="handleEditCell(scope.$index)">编辑</el-button>
        <el-button v-if="isShow[scope.$index]" type="success" @click="editCatMame(scope.row,scope.$index)">完成</el-button>
        <el-button type="danger" @click="DelClass(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<!--  分页器-->
  <el-pagination
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="$store.state.ComClassify.length">
  </el-pagination>
</div>
</template>

<script>
export default {
  name: 'ComClassifyTable',
  data() {
    return {
      //   分页器
      currentPage1: 1,
      pageSize: 5,
      //   编辑开关
      isShow: {
        show: false,
      },
    };
  },
  created() {
    // this.Send();
    this.$store.dispatch('ComClass');
  },
  methods: {
    // 开关状态改变回调
    handleChange(row) {
      console.log(row);
    },
    // 完成按钮
    editCatMame(row, index) {
      console.log(row);
      if (row.state === 1) {
        row.state = true;
      } else if (row.state === 0) {
        row.state = false;
      }
      this.$request.post('/goods/editcate', {
        id: row.id,
        cateName: row.cateName,
        state: row.state,
      }).then((res) => {
        console.log(res);
        this.$set(this.isShow, index, false);
        this.$message({
          message: '修改成功!',
          type: 'success',
        });
        this.$store.dispatch('ComClass');
      });
    },
    // 编辑
    handleEditCell(index) {
      console.log(index, 1);
      // 通过$set动态添加一个控制编辑的开关
      this.$set(this.isShow, index, true);
      // 记录当前选中行的数据
      this.$nextTick(() => {
        this.$refs.InputName.focus();
      });
      // console.log(row.state);
    },
    // 删除按钮
    DelClass(id) {
      this.$request.get('/goods/delcate', {
        params: {
          id,
        },
      }).then((res) => {
        console.log(res);
        this.$message({
          message: '删除成功！',
          type: 'warning',
        });
        this.$store.dispatch('ComClass');
      });
    },
    //   分页器回调
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage1 = val;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
