import request from '../request/request.js'

const eduadmin = {
	login(){
		request('/eduadmin/login')
	}
}
export default eduadmin