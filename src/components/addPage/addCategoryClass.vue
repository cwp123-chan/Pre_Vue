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
          分类名称
        </div>
        <div class="menu-top-list-top-info">
          分类顺序
        </div>
        <div class="menu-top-list-top-info">
          分类特性名1
        </div>
        <div class="menu-top-list-top-info">
          分类特性名1
        </div>
        <div class="menu-top-list-top-info">
          分类特性名1
        </div>
        <div class="menu-top-list-top-info">
          分类状态
        </div>
        <div class="menu-top-list-top-info">
          创建时间
        </div>

      </div>
      <div class="menu-top-list-list">
        <div class="menu-top-list-top-info">
          {{catagoryName}}
        </div>
        <div class="menu-top-list-top-info">
          {{catagorySlot}}
        </div>
        <div class="menu-top-list-top-info">
          {{catagoryCharname1}}
        </div>
        <div class="menu-top-list-top-info">
          {{catagoryCharname2}}
        </div>
        <div class="menu-top-list-top-info">
          {{catagoryCharname3}}
        </div>
        <div class="menu-top-list-top-info">
          {{catagoryFontStatus}}
        </div>
        <div class="menu-top-list-top-info">
          {{catagoryCreat}}
        </div>
      </div>
    </div>
    <div class="menu-body">
      <div class="menu-title">
        <a-icon type="plus-circle" />
        <span>添加分类</span>
      </div>
      <div class="add-catagory-form">
        <div class="catagory_input">
          <label for="name" class="label-div"><span class="label-name">分类名称：</span></label><input class="catagory_form" v-model = "catagoryName" type="text" placeholder="请输入商品分类名称"  name="catagory_name" />
        </div>
        <div class="catagory_input">
          <label for="name" class="label-div"><span class="label-name">分类顺序：</span></label><input class="catagory_form" v-model = "catagorySlot"  type="text" placeholder="商品分类先后顺序值" name="catagory_solt" />
        </div>
        <div class="catagory_input">
          <label for="name" class="label-div"><span class="label-name">特性名1：</span></label><input class="catagory_form" v-model = "catagoryCharname1"  type="text" placeholder="商品分类先后顺序值" name="catagory_solt" />
        </div>
        <div class="catagory_input">
          <label for="name" class="label-div"><span class="label-name">特性名2：</span></label><input class="catagory_form" v-model = "catagoryCharname2"  type="text" placeholder="商品分类先后顺序值" name="catagory_solt" />
        </div>
        <div class="catagory_input">
          <label for="name" class="label-div"><span class="label-name">特性名3：</span></label><input class="catagory_form" v-model = "catagoryCharname3"  type="text" placeholder="商品分类先后顺序值" name="catagory_solt" />
        </div>
        <div class="catagory_input">
          <label for="name" class="label-div"><span class="label-name">状 &nbsp; &nbsp; &nbsp;态：</span></label>
          <select class="product_selsct " name="product_catagory" v-model = "catagoryStatus"  id="">
            <option value="1">启用</option>
            <option value="2">禁用</option>
            <option value="3">备用</option>

          </select>
        </div>
        <div class="catagory_input">
          <a-button @click = "getToWatch()">提交修改</a-button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import moment from "moment"
import qs from "qs";
import axios from "axios";
import apiConfig from '../../router/httpConfig.js'
    export default {
        name: "addCategoryClass",
        data(){
            return {
                catagoryName:"",
                catagorySlot:"",
                catagoryStatus:"1",
                catagoryCreat:"",
                catagoryCharname1:"",
                catagoryCharname2:"",
                catagoryCharname3:"",
                cataData:{},
                catagoryFontStatus:""
            }
        },
        methods:{
            getToWatch(){
                var date = new Date;
                this.catagoryCreat = moment(date).format('YYYY-MM-DD HH-mm-ss');
                if(this.catagoryStatus == "1"){
                    this.catagoryFontStatus = "启用"
                }else if(this.catagoryStatus == "2"){
                    this.catagoryFontStatus = "禁用"
                }else if(this.catagoryStatus == "3"){
                    this.catagoryFontStatus = "已删除"
                }
                this.cataData = {
                    "categoryName":this.catagoryName,
                    "categorySort":this.catagorySlot,
                    "categoryStatus":this.catagoryStatus,
                    "categoryCharname":[{
                        "categoryAttr1":this.catagoryCharname1,
                        "categoryAttr2":this.catagoryCharname2,
                        "categoryAttr3":this.catagoryCharname3,
                    }]
                }
                var a = confirm("确认提交表单?");
                console.log(this.cataData);

                if (a == true){
                    axios
                        .post(apiConfig.AddCategoryData+"?token="+localStorage.getItem("token"),JSON.stringify(this.cataData))
                        .then(res=>{
                            console.log(res)
                            if(res.data.status == 1){
                                alert("数据添加成功")
                            }
                        })
                    console.log(this.cataData)
                }
            }
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
    height:30%;
    margin-left: 2%;
    border: 1px solid #e8e8e8;
  }
  .label-div{
  }
  .label-name{
    display:inline-block;
    width:100px;
    text-align: right;
  }
  .menu-body2{
    width:45%;
    height:30%;
    margin-left: 2%;
    margin-top: -5%;
    border: 1px solid #e8e8e8;
  }
  .add-catagory-form{
    margin-left: 0%;
    margin-top: 10px;
  }
  .catagory_form{
    outline-style: none ;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding-left: 10px;
  }
  .catagory_input{
    margin-top: 10px;
  }
  .product_selsct{
    width:181px;
    height:27px;
    padding-left: 60px;
    outline-style: none ;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .menu-top-list{
    width:100%;
    height:50%;
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
</style>
