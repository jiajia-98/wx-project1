//app.js
import {
  hsetStorage,
  hgetStorage,
  hnavigateTo
} from './static/htools.wx'
import {
  hlogin,
  hrequestPost
} from './static/hunit.wx'
import api from './assets/api'
const {
  getOpenId
} = api
App({
  onLaunch() {
    wx.getSetting({
      async success(res) {
        //判断是否授权
        if (Object.keys(res.authSetting).length != 0) {
          // 如果授权则在本地存储isAuth 为1 调用wx.login方法 拿到code码  并向后台发起请求  返回status 如果status的值为1 则表示已经登录 直接跳转到 index 如果status的值为0 则表示司机为登录 跳转到登录页面
          //允许授权
          hsetStorage('isAuth', 1)
          // 发送请求 wx.login 返回code码
          let _code = await hlogin();
          console.log(_code.code);
          //code发送请求到后台 返回 token 和state
          let _result = await hrequestPost(getOpenId + '?code=' + _code.code, {})
          console.log(_result);
          if(_result.state == 0){
            // 状态为0 未登录，跳转到 登录界面
            hsetStorage('isLogin',0)
            hnavigateTo('/pages/login/login', "redirect")
          }else {
            // 状态为 1 已经登录，跳转到 主界面
            hsetStorage('isLogin',1)
            hnavigateTo('/pages/index/index', "redirect")
          }
          //openId username password 发送给登录接口 返回登录状态

          if (hgetStorage('isLogin') && hgetStorage('isLogin') == 1) {
            // console.log('登录成功');
            hnavigateTo('/pages/index/index', "redirect")
          } else {
            // console.log('未登录');
            hnavigateTo('/pages/login/login', "redirect")
          }
        } else {
          //未授权 则设置 isAuth未0,并跳转到授权页面
          // console.log(3);
          hsetStorage('isAuth', 0);
          hnavigateTo('/pages/author/author', "redirect")
        }
      }
    })
    //自定义导航 适配
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        //导航高度
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    
  }
})