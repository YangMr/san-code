import md5 from "../utils/md5"
// 设置签名的方法 (一段加密的字符串)
const sign = (userinfo) => {
  // str的作用就是保存加密之后的字符串
  let str = ""

  // {
  //   openid : userinfo.openid,
  //   salt : userinfo.salt,
  //   uid : userinfo._id
  // }
  // openidoHpUe0dtCPlLe3JJ5efMfB1Zgalosalt0c1cf3a99a9c1c4ec09228a41f29a9a1uid5f1537120f6ae70e0c3021f7
  // 进行加密--- 作用: 将属性名与属性值进行拼接
  const arr = []
  for(let i in userinfo){
    arr.push(i)
  }
  arr.sort()

  for(let i=0; i<arr.length; i++){
    str += arr[i] + userinfo[arr[i]]
  }

  // 将加密之后的字符串返回给当前函数
  return md5(str)
}

export default sign