// pages/login/login.js
const store = require('store')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'9033',
    password:'123456'
  },
  handleTzToLg(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  handleLg(){
    let {username,password} = this.data
    if(username===''){
      console.log('用户名未空')
      return false
    }
    if(password===''){
      console.log('密码未空')
      return false
    }
    let data={
    username,password
    }
    wx.request({
      url: 'https://xiaosongweb.cn/api/lg',
      method:'post',
      data,
      success:function(res){
        if(res.data.code===2000){
          let token = res.data.token
          store.set('tk',token)
          wx.reLaunch({
            url: '/pages/board/board',
          })
        }else{
          wx.showToast({
            title: '用户密码错误',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail:function(err){
        wx.showToast({
          title: '网络连接异常',
          icon: 'none',
          duration: 2000
        })
      }
      
      // 省略其他参数
    })
    
  },
  handleinput(e){
    let value = e.detail.value
    let type = e.currentTarget.dataset.input
    this.setData({
      [type]:value
    })
  },
  onLoad: function(options) {
  },
})