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
<!--        <div class="menu-top-list-top-info">-->
<!--          商品描述-->
<!--        </div>-->
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
        <div class="menu-top-list-top-info">
          {{productName}}
        </div>
        <div class="menu-top-list-top-info">
          {{productPay}}
        </div>
<!--        <div class="menu-top-list-top-info">-->
<!--          {{productDisc}}-->
<!--        </div>-->
        <div class="menu-top-list-top-info">
          {{productSolt}}
        </div>
        <div class="menu-top-list-top-info">
          {{cataLocalname.name}}
        </div>
        <div class="menu-top-list-top-info">
          {{productStatus}}
        </div>
        <div class="menu-top-list-top-info">
          {{productCreat}}
        </div>
      </div>
      <div class="menu-top-list-top">

        <div class="menu-top-list-top-info">
          商品属性1
        </div>
        <div class="menu-top-list-top-info">
          商品属性2
        </div>
        <div class="menu-top-list-top-info">
          商品属性3
        </div>
        <div class="menu-top-list-top-info">
          原价
        </div>
        <div class="menu-top-list-top-info">
          售价
        </div>
        <div class="menu-top-list-top-info">
          库存
        </div>
        <div class="menu-top-list-top-info">
          状态
        </div>
        <div class="menu-top-list-top-info">
          顺序
        </div>
        <div class="menu-top-list-top-info">
          创建时间
        </div>
        <div class="menu-top-list-top-info">
          <a-button @click="getAllData()">
            提交新增
          </a-button>
        </div>
      </div>
      <div class="menu-top-list-list" v-for="(product_num,index) in product_attr_msg_arr">

        <div class="menu-top-list-top-info">
          {{propertyname.categoryCharname1}} :{{product_num.productAttr1}}
        </div>
        <div class="menu-top-list-top-info">
          {{propertyname.categoryCharname2}} :{{product_num.productAttr2}}
        </div>
        <div class="menu-top-list-top-info">
          {{propertyname.categoryCharname3}} :{{product_num.productAttr3}}
        </div>
        <div class="menu-top-list-top-info">
          {{product_num.productOriPrice}}
        </div>
        <div class="menu-top-list-top-info">
          {{product_num.productLocPrice}}

        </div>
        <div class="menu-top-list-top-info">
          {{product_num.productQuantity}}

        </div>
        <div class="menu-top-list-top-info">
          {{product_num.skuStatus}}

        </div>
        <div class="menu-top-list-top-info">
          {{product_num.skuSort}}
        </div>
        <div class="menu-top-list-top-info">
          {{product_num.productTotalTime}}
        </div>
        <div class="menu-top-list-top-info">
          <a-button @click="delPreview(index)">删除</a-button>
        </div>
      </div>

    </div>
    <div class="menu-body">
      <div class="menu-title">
        <a-icon type="plus-circle"/>
        <span>添加商品</span>
      </div>
      <div class="add-product-form">
        <div class="add-product-form-div">

          <div class="catagory_input">
            <label for="name">商品名称：</label><input class="catagory_form" v-model="productName" type="text"
                                                  name="catagory_solt"/>

            <label for="name">商品销量：</label><input class="catagory_form" v-model="productPay" type="text"
                                                  name="catagory_name"/>
          </div>
          <div class="catagory_input">
            <label for="name">商品描述：</label>
            <div class="edit_container">
              <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
              </quill-editor>
              <button v-on:click="saveHtml">保存</button>
            </div>
