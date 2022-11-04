// pages/order/order.js
import {cache} from "../../enum/cache"
import OrderModel from "../../model/OrderModel"
import getProductTotalPrice from "../../common/computed-total-price"
import getProductTotalNum from "../../common/computed-totel-num"
import sign from "../../common/sign"
Page({
  // 点击确认支付按钮触发的方法
  async handleOrder(){
    // 登录之后存储的openid以及其他用户信息
    const userinfo = wx.getStorageSync(cache.USER_INFO_KEY)

    // 获取签名信息
    const signData = sign({
      openid : userinfo.openid,
      salt : userinfo.salt,
      uid : userinfo._id
    })

    // 统一下单接口参数
    let data = {
      openid : userinfo.openid,
      uid : userinfo._id,
      sign : signData,
      total_price : this.data.totalPrice,
      total_num : this.data.totalNum,
      derate_price : this.data.deducted,
      real_price : this.data.realPrice,
      order : JSON.stringify(this.data.orderList)
    }
    // 调用统一下单接口
    const res = await OrderModel.doOrder(data)

    // 发起支付方法
    this.wxPay(res)
   
  },

  // 拉起微信支付
  wxPay(res){
   
    const data = JSON.parse(res.result)
    console.log("支付所需要的参数", data)
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: 'MD5',
      paySign: data.paySign,
      success: (res)=> {
        console.log("res=>===", res)
        if(res.errMsg === 'requestPayment:ok'){
          wx.removeStorageSync(cache.CARTS)
          this.handleToSuccess()
        }
       },
      fail : (error)=> { 
        console.log("error===>",error)
      }
    })
  },

  // 跳转到支付成功页面
  handleToSuccess(){
    wx.navigateTo({
      url: '/pages/success/success',
    })
  },

  // 获取本地的商品数据
  getCartList(){
    const orderList = wx.getStorageSync(cache.CARTS) || []
    console.log(orderList)
    this.setData({
      orderList
    })
  },

  // 点击展开或者收起按钮触发的方法
  handleOrderSwitch(){
    let length = this.data.orderList.length
    length = this.data.orderSize === 1 ? length : 1
    this.setData({
      orderSize : length
    })
  },

  // 点击switch开发会触发的方法
  handleChange(e){
    const value = e.detail.value
    this.setData({
      switchStatus : value
    })
    this.handleComputedPrice()
  },

  /**
   * 页面的初始数据
   */
  data: {
    orderList : [],
    orderSize : 1,
    balance : 4, // 余额
    deducted : 0, // 减扣
    switchStatus : true,
    totalPrice : 0, // 商品金额
    realPrice : 0, // 实际价格
    totalNum : 0 // 商品数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCartList()
    this.handleComputedPrice()
    this.handleComputedNum()
  },

  // 计算价格
  handleComputedPrice(){
    const totalPrice = getProductTotalPrice(this.data.orderList)
    if(this.data.switchStatus){
      if(this.data.balance > totalPrice){
        this.data.balance -= totalPrice
        this.setData({
          balance : this.data.balance,
          totalPrice,
          deducted :  totalPrice,
          realPrice : 0
        })
      }else{
        this.data.realPrice = totalPrice - this.data.balance
        this.setData({
          totalPrice,
          realPrice : this.data.realPrice,
          deducted : this.data.balance,
          balance : 0
        })  
      }
      
    }else{
      this.data.realPrice = totalPrice
      this.setData({
        balance : 4,
        totalPrice,
        realPrice : this.data.realPrice
      })  
    }
     
  },

  // 计算数量
  handleComputedNum(){
    const totalNum = getProductTotalNum(this.data.orderList)
    this.setData({
      totalNum
    })
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