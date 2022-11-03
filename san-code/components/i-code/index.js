// components/i-code/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status : {
      type : Boolean,
      value : false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleScanCode(){
      console.log("status", this.data.status)
      this.triggerEvent("scanCode")
    },
    handleToCart(){
      wx.navigateTo({
        url: '/pages/order/order'
      })
    }
  }
})
