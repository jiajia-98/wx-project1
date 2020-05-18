// 设置本地存储数据
export const hsetStorage = (key, value) => {
	if (value == undefined || value == null) {
		console.warn("value值不能为undefined或者null");
		return false;
	}
	let _value = "";
	switch (typeof value) {
		case "number":
			_value = value;
			break;
		case "string":
			_value = value;
			break;
		case "object":
			_value = JSON.stringify(value);
			break;
	}
	wx.setStorageSync(key, _value)
}
// 读取本地存储数据
export const hgetStorage = (key) => {
	let _value = wx.getStorageSync(key);
	try {
		let _newValue = JSON.parse(_value);
		return _newValue;
	} catch (error) {
		return _value
	}
}
// 移除本地存储数据
export const hremoveStorage = (key) => {
	wx.removeStorageSync(key)
}
// 移除本地所有存储数据
export const hclearStorage = () => {
	wx.clearStorageSync();
}
// 设置角标
export const hsetTabBarBadge = (index, content) => {
	wx.setTabBarBadge({
        index: index,
        text: content
    })
}
// 移除角标
export const hremoveTabBarBadge = (index) => {
    wx.removeTabBarBadge({
        index: index
    })
}
// 页面跳转
export const hnavigateTo = (url, type) => {
    switch (type) {
        case "tab":
            wx.switchTab({
                url: url,
            })
            break;
        case "redirect":
            wx.redirectTo({
                url: url,
            })
            break;
        default:
            wx.navigateTo({
                url: url,
            })
            break;
    }
}
// 页面回退
export const hnavigateBack = (num) => {
    wx.navigateBack({
        delta: num
    })
}
// 显示loading
export const hshowLoading = (title="加载中") => {
    return new Promise( (resolve, reject)=>{
        wx.showLoading({
            title: title,
            mask: true,
            success: function (res) { 
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            },
            complete: function (res) { },
        })
    } )
}
// 隐藏loading
export const hhideLoading = ()=>{
    wx.hideLoading();
}
// 显示 toast
export const hshowToast = (content="操作成功", duration=1500, icon="none", image="") => {
    return new Promise( (resolve, reject)=>{
        wx.showToast({
            title: content,
            icon: icon,
            image: image,
            duration: duration,
            mask: true,
            success: function (res) { 
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            },
            complete: function (res) { },
        })
    } )
}
// 显示 modal
export const hshowModal = (title, content) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: title || '',
            content: content || '',
            showCancel:true,
            confirmColor:"#f6d201",
            success:function(res){
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            },
            complete: function (res) { }
        })
    })
}
/* 
 * @Author: huhulove
 * @Date: 2019-10-21 14:05:53
 * @Email: 2373838484@qq.com
 * @Description: 微信列表中更多数据通用方法   0 => 没有更多数据   1  => 有更多数据   -1  =>  下拉刷新操作或者页面初始化操作
*/
export const hmoreData = (page, oldData, data, isDefaultTip = true, defaultTip = "没有更多数据") => {
	if (page == 1) {
		return {
			isHasMore: -1,
			hdata: data
		};
	}
	if (page > 1) {
		if (!data.length) {
			isDefaultTip && hshowToast(defaultTip)
			return {
				isHasMore: 0,
				hdata: oldData
			};
		}
		let _newData = oldData.concat(data);
		return {
			isHasMore: 1,
			hdata: _newData
		}
	}
}
//一键复制  复制到剪切板
export const hsetClipboard = (str)=>{
    return new Promise( (resolve, reject)=>{
        wx.setClipboardData({
            data : ""+str,
            success (res){
                resolve(res)
            },
            fail (res){
                reject(res)
            }
        })
    } )
}