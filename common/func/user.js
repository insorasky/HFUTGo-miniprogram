import userInfo from '../store/userinfo.js'
import request from '../request/request.js'

const user = {
	login: function(id, password){
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
			}
		})
		
	},
	initialize(){
		let info = uni.getStorageSync('userInfo')
		if(info){
			if(info.id == ""){
				uni.redirectTo({
					url: 'pages/eduadmin/login'
				})
				return false
			}
			info.hasLogin = false
			userInfo.commit('setAll', info)
			// 重新登录
			this.login(info.id, info.password)
			if(!userInfo.state.hasLogin){
				return false
			}
		}else{
			uni.redirectTo({
				url: 'pages/eduadmin/login'
			})
			return false
		}
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