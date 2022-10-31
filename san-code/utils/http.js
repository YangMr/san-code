/**
 * http请求文件
 */

import {config} from "../config/config"
import {wxToPromise} from "./wxToPromise"


// loading加载
// 请求头发送token
// 异常处理
// token过期处理
// 错误信息提示

class Http{
  // 公有方法
  static request({url, method = "GET", data = {}, header = {}}){
    return Http._request({url, method, data, header})
  }


  // 私有方法
  static async _request({url, method, data , header}){
    const res = await wxToPromise("request",{
      url : config.baseUrl + url,
      method,
      data,
      header : {
        devicetype : config.devicetype,
        ...header
      }
    })

    console.log(res.statusCode)
    if(res.statusCode < 400){
      return res
    }
    
    // Http._showErrorMessage(res.statusCode,)
  }

  // static _showErrorMessage(){

  // }
}

export default Http



