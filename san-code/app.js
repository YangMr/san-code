// app.js
import LoginModel from "./model/LoginModel"
import {cache} from "./enum/cache"
App({
  // 小程序启动触发额钩子函数
  onLaunch(){
    this.initLoad()
  },


  // 0. 初始化方法
  async initLoad(){
    const code = await this.wxLogin()
    const res = await this.login({code})
    this.saveLocalInfo(res.userinfo)
  },

  // 1. 调用小程序内置的wx.login方法, 获取code码
  async wxLogin(){
    const res = await wx.login()
    return res.code
  },

  // 2. 调用自己服务端登录接口,通过传递code码获取后台返回的openid以及其他信息
  async login(data){
    const res = await LoginModel.login(data)
    return res
  },

  // 3. 将openid以及其他相关信息保存到本地
  saveLocalInfo(userinfo){
    if(!userinfo) return
    wx.setStorageSync(cache.USER_INFO_KEY, userinfo)
  }
})
