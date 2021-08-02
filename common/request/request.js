import userInfo from '../store/userinfo.js'
import cfg from '../data/config.js'
import user from '../func/user.js'

const request = function(url, method='GET', params=null, json=null, showToast=true, tipRef=null){
	console.log(url)
	// url = cfg.baseurl + url
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
			url: cfg.baseurl + url,
			data: (method == 'POST') ? json : params,
			header: header,
			method: method,
			success: (res) => {
				if(res.data.status == 200){
					resolve(res.data.data)
				}else if(res.data.status == 1001 || res.data.status == 1101){
					user.initialize().then(data => {
						request(url, method, params, json, showToast, tipRef).then(data => {
							resolve(data)
						}).catch(err => {
							reject(err)
						})
					}).catch(err => {
						if(err == 'password_error'){
							this.$refs.uTips.show({
								title: '密码错误',
								type: 'error'
							})
							uni.reLaunch({
								url: '/pages/user/login'
							})
						}
						reject(err)
					})
				}else{
					if(showToast)
						if(tipRef)
							tipRef.show({
								title: res.data.error + '(' + res.data.status + ')'
							})
						else
							uni.showToast({
								title: res.data.error + '(' + res.data.status + ')',
								icon: 'none'
							})
					reject(res.data)
				}
			},
			fail: (err) => {
				if(showToast)
					if(tipRef)
						tipRef.show({
							title: err.error + '(' + err.status + ')'
						})
					else
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