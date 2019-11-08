<template>
  <div class="menu-right">
    <div class="menu-menu-top">

      <div class="menu-menu-top-title">
        <div><span class="menu-right-top-title-span">数据详情</span></div>
        <div class="add-button">
          <a-button  @click="goToAddCategory">添加数据</a-button>
        </div>
      </div>

    </div>
    <div class="menu-right-body">
      <div class="menu-right-body-tab">
        <div class="menu-right-body-tab-title">编号</div>
        <div class="menu-right-body-tab-title">分类名称</div>
        <div class="menu-right-body-tab-title">属性</div>
        <div class="menu-right-body-tab-title">排序</div>
        <div class="menu-right-body-tab-title">状态</div>
        <div class="menu-right-body-tab-title">更新时间</div>
        <div class="menu-right-body-tab-title">操作</div>
      </div>
      <div class="menu-right-body-tab2" v-for = 'catagory in catagoryArr'>
        <div class="menu-right-body-tab-title">{{catagory.id}}</div>

        <div class="menu-right-body-tab-title" v-if = "showStatus == catagory.id">
          <input type="text" id="nameInput" v-model="categoryName"  :placeholder ="catagory.name"  v-if = "catagory.id == inputId">
        </div>
        <div class="menu-right-body-tab-title" v-else>{{catagory.name}}</div>

        <div class="menu-right-body-tab-title" v-if = "showStatus == catagory.id">
          <input type="text" class="inputAttr" id="attrInput1" v-model="categoryAttr1"  :placeholder="catagory.property.categoryCharname1" v-if = "catagory.id == inputId">
          <input type="text" class="inputAttr" id="attrInput2" v-model="categoryAttr2"  :placeholder="catagory.property.categoryCharname2" v-if = "catagory.id == inputId">
          <input type="text" class="inputAttr" id="attrInput3"  v-model="categoryAttr3" :placeholder="catagory.property.categoryCharname3" v-if = "catagory.id == inputId">
        </div>
        <div class="menu-right-body-tab-title" v-else>
          <template>
              <div>
                <a-tag color="pink" v-if = "catagory.property.categoryCharname1">{{catagory.property.categoryCharname1}}
                </a-tag>
                <a-tag color="red" v-if = "catagory.property.categoryCharname2">{{catagory.property.categoryCharname2}}</a-tag>
                <a-tag color="orange" v-if = "catagory.property.categoryCharname3">{{catagory.property.categoryCharname3}}</a-tag>
              </div>
          </template>
        </div>

        <div class="menu-right-body-tab-title" v-if = "showStatus == catagory.id">
          <input type="text" id="sortInput" v-model="categorySort"  :placeholder="catagory.sort" v-if = "catagory.id == inputId">
        </div>
        <div class="menu-right-body-tab-title" v-else >{{catagory.sort}}</div>



        <div class="menu-right-body-tab-title" v-if = "showStatus == catagory.id">
          <select name="" id="statusInput" placeholder = "请选择" v-model="categoryStatus"  >
            <option value="1">启用</option>
            <option value="2">禁用</option>
            <option value="3">备用</option>
          </select>
        </div>
        <div class="menu-right-body-tab-title" v-else>{{catagory.status}}</div>


        <div class="menu-right-body-tab-title">{{catagory.updated_at}}</div>
        <div class="menu-right-body-tab-title">
          <a-button @click="pushEditCategory(catagory.id)" v-if = "showStatus == catagory.id">提交</a-button>
          <a-button @click="depuEditCategory(catagory.id)" v-if = "showStatus == catagory.id">取消</a-button>
          <template v-else >
            <div>
              <a-button @click="showDeleteConfirm(catagory.id,current,$event)" type="dashed">
                Delete
              </a-button>
              <a-button @click="goToEditCategory(catagory.id)">修改</a-button>

            </div>
          </template>



        </div>
      </div>
      <div class="menu-right-body-tab2">
        <div class="menu-right-body-tab-none-data">暂无数据
        </div>
      </div>
      <div class="menu-right-body-tab-page">
        <a-pagination @change="onChange" :total="totalDatas" />
      </div>
    </div>
  </div>
</template>

