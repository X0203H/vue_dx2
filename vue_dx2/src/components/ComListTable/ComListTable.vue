<template>
<div id="ComListTable">
  <el-table
      :data="ComListData.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
      style="width: 100%">
<!--    下拉箭头-->
    <el-table-column type="expand">
      <template v-slot="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="商品价格">
            <span>{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="商品图片">
            <span>{{ props.row.imgUrl }}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{ props.row.ctime }}</span>
          </el-form-item>
          <el-form-item label="商品评价">
            <span>{{ props.row.rating }}</span>
          </el-form-item>
          <el-form-item label="商品销量">
            <span>{{ props.row.sellCount }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.goodsDesc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
        label="商品名称"
        prop="name">
    </el-table-column>
    <el-table-column
        label="所属分类"
        prop="category">
    </el-table-column>
    <el-table-column
        label="商品价格"
        prop="price">
    </el-table-column>
    <el-table-column
        label="商品图片"
        prop="imgUrl">
      <template v-slot="scope">
        <img :src="ComListData[scope.$index].imgUrl" alt="图片出错">
      </template>
    </el-table-column>
    <el-table-column
        label="商品描述"
        prop="goodsDesc">
    </el-table-column>
    <el-table-column
        label="操作">
      <template v-slot="scope">
        <el-button type="primary" @click="EditItem(scope.row.id)">编辑</el-button>
        <el-dialog
            title="提示"
            :visible="dialogVisible"
            width="30%"
            :before-close="ShutDown">
          <div class="input">
            <span>商品名称<a href="javascript:">*</a></span>
            <el-input
                placeholder="请输入商品名称"
                v-model="inputName"
                clearable>
            </el-input>
          </div>
          <div class="input">
            <span>商品分类<a href="javascript:">*</a></span>
            <el-input
                placeholder="请输入商品分类"
                v-model="inputComClass"
                clearable>
            </el-input>
          </div>
          <div class="input">
            <span>商品价格<a href="javascript:">*</a></span>
            <el-input
                placeholder="请输入商品的价格"
                v-model="inputPrice"
                clearable>
            </el-input>
          </div>
          <div class="input">
            <span>商品描述<a href="javascript:">*</a></span>
            <el-input
                placeholder="请输入商品的描述"
                v-model="inputGoods"
                clearable>
            </el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="ShutDown">取 消</el-button>
            <el-button type="primary" @click="handleClose(scope.row.id)">确 定</el-button>
          </span>
        </el-dialog>
        <el-button type="danger" @click="DelItem(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<!--  分页器-->
  <el-pagination
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-sizes="[5,10,15,20]"
      :page-size="pageSize"
      layout="total,sizes, prev, pager, next, jumper"
      :total="ComListData.length">
  </el-pagination>
<!--  编辑对话框-->

</div>
</template>

<script>
export default {
  name: 'ComListTable',
  data() {
    return {
      ComListData: [],
      currentPage1: 1,
      pageSize: 5,
      // 编辑对话框
      dialogVisible: false,
      inputName: '',
      inputComClass: '',
      inputPrice: '',
      inputGoods: '',
    };
  },
  created() {
    this.RequestData();
  },
  methods: {
    // 请求回来的数据
    RequestData() {
      this.$request.get('/goods/list', {
        params: {
          currentPage: 1,
          pageSize: 49,
        },
      }).then((res) => {
        // console.log(res);
        this.ComListData = res.data;
        // console.log(this.ComListData);
      });
    },
    // 分页回调
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage1 = val;
    },
    // 删除
    DelItem(id) {
      // console.log(id);
      this.$request.get('/goods/del', {
        params: {
          id,
        },
      }).then((res) => {
        // console.log(res);
        this.$message({
          message: res.msg,
          type: 'warning',
        });
        this.ComListData = this.ComListData.filter((item) => item.id !== id);
      });
    },
    // 编辑按钮弹出对话框
    EditItem() {
      this.dialogVisible = true;
    },
    // 点击确认按钮进行编辑
    handleClose(id) {
      this.$request.post('/goods/edit', {
        name: this.inputName,
        category: this.inputComClass,
        price: this.inputPrice,
        imgUrl: '1588415526427.webp',
        goodsDesc: this.inputGoods,
        id,
        // 最大112
      }).then((res) => {
        console.log(res, id);
        // 数据更新，重新渲染页面
        this.RequestData();
        this.inputName = '';
        this.inputComClass = '';
        this.inputPrice = '';
        this.inputGoods = '';
      });
      this.dialogVisible = false;
    },
    // 关闭对话框
    ShutDown() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
#ComListTable{
  margin-top: 10px;
  .input{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    height: 40px;
    margin: 15px 0;
    a{
      color:red;
    }
    .el-input{
      width: 300px;
    }
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