<!--            <input class="catagory_form" v-model="productDisc" id="" type="text"-->
<!--                                                  name="catagory_solt"/>-->

          </div>
          <div class="catagory_input catagory_inputList">
            <label for="name">分类名称：</label>
            <select class="product_selsct" v-model="productCate" @change="getCataAttr(productCate)"
                    name="product_catagory" id="">
              <option v-for="(cate,index) in catagoryArr" :value="index">{{cate.name}}</option>
            </select>
            <label for="name">商品顺序：</label>
            <input class="catagory_form" v-model="productSolt" id="" type="text"
                                                  name="catagory_solt"/>
            <label for="name">状 &nbsp; &nbsp; &nbsp;态：</label>
            <select class="product_selsct" v-model="productStatus" name="product_catagory" id="">
              <option value="1">启用</option>
              <option value="2">禁用</option>
              <option value="2">已删除</option>

            </select>
          </div>

          <div class="catagory_input">
            <a-button @click="getProduct()">提交修改</a-button>
          </div>
        </div>
      </div>

    </div>


    <div class="menu-body">
      <div class="menu-title">
        <a-icon type="plus-circle"/>
        <span>添加属性与库存</span>
      </div>
      <div class="add-product-form">
        <div class="add-product-form-div">

          <div class="catagory_input">
            <label for="name" v-if="propertyname.categoryCharname1">{{propertyname.categoryCharname1}}：</label><input
            class="catagory_form" v-if="propertyname.categoryCharname1" v-model="product_attr1" type="text"
            name="catagory_solt"/>

            <label for="name" v-if="propertyname.categoryCharname2">{{propertyname.categoryCharname2}}：</label><input
            class="catagory_form" v-if="propertyname.categoryCharname2" v-model="product_attr2" type="text"
            name="catagory_name"/>
          </div>
          <div class="catagory_input">
            <label for="name" v-if="propertyname.categoryCharname3">{{propertyname.categoryCharname3}}：</label><input
            class="catagory_form" v-if="propertyname.categoryCharname3" v-model="product_attr3" type="text"
            name="catagory_name"/>

            <label for="name">商品原始价：</label><input class="catagory_form" v-model="product_org_price" id="" type="text"
                                                   name="catagory_solt"/>
          </div>
          <div class="catagory_input">
            <label for="name">商品现售价：</label><input class="catagory_form" v-model="product_now_price" id="" type="text"
                                                   name="catagory_solt"/>

            <label for="name">商品库存值：</label><input class="catagory_form" v-model="product_total" id="" type="text"
                                                   name="catagory_solt"/>
          </div>
          <div class="catagory_input">
            <label for="name">排序值：</label><input class="catagory_form" v-model="product_total_solt" id="" type="text"
                                                 name="catagory_solt"/>

            <label for="name">状 &nbsp; &nbsp; &nbsp;态：</label>
            <select class="product_selsct" v-model="product_total_status" name="product_catagory" id="">
              <option value="1">启用</option>
              <option value="2">禁用</option>
              <option value="2">已删除</option>
            </select>
          </div>

          <div class="catagory_input">
            <a-button @click="getAttr()">提交预览</a-button>
          </div>
        </div>
      </div>

    </div>
    <div class="menu-body">
      <div class="menu-title">
        <a-icon type="plus-circle"/>
        <span>添加标签</span>
      </div>
      <div class="add-product-form">
        <div class="add-product-form-div">

          <div class="catagory_input">
            <label for="name">{{tagArr.data[0].msg}}：</label>
            <template>
              <div>
                <a-range-picker @change="onChange"/>
              </div>
            </template>
            <select name="" id="" @change="changeTagDate($event)">
              <option value="1">启用</option>
              <option value="2">禁用</option>
              <option value="3">备用</option>
            </select>
          </div>

          <div class="catagory_input">
            <label for="name">{{tagArr.data[1].msg}}：</label>
            <input class="catagory_form" v-model="tagAttr2" type="text" name="catagory_solt"/>
            <select name="" id="" @change="changeTagCont($event)">
              <option value="1">启用</option>
              <option value="2">禁用</option>
              <option value="3">备用</option>
            </select>
          </div>
          <div class="catagory_input">
            <template>
              <div>
                <a-upload
                  listType="picture"
                  :defaultFileList="fileList"
                  :customRequest = "uploadPic"
                >
                  <a-button> <a-icon type="upload" />{{tagArr.data[2].msg}} </a-button>
                </a-upload>
                <br />
              </div>
              <select class="select-input-div" name="" id="" @change="changeTagPic($event)">
                <option value="1">启用</option>
                <option value="2">禁用</option>
                <option value="3">备用</option>
              </select>
            </template>
          </div>

          <div class="catagory_input">
            <a-button @click="getTag()">提交修改</a-button>
          </div>
        </div>
      </div>

    </div>

  </div>
  </div>
