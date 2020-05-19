// pages/login/login.js
let app = getApp()
import {
  hlogin,
  hgetUserInfo
} from '../../static/hunit.wx'
import {
  hgetStorage,
  hnavigateTo
} from '../../static/htools.wx'
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  async getUserInfo() {
    let _res = await hgetUserInfo();
    hnavigateTo('/pages/login/login', "redirect");
  }
})