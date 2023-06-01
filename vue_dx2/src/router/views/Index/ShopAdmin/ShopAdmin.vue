<template>
<div id="ShopAdmin">
  <div class="addClass">
    <p class="title">店铺管理</p>
    <el-button type="primary" @click="save(ShopData)">保存</el-button>
  </div>
  <div id="ShopAdminFrom">
    <el-form :model="ShopData"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="店铺名称" prop="name">
        <el-input style="width: 300px" v-model="ShopData.name"></el-input>
      </el-form-item>
      <!--    店铺公告-->
      <el-form-item label="店铺公告" prop="region">
        <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="ShopData.bulletin">
        </el-input>
      </el-form-item>
      <!--    店铺头像-->
      <el-form-item label="店铺头像" required>
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :headers="header"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <img style="width: 178px;height: 178px" v-if="ShopData.avatar" :src="ShopData.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!--    店铺图片-->
      <el-form-item label="店铺图片" prop="delivery">
        <el-upload
            action="/file/Upload?module=EQ"
            accept="image/jpeg,image/jpg,image/png"
            :on-change="handleLimit"
            list-type="picture-card">
          <img v-if="ShopData.pics" :src="ShopData.pics" class="avatar">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!--    配送费-->
      <el-form-item label="配送费" prop="type">
        <el-input
            placeholder="请输入内容"
            v-model="ShopData.deliveryPrice"
            clearable>
        </el-input>
      </el-form-item>
      <!--    配送时间-->
      <el-form-item label="配送时间" prop="resource">
        <el-input
            placeholder="请输入内容"
            v-model="ShopData.deliveryTime"
            clearable>
        </el-input>
      </el-form-item>
      <!--    配送描述-->
      <el-form-item label="配送描述" prop="desc">
        <el-input
            placeholder="请输入内容"
            v-model="ShopData.description"
            clearable>
        </el-input>
      </el-form-item>
      <!--    店铺评分-->
      <el-form-item label="店铺评分" prop="desc">
        <el-input
            placeholder="请输入内容"
            v-model="ShopData.score"
            clearable>
        </el-input>
      </el-form-item>
      <!--    销量-->
      <el-form-item label="销量" prop="desc">
        <el-input
            placeholder="请输入内容"
            v-model="ShopData.sellCount"
            clearable>
        </el-input>
      </el-form-item>
      <!--    活动-->
      <el-form-item label="活动" prop="type">
        <el-checkbox-group v-model="ShopData.supports">
          <el-checkbox label="在线支付满28减5" name="在线支付满28减5"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折" name="VC无限橙果汁全场8折"></el-checkbox>
          <el-checkbox label="单人精彩套餐" name="单人精彩套餐"></el-checkbox>
          <el-checkbox label="特价饮品8折抢购" name="特价饮品8折抢购"></el-checkbox>
          <el-checkbox label="单人特色套餐" name="单人特色套餐"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!--    营业时间-->
      <el-form-item label="营业时间" prop="type">
        <el-time-picker
            is-range
            v-model="ShopData.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
        </el-time-picker>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'ShopAdmin',
  data() {
    return {
      // 请求回来的数据
      ShopData: {
        id: 1,
        name: '',
        bulletin: '',
        avatar: '',
        deliveryPrice: '',
        deliveryTime: '',
        description: '',
        score: '',
        sellCount: '',
        supports: [],
        date: [],
        pics: [],
        minPrice: '',
      },
      // 店铺图片
      dialogVisible: false,
      // 跨域问题
      header: {
        token: window.localStorage.getItem('token'),
      },
    };
  },
  methods: {
    // 请求数据
    SendShop() {
      this.$request.get('/shop/info').then((res) => {
        // console.log(res);
        this.ShopData = res.data;
        console.log(this.ShopData);
      });
    },
    save(ShopData) {
      // console.log(ShopData);
      this.$request.post('/shop/edit', {
        id: 1,
        name: ShopData.name,
        bulletin: ShopData.bulletin,
        avatar: ShopData.avatar,
        deliveryPrice: ShopData.deliveryPrice,
        deliveryTime: ShopData.deliveryTime,
        description: ShopData.description,
        score: ShopData.score,
        sellCount: ShopData.sellCount,
        supports: ShopData.supports,
        date: ShopData.date,
        pics: ShopData.pics,
        minPrice: ShopData.minPrice,
      }).then((res) => {
        console.log(res);
      }).catch((err) => console.log(err));
    },
    // 店铺头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //   店铺图片
    handleLimit(file, fileList) {
      console.log(file.name);
      this.ruleForm.imageUrl = file.name;
      if (fileList.length >= 1) {
        this.eqObj.uploadDisabled = true;
        // this.$set(this.eqObj, 'uploadDisabled', true);
        // console.log(1);
      } else {
        // console.log(2);
        this.eqObj.uploadDisabled = false;
        // this.$set(this.eqObj, 'uploadDisabled', false);
      }
      this.$forceUpdate();
    },
  },
  created() {
    this.SendShop();
  },
};
</script>

<style lang="less" scoped>
#ShopAdmin{
  width: 98%;
  margin: 1%;
  height: 88vh;
  overflow-y: scroll;
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
  #ShopAdminFrom{
    //height: 60vh;
    margin-top: 20px;
    .el-input,
    .el-textarea{
      width: 300px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      //width: 178px;
      //height: 178px;
      display: block;
    }
  }
}
</style>