</template>

<script>
    import moment from 'moment'
    import apiConfig from '../../router/httpConfig.js'
    import qs from "qs";
    import axios from "axios";
    import quill from "../showPage/quill";
    export default {
        name: "addCategoryClass",
        components:{
            "quill":quill,
        },
        data() {
            return {
                fileList: [
                ],
                picKey:[],
                productName: "",
                productPay: "",
                productDisc: "",
                productSolt: "",
                productCate: "",
                productStatus: "",
                productCreat: "",
                product_attr1: "",
                product_attr2: "",
                product_attr3: "",
                product_org_price: "",
                product_now_price: "",
                product_total: "",
                product_total_solt: "",
                product_total_status: "",
                product_total_time: "",
                totalCreat: "",
                product_total_id: "",
                product_attr_msg: {},
                product_attr_msg_arr: [],
                catagoryArr: [],
                cataLocalname: "",
                propertyname: "",
                product_id: "",
                tagArr: [],
                tagAttr1: "",
                tagAttr2: "",
                tagAttr3: "",
                tagAttr: [],
                tagStatus: "",
                tagData: [],
                tagTime: "",
                tagDate: "",
                tagCont: "",
                tagPic: "",
                productCateRed: "",
                content: `<p>hello world</p>`,
                editorOption: {}

            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },
        methods: {
            onChange(date, dateString) {
                // console.log(date, dateString);
                dateString = dateString.join("\/");
                this.tagTime = dateString;
                this.tagData.push({
                    "type": "1",
                    "tagValue": dateString
                });
                console.log(this.tagData)

            },
            getProduct() {
                console.log(this.catagoryArr)
                var date = new Date;
                this.productCreat = moment(date).format('YYYY-MM-DD HH-mm-ss')
                this.cataLocalname = this.catagoryArr[this.productCate];
                var productAllData = {
                    "productName": this.productName,
                    "productPay": this.productPay,
                    "productDisc": this.productDisc,
                    "productSort": this.productSolt,
                    "productCate": this.productCateRed,
                    "productStatus": this.productStatus,
                }
                // console.log(productAllData);
                // axios
                //     .post(apiConfig.addProductData+"?token="+localStorage.getItem("token"), JSON.stringify(productAllData))
                //     .then(res => {
                //         this.product_id = res.data.id;
                //
                //         console.log(res)
                //     })

            },
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
                        console.log(this.picKey)
                    })
            },
            getAttr() {
                var total_date = new Date;
                this.totalCreat = moment(total_date).format('YYYY-MM-DD HH-mm-ss')
                this.product_attr_msg = {
                    "productAttr1": this.product_attr1,
                    "productAttr2": this.product_attr2,
                    "productAttr3": this.product_attr3,
                    "productOriPrice": this.product_org_price,
                    "productLocPrice": this.product_now_price,
                    "productQuantity": this.product_total,
                    "skuSort": this.product_total_solt,
                    "skuStatus": this.product_total_status,
                    "productTotalTime": this.totalCreat,
                }
                this.product_attr_msg_arr.push(this.product_attr_msg)
                console.log(this.product_attr_msg_arr)
            },
            getCataAttr(cateAttrNum) {
                var propertyname = JSON.parse(this.catagoryArr[cateAttrNum].property);
                this.propertyname = propertyname;
                this.productCateRed = this.catagoryArr[cateAttrNum].id
            },
            getAllData() {
                        var reqData = {
                            "productName": this.productName,
                            "productSale": this.productPay,
                            "productDisc": this.productDisc,
                            "productSort": this.productSolt,
                            "productCate": this.productCateRed,
                            "productStatus": this.productStatus,
                            "tag": this.tagAttr,
                            "sku": this.product_attr_msg_arr
                        }
                        console.log(reqData);
                        axios
                            .post(apiConfig.addProductData+"?token="+localStorage.getItem("token"), JSON.stringify(reqData))
                            .then(res => {
                                if (res.data.status !== "false") {
                                    alert("添加成功")
                                    this.$router.go(0)
                                } else {
                                    alert("添加失败")
                                }
                                console.log(res)
                            })
            },
            delPreview(id) {
                this.product_attr_msg_arr.splice(id, 1);
                console.log(this.product_attr_msg_arr)
            },
            getTag() {
                axios
                    .post(apiConfig.pushLoadPic+"?token="+localStorage.getItem("token"),qs.stringify({
                        "key":this.picKey,
                        "func":"create"
                    }))
                    .then(res=> {
                        var picData = JSON.stringify(res.data)
                        console.log(picData);
                        this.tagAttr = [
                            {
                                "type": 1,
                                "tagValue": this.tagData[0].tagValue,
                                "tagStatus": this.tagData[0].tagStatus
                            },
                            {
                                "type": 2,
                                "tagValue": this.tagAttr2,
                                "tagStatus": this.tagCont
                            },
                            {
                                "type": 3,
                                "tagValue": picData,
                                "tagStatus": this.tagPic
                            }
                        ];
                        console.log(this.tagAttr)
                    });
            },
            changeTagDate(event) {
                this.tagDate = event.target.value;
                this.tagData[0].tagStatus = this.tagDate;
                console.log(this.tagDate)

            },
            changeTagCont(event) {
                this.tagCont = event.target.value;
                console.log(this.tagCont)
            },
            changeTagPic(event) {
                this.tagPic = event.target.value;
                console.log(this.tagPic)
            },
            onEditorReady(editor) { // 准备编辑器
            },
            onEditorBlur(){}, // 失去焦点事件
            onEditorFocus(){}, // 获得焦点事件
            onEditorChange(){
            }, // 内容改变事件
            saveHtml:function(event){
                this.productDisc = this.content
                console.log(this.productDisc);
            }
        },
        mounted() {
            axios
                .get(apiConfig.showCategoryData+"?token="+localStorage.getItem("token"))
                .then(res => {
                    this.catagoryArr = res.data.data;
                    console.log(res)
                })
            axios
                .post(apiConfig.showTagData+"?token="+localStorage.getItem("token"))
                .then(res => {
                    this.tagArr = res;
                    console.log(res)
                })

        }

    }
