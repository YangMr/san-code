// pages/cart/cart.js
import {cache} from "../../enum/cache"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList : [],
    totalPrice : 0
  },

  // 方法的做的事情: 获取本地存储的购物车数据
  getCartList(){
    const carts = wx.getStorageSync(cache.CARTS)
    this.setData({
      cartList : carts
    })
  },

  // 方法的做的事情: 点击减号触发的方法
  handleDecrement(e){
    const index = e.currentTarget.dataset.index

    const num = this.data.cartList[index].num

    const itemStatus = this.removeCartItem(num, index)
    if(itemStatus) return

    this.data.cartList[index].num -= 1
    this.setData({
      cartList : this.data.cartList
    })  
    wx.setStorageSync(cache.CARTS, this.data.cartList) 
    this.getProductTotalPrice()
  },

  // 方法的做的事情: 当数量为1的时候,显示模态框, 并且当点击了确定按钮时,移除当前的数据
  removeCartItem(num, index){
    if(num === 1){
      wx.showModal({
        content: '您确定要删除此商品吗?',
        success : (res)=> {
          if (res.confirm) {
            this.data.cartList.splice(index,1)
            this.setData({
              cartList : this.data.cartList
            })
            wx.setStorageSync(cache.CARTS, this.data.cartList)
            this.getProductTotalPrice() 
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
  getProductTotalPrice(){
    let totalPrice = 0
    this.data.cartList.forEach(item=>{
      totalPrice += item.num * item.price
    })
    this.setData({
      totalPrice 
    })
  },


  // 方法的做的事情: 点击加号触发的方法
  handleIncrement(e){
    const index = e.currentTarget.dataset.index
    this.data.cartList[index].num += 1
    this.setData({
      cartList : this.data.cartList
    })
    wx.setStorageSync(cache.CARTS,this.data.cartList)
    this.getProductTotalPrice()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCartList()
    this.getProductTotalPrice()
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