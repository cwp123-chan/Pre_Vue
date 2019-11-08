<template>
  <!--      右侧页面1-->
  <div class="menu-right pre_product" >
    <div class="menu-menu-top">

      <div class="menu-menu-top-title">
        <div><span class="menu-right-top-title-span">标签管理</span></div>
        <div class="add-button">
          <a-button @click="goToAddTag">添加标签</a-button>
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
        <div class="menu-right-body-tab-title">创建时间</div>
        <div class="menu-right-body-tab-title">更新时间</div>
        <div class="menu-right-body-tab-title">操作</div>
      </div>
      <div class="menu-right-body-tab2">
        <div class="menu-right-body-tab-title">1</div>
        <div class="menu-right-body-tab-title">休闲零食</div>
        <div class="menu-right-body-tab-title">{asdasdsa}</div>
        <div class="menu-right-body-tab-title">1</div>
        <div class="menu-right-body-tab-title">1</div>
        <div class="menu-right-body-tab-title">1</div>
        <div class="menu-right-body-tab-title">1</div>
        <div class="menu-right-body-tab-title">2019-8-9 20:28:11</div>
        <div class="menu-right-body-tab-title">2019-8-9 20:28:11</div>
        <div class="menu-right-body-tab-title">
          <a-button>删除</a-button>
          <a-button  @click="goToEditTag">修改</a-button>
        </div>
      </div>
      <div class="menu-right-body-tab2">
        <div class="menu-right-body-tab-none-data">暂无数据
        </div>
      </div>
      <div class="menu-right-body-tab-page">
        <a-pagination @change="onChange" :total="50" />
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "tagClass",
        methods:{
            goToAddTag(){
                this.$router.push("/goToAddTag")
            },
            goToEditTag(){
                this.$router.push("/goToEditTag")
            }
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
    border: 1px solid;
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
</style>
