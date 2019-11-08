<template>
  <!--      右侧页面1-->
  <div class="menu-right pre_product" >
    <div class="menu-menu-top">

      <div class="menu-menu-top-title">
        <div><span class="menu-right-top-title-span">导航菜单</span></div>
        <div class="add-button">
          <a-button @click="goToAddnav">添加标签</a-button>
        </div>
      </div>

    </div>
    <div class="menu-right-body">
      <div class="menu-right-body-tab">
        <div class="menu-right-body-tab-title">编号</div>
        <div class="menu-right-body-tab-title">导航名称</div>
        <div class="menu-right-body-tab-title">图片</div>
        <div class="menu-right-body-tab-title">链接类型</div>
        <div class="menu-right-body-tab-title">链接目标</div>
        <div class="menu-right-body-tab-title">状态</div>
        <div class="menu-right-body-tab-title">更新时间</div>
        <div class="menu-right-body-tab-title">操作</div>
      </div>
      <div class="menu-right-body-tab2" v-for = "tag in tagData">
        <div class="menu-right-body-tab-title">{{tag.id}}</div>
        <div class="menu-right-body-tab-title">{{tag.title}}</div>
<!--        <div class="menu-right-body-tab-title">{{tag.picture}}</div>-->
        <div class="menu-right-body-tab-title" >
          <div v-for = "pic in tag.picture">
            <a :href="pic"><img class="preview-img" :src = "pic" :alt="pic"></a>
          </div>
        </div>

        <div class="menu-right-body-tab-title">{{tag.link_type}}</div>
        <div class="menu-right-body-tab-title">{{tag.link_target}}</div>
        <div class="menu-right-body-tab-title">{{tag.status}}</div>
        <div class="menu-right-body-tab-title">{{tag.updated_at}}</div>
        <div class="menu-right-body-tab-title">
          <a-button @click="gotoDel(tag.id,$event)">删除</a-button>
          <a-button  @click="goToEditnav(tag.id)">修改</a-button>
        </div>
      </div>
      <div class="menu-right-body-tab2">
        <div class="menu-right-body-tab-none-data">暂无数据
        </div>
      </div>
      <div class="menu-right-body-tab-page">
        <a-pagination @change="onChange" :total="total" />
      </div>
    </div>
  </div>
</template>

<script>
    import moment from 'moment'
    import apiConfig from '../../router/httpConfig.js'
    import qs from "qs";
    import axios from "axios";

    export default {
        name: "navClass",
        data(){
            return {
                page:0,
                tagData:[],
                total:0,
                product_data:[],
                picture:[],
            }
        },
        methods:{
            goToAddnav(){
                this.$router.push("/goToAddNav")
            },
            goToEditnav(id){
                this.$router.push({name:"GoToEditNav",params:{"id":id}});

            },
            onChange(current){
                axios
                    .get(apiConfig.showNavData+"?page="+current+"&token="+localStorage.getItem("token"))
                    .then(res=>{
                        console.log(res);
                        this.tagData = res.data[0].data;
                    })
                },
            gotoDel(id,event){
                axios
                    .post(apiConfig.delNabData+"?token="+localStorage.getItem("token"),qs.stringify({
                            "id":id,
                    }))
                    .then(res=>{
                        alert("删除成功");
                        event.path[2].remove();
                        console.log(event);

                    })

            }

        },
        mounted(){
          axios
              .get(apiConfig.showNavData+"?token="+localStorage.getItem("token"))
              .then(res=>{
                  this.tagData = res.data[0].data;
                  this.total = res.data[0].total;
                  for (var a = 0 ; a < res.data[0].data.length;a++){
                      this.picture[a] = res.data[0].data[a].picture;
                  }
                  console.log(this.tagData)

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
    min-height:5%;
    background-color:#f7f7f7;
    display: flex;
  }
  .menu-right-body-tab-page{
    margin-top: 3%;
    /*margin-left: 80%;*/
  }
  .preview-img{
    height:80px;
  }
  .add-button{
    position:absolute;
    left:92%;
  }
</style>
