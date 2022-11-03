// 获取商品总价
const getProductTotalPrice = (cartList)=>{
  if(cartList && cartList.length > 0){
    let totalPrice = 0
    cartList.forEach(item=>{
      totalPrice += item.num * item.price
    })
    return totalPrice
  }
  
}

export default getProductTotalPrice