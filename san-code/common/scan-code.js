import {addCart} from "./cart"
import ShoppingModel from "../model/ShoppingModel"

/**
 * 1. 开启扫码相机 
 * 2. 获取到条形码 
 * 3. 调用获取商品信息接口  
 * 4. 要将获取到的商品信息添加到购物车
 */

// 开启扫码  方法做的事情: 点击扫码按钮触发的方法
const getScanCode = async () =>{
    // 只允许从相机扫码, 开启扫码
    const res = await wx.scanCode({
      onlyFromCamera: true,
    })
    return res.result
}

// 调用获取商品信息接口 方法做的事情: 根据商品条形码获取商品信息
const getProductionInfo = async (code) => {
  try{
    let data = {qcode : code}
    const res = await ShoppingModel.getProductInfo(data)
    
    const response = res.result
    if(response.length > 0){
      return response[0]
    }else{
      wx.showToast({
        title: '获取不到商品信息',
        icon : 'none'
      })
    }
  }catch(error){
    console.log(error)
  }
}

export {
  getScanCode,
  getProductionInfo
}





















// success : (res) => {
      //   const {result} = res
      //   return res
      // }



// 开启扫码  方法做的事情: 点击扫码按钮触发的方法
// const handleScanCode = (e) =>{
//   return new Promise((resolve,reject)=>{
//     const attr = e.currentTarget.dataset.attr
//     // 只允许从相机扫码, 开启扫码
//     wx.scanCode({
//       onlyFromCamera: true,
//       success : (res) => {
//         resolve(result,res)
//         // const {result} = res
//         // getProductionInfo(result, attr)
//       },
//       fail : (err)=>{
//         reject(err)
//       }
//     })
//   })
// }

// // 调用获取商品信息接口 方法做的事情: 根据商品条形码获取商品信息
// const getProductionInfo = async (code,attr) => {
//   try{
//     let data = {qcode : code}
//     const response = await ShoppingModel.getProductInfo(data)

//     if(response.length > 0){
//       console.log("bbb")
//       // 把获取到的商品数据存储到本地
//       addCart(response[0])
      
//       // 判断点击的按钮是否时继续添加按钮,如果是,则不进行跳转
//       if(attr === "add") return

//       // 跳转到购物车页面
//       wx.navigateTo({
//         url: '/pages/cart/cart',
//       })
//     }else{
//       wx.showToast({
//         title: '获取不到商品信息',
//         icon : 'none'
//       })
//     }
//   }catch(error){
//     console.log(error)
//   }
// }