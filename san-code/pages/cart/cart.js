// pages/cart/cart.js
import {
  cache
} from "../../enum/cache"
import {
  getScanCode,
  getProductionInfo
} from "../../common/scan-code"
import {
  addCart
} from "../../common/cart"
import getProductTotalPrice from "../../common/computed-total-price";
Page({
  // 点击继续添加按钮会触发的方法
  async AddScanCode(e) {
    // 点击继续添加按钮, 开启扫码,并获取到商品条形码
    const result = await getScanCode()
    // 获取到商品条形码之后调用获取商品信息接口
    const response = await getProductionInfo(result)
    // 获取到商品信息之后将获取到的商品信息添加到购物车
    addCart(response)
    // 从本地获取最新的商品数据,并重新进行渲染
    this.getCartList()
    // 当页面的数据重新渲染之后, 我们需要重新计算商品的总价
    const totalPrice = getProductTotalPrice(this.data.cartList)
    this.setData({
      totalPrice
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    totalPrice: 0
  },

  // 方法的做的事情: 获取本地存储的购物车数据
  getCartList() {
    const carts = wx.getStorageSync(cache.CARTS)
    console.log("ccc", carts)
    this.setData({
      cartList: carts
    })
  },

  // 方法的做的事情: 点击减号触发的方法
  handleDecrement(e) {
    const index = e.currentTarget.dataset.index

    const num = this.data.cartList[index].num

    const itemStatus = this.removeCartItem(num, index)
    if (itemStatus) return

    this.data.cartList[index].num -= 1
    this.setData({
      cartList: this.data.cartList
    })
    wx.setStorageSync(cache.CARTS, this.data.cartList)
    const totalPrice = getProductTotalPrice(this.data.cartList)
    this.setData({
      totalPrice
    })
  },

  // 方法的做的事情: 当数量为1的时候,显示模态框, 并且当点击了确定按钮时,移除当前的数据
  removeCartItem(num, index) {
    if (num === 1) {
      wx.showModal({
        content: '您确定要删除此商品吗?',
        success: (res) => {
          if (res.confirm) {
            this.data.cartList.splice(index, 1)
            this.setData({
              cartList: this.data.cartList
            })
            wx.setStorageSync(cache.CARTS, this.data.cartList)
            const totalPrice = getProductTotalPrice(this.data.cartList)
            this.setData({
              totalPrice
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return true
    }
  },

  // 单个商品   单价 * 数量 = 总价
  // 多个商品   多个单个商品总价的和 = 所有商品总价
  // 什么时候获取总价: 页面开始加载时 商品增加时  商品减少时

  // 方法的做的事情:  获取商品的总价
  // getProductTotalPrice(){

  //   if(this.data.cartList && this.data.cartList.length > 0){
  //     let totalPrice = 0
  //     this.data.cartList.forEach(item=>{
  //       totalPrice += item.num * item.price
  //     })
  //     this.setData({
  //       totalPrice 
  //     })
  //   }

  // },


  // 方法的做的事情: 点击加号触发的方法
  handleIncrement(e) {
    const index = e.currentTarget.dataset.index
    this.data.cartList[index].num += 1
    this.setData({
      cartList: this.data.cartList
    })
    wx.setStorageSync(cache.CARTS, this.data.cartList)
    const totalPrice = getProductTotalPrice(this.data.cartList)
    this.setData({
      totalPrice
    })
  },

  // 方法的做的事情: 跳转到订单也
  handleToOrder() {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCartList()
    const totalPrice = getProductTotalPrice(this.data.cartList)
    this.setData({
      totalPrice
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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