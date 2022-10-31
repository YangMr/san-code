import request from "./http"

// 将wx.request转化为promise对象
function wxToPromise(method,options){
  return new Promise((resolve,reject)=>{
    options.success = resolve
    options.fail = (error)=>{
      reject(err)
    }
    wx[method](options)
  })
  
}

export {wxToPromise}


