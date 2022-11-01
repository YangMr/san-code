/**
 * http请求文件
 */

import {config} from "../config/config"
import {wxToPromise} from "./wxToPromise"
import {exceptionMessage} from "../config/exception-message"


class Http{

  // 公有方法
  static request({url, method = "GET", data = {}, header = {}}){

    // 开启loading加载
    wx.showLoading({
      title: '加载中',
    })

    // token
    let token = true
    if(token) header.token = "12346"

    return Http._request({url, method, data, header})
  }


  // 私有方法
  static async _request({url, method, data , header}){
    try{
      const res = await wxToPromise("request",{
        url : config.baseUrl + url,
        method,
        data,
        header : {
          devicetype : config.devicetype,
          ...header
        }
      })

      console.log("res=>",res)

      // 请求成功,将请求的结果返回出去
      if(res.statusCode === 200){
        return res.data.result
      }

      // 请求失败 --- 能够进行错误信息提示
      Http._showErrorMessage(res.statusCode, res.data.msg)
  
    }catch(error){
      console.log(error)
    }finally {
      // 隐藏loading加载
      wx.hideLoading()
    }
  }


  // 错误信息提示方法
  static _showErrorMessage(error_code, msg){
    let title = exceptionMessage[error_code] || msg || "未知错误"
    wx.showToast({
      title: title,
      icon : "none",
      duration : 3000
    })
  }
}

export default Http



