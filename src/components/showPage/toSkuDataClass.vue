<template>
  <!--      右侧页面1-->
  <div class="menu-right pre_product" >
    <div class="menu-menu-top">

      <div class="menu-menu-top-title">
        <div><span class="menu-right-top-title-span">商品牌详细信息</span></div>
        <div class="add-button">
          <a-button @click="">添加标签</a-button>
        </div>
      </div>

    </div>
    <div class="menu-right-body">
      <div class="menu-right-body-tab">
        <div class="menu-right-body-tab-title">编号</div>
        <div class="menu-right-body-tab-title">分类名称</div>
        <div class="menu-right-body-tab-title">商品名称</div>
        <div class="menu-right-body-tab-title">商品销量</div>
        <div class="menu-right-body-tab-title">商品描述</div>
        <div class="menu-right-body-tab-title">排序</div>
        <div class="menu-right-body-tab-title">状态</div>
        <div class="menu-right-body-tab-title">更新时间</div>
      </div>
      <div class="menu-right-body-tab2" v-if="showMeg == 1">
        <div class="menu-right-body-tab-title">{{productArr[0].id}}</div>
        <div class="menu-right-body-tab-title">{{attrArr[0].name}}</div>
        <div class="menu-right-body-tab-title">{{productArr[0].name}}</div>
        <div class="menu-right-body-tab-title">{{productArr[0].sale_num}}</div>
        <div class="menu-right-body-tab-title menu-right-body-tab-title-contents">{{productArr[0].content}}</div>
        <div class="menu-right-body-tab-title">{{productArr[0].sort}}</div>
        <div class="menu-right-body-tab-title">{{productArr[0].status}}</div>
        <div class="menu-right-body-tab-title">{{productArr[0].updated_at}}</div>
      </div>
      <div class="menu-right-body-tab2 menu-right-body-tabtab">
        <div class="menu-right-body-tab-none-data">
          <div class = "menu-right-body-tab-none-data-left">

          </div>
          <div class = "menu-right-body-tab-none-data-right">
            <div class="menu-right-body-tab-small" v-if="showMeg == 1">
              <div class="menu-right-body-tab-title">{{attrArr[0].property.categoryCharname1}}</div>
              <div class="menu-right-body-tab-title">{{attrArr[0].property.categoryCharname2}}</div>
              <div class="menu-right-body-tab-title">{{attrArr[0].property.categoryCharname3}}</div>
              <div class="menu-right-body-tab-title">原价</div>
              <div class="menu-right-body-tab-title">售价</div>
              <div class="menu-right-body-tab-title">库存</div>
              <div class="menu-right-body-tab-title">排序</div>
              <div class="menu-right-body-tab-title">状态</div>
              <div class="menu-right-body-tab-title">更新时间</div>
            </div>
              <div class="menu-right-body-tab-small-down-list" v-if = "showMeg == 1" v-for = "sku in skuArr.data" >
                <div class="menu-right-body-tab-title-small">{{sku.attr1}}</div>
                <div class="menu-right-body-tab-title-small">{{sku.attr2}}</div>
                <div class="menu-right-body-tab-title-small">{{sku.attr3}}</div>
                <div class="menu-right-body-tab-title-small">{{sku.original_price}}</div>
                <div class="menu-right-body-tab-title-small">{{sku.price}}</div>
                <div class="menu-right-body-tab-title-small">{{sku.quantity}}</div>
                <div class="menu-right-body-tab-title-small">{{sku.sort}}</div>
                <div class="menu-right-body-tab-title-small">{{sku.status}}</div>
                <div class="menu-right-body-tab-title-small">{{sku.updated_at}}</div>
              </div>
          </div>
        </div>
      </div>
<!--      <div class="menu-right-body-tab-page">-->
<!--        <a-pagination @change="" :total="50" />-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
    import qs from "qs";
    import axios from "axios";
    import apiConfig from '../../router/httpConfig.js'
    export default {
        name: "toSkuDataClass",
        data(){
            return {
                dataArr:[],
                productArr:"",
                attrArr:[],
                skuArr:[],
                showMeg:1,

            }
        },
        methods:{

        },
        mounted(){
            console.log(localStorage.getItem("token"));
            axios
                .get(apiConfig.showProductData+"?productId="+this.$route.params.id+"&categoryId="+this.$route.params.ctId + "&token=" + localStorage.getItem("token"))
                .then(res=>{
                    this.productArr = res.data.data[0];
                    if(!res.data.data[0]){
                        this.showMeg = 0;
                    }else if(!res.data.data[1]){
                        this.showMeg = 0;
                    }
                    if(!res.data.data[2]){
                        this.showMeg = 0;
                    }
                    this.skuArr = res.data.data[1];
                    if(res.data.data[2]){
                        this.attrArr = res.data.data[2];
                        this.attrArr[0].property = JSON.parse(this.attrArr[0].property);
                    }
                    console.log(this.productArr)

                })
                // .catch(err=>{
                //     alert("暂无数据")
                //     this.$router.go(-1)
                // })



        }
    }
</script>

<style scoped>
  .menu-right{
    width:90%;
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
    width:100%;
    height: 85%;
    border: 1px solid;
  }
  .menu-right-body-tab{
    height:4%;
    background-color:#e8e8e8;
    display: flex;
  }
  .menu-right-body-tab-title-contents{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .menu-right-body-tab-title{
    display: flex;
    justify-content: center;
    align-items: center;
    width:20%;
  }
  .menu-right-body-tab-none-data{
    display: flex;
    align-items: center;
    width:100%;
    min-height:300px;
  }
  /*.menu-right-body-tab-none-data-left{*/
  /*  display: flex;*/
  /*  align-items: center;*/
  /*  width:10%;*/
  /*  height:100%;*/
  /*  !*border: 1px solid;*!*/
  /*}*/
  .menu-right-body-tab-none-data-right{
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    width:100%;
    height:100%;
    /*border: 1px solid;*/
  }
  .menu-right-body-tab-small{
    width:100%;
    height:15%;
    background-color:#e8e8e8;
    display: flex;
  }
  .menu-right-body-tab-small-down{
    height:100%;
    width:100%;
    background-color:white;
    display: flex;
    flex-wrap: wrap;

  }
  .menu-right-body-tab-small-down-list{
    display: flex;
    height:35px;
    border: 1px solid #e8e8e8;
    align-items: center;
    margin-top: 10px;
    width:100%;
  }
  .menu-right-body-tab-title-small{
    display: flex;
    justify-content: center;
    align-items: center;
    width:20%;
  }
  .menu-right-body-tab2{
    margin-top: 1%;
    height:5%;
    /*background-color:#f7f7f7;*/
    display: flex;
  }
  .menu-right-body-tabtab {
    height:300px;
  }
  .menu-right-body-tab-page{
    margin-top: 3%;
    margin-left: 80%;
  }
  .add-button{
    position:absolute;
    left:92%;
  }
</style>
