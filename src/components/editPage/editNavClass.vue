<template>
  <div class="menu-right">
    <div class="editMenu-right">
      <div class="editMenu-right-top">
      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText">导航位置:</label>
        <select name="" id=""  class="editMenu-right-main-textInput"  v-model = "navName">
          <option :value="index"  v-for = "(navType,index) in navList">{{navType}}</option>
        </select>
      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText">文字说明:</label>
        <textarea v-model = "titleInfo"  cols="1" name="name"  rows="6"  class="editMenu-right-main-textInput"  style="OVERFLOW:   hidden">{{navMsg.title}}</textarea>
      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText" >链接类型:</label>
        <select name="" id=""  class="editMenu-right-main-textInput" v-model = "linkName">
          <option :value = "index" v-for = "(linkType,index) in linkList">{{linkType}}</option>
        </select>
      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText">链接目标:</label>
        <textarea v-model = "linkInfo"  cols="1" name="name"  rows="6"  class="editMenu-right-main-textInput"  style="OVERFLOW:   hidden">{{navMsg.link_target}}</textarea>
      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText">导航状态:</label>
        <select name="" id="" v-model = "navStatus" class="editMenu-right-main-textInput">
          <option value="1">启用</option>
          <option value="2">禁用</option>
          <option value="3">备用</option>
        </select>
      </div>
      <div class="editMenu-right-main picgf" >
        <div v-for = "pic in picture">
          <img :src = "pic" :alt="pic">
        </div>
      </div>
      <div class="editMenu-right-main">
        <div class="editMenu-right-main-textInputUploadPic">
          <template>
            <div>
              <a-upload
                listType="picture"
                :defaultFileList="fileList"
                :customRequest = "uploadPic"
              >
                <a-button> <a-icon type="upload" /> 上传图片 </a-button>
              </a-upload>
              <br />
            </div>
          </template>
        </div>
      </div>


      <div class="editMenu-right-main">
        <a-button @click="pullallData()"> <a-icon  type="upload" /> 提交修改 </a-button>
      </div>
    </div>
  </div>
</template>

<script>
    import qs from "qs";
    import axios from "axios";
    import apiConfig from '../../router/httpConfig.js'
    export default {
        name: "editProductClass",
        data() {
            return {
                fileList:[],
                picKey:[],
                navList:[],
                navName:"",
                titleInfo:"",
                linkList:[],
                linkName:"",
                linkInfo:"",
                navStatus:"",
                navMsg:{},
                picture:[]
            };
        },
        methods:{
            uploadPic(data){
                let config = {
                    headers: {
                        "Content-Type": "multipart/form-data;charset=utf-8"
                    }
                };
                let form = new FormData();
                form.append("name",data.file);
                console.log(form.get("name"))
                axios
                    .post(apiConfig.uploadPicData+"?token="+localStorage.getItem("token"),form,config)
                    .then(res=>{
                        this.picKey.push(res.data.key);
                        this.fileList.push({
                            "uid": '-1',
                            "name": 'xxx.png',
                            "status": 'done',
                            "url":res.data.tmp,
                            "thumbUrl":res.data.tmp,
                        })
                        console.log(res)
                    })
            },
            pullallData(){
                let allData = {
                    "id":this.$route.params.id,
                    "positionId":this.navName,
                    "title" : this.titleInfo,
                    "linkType" : this.linkName,
                    "linkTarget" : this.linkInfo,
                    "status" : this.navStatus
                }
                console.log(allData);
                console.log(this.picKey)
                if(this.picKey.length == 0){
                    allData.picture = "暂无更新";
                    axios
                        .post(apiConfig.updataNavData+"?token="+localStorage.getItem("token"),qs.stringify(allData))
                        .then(res=>{
                            console.log(res)
                            alert("修改成功")
                        })
                }else{
                    axios
                        .post(apiConfig.pushLoadPic+"?token="+localStorage.getItem("token"),qs.stringify({
                            "key":this.picKey,
                            "func":"upload"
                        }))
                        .then(res=> {
                            var picData = JSON.stringify(res.data)
                            allData.picture = picData;
                            console.log(picData)
                            axios
                                .post(apiConfig.updataNavData+"?token="+localStorage.getItem("token"),qs.stringify(allData))
                                .then(res=>{
                                    console.log(res)
                                    alert("修改成功")
                                })
                        })
                    console.log(allData)
                }

            }
        },
        mounted(){
            console.log(this.$route.params.id);
            axios
                .get(apiConfig.showNavData+"?id="+this.$route.params.id+"&token="+localStorage.getItem("token"))
                .then(res=>{
                    this.navMsg = res.data[0][0];
                    this.navList = res.data[1];
                    this.picture = res.data[0][0].picture;
                    console.log(this.picture);
                    this.linkList = res.data[2];
                })
        }
    }
</script>

<style scoped>
  .menu-right{
    display: flex;
    justify-content: center;
    width:100%;
    margin-top: 45px;
    min-height:900px;
  }
  .editMenu-right{
    width:60%;
  }
  .editMenu-right-top{
    height:100px;
  }
  .editMenu-right-main{
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    min-height:7.5%;
  }
  .editMenu-right-mainTable{
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    /*border: 1px solid;*/
  }
  .editMenu-right-main-textInput{
    width:63%;
    border:1px solid cyan;
    height:30px;
    padding-left: 20px;
    border-radius: 10px;
    margin-left:10px;
  }
  .editMenu-right-main-textInputselect{
    width:6%;
    border:1px solid cyan;
    height:30px;
    padding-left: 10px;
    border-radius: 10px;
    margin-left:10px;
  }
  .editMenu-right-main-textInputUploadPic{
    width:70%;
    /*margin-left: 80px;*/
  }
  .editMenu-right-main-textInputText{
    display:inline-block;
    width:150px;
    text-align:right;
    font-size: 18px;
    font-weight: 700;
  }
  .editMenu-right-main-textInputbzqTimeYear{
    width:7%;
    border:1px solid cyan;
    height:30px;
    padding-left: 20px;
    border-radius: 10px;
    margin-left:10px;
  }
  .editMenu-right-main-textInputbzqTime{
    width:26%;
    border:1px solid cyan;
    height:30px;
    padding-left: 20px;
    border-radius: 10px;
    margin-left:10px;
  }
  .editMenu-right-mainTable-div{
    width:100%;
    border: 1px solid #e8e8e8;
  }
  .editMenu-right-mainTable-div-top{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f7f7;
    width:100%;
    height:30px;
  }
  .editMenu-right-mainTable-div-body{
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:30px;
  }
  .editMenu-right-mainTable-div-top-item{
    display: flex;
    justify-content: center;
    align-items: center;
    width:25%;
    height:100%;
  }
  input{
    display: flex;
    justify-content: center;
    padding-left: 40px;
    border: 1px solid #e8e8e8;

  }
  .yuanstyle{
    border: 1px solid #00ffee;
    background-color: #00ffee;
  }
  .yuanstyle:hover{
    cursor: pointer;
  }
  .editMenu-right-mainTable-div-bodypush{
    background-color: #00ffee;
  }
  .addTag .editMenu-right{
  }
  .addTag{
    display: flex;
    flex-wrap: wrap;
    height:250px;
  }
  /* tile uploaded pictures */
  .upload-list-inline >>> .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }

  img{
    width:100px;
    height:100px;
    margin-left: 10px;
    border: 3px solid cyan;
    border-radius: 10px;
  }
  .picgf{
    display: flex;
  }

  input:focus{ outline:none; }
</style>

