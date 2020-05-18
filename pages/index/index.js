//index.js
//获取应用实例
const app = getApp()
import {
  hrequestGet
} from '../../static/hunit.wx'
import api from '../../assets/api'
const {
  getDriver
} = api
Page({
  data: {
    driverDetails: {},
    isOrder:false,
    isCar:false
  },
  // 获取数据信息
  async getDriverInfo() {
    let _res = await hrequestGet(getDriver)
    console.log(_res);
    // 判断是否有order信息
    if(Object.keys(_res.order).length !== 0){
      this.setData({
        isOrder:true
      })
    }else {
      this.setData({
        isOrder:false
      })
    }
    // 判断是否有car信息
    if(Object.keys(_res.car).length !== 0){
      this.setData({
        isCar:true
      })
    }else {
      this.setData({
        isCar:false
      })
    }

    //设置详细信息
    this.setData({
      driverDetails: _res
    })
  },
  // 扫码操作
  handleScan() {
    wx.scanCode({
      success (res) {
        console.log(res)
      }
    })
  },
  onLoad() {
    this.getDriverInfo()
  }
})