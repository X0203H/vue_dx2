<template>
<div id="AccountListTable">
  <el-table
      ref="multipleTable"
      :data="AccountTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
    <el-table-column
        type="selection"
        width="55">
    </el-table-column>
    <el-table-column
        prop="account"
        label="账号"
        width="220">
      <template v-slot="scope">
        <span v-if="!isShow[scope.$index]">{{scope.row.account}}</span>
        <el-input
            ref="InputName1"
            v-if="isShow[scope.$index]"
            placeholder="请输入内容"
            v-model="scope.row.account"
            clearable>
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
        prop="userGroup"
        label="用户组"
        width="220">
      <template v-slot="scope">
        <span v-if="!isShow[scope.$index]">{{scope.row.userGroup}}</span>
        <el-input
            ref="InputName2"
            v-if="isShow[scope.$index]"
            placeholder="请输入内容"
            v-model="scope.row.userGroup"
            clearable>
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
        label="创建时间"
        width="250">
      <template v-slot="scope">
        {{scope.row.ctime}}
      </template>
    </el-table-column>
    <el-table-column
        prop="address"
        label="操作"
        width="660">
      <template v-slot="scope">
        <el-button v-if="!isShow[scope.$index]" @click="handleEdit(scope.$index)">编辑</el-button>
        <el-button v-if="isShow[scope.$index]" type="success" @click="complete(scope.row,scope.$index)">完成</el-button>
        <el-button type="danger" @click="DelAccount(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<!--  分页器-->
  <el-pagination
      style="margin: 10px 20px "
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="AccountTable.length">
  </el-pagination>
<!--  下方的按钮-->
  <div style="margin:20px;">
    <el-button type="danger" @click="BatchDel">批量删除</el-button>
    <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'AccountListTable',
  data() {
    return {
      // 默认页
      currentPage: 1,
      // 每页条数
      pageSize: 5,
      // 数据
      AccountTable: [],
      // 复选框的值
      multipleSelection: [],
      // 批量删除的每个id
      ids: [],
      isShow: {
        show: false,
      },
    };
  },
  methods: {
    // 请求数据
    RequestAccount() {
      this.$request.get('/users/list', {
        params: {
          currentPage: 1,
          pageSize: 100,
        },
      }).then((res) => {
        // console.log(res);
        this.AccountTable = res.data;
      });
    },
    // 编辑按钮
    handleEdit(index) {
      this.$set(this.isShow, index, true);
      this.$nextTick(() => {
        this.$refs.InputName1.focus();
      });
    },
    // 完成按钮
    complete(row, index) {
      console.log(row, index);
      this.$request.post('/users/edit', {
        id: row.id,
        account: row.account,
        userGroup: row.userGroup,
      }).then((res) => {
        // console.log(res);
        if (res.msg === '修改账号成功!') {
          this.$set(this.isShow, index, false);
          this.$message({
            message: '修改成功',
            type: 'success',
          });
        } else {
          this.$message({
            message: '修改失败',
            type: 'error',
          });
        }
      });
    },
    // 删除账号
    DelAccount(id) {
      this.$request.get('/users/del', {
        params: {
          id,
        },
      }).then(() => {
        // console.log(res);
        this.$message({
          message: '删除成功！',
          type: 'warning',
        });
        this.RequestAccount();
      });
    },
    // 表格取消选择回调
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      const ids = [];
      // console.log(this.multipleSelection);
      this.multipleSelection.forEach((item) => {
        // console.log(item.id);
        ids.push(item.id);
        this.ids = JSON.stringify(ids);
        // console.log(this.ids);
      });
    },
    // 批量删除
    BatchDel() {
      this.$request.get('/users/batchdel', {
        params: {
          ids: this.ids,
        },
      }).then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.$message({
            message: '删除成功！',
            type: 'success',
          });
          this.RequestAccount();
        } else {
          this.$message({
            message: '删除错误！',
            type: 'error',
          });
        }
      });
    },
    // 分页器回调
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  created() {
    this.RequestAccount();
  },
};
</script>

<style lang="less" scoped>
#AccountListTable{
  margin: 20px;
}
</style>
