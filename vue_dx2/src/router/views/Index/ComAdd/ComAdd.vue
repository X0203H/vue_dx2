<template>
<div id="ComAdd">
  <p class="title">商品添加</p>
  <div class="content">
    <div class="Com">
      <span>商品名称</span>
      <el-input
          style="width: 400px"
          placeholder="请输入内容"
          v-model="ComName"
          clearable>
      </el-input>
    </div>
    <div class="Com">
      <span>商品分类</span>
      <el-select style="width: 300px" v-model="ComClassVal" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="Com">
      <span>商品价格</span>
      <el-input-number v-model="ComPrice" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
    </div>
    <div class="Com" style="align-items: flex-start;height: 150px">
      <span>商品图片</span>
       <el-upload
           action="/file/Upload?module=EQ"
           accept="image/jpeg,image/jpg,image/png"
           :limit="1"
           :on-change="handleLimit"
           list-type="picture-card">
         <img v-if="imageUrl" :src="imageUrl" class="avatar">
       <i class="el-icon-plus"></i>
       </el-upload>
    </div>
    <div class="Com">
      <span>商品描述</span>
      <el-input
          style="margin-left: 10px"
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="ComDescription">
      </el-input>
    </div>
    <el-button type="primary" style="margin: 10px 0 0 100px" @click="AddCom">添加商品</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'ComAdd',
  data() {
    return {
      ComName: '',
      options: [{
        value: '冒菜',
        label: '冒菜',
      }, {
        value: '炒饭系列',
        label: '炒饭系列',
      }, {
        value: '鲜炒盖饭',
        label: '鲜炒盖饭',
      }, {
        value: '收藏门店超值专享',
        label: '收藏门店超值专享',
      }],
      ComClassVal: '',
      ComPrice: 1,
      imageUrl: '',
      // eqObj: {
      // uploadDisabled: false,
      // },
      header: {
        token: localStorage.getItem('token'),
      },
      ComDescription: '',
    };
  },
  methods: {
    // 添加商品
    AddCom() {
      this.$request.post('/goods/add', {
        name: this.ComName,
        category: this.ComClassVal,
        price: this.ComPrice,
        imgUrl: this.imageUrl,
        goodsDesc: this.ComDescription,
      }).then((res) => {
        // 添加的商品在最后面
        console.log(res);
      });
    },
    // 商品价格回调
    handleChange(value) {
      console.log(value);
    },
    //   商品图片回调
    // 上传图片的事件
    handleLimit(file, fileList) {
      console.log(file.name);
      this.imageUrl = file.name;
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
};
</script>

<style lang="less" scoped>
#ComAdd{
  width: 98%;
  margin: 1%;
  height: 88vh;
  background-color: #fff;

  .title{
    padding: 20px 0 20px 20px;
    border-bottom: 1px solid #ccc;
  }
  .content{
    .Com{
      display: flex;
      flex-direction: row;
      //justify-content: space-between;
      align-items: center;
      width: 500px;
      height: 40px;
      margin:20px;
      span{
        width: 80px;
      }
    }
  }
}
</style>
