const localUrl = '127.0.0.1:8000';
const config = {
  //添加 分类数据
  AddCategoryData:"http://127.0.0.1:8000/api/category/create",
  //添加 分类数据
  UpdateCategoryData:"http://127.0.0.1:8000/api/category/update",
  // 获取 分类表
  showCategoryData:"http://127.0.0.1:8000/api/category",
  // 展示商品列表
  showProductData:"http://127.0.0.1:8000/api/product",
  // 删除商品;列表
  deleteProductData:"http://127.0.0.1:8000/api/category/delete",
  // 添加库存
  addSkuData:"http://127.0.0.1:8000/api/sku/add",
  // 获取标签
  showTagData:"http://127.0.0.1:8000/api/tag",
  // 获取库存
  showSkuData:"http://127.0.0.1:8000/api/sku",
  // 添加商品
  addProductData:"http://127.0.0.1:8000/api/product/create",
  // 删除商品
  deleteproData: "http://127.0.0.1:8000/api/product/delete",
  // 更新商品
  updataProductData:"http://127.0.0.1:8000/api/product/updata",
  // 上传图片
  uploadPicData:"http://127.0.0.1:8000/api/tag/picUpload",
  // 提交数据
  pushLoadPic:"http://127.0.0.1:8000/api/tag/pushUpload",

  // 显示 导航
  showNavData:"http://127.0.0.1:8000/api/nav",
  // 删除 单条导航
  delNabData:"http://127.0.0.1:8000/api/nav/delete",
  // 创建导肮
  createNavData:"http://127.0.0.1:8000/api/nav/create",
  // 更新导航
  updataNavData:"http://127.0.0.1:8000/api/nav/updata",

  // 登录
  loginData:"http://127.0.0.1:8000/api/login",
  // 注册
  registerData:"http://127.0.0.1:8000/api/register",

}
export default config;
