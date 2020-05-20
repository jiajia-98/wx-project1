const baseUrl = "http://192.168.31.254:9637"; // 账户 闫
const baseUrl2 = "http://192.168.31.57:9637"; // 账户 闫

export default {
    getOpenId:baseUrl2+'/api/miniAppLog/openid',
    authorLogin:baseUrl2+'/api/miniAppLog/login',
    getDriver:baseUrl+'/api/miniApp/getDriverInfo',
    getStatus:baseUrl+'/api/'
}