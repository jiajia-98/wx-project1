// pages/login/login.js
let app = getApp()
import {hgetStorage,hnavigateTo} from '../../static/htools.wx'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断用户是否登录
    // if(hgetStorage('isLogin') && hgetStorage('isLogin') == 1){
    //   hnavigateTo('/pages/index/index')
    // }else{
    //   hnavigateTo('/pages/login/login')
    // }
  },
  // 点击登录按钮登录
  login() {
    // 向后台发起post 请求，将用户名和密码传递进去
    
  }
})