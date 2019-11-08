<template>
  <div class="right-body-top-nav-right-left" v-if = "showLogin == 0" >
    <div class="right-body-top-nav-main">
    <template v-if="lodingShow == 0">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
          >
            记住我
          </a-checkbox>
          <a class="login-form-forgot" href="">
            忘记密码
          </a>
          <a-button type="primary" html-type="submit" class="login-form-button">
            登录
          </a-button>
          <a @click = "regiser">
            注册用户
          </a>
        </a-form-item>
      </a-form>
    </template>
      <template v-if = "lodingShow == 1">
        <div>
          <a-spin tip="Loading...">
            <div class="spin-content">
            </div>
          </a-spin>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
    import moment from 'moment'
    import apiConfig from '../../router/httpConfig.js'
    import qs from "qs";
    import axios from "axios";
    function hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    export default {
        name: "loginClass",
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'normal_login' });
        },
        data(){
            return{
                categoryShow:true,
                showLogin:0,
                username:'',
                lodingShow:0,
            }
        },
        methods:{
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('login info: ', values);
                        axios
                            .post(apiConfig.loginData,qs.stringify({
                                "username":values.userName,
                                "password":values.password
                            }))
                            .then(res=>{
                                console.log(res)
                                if(res.data.status == "true"){
                                    alert("登陆成功");
                                    this.username = res.data.username;
                                    localStorage.setItem("username",res.data.username);
                                    localStorage.setItem("token",res.data.token);
                                    this.lodingShow = 1;
                                    this.$router.go(0);
                                    console.log(localStorage);
                                }else{
                                    alert("用户名密码错误");
                                    this.showLogin = 0;
                                }
                                console.log(res)
                            })
                    }
                });
            },
            regiser(){
                this.$router.push('/register')
            }
        },
        mounted(){
            if(localStorage.getItem("token")){
                this.$router.push("/category");
            }
        }
    }
</script>

<style scoped>
  .right-body-top-nav-right-left{
    position: absolute;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.5);
  }
  .right-body-top-nav-main{
    width:20%;
    margin-left: 44%;
    margin-top: 15%;
  }
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
  .spin-content {
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
    padding: 30px;
  }
</style>
