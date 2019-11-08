<template>
  <!--      右侧页面1-->
  <div class="menu-right pre_product" >
    <div class="menu-menu-top">

      <div class="menu-menu-top-title">
        <div><span class="menu-right-top-title-span">添加商品</span></div>
        <div class="add-button">
          <a-button  @click="goToAddProduct">添加商品</a-button>
        </div>
      </div>

    </div>
    <div class="menu-right-body">
      <div class="menu-hidden table-wd" v-if = "tableShow == 1" id="createComponent">
        <div class="goToClose" @click = "closeTheTable()" ><a-icon type="close" /></div>
        <template>
          <div>
            <a-table :columns="columns" :dataSource="data" bordered>
              <template slot="name" slot-scope="text">
                <a href="javascript:;">{{text}}
                </a>
              </template>
              <template slot="title" slot-scope="currentPageData">
                标签
              </template>

            </a-table>
          </div>
        </template>
      </div>

      <div class="menu-right-body-tab">
        <div class="menu-right-body-tab-title">编号</div>
        <div class="menu-right-body-tab-title">分类名称</div>
        <div class="menu-right-body-tab-title">商品名称</div>
        <div class="menu-right-body-tab-title">商品销量</div>
        <div class="menu-right-body-tab-title">商品描述</div>
        <div class="menu-right-body-tab-title">排序</div>
        <div class="menu-right-body-tab-title">状态</div>
        <div class="menu-right-body-tab-title">更新时间</div>
        <div class="menu-right-body-tab-title">标签</div>
        <div class="menu-right-body-tab-title">库存</div>
        <div class="menu-right-body-tab-title">操作</div>
      </div>
      <div class="menu-right-body-tab2" v-for = "product in product_data">
        <div class="menu-right-body-tab-title">{{product.id}}</div>
        <div class="menu-right-body-tab-title">{{product.category_id}}</div>
        <div class="menu-right-body-tab-title">{{product.name}}</div>
        <div class="menu-right-body-tab-title">{{product.sale_num}}</div>
        <div class="menu-right-body-tab-title titleContent">{{product.content}}</div>
        <div class="menu-right-body-tab-title">{{product.sort}}</div>
        <div class="menu-right-body-tab-title">{{product.status}}</div>
        <div class="menu-right-body-tab-title">{{product.updated_at}}</div>

        <div class="menu-right-body-tab-title">
          <template>
            <div id="components-a-tooltip-demo-placement" @click="gotoAddTag(product.id)">
              <div :style="{ marginLeft: `${buttonWidth}px`, clear: 'both', whiteSpace: 'nowrap' }">
                <a-tooltip placement="bottomRight">
                  <template slot="title">
                    <span>查看商品标签</span>
                  </template>
                  <a-button>标签</a-button>
                </a-tooltip>
              </div>
            </div>
          </template>
        </div>
        <div class="menu-right-body-tab-title">
          <template>
            <div id="components-a-tooltip-demo-placement" @click = "gotoShowSku(product.id,product.category_id)">
              <div :style="{ marginLeft: `${buttonWidth}px`, clear: 'both', whiteSpace: 'nowrap' }">
                <a-tooltip placement="bottomRight">
                  <template slot="title">
                    <span>查看商品库存</span>
                  </template>
                  <a-button>库存</a-button>
                </a-tooltip>
              </div>
            </div>
          </template>
        </div>
        <div class="menu-right-body-tab-title">
          <a-button @click="delProduct(product.id)">删除</a-button>
          <a-button @click="goToEditProduct(product.id,product.category_id)">修改</a-button>
        </div>
      </div>
      <div class="menu-right-body-tab2">
        <div class="menu-right-body-tab-none-data">暂无数据
        </div>
      </div>
      <div class="menu-right-body-tab-page">
        <a-pagination @change="onChange" :total="allInfo" />
      </div>
    </div>
  </div>
</template>

