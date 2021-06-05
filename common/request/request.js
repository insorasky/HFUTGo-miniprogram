import userInfo from '../store/userinfo.js'
import cfg from '../data/config.js'

const request = function(url, method='GET', showToast=true, params=null, json=null){
	console.log(url)
	url = cfg.baseurl + url
	let header = {}
	if(userInfo.state.userInfo.token){
		header = {
			'token': userInfo.state.userInfo.token
		}
	}
	if(json) header['Content-Type'] = 'application/json'
	if(showToast)
		uni.showLoading({
			title: '加载中',
			mask: true,
		})
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: (method == 'POST') ? json : params,
			header: header,
			method: method,
			success: (res) => {
				if(res.data.status == 200){
					resolve(res.data.data)
				}else{
					if(showToast)
						uni.showToast({
							title: res.data.error + '(' + res.data.status + ')',
							icon: 'none'
						})
					reject(res.data)
				}
			},
			fail: (err) => {
				if(showToast)
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				reject(err)
			},
			complete: () => {
				if(showToast)
					uni.hideLoading()
			}
		})
	})
}

export default request