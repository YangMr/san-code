import md5 from "../utils/md5"
const sign = (userInfo) => {
  // 我们会接收一个对象, 对象的内容为
  /**
   * 
   * {
   *  openid : "1234567",
   *  salt : "asdfghjkl",
   *  uid : "1asdayruwrewyerw77qw"
   * }
   * 
   * 
   * 转化成: 
   * 
   *  openid1234567saltasdfghjkluid1asdayruwrewyerw77qw
   * 
   */
   let str = ""  
   const arr = [] // ["openid", "salt", "uid"]
   for(let key in userInfo){
     arr.push(key)
   }
   arr.sort()

   for(let i=0; i<arr.length; i++){
     str += arr[i] + userInfo[arr[i]]
   }

   return md5(str)
  
}

export default sign