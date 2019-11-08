<template>
  <div class="menu-right">
    <div class="editMenu-right">
      <div class="editMenu-right-top">
      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText">商品名称:</label>
        <input type="text" name="name" v-model="productData[0].name" class="editMenu-right-main-textInput">
      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText">商品销量:</label>
        <input type="text" name="name" v-model="productData[0].sale_num" class="editMenu-right-main-textInput">件
      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText">商品分类:</label>
        <select name="" id="" v-model = "getCateData" class="editMenu-right-main-textInput" @change = "changeTheAttr" >
        <option :value="index" v-for = "(cateOnce,index) in allCataData" >{{cateOnce.name}}</option>
        </select>
      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText">商品描述:</label>
        <textarea   cols="1" name="name"  rows="6" v-model="productData[0].content" class="editMenu-right-main-textInput"  style="OVERFLOW:   hidden"></textarea>
      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText">排序值:</label>
        <input type="text" name="name" v-model="productData[0].sort" class="editMenu-right-main-textInput">
      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText">商品状态:</label>
        <input type="text" name="name" v-model="productData[0].status" class="editMenu-right-main-textInput">
      </div>
      <div class="editMenu-right-mainTable">
        <div class="editMenu-right-mainTable-div">
          <div class="editMenu-right-mainTable-div-top">
            <div class="editMenu-right-mainTable-div-top-item" v-if = "productCateName.length !== 0 ">{{productCateName.name1}}</div>
            <div class="editMenu-right-mainTable-div-top-item" v-if = " productCateName.length == 0">{{categoryData.categoryCharname1}}</div>
            <div class="editMenu-right-mainTable-div-top-item" v-if = "productCateName.length !== 0 ">{{productCateName.name2}}</div>
            <div class="editMenu-right-mainTable-div-top-item" v-if = " productCateName.length == 0">{{categoryData.categoryCharname2}}</div>
            <div class="editMenu-right-mainTable-div-top-item" v-if = "productCateName.length !== 0 ">{{productCateName.name3}}</div>
            <div class="editMenu-right-mainTable-div-top-item" v-if = " productCateName.length == 0">{{categoryData.categoryCharname3}}</div>
            <div class="editMenu-right-mainTable-div-top-item">原价</div>
            <div class="editMenu-right-mainTable-div-top-item">售价</div>
            <div class="editMenu-right-mainTable-div-top-item">库存</div>
            <div class="editMenu-right-mainTable-div-top-item">商品库存排序</div>
            <div class="editMenu-right-mainTable-div-top-item">商品库存状态</div>
          </div>
          <div class="editMenu-right-mainTable-div-body" v-for = "(sku,index) in skuData" :key = "index">
            <div class="editMenu-right-mainTable-div-top-item" @click = "showinpput = index" v-if = "showinpput !== index">{{sku.attr1}}</div>
            <input type="text" class="editMenu-right-mainTable-div-top-item" v-model = "neAttr1 = sku.attr1"  @blur = getinputAttr(index) v-if = "showinpput == index" >
            <div class="editMenu-right-mainTable-div-top-item"@click = "showinpput = index" v-if = "showinpput !== index" >{{sku.attr2}}</div>
            <input type="text" class="editMenu-right-mainTable-div-top-item" v-model = "neAttr2 = sku.attr2"  @blur = getinputAttrB(index) v-if = "showinpput == index" >
            <div class="editMenu-right-mainTable-div-top-item"@click = "showinpput = index" v-if = "showinpput !== index" >{{sku.attr3}}</div>
            <input type="text" class="editMenu-right-mainTable-div-top-item" v-model = "neAttr3 = sku.attr3"  @blur = getinputAttrC(index) v-if = "showinpput == index" >
            <div class="editMenu-right-mainTable-div-top-item"@click = "showinpput = index" v-if = "showinpput !== index" >&yen; {{sku.original_price}}</div>
            <input type="text" class="editMenu-right-mainTable-div-top-item" v-model = "neAttr4 = sku.original_price"  @blur = getinputAttrD(index) v-if = "showinpput == index" >
            <div class="editMenu-right-mainTable-div-top-item"@click = "showinpput = index" v-if = "showinpput !== index" >&yen; {{sku.price}}</div>
            <input type="text" class="editMenu-right-mainTable-div-top-item" v-model = "neAttr5 = sku.price"  @blur = getinputAttrE(index) v-if = "showinpput == index" >
            <div class="editMenu-right-mainTable-div-top-item"@click = "showinpput = index" v-if = "showinpput !== index" >{{sku.quantity}}件</div>
            <input type="text" class="editMenu-right-mainTable-div-top-item" v-model = "neAttr6 = sku.quantity"  @blur = getinputAttrF(index) v-if = "showinpput == index" >
            <div class="editMenu-right-mainTable-div-top-item"@click = "showinpput = index" v-if = "showinpput !== index" >{{sku.sort}}</div>
            <input type="text" class="editMenu-right-mainTable-div-top-item" v-model = "neAttr7 = sku.sort"  @blur = getinputAttrG(index) v-if = "showinpput == index" >
            <div class="editMenu-right-mainTable-div-top-item"@click = "showinpput = index" v-if = "showinpput !== index" >{{sku.status}}</div>
            <select name="" id="" v-model = "neAttr8 = sku.status"  @blur = getinputAttrH(index) class="editMenu-right-mainTable-div-top-item" v-if = "showinpput == index">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div class="editMenu-right-mainTable-div-body editMenu-right-mainTable-div-bodypush" >
            <div>
              <button class="yuanstyle" @click = "showTheAddTag">
                <a-icon type="plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="addTag" v-if = "showTheAddTagstatus == 1">
        <div class="editMenu-right-main">
          <label for="name" class="editMenu-right-main-textInputText">{{categoryData.categoryCharname1}}:</label>
          <input type="text" name="name" v-model="addTagAttr1" class="editMenu-right-main-textInput">
          <label for="name" class="editMenu-right-main-textInputText">{{categoryData.categoryCharname2}}:</label>
          <input type="text" name="name" v-model="addTagAttr2"  class="editMenu-right-main-textInput">
        </div>
        <div class="editMenu-right-main">
          <label for="name" class="editMenu-right-main-textInputText">{{categoryData.categoryCharname3}}:</label>
          <input type="text" name="name" v-model="addTagAttr3"  class="editMenu-right-main-textInput">
          <label for="name" class="editMenu-right-main-textInputText">原价:</label>
          <input type="text" name="name" v-model="addTagOriPrice" class="editMenu-right-main-textInput">
        </div>
        <div class="editMenu-right-main">
          <label for="name" class="editMenu-right-main-textInputText">售价:</label>
          <input type="text" name="name" v-model="addTagLoPrice"  class="editMenu-right-main-textInput">
          <label for="name" class="editMenu-right-main-textInputText">库存:</label>
          <input type="text" name="name" v-model="addTagqueran"  class="editMenu-right-main-textInput">
        </div>
        <div class="editMenu-right-main">
          <label for="name" class="editMenu-right-main-textInputText">排序值:</label>
          <input type="text" name="name" v-model="addTagSort"  class="editMenu-right-main-textInput">
          <label for="name" class="editMenu-right-main-textInputText">状态:</label>
          <select name="" id="" v-model="addTagStatus" class="editMenu-right-main-textInput">
            <option value="1">启用</option>
            <option value="2">禁用</option>
            <option value="3">备用</option>
          </select>
        </div>
        <div class="editMenu-right-main">
          <a-button @click = "pushTheaddTag">提交</a-button>
          <a-button @click = "deshTheaddTag">取消</a-button>
        </div>
      </div>

      <div class="editMenu-right-main">
        <div>
          <span>商品标签</span>
        </div>
      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText">保质期:</label>
        <input type="text" name="name" v-model="tagTimeStart" disabled="disabled" class="editMenu-right-main-textInput editMenu-right-main-textInputbzqTime">
        <span>
          &nbsp;&nbsp;---
        </span>
        <input type="text" name="name" v-model="tagTimeEnd" disabled="disabled" class="editMenu-right-main-textInput editMenu-right-main-textInputbzqTime">
        <input type="text" name="name" v-model="tagTimeBet" disabled="disabled" class="editMenu-right-main-textInput editMenu-right-main-textInputbzqTimeYear">
        <select name="" id="" class="editMenu-right-main-textInputselect">
          <option value="1">启用</option>
          <option value="2">禁用</option>
          <option value="3">备用</option>
        </select>

      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText">商品宣传语:</label>
        <input type="text" v-model="tagData[1].value" name="name" class="editMenu-right-main-textInput">
        <select name="" id="" v-model = "tagData[1].status" class="editMenu-right-main-textInputselect">
          <option value="1">启用</option>
          <option value="2">禁用</option>
          <option value="3">备用</option>
        </select>
      </div>
      <div class="editMenu-right-main">
        <div class="editMenu-right-main-textInputUploadPic">
          <template>
            <div>
              <a-upload
                listType="picture"
                :defaultFileList="fileList"
                :customRequest = "uploadPic"
                :remove = "remove"
              >
                <a-button> <a-icon type="upload" /> 上传图片 </a-button>
              </a-upload>
              <br />
            </div>
          </template>
        </div>
      </div>
      <div class="editMenu-right-main">
        <label for="name" class="editMenu-right-main-textInputText">图片状态:</label>
        <select name="" id="" v-model="tagData[2].status" class="editMenu-right-main-textInput">
          <option value="1">启用</option>
          <option value="2">禁用</option>
          <option value="3">备用</option>
        </select>
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
                fileList: [
                ],
                picKey:[],
                productData:[],
                categoryData:[],
                skuData:[],
                tagData:[],
                allCataData:[],
                showinpput:-1,
                neAttr1:'',
                neAttr2:'',
                neAttr3:'',
                neAttr4:'',
                neAttr5:'',
                neAttr6:'',
                neAttr7:'',
                neAttr8:'',
                showTheAddTagstatus:0,
                addTagAttr1:'',
                addTagAttr2:'',
                addTagAttr3:'',
                addTagOriPrice:'',
                addTagLoPrice:'',
                addTagqueran:'',
                addTagSort:'',
                addTagStatus:'',
                cateName:[],
                tagTimeStart:'',
                tagTimeEnd:'',
                tagTimeBet:'',
                getCateData:'',
                productCateName:[]

            };
        },
        methods:{
            getTheCate(data){
                console.log(data)
            },
            getinputAttr(index){
                this.showinpput = -1;
                this.skuData[index].attr1 = this.neAttr1;
                console.log(this.skuData)
            },
            getinputAttrB(index){
                this.showinpput = -1;
                this.skuData[index].attr2 = this.neAttr2;
                console.log(this.skuData)
            },
            getinputAttrC(index){
                this.showinpput = -1;
                this.skuData[index].attr3 = this.neAttr3;
                console.log(this.skuData)
            },
            getinputAttrD(index){
                this.showinpput = -1;
                this.skuData[index].original_price = this.neAttr4;
                console.log(this.skuData)
            },
            getinputAttrE(index){
                this.showinpput = -1;
                this.skuData[index].price = this.neAttr5;
                console.log(this.skuData)
            },
            getinputAttrF(index){
                this.showinpput = -1;
                this.skuData[index].quantity = this.neAttr6;
                console.log(this.skuData)
            },
            getinputAttrG(index){
                this.showinpput = -1;
                this.skuData[index].sort = this.neAttr7;
                console.log(this.skuData)
            },
            getinputAttrH(index){
                this.showinpput = -1;
                this.skuData[index].status = this.neAttr8;
                console.log(this.skuData)
            },
            showTheAddTag(){
              this.showTheAddTagstatus = 1;
            },
            deshTheaddTag(){
                this.showTheAddTagstatus = 0;
            },
            pushTheaddTag(){
                this.skuData.push({
                    "attr1":this.addTagAttr1,
                    "attr2":this.addTagAttr2,
                    "attr3":this.addTagAttr3,
                    "original_price":this.addTagOriPrice,
                    "price":this.addTagLoPrice,
                    "product_id":this.productData[0].id,
                    "quantity":this.addTagqueran,
                    "sort":this.addTagSort,
                    "status":this.addTagStatus
                })
                console.log(this.skuData)
            },
            changeTheAttr(){
                var NproductCateName = JSON.parse(this.allCataData[this.getCateData].property);
                this.productCateName = {
                    "name1":NproductCateName.categoryCharname1,
                    "name2":NproductCateName.categoryCharname2,
                    "name3":NproductCateName.categoryCharname3,
                }
              console.log(this.productCateName)
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
            remove(data){
                console.log(data);
                this.picKey.splice(0,1)
            },
            pullallData(){
                axios
                    .post(apiConfig.pushLoadPic+"?token="+localStorage.getItem("token"),qs.stringify({
                        "key":this.picKey,
                        "func":"upload"
                    }))
                    .then(res=>{
                        var picData = JSON.stringify(res.data)
                        console.log(picData)

                        var skuAllData = [];
                        var tagAllData = [];
                        for (var i = 0 ; i < this.skuData.length ; i++){
                            if(this.skuData[i].id == undefined){
                                this.skuData[i].id = ""
                            }
                            skuAllData[i] = {
                                "skuId":this.skuData[i].id,
                                "productOriPrice":this.skuData[i].original_price,
                                "productAttr1":this.skuData[i].attr1,
                                "productAttr2":this.skuData[i].attr2,
                                "productAttr3":this.skuData[i].attr3,
                                "productLocPrice":this.skuData[i].price,
                                "productQuantity":this.skuData[i].quantity,
                                "skuStatus":this.skuData[i].status,
                                "skuSort":this.skuData[i].sort,
                            }
                        }
                        tagAllData = [
                            {
                                "tagId":this.tagData[0].id,
                                "type":"1",
                                "tagValue":this.tagData[0].value,
                                "tagStatus":this.tagData[0].status
                            },
                            {
                                "tagId":this.tagData[1].id,
                                "type":this.tagData[1].type,
                                "tagValue":this.tagData[1].value,
                                "tagStatus":this.tagData[1].status
                            },
                            {
                                "tagId":this.tagData[2].id,
                                "type":this.tagData[2].type,
                                "tagValue":picData,
                                "tagStatus":this.tagData[2].status
                            },
                        ]
                        if(this.getCateData == ""){
                            var cateDateIdItem = this.$route.params.editCateid
                        }else{
                            var cateDateIdItem = this.allCataData[this.getCateData].id;
                        }

                        var allDatas = {
                            "productId":this.$route.params.editProid,
                            "productName":this.productData[0].name,
                            "productDisc":this.productData[0].content,
                            "productSort":this.productData[0].sort,
                            "productSale" : this.productData[0].sale_num,
                            "productCate":cateDateIdItem,
                            "productStatus":this.productData[0].status,
                            "sku":skuAllData,
                            "tag":tagAllData
                        }
                        axios
                            .post(apiConfig.updataProductData+"?token="+localStorage.getItem("token"),JSON.stringify(allDatas))
                            .then(res=>{
                                console.log(res)
                            })
                        console.log(allDatas);


                    })




            }
        },
        mounted(){
            console.log(this.$route.params);
            var productId = this.$route.params.editProid;
            var cateId = this.$route.params.editCateid;
            axios
                .post(apiConfig.showProductData+"?token="+localStorage.getItem("token"),qs.stringify({
                    "productId":productId,
                    "categoryId":cateId,
                    "detail":"1"
                }))
                .then(res=>{
                    console.log(res)
                    this.productData = res.data.data[0];
                    this.categoryData = JSON.parse(res.data.data[2][0].property);
                    this.cateName = res.data.data[2];
                    this.skuData = res.data.data[1].data;
                    this.tagData = res.data.data[3];
                    this.allCataData = res.data.data[4].data;
                    this.tagTimeStart = this.tagData[0].value.split("/")[0]
                    this.tagTimeEnd = this.tagData[0].value.split("/")[1]
                    var daya = this.tagTimeEnd.split("-")[1]-this.tagTimeStart.split("-")[1]
                    var year = this.tagTimeEnd.split("-")[0]-this.tagTimeStart.split("-")[0]
                    if(year == 0){
                        this.tagTimeBet = daya+"月";
                    }else{
                        this.tagTimeBet = year+"年"+daya+"月";
                    }
                })
                .catch(err=>{
                    alert("暂无数据")
                    this.$router.go(-1)
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
    margin-left: 80px;
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

  input:focus{ outline:none; }
</style>

