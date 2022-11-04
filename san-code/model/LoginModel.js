import Http from "../utils/http"

class LoginModel {
  // 登录并获取openid
  static login(data){
    return Http.request({
      url : '/weixinpay/login',
      method : 'GET', 
      data
    })
  }
}




export default LoginModel