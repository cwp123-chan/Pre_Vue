<template>
  <div class="menu-right">

    <div class="menu-top">

    </div>
    <div class="menu-top-list">
      <div class="menu-top-list-title">
        <span>数据预览</span>
      </div>
      <div class="menu-top-list-top">
        <div class="menu-top-list-top-info">
          商品名称
        </div>
        <div class="menu-top-list-top-info">
          商品销量
        </div>
        <div class="menu-top-list-top-info">
          商品描述
        </div>
        <div class="menu-top-list-top-info">
          商品顺序
        </div>
        <div class="menu-top-list-top-info">
          商品所属分类
        </div>
        <div class="menu-top-list-top-info">
          商品状态
        </div>
        <div class="menu-top-list-top-info">
          创建时间
        </div>
      </div>
      <div class="menu-top-list-list">
<!--        <div class="menu-top-list-top-info">-->
<!--          {{tagName}}-->
<!--        </div>-->
<!--        <div class="menu-top-list-top-info">-->
<!--          {{tagPay}}-->
<!--        </div>-->
<!--        <div class="menu-top-list-top-info">-->
<!--          {{tagDisc}}-->
<!--        </div>-->
<!--        <div class="menu-top-list-top-info">-->
<!--          {{tagSolt}}-->
<!--        </div>-->
<!--        <div class="menu-top-list-top-info">-->
<!--          {{tagCate}}-->
<!--        </div>-->
<!--        <div class="menu-top-list-top-info">-->
<!--          {{tagStatus}}-->
<!--        </div>-->
<!--        <div class="menu-top-list-top-info">-->
<!--          {{tagCreat}}-->
<!--        </div>-->
      </div>
    </div>
    <div class="menu-body">
      <div class="menu-title">
        <a-icon type="plus-circle" />
        <span>添加商品标签</span>
      </div>

        <div class="add-tag-form-max-div">
          <div class="add-tag-form-max-div-left">

            <div class="add-tag-form-max-div-input1">
              <div class="catagory_input">
                <label for="name">生产日期：</label><input class="catagory_form" type="text"  name="catagory_solt" />
              </div>
            </div>

            <div class="add-tag-form-max-div-input1">
              <div class="catagory_input">
                <label for="name">过期时间：</label><input class="catagory_form"  type="text"  name="catagory_solt" />
              </div>
            </div>
            <div class="add-tag-form-max-div-input1">
              <div class="catagory_input">
                <label for="name">保&nbsp;&nbsp;质&nbsp;&nbsp;期：</label><input class="catagory_form"  type="text"  name="catagory_solt" />
              </div>
            </div>



          <div class="add-tag-form-max-div-input1">
            <div class="catagory_input">
              <label for="name">促销标语：</label><input class="catagory_form"  type="text"  name="catagory_solt" />
            </div>
          </div>
          <div class="add-tag-form-max-div-input1">
            <div class="tag_input">
            <a-button>提交上传</a-button>
            </div>
          </div>
        </div>
          <div>
            <template>
              <div class="clearfix">
                <a-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  :fileList="fileList"
                  @preview="handlePreview"
                  @change="handleChange"
                >
                  <div v-if="fileList.length < 9">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </template>
          </div>

      </div>

    </div>

  </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "addCategoryClass",
        data(){
            return {
                tagName:"",
                tagPay:"",
                tagDisc:"",
                tagSolt:"",
                tagCate:"",
                tagStatus:"",
                tagCreat:"",
                previewVisible: false,
                previewImage: '',
                fileList: [
                    {
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    },
                ],
            }
        },
        methods:{
            handleCancel() {
                this.previewVisible = false;
            },
            handlePreview(file) {
                this.previewImage = file.url || file.thumbUrl;
                this.previewVisible = true;
            },
            handleChange({ fileList }) {
                this.fileList = fileList;
            },
        },
        mounted() {
            console.log(this.$route.params.id);
        }

    }
</script>

<style scoped>
  .menu-title{
    position: absolute;
    color:#747474;
    font-size: 20px;
    margin-left: 2%;
    margin-top: 20px;
  }
  .menu-right{
    width:100%;
    height:900px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .menu-body{
    width:100%;
    height:60%;
    margin-left: 2%;
    border: 1px solid #e8e8e8;
  }


  .catagory_form{
    outline-style: none ;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .catagory_input{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
  }
  .tag_selsct{
    width:171px;
    height:27px;
    padding-left: 50px;
    outline-style: none ;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .add-tag-form{
    width:80%;
    border: 1px solid white;
    margin-left: 25%;
    margin-top: 20px;
  }
  .add-tag-form-div{
    margin-left: -30%;
    margin-top: 50px;
  }
  .tag_select_input{
    margin-left: -31%;
  }
  .menu-top-list{
    width:100%;
    height:44%;
    border: 1px solid;
  }
  .menu-top-list-top{
    display: flex;

    background-color: #e6e6e6;
    margin-top: 30px;
    width:100%;
    height:45px;
  }
  .menu-top-list-list{
    display: flex;
    margin-top: 20px;
    width:100%;
    border: 1px solid #f7f7f7;
    height:45px;
  }
  .menu-top-list-title{
    width:100%;
    display: flex;
    justify-content: center;
  }
  .menu-top-list-title>span{
    margin-top: 80px;
    font-size: 24px;
    font-weight:bold;
  }
  .menu-top-list-top-info{
    display: flex;
    justify-content: center;
    align-items: center;
    width:25%;
  }
  .add-tag-form-max-div{
    display: flex;
    margin-left: 30%;
    margin-top: 60px;
    width:50%;
    /*border: 1px solid;*/
  }
  .add-tag-form-max-div-input1{
    display: flex;
    padding-left : 10%;
    width:100%;
    height:50px;
    /*border: 1px solid;*/
  }
  .add-tag-form-max-div-input2{
    /*border: 1px solid;*/
  }
  .tag_input{
    margin-top: 2%;
    width:300px;
  }

  /*图片上传*/
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  .clearfix{
    width:400px;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  .add-tag-form-max-div-left{
    width:50%;
    /*border: 1px solid;*/
  }

</style>
