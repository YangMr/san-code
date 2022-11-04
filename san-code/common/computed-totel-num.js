// 获取商品的总数量
const getProductTotalNum = (cartList)=>{
  if(cartList && cartList.length > 0){
    let totalNum = 0
    cartList.forEach(item=>{
      totalNum += item.num
    })
    return totalNum
  }
}

export default getProductTotalNum