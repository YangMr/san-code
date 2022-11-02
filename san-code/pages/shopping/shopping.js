// pages/shopping/shopping.js
import {getScanCode,getProductionInfo} from "../../common/scan-code"
import {addCart} from "../../common/cart"
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
  async handleScanCode(){
    // 开启扫码,并获取到商品的条形码
    const result = await getScanCode()
    // 获取到商品的条形码之后调用获取商品信息接口
    const response = await getProductionInfo(result)
    // 获取到商品信息之后,将获取到商品信息添加到购物车
    addCart(response)
    // 跳转到购物车页面
    wx.navigateTo({
      url: '/pages/cart/cart',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAdvertList()
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