<template>
  <div id="app">

    <div class="body-menu ">
      <div class="left-toblock">

      </div>

      <div class="body-menu-left">
        <div>
          <span>后台管理系统</span>
        </div>
        <div class="menu-left">
          <template >
            <a-menu theme="dark" mode="inline">
              <a-menu-item>后台管理</a-menu-item>
              <a-sub-menu title="商品管理">
                <a-menu-item @click="goToCategory">分类表</a-menu-item>
                <a-menu-item @click="goToProduct">商品表</a-menu-item>
<!--                <a-menu-item @click="goToTag">标签表</a-menu-item>-->
<!--                <a-menu-item @click="goToSku">商品库存表</a-menu-item>-->
                <a-menu-item @click="goToNav">导航菜单</a-menu-item>

              </a-sub-menu>
              <a-sub-menu title="用户管理">
                <a-menu-item>子菜单项</a-menu-item>
              </a-sub-menu>
              <a-sub-menu title="订单管理">
                <a-menu-item>子菜单项</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </template>
        </div>
      </div>
      <div class="right-body-top-nav">
        <div class="right-body-top-nav-left">
        </div>
        <div class="right-body-top-nav-right">

          <div class="right-body-top-nav-right-left" v-if = "show == 1">
            <div class="right-body-top-nav-right-left-sapns">
              <span>尊敬的{{tokenName}}你好!</span>
            </div>
          </div>

          <div class="right-body-top-nav-right-right">
            <div class="right-body-top-nav-right-right-title"><a-icon type="environment" style = "fontSize:20px;" /></div>
            <div class="right-body-top-nav-right-right-select">
              <a-select size ="small">
                <a-select-option value="lucy" >上海市</a-select-option>
              </a-select>
            </div>
            <div class="right-body-top-nav-right-right-icon">
              <a-icon type="qq" style = "fontSize:20px;" />
            </div>
            <div class="right-body-top-nav-right-right-icon">
              <a-icon type="wechat" style = "fontSize:20px;" />
            </div>
            <div class="right-body-top-nav-right-right-icon">
            <a-icon type="github" style = "fontSize:20px;" />
          </div>

          </div>
          <div class="loginClass" id="loginClass">
            <div class="right-body-top-nav-right-right-title-1" v-if="show == 1" @click = "loginOut">退出</div>
            <div class="right-body-top-nav-right-right-title-1" v-if="show == 0" @click = "loginin">登陆</div>
          </div>


        </div>

      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import categoryClass from "./components/showPage/categoryClass"
import productClass from "./components/showPage/productClass"
import tagClass from "./components/showPage/tagClass"
import skuClass from "./components/showPage/skuClass"
import navClass from "./components/showPage/navClass"
import moment from 'moment'
import apiConfig from './router/httpConfig.js'
import qs from "qs";
import axios from "axios";
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
    name: "app",
    data(){
        return {
            productShow:false,
            tagShow:false,
            skuShow:false,
            navShow:false,
            categoryShow:true,
            beforeCreate() {
                this.form = this.$form.createForm(this, { name: 'normal_login' });
            },
            showLogin:0,
            username:'',
            show:1,
            tokenStatus:0,
            tokenName:"",
        }
    },
    methods:{
        goToCategory(){
            this.$router.push("/category");
        },
        goToProduct(){
            this.$router.push("/product");
        },
        goToTag(){
            this.$router.push("/tag");
        },
        goToSku(){
            this.$router.push("/sku");
        },
        goToNav(){
            this.$router.push("/nav");
        },
        onChange(){

        },
        loginOut(){
            if(localStorage.getItem("token")){
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                this.show = 0;
                var msg = confirm("确认退出?");
                if(msg == true){
                    this.$router.push("/");
                }
            }

        },
        loginin(){
            if(!localStorage.getItem("token")){
                this.$router.push("/");
            }
        }

    },
    components:{
        productClass,
        tagClass,
        skuClass,
        navClass,
        categoryClass
    },
    mounted() {
        // this.$nextTick(() => {
        //     // To disabled submit button at the beginning.
        //     this.form.validateFields();
        // });
        this.tokenStatus = localStorage.getItem("token");
        this.tokenName = localStorage.getItem("username");
        console.log(localStorage);
        if(localStorage.getItem("token")) {
            this.show = 1;
        }else if(this.tokenStatus ===  0){
            this.show = 0;
        }

        },
}
</script>
<style scoped>

  .pre_product{
  }
  .body-menu{
    display:flex;
  }
  .menu-left{
    margin-top: 60%;
    width:100%;
  }
  .loginClass{
    display: flex;
  }
  .left-toblock{
    width:200px;
  }
  .body-menu-left{
    position:fixed;
    padding: 0;
    width:200px;
    height:930px;
    background-color: #001529;
    border: 1px solid;
  }
  .right-body-top-nav{
    display: flex;
    position: absolute;
    background-color:#212529;
    width:100%;
    height:45px;
  }
  .right-body-top-nav-left{
    width:50%;
    height:100%;
  }
  .right-body-top-nav-right{
    display: flex;
    justify-content: flex-end;
    align-content: center;
    width:50%;
    height:100%;
  }
  .right-body-top-nav-right-left{
    width:75%;
    height:100%;
  }
  .right-body-top-nav-right-left-sapns{
    width: 100%;
    height:100%;
    color:white;
    display: flex;
    justify-content: flex-end;
    margin-left: -10px;
    align-items: center;
  }
  .right-body-top-nav-right-right{
    display: flex;
    align-items: center;
    color:white;
    width:25%;
    height:100%;
  }
  .right-body-top-nav-right-right-select{
    margin-left: 10px;
  }
  .right-body-top-nav-right-right-select > div{
    width:100px;
  }
  .right-body-top-nav-right-right-icon{
    margin-left: 10px;
  }
  .right-body-top-nav{
    position:fixed;
    z-index:12;
  }
  .right-body-top-nav-right-right-title-1{
    display: flex;
    align-items: center;
    color:white;
    width: 30px;
  }




</style>
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
