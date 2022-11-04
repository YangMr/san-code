// app.js
import LoginModel from "./model/LoginModel"
import {cache} from "./enum/cache"
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    this.initLoad()
  },

  // 初始化方法
  async initLoad(){
    const code = await this.getCode()
    const response = await this.login(code) 
    await this.saveLocalUserData(response.userinfo)
  },

  // 1. 调用wx.login方法获取code码
  async getCode(){
    const {code} = await wx.login()
    return code
  },

  // 2. 调用登录接口, 通过code获取到openid以及用户信息
  async login(code){
    const response = await LoginModel.login({code})
    return response
  },

  // 3. 将获取到的用户信息以及openid保存到本地
  saveLocalUserData(userInfo){
    wx.setStorageSync(cache.USER_INFO_KEY, userInfo)
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})

