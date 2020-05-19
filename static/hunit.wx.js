// 请求基本函数
const request = (url, method, data, completeFn, headerData) => {
	return new Promise((resolve, reject) => {
		let _data = {
			...headerData,
			Authorization:wx.getStorageSync('token')
		}
		wx.request({
			url: url,
			method: method,
			data: data,
			header: _data,
			success: (res) => {			
				//返回数据拦截后可以进行统一处理
				if (res.statusCode == 200) {     // 成功
					resolve(res.data);
				}
				if (res.statusCode == 500) {       // 
					reject(res.statusCode);
				}
			},
			fail: (res) => {
				reject(res);
			},
			complete: () => {
				completeFn && completeFn();
			}
		})
	})
}
// post 请求
export const hrequestPost = (url, data, completeFn, headerData = {}) => {
	return request(url, "post", data, completeFn, headerData)
}
// get 请求
export const hrequestGet = (url, data, completeFn, headerData = {}) => {
	return request(url, "get", data, completeFn, headerData)
}
// form 请求
export const hrequestForm = (url, data, completeFn, headerData = { 'content-type': "application/x-www-form-urlencoded" }) => {
	return request(url, "post", data, completeFn, headerData)
}
// 上传文件
export const huploadFile = (upload, tempFilePath, name = "files", completeFn, headerData = {}, formData = {}) => {
	let _newHeaderData = {
		...headerData,
		UserKey: wx.getStorageSync("userKey")
	}
	return new Promise((resolve, reject) => {
		wx.uploadFile({
			url: upload,
			filePath: tempFilePath,
			name: name,
			header: _newHeaderData,
			formData: formData,
			success: function (res) {
				let _data = JSON.parse(res.data);
				if (_data.Code == 200) {       // 成功
					resolve(_data.Result);
				}
				if (_data.Code == 100) {       // 
					reject(_data.Message);
				}
				if (_data.Code == 500) {       // 服务报错
					reject("请检查网络连接!")
				}
			},
			fail: function (res) {
				reject(res)
			},
			complete: function () {
				completeFn && completeFn()
			}
		})
	})
}
// 聊天窗口选择文件
export const hchooseMessageFile = (count = 1, type = "file") => {
	return new Promise((resolve, reject) => {
		wx.chooseMessageFile({
			count: count,
			type: type,
			success: function (res) {
				resolve(res)
			},
			fail: function (res) {
				reject(res)
			}
		});
	});
}
// 选择图片
export const hchooseImg = (count = 1, sizType = ["compressed"], sourceType) => {
	return new Promise((resolve, reject) => {
		wx.chooseImage({
			count: count,
			sizeType: sizType,
			sourceType: sourceType || ['album', 'camera'],
			success: function (res) {
				resolve(res)
			},
			fail: function (res) {
				reject(res)
			}
		})
	})
}
// 授权信息
export const hauthorize = (name) => {
	return new Promise((resolve, reject) => {
		let authName = `scope.${name}`;
		wx.getSetting({
			success(res) {
				if (res.authSetting[authName]) {
					resolve(true)
				} else {
					resolve(false)
				}
			},
			fail(res) {
				reject(res)
			}
		})
	})
}
//微信登录
export const hlogin = () => {
	return new Promise((resolve, reject) => {
		wx.login({
			success(res) {
				resolve(res);
			},
			fail(err) {
				reject(err);
			}
		})
	})
}

//获取用户信息
export const hgetUserInfo = () => {
	return new Promise((resolve, reject) => {
		wx.getUserInfo({
			success: (res) => {
				resolve(res);
			},
			fail: (res) => {
				reject(res);
			}
		})
	})
}
//版本更新
export const hupdateVersion = () => {
	let that = this
	// 获取小程序更新机制兼容
	if (wx.canIUse('getUpdateManager')) {
		const updateManager = wx.getUpdateManager()
		//检查小程序是否有新版本发布
		updateManager.onCheckForUpdate((res) => {
			// 请求完新版本信息的回调
			if (res.hasUpdate) {
				//检测到新版本，需要更新，给出提示
				wx.showModal({
					title: '更新提示',
					content: '检测到新版本，是否重启小程序？',
					showCancel: false,
					confirmColor: "#f6d201",
					success: function (res) {
						if (res.confirm) {
							//用户确定下载更新小程序，小程序下载及更新静默进行
							hdownloadUpdate(updateManager)
						}
					}
				})
			}
		})
	}
}

/*下载小程序新版本并重新启用*/
export const hdownloadUpdate = (data) => {
	let that = this
	wx.showLoading()
	//静默下载更新小程序新版本
	data.onUpdateReady((res) => {
		wx.hideLoading()
		//新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		data.applyUpdate()
	})
	data.onUpdateFailed(() => {
		wx.hideLoading()
		// 新的版本下载失败
		wx.showModal({
			title: '已经有新版本了哟',
			content: '已经有新版本了，请您删除当前小程序，重新搜索打开',
			showCancel: false,
			confirmColor: "#f6d201",
		})
	})
}

