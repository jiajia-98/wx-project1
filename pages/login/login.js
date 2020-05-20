// pages/login/login.js
let app = getApp()
import {
  hsetStorage,
  hgetStorage,
  hnavigateTo
} from '../../static/htools.wx'
import {
  hrequestPost
} from '../../static/hunit.wx'
import api from '../../assets/api'
const {
  authorLogin
} = api
Page({
  data: {
    username: '',
    password: ''
  },
  onLoad: function (options) {
    
  },
  // 点击登录按钮登录
  async login() {
    let _username = this.data.username
    let _password = this.data.password
    // 向后台发起post 请求，将openid username 和 password传递进去
    let _status = await hrequestPost(authorLogin + '?openid='+_openId+'&password='+_password+'&username='+_password,{})
    if (_status == 1) {
      hsetStorage('isLogin', 1)
      hnavigateTo('/pages/index/index', "redirect")
    } else {
      hsetStorage('isLogin', 0)
      hnavigateTo('/pages/login/login', "redirect")
    }
  },
  // 双向绑定用户名
  bindUsername(e) {
    this.setData({
      username: e.detail.value
    });
  },
  // 双向绑定密码
  bindPassword(e) {
    this.setData({
      password: e.detail.value
    });
  }
})