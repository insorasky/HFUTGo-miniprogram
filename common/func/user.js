import userInfo from '../store/userinfo.js'
import request from '../request/request.js'
import eduadmin from './eduadmin.js'

const user = {
	login: function(id, password, showToast=false){
		return new Promise((resolve, reject) => {
			uni.showNavigationBarLoading()
			request('/user/login', 'GET', {
				'id': id,
				'password': password
			}, null, true).then(data => {
				uni.hideNavigationBarLoading()
				if(data){
					userInfo.state.userInfo.hasLogin = true
					userInfo.state.userInfo.name = data.name
					userInfo.state.userInfo.id = id
					userInfo.state.userInfo.password = password
					userInfo.state.userInfo.className = data.class_name
					userInfo.state.userInfo.ticket = data.ticket
					userInfo.state.userInfo.at = data.at_token
					userInfo.state.userInfo.token = data.token
					uni.setStorageSync('userInfo', userInfo.state.userInfo)
					resolve(data)
				}else{
					reject(data)
				}
			}).catch(err => {
				uni.hideNavigationBarLoading()
				reject(err)
			})
		})
	},
	initialize(){
		return new Promise((resolve, reject) => {
			console.log('initialize')
			let info = uni.getStorageSync('userInfo')
			if(info){
				if(info.id == ""){
					reject('not_login')
				}
				info.hasLogin = false
				userInfo.commit('setAll', info)
				// 重新登录
				this.login(info.id, info.password).then(data => {
					resolve('登陆成功')
				}).catch(err => {
					if(err.status == 3303){
						resolve('password_wrong')
					}
				})
			}else{
				reject('not_login')
			}
		})
	},
	logout(){
		// request('/user/logout').then(data => {
			userInfo.state.userInfo = {
				hasLogin: false, //是否已登录
				name: null, //姓名
				id: null, //学工号
				password: null, //密码
				className: null, //班级
				ticket: null, //VPN登录凭据
				at: null, //信息门户at凭据
				token: null, //小程序后台登录凭据
			}
			uni.setStorageSync('userInfo', 0)
			uni.reLaunch({
				url: '/pages/user/login.vue'
			})
		// })
		
	},
	getUserInfo(){
		return userInfo.state.userInfo
	},
	reset(){
		userInfo.commit('reset', {})
	}
}

export default user