<script>
    import qs from "qs";
    import axios from "axios";
    import moment from "moment"
    import apiConfig from '../../router/httpConfig.js'
    const columns = [
        {
            title: '标签名',
            dataIndex: 'name',
            scopedSlots: { customRender: 'name' },
        },
        {
            title: '标签值',
            className: 'column-money',
            dataIndex: 'money',
        },
        {
            title: '状态',
            dataIndex: 'address',
        },
        {
            title: '创建时间',
            dataIndex: 'time',
        },
    ];

    const data = [
        {
            key: "1",
            name: "暂无标签值",
            money: '暂无标签内容',
            address: '暂无标签状态信息',
        },
        {
            key: '2',
            name: "暂无标签值",
            money: '暂无标签内容',
            address: '暂无标签状态信息',
        },
        {
            key: '3',
            name: "暂无标签值",
            money: '暂无标签内容',
            address: '暂无标签状态信息',
        },
    ];
    export default {
        name: "productClass",
        data(){
            return {
                  product_data:[],
                  buttonWidth: 70,
                  tableShow:0,
                  productTag:[],
                  data,
                  columns,
                  allInfo:0,
                  page:1,

            }
        },
        methods:{
            goToAddProduct(){
                this.$router.push("/goToAddProduct")
            },
            goToEditProduct(id,cid){
                console.log(id,cid)
                this.$router.push({name:"GoToEditProduct",params:{"editProid":id,"editCateid":cid}});
            },
            gotoAddTag(id){
                console.log(id);
                axios
                    .post(apiConfig.showTagData+"?token="+localStorage.getItem("token"),qs.stringify({
                        "productId":id,
                    }))
                    .then(res=>{
                        this.productTag = res.data;
                        for(var i = 0 ; i<this.productTag.length ; i++){
                            this.data[i].name = this.productTag[i].type;
                            this.data[i].money = this.productTag[i].value;
                            this.data[i].adress = this.productTag[i].status;
                                console.log(this.data[i].name);
                        }
                        this.tableShow = 1;
                    })


            },
            gotoShowSku(id,ctId){
                // console.log(id,ctId);

                this.$router.push({name:"toSkuData",params:{"id":id,"ctId":ctId}});
            },
            closeTheTable(){
                this.tableShow = 0;
                this.data = [
                    {
                        key: "1",
                        name: "暂无标签值",
                        money: '暂无标签内容',
                        address: '暂无标签状态信息',
                    },
                    {
                        key: '2',
                        name: "暂无标签值",
                        money: '暂无标签内容',
                        address: '暂无标签状态信息',
                    },
                    {
                        key: '3',
                        name: "暂无标签值",
                        money: '暂无标签内容',
                        address: '暂无标签状态信息',
                    },
                ];
            },
            onChange(current){
                this.page = current;
                axios
                    .get(apiConfig.showProductData+"?page="+current+"&token="+localStorage.getItem("token"))
                    .then(res=>{
                        this.product_data = res.data.data;
                    })
            },
            delProduct(id){
                var a = confirm("请确认是否删除?")
                if(a == true){
                    axios
                        .post(apiConfig.deleteproData+"?token="+localStorage.getItem("token"),qs.stringify({
                            "productId": id
                        }))
                        .then(res=>{
                            if(res.data.status !== "false"){
                                alert("删除成功")
                                axios
                                    .get(apiConfig.showProductData+"?page="+this.page+"&token="+localStorage.getItem("token"))
                                    .then(res=>{
                                        this.product_data = res.data.data;
                                        this.allInfo = res.data.total;
                                    })
                            }else{
                                alert("删除失败")
                            }
                            console.log(res.data.status)

                        })
                        .catch(err=>{
                            alert("删除失败")
                        })
                }

            }
        },
        mounted() {
            console.log(localStorage.getItem("token"));
            axios
                .get(apiConfig.showProductData+"?page=1"+"&token="+localStorage.getItem("token"))
                .then(res=>{
                    this.product_data = res.data.data;
                    this.allInfo = res.data.total;
                })
                .catch(err=>{
                    alert("暂无数据,请登录")
                    // this.$router.push("/")
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
    /*margin-left: 10%;*/
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

  .titleContent{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #components-a-tooltip-demo-placement .ant-btn {
    width: 40px;
    text-align: center;
    padding: 0;
    margin-right: 54px;
    margin-bottom: 8px;
  }

  .table-wd{
    position:fixed;
    top:250px;
    left: 30%;
    z-index:50;
    background-color: #fff;
    width:50%;
  }
  .goToClose{
    z-index:100;
    border-radius: 100%;
    border: 1px solid #e4b9c0;
    display: flex;
    width:26px;
    height:26px;
    font-size: 24px;
    color:#e4b9c0;
    position:absolute;
    top: 4px;
    left:97%;
  }
  th.column-money,
  td.column-money {
    text-align: right !important;
  }

</style>
