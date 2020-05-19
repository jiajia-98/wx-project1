//app.js
import {
  hsetStorage,
  hgetStorage,
  hnavigateTo
} from './static/htools.wx'
import {
  hlogin,
  hgetUserInfo,
  hrequestGet,
  hrequestPost
} from './static/hunit.wx'
import api from './assets/api'
const {
  getStatus,
  authorLogin
} = api
App({
  async onLaunch() {
    // let _code = await hlogin()
    // console.log(_code);
    // let _openId = await hrequestPost(authorLogin + '?code=' + _code.code, {})
    // console.log(_openId);
    wx.getSetting({
      async success(res) {
        //判断是否授权
        if (Object.keys(res.authSetting).length != 0) {
          // 如果授权则在本地存储isAuth 为1 调用wx.login方法 拿到code码  并向后台发起请求  返回status 如果status的值为1 则表示已经登录 直接跳转到 index 如果status的值为0 则表示司机为登录 跳转到登录页面
          hsetStorage('isAuth', 1)
          let _code = await hlogin()
          console.log(_code);
          hsetStorage('code', _code.code)

          let _status = 1;
          if (_status == 1) {
            hsetStorage('isLogin', 1)
          } else {
            hsetStorage('isLogin', 0)
          }
          if (hgetStorage('isLogin') && hgetStorage('isLogin') == 1) {
            // console.log(1);
            // console.log('登录成功');
            hnavigateTo('/pages/index/index', "redirect")
          } else {
            // console.log(2);
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