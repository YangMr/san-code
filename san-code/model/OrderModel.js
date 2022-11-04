import Http from "../utils/http"

class OrderModel {
  // 统一下单api
  static doOrder(data){
    return Http.request({
      url : '/weixinpay/doOrder',
      method : 'POST', 
      data
    })
  }
}


export default OrderModel