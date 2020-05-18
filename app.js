//app.js
import {
  hsetStorage,
  hnavigateTo,
  hgetStorage
} from './static/htools.wx'
import {hlogin,hgetUserInfo,hrequestGet} from './static/hunit.wx'
import api from './assets/api'
const {
  getStatus
} = api
App({
   onLaunch() {
    wx.getSetting({
      async success(res) {
        //判断是否授权
        if (Object.keys(res.authSetting).length != 0) {
          // 如果授权则在本地存储isAuth 为1 调用wx.login方法 拿到code码  并向后台发起请求  返回status 如果status的值为1 则表示已经登录 直接跳转到 index 如果status的值为0 则表示司机为登录 跳转到登录页面
          hsetStorage('isAuth', 1)
          let _code = await hlogin()
          let _res = await hgetUserInfo()
          // console.log(_res.rawData);
          
          let _status = 1;
          if (_status == 1){
            hsetStorage('isLogin',1)
          }else{
            hsetStorage('isLogin',0)
          }
          if (hgetStorage('isLogin') && hgetStorage('isLogin') == 1) {
            console.log(1);
            
            // console.log('登录成功');
            hnavigateTo('/pages/index/index')
          } else {
            console.log(2);
            
            // console.log('未登录');
             hnavigateTo('/pages/login/login')
          }
        } else {
          //未授权 则设置 isAuth未0,并跳转到授权页面
          console.log(3);
          hsetStorage('isAuth', 0);
          hnavigateTo('/pages/author/author')
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})