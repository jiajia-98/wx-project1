// pages/login/login.js
let app = getApp()
import {
  hlogin,
  hrequestPost
} from '../../static/hunit.wx'
import {
  hsetStorage,
  hnavigateTo
} from '../../static/htools.wx'
Page({
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  async getUserInfo() {

    //点击授权登录按钮 发送请求wx.login 返回code码
    let _code = await hlogin();
    console.log(_code.code);
    //code发送请求到后台 返回openId
    let _result = await hrequestPost(getOpenId + '?code=' + _code.code, {})
    //console.log(_result);
    //根据返回的状态值 state 为0 表示未登录 跳转到登录界面
    if(_reslut.state == 0){
      hsetStorage('isLogin',0)
      hnavigateTo('/pages/login/login', "redirect");
    }else { 
      // 返回的 state 为1 表示已经登录 跳转到主页面
      hsetStorage('isLogin',1)
      hnavigateTo('/pages/index/index', "redirect");
    }
  }
})