<script>
    import moment from "moment"
    import qs from "qs";
    import axios from "axios";
    import apiConfig from '../../router/httpConfig.js'
    import { message } from 'ant-design-vue';
    export default {
        name: "categoryClass",
        data(){
          return {
              catagoryArr:[],
              catagoryAttrArr:[],
              totalDatas:0,
              inputId:0,
              showStatus:0,
              categoryName:"",
              categorySort:"",
              categoryStatus:"",
              categoryAttr1:"",
              categoryAttr2:"",
              categoryAttr3:"",
              pushData:{},
              current:"",
              buttonWidth: 70,
              text: 'Are you sure to delete this task?',
          }
        },
        methods:{
            goToAddCategory(){
              this.$router.push("/goToAddCategory")
            },
            goToEditCategory(){
                this.$router.push("/goToEditCategory")
            },
            showDeleteConfirm(id,page,event) {
                this.$confirm({
                    title: 'Are you sure delete this task?',
                    content: 'Some descriptions',
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk() {
                        axios
                            .post(apiConfig.deleteProductData+"?token="+localStorage.getItem("token"),qs.stringify({
                                "categoryId":id
                            }))
                            .then(res=>{
                                if(res.data.status == 1){
                                    alert("删除成功");
                                    event.path[3].remove();
                                    console.log();
                                }
                            })
                    },
                    onCancel() {

                    },
                });
            },
            goToEditCategory(id){
                this.inputId = id;
                this.showStatus = this.inputId;
            },
            depuEditCategory(id){
                this.inputId = 0;
                this.showStatus = 0;
            },
            pushEditCategory(id){
                this.pushData = {
                    "categoryId":id,
                    "categoryName":this.categoryName,
                    "categorySort":this.categorySort,
                    "categoryStatus":this.categoryStatus,
                    "categoryCharname":[{
                        "categoryAttr1":this.categoryAttr1,
                        "categoryAttr2":this.categoryAttr2,
                        "categoryAttr3":this.categoryAttr3,
                    }],
                }
                var a = confirm("确认提交表单?");
                console.log(this.pushData);
                if (a == true){
                    axios
                        .post(apiConfig.UpdateCategoryData+"?token="+localStorage.getItem("token"),JSON.stringify(this.pushData))
                        .then(res=>{
                            console.log(res);
                            if(res.data.status == 1){
                                alert("数据添加成功")
                                axios
                                    .get(apiConfig.showCategoryData+"?token="+localStorage.getItem("token"))
                                    .then(res=>{
                                        console.log(res)
                                        this.totalDatas = res.data.total;
                                        this.catagoryArr = res.data.data;
                                        for(var i = 0 ; i<res.data.data.length;i++){
                                            var attr = unescape(res.data.data[i].property.replace(/\\u/gi, '%u'));
                                            this.catagoryArr[i].property = attr;
                                            this.catagoryArr[i].property = JSON.parse(this.catagoryArr[i].property);
                                        }
                                        console.log(this.catagoryArr)
                                    })
                            }
                        })
                }

            },
            onChange(current){
                this.current = current;
                axios
                    .get(apiConfig.showCategoryData+"?page="+current + "&token="+localStorage.getItem("token"))
                    .then(res=>{
                        this.catagoryArr = res.data.data;
                        for(var i = 0 ; i<res.data.data.length;i++){
                            var attr = unescape(res.data.data[i].property.replace(/\\u/gi, '%u'));
                            this.catagoryArr[i].property = attr;
                            this.catagoryArr[i].property = JSON.parse(this.catagoryArr[i].property);
                        }
                        console.log(this.totalDatas)


                    })
                console.log(this.current);
            }
        },
        mounted(){
            console.log(localStorage.getItem("token"));

            axios
                .get(apiConfig.showCategoryData+ "?token=" + localStorage.getItem("token"))
                .then(res=>{
                    console.log(res)
                    this.totalDatas = res.data.total;
                    this.catagoryArr = res.data.data;
                    for(var i = 0 ; i<res.data.data.length;i++){
                        var attr = unescape(res.data.data[i].property.replace(/\\u/gi, '%u'));
                        this.catagoryArr[i].property = attr;
                        this.catagoryArr[i].property = JSON.parse(this.catagoryArr[i].property);
                    }
                    console.log(this.catagoryArr)
                })
        }
    }
</script>

<style scoped>
  .menu-right{
    width:100%;
    height:900px;
  }
  .menu-menu-top{
    width:100%;
    height:15%;
  }
  .menu-menu-top-title{

    margin-top: 5%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .menu-right-top-title-span{
    font-size: 50px;
    font-weight: bold;
  }
  .menu-right-body{
    width: 100%;
    height: 85%;
    /*border: 1px solid;*/
  }
  .menu-right-body-tab{
    height:4%;
    background-color:#e8e8e8;
    display: flex;
  }
  .menu-right-body-tab-title{
    display: flex;
    justify-content: center;
    align-items: center;
    width:20%;
  }
  .menu-right-body-tab-none-data{
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
  }
  .menu-right-body-tab2{
    margin-top: 1%;
    height:5%;
    background-color:#f7f7f7;
    display: flex;
  }
  .menu-right-body-tab-page{
    margin-top: 3%;
    margin-left: 80%;
  }
  .add-button{
    position:absolute;
    left:92%;
  }

  #components-a-popconfirm-demo-placement .ant-btn {
    width: 70px;
    text-align: center;
    padding: 0;
    margin-right: 8px;
    margin-bottom: 8px;
  }

  .inputAttr{
    width:60px;
  }
</style>
