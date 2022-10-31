// pages/shopping/shopping.js
import IndexModel from "../../model/indexModel"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advertList: []
  },

  // 方法做的事情: 获取轮播图数据
  getAdvertList() {
    // mock轮播图数据
    const data = [{
        id: 1,
        link: '',
        imgUrl: 'https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/20229rbBQ9QMiE1646710319.jpg?x-oss-process=image/resize,w_1920,h_575'
      },
      {
        id: 2,
        link: '',
        imgUrl: 'https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020lLJK0jy89y1586333534.jpg?x-oss-process=image/resize,w_1920,h_575'
      },
      {
        id: 3,
        link: '',
        imgUrl: 'https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020t2vrszZ5ib1586332927.jpg?x-oss-process=image/resize,w_1920,h_575'
      }
    ]

    this.setData({
      advertList: data
    })
  },

  // 方法做的事情: 点击扫码按钮触发的方法
  handleScanCode() {
    console.log("456")
    // 只允许从相机扫码, 开启扫码
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        const {result} = res
        this.getProductionInfo(result)
      }
    })
  },

  // 方法做的事情: 根据商品条形码获取商品信息
  getProductionInfo(code){
  
    
  },

  // 方法做的事情: 获取轮播图的数据
  async getBanner(){
    const response = await IndexModel.getBanner()
    console.log("banner", response)
  },

  // 方法做的事情: 获取导航栏做的事情
  async getNav(){
    const response = await IndexModel.getNav()
    console.log("nav", response)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAdvertList()
    this.getBanner()
    this.getNav()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})