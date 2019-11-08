import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Admin from "@/components/Admin"
import Category from "@/components/showPage/CategoryClass"
import Product from "@/components/showPage/ProductClass"
import Tag from "@/components/showPage/tagClass"
import Sku from "@/components/showPage/skuClass"
import Nav from "@/components/showPage/navClass"
import GoToAddProduct from "@/components/addPage/addProductClass"
import GoToAddCategory from "@/components/addPage/addCategoryClass"
import GoToAddNav from "@/components/addPage/addNavClass"
import GoToAddSku from "@/components/addPage/addSkuClass"
import GoToAddTag from "@/components/addPage/addTagClass"
import GoToEditProduct from "@/components/editPage/editProductClass"
import GoToEditCategory from "@/components/editPage/editCategoryClass"
import GoToEditNav from "@/components/editPage/editNavClass"
import GoToEditSku from "@/components/editPage/editSkuClass"
import GoToEditTag from "@/components/editPage/editTagClass"
import toSkuData from "@/components/showPage/toSkuDataClass"
import toLogin from "@/components/showPage/loginClass"
import error from "@/components/otherComponents/404"
import Register from "@/components/showPage/register"



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'toLogin',
      component: toLogin
    },
    {
      path:'/admin',
      name:'Admin',
      component:Admin
    },
    {
      path:'/category',
      name:'Category',
      component:Category
    },
    {
      path:'/tag',
      name:'Tag',
      component:Tag
    },
    {
      path:'/sku',
      name:'Sku',
      component:Sku
    },
    {
      path:'/nav',
      name:'Nav',
      component:Nav
    },
    {
      path:'/product',
      name:'Product',
      component:Product
    },
    {
      path:"/goToAddProduct",
      name:'GoToAddProduct',
      component:GoToAddProduct
    },
    {
      path:"/goToAddCategory",
      name:"GoToAddCategory",
      component:GoToAddCategory
    },
    {
      path:"/goToAddNav",
      name:"GoToAddNav",
      component:GoToAddNav
    },
    {
      path:"/goToAddSku",
      name:"GoToAddSku",
      component:GoToAddSku
    },
    {
      path:"/goToAddTag",
      name:"GoToAddTag",
      component:GoToAddTag
    },
    {
      path:"/goToEditCategory",
      name:"GoToEditCategory",
      component:GoToEditCategory
    },
    {
      path:"/goToEditTag",
      name:"GoToEditTag",
      component:GoToEditTag
    },
    {
      path:"/goToEditSku",
      name:"GoToEditSku",
      component:GoToEditSku
    },
    {
      path:"/goToEditNav",
      name:"GoToEditNav",
      component:GoToEditNav
    },
    {
      path:"/goToEditProduct",
      name:'GoToEditProduct',
      component:GoToEditProduct
    },
    {
      path:"/toSkuData",
      name:'toSkuData',
      component:toSkuData
    },
    {
      path:"/toLogin",
      name:"toLogin",
      component:toLogin,
    },
    {
      path:"*",
      name:"error",
      component:error,
    },
    {
      path:"/register",
      name:"register",
      component:Register
    }
  ]
})