</script>

<style scoped>
  .menu-title {
    position: absolute;
    color: #747474;
    font-size: 20px;
    margin-left: 2%;
    margin-top: 20px;
  }

  .menu-right {
    width: 100%;
    height: 900px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .menu-body {
    margin-top: 30px;
    display: flex;
    width: 97%;
    min-height: 44%;
    margin-left: 2%;
    border: 1px solid #e8e8e8;
  }


  .catagory_form {
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .catagory_inputList{
  }
  .catagory_input {
    display: flex;
    width:200px;
    flex-wrap: wrap;
    margin-top: 15px;
  }

  .product_selsct {
    width: 171px;
    height: 27px;
    padding-left: 50px;
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .add-product-form {
    width: 80%;
    border: 1px solid white;
    margin-left: 40%;
    margin-top: 20px;
  }

  .add-product-form-div {
    margin-top: 50px;
  }

  .product_select_input {
    margin-left: -31%;
  }

  .menu-top-list {
    width: 100%;
    border: 1px solid;
  }

  .menu-top-list-top {
    display: flex;
    background-color: #e6e6e6;
    margin-top: 30px;
    width: 100%;
    height: 45px;
  }

  .menu-top-list-list {
    display: flex;
    margin-top: 20px;
    width: 100%;
    border: 1px solid #f7f7f7;
    height: 45px;
  }

  .menu-top-list-title {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .menu-top-list-title > span {
    margin-top: 80px;
    font-size: 24px;
    font-weight: bold;
  }

  .menu-top-list-top-info {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
  }
  .select-input-div{
    height:30px;
  }
.edit_container{
  width:800px;
}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
