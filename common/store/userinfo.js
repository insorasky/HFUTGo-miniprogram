import Vue from 'vue'
import Vuex from 'vuex'
import request from '../request/request.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {
			hasLogin: false, //是否已登录
			name: null, //姓名
			id: null, //学工号
			password: null, //密码
			className: null, //班级
			ticket: null, //VPN登录凭据
			at: null, //信息门户at凭据
			token: null, //小程序后台登录凭据
		}
	},
	mutations: {
		setAll(state, payload){
			state.userInfo = payload
			uni.setStorageSync('userInfo', state.userInfo)
		},
		setToken(state, payload){
			state.userInfo.ticket = payload.ticket
			state.userInfo.at = payload.at
			state.userInfo.token = payload.token
			uni.setStorageSync('userInfo', state.userInfo)
		},
		reset(state, payload){
			state.userInfo = {
				hasLogin: false, //是否已登录
				name: null, //姓名
				id: null, //学工号
				password: null, //密码
				className: null, //班级
				ticket: null, //VPN登录凭据
				at: null, //信息门户at凭据
				token: null, //小程序后台登录凭据
			}
		}
	}
})

export default store