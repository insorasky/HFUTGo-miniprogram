import userInfo from '../store/userinfo.js'
import request from '../request/request.js'
import eduadmin from './eduadmin.js'

const user = {
	login: function(id, password){
		return new Promise((resolve, reject) => {
			request('/user/login', 'GET', {
				'id': id,
				'password': password
			}).then(data => {
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
				reject(err)
			})
		})
	},
	initialize(){
		return new Promise((resolve, reject) => {
			let info = uni.getStorageSync('userInfo')
			if(info){
				if(info.id == ""){
					uni.reLaunch({
						url: '/pages/user/login'
					})
					reject('未登录')
				}
				info.hasLogin = false
				userInfo.commit('setAll', info)
				// 重新登录
				this.login(info.id, info.password).then(data => {
					resolve('登陆成功')
				}).catch(err => {
					if(err.status == 3303){
						uni.showToast({
							icon: 'none',
							title: '密码错误！'
						})
						uni.reLaunch({
							url: '/pages/user/login'
						})
						resolve('密码错误')
					}
				})
			}else{
				uni.reLaunch({
					url: '/pages/user/login'
				})
				resolve('未登录')
			}
		})
	},
	logout(){
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
		uni.removeStorageSync('userInfo')
	},
	getUserInfo(){
		return userInfo.state.userInfo
	},
	isLogin(){
		
	},
}

export default user