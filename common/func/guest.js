import userInfo from '../store/userinfo.js'
import request from '../request/request.js'

const guest = {
	login: function(){
		return new Promise((resolve, reject) => {
			uni.login({
				provider: 'weixin',
				success(res) {
					request('/user/guest/login', 'GET', {
						code: res.code
					}).then(data => {
						userInfo.state.userInfo.token = data.token
						userInfo.state.userInfo.type = 2
						resolve(data)
					}).catch(err => {
						console.log(err)
						reject(err)
					})
				},
				fail(res) {
					reject('user_rejected')
				}
			})
		})
	}
}

export default guest