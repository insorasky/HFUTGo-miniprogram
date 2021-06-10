import request from '../request/request.js'
import config from '../data/config.js'

const schedule = {
	getSemesters(){
		return request('/eduadmin/schedule/semesters')
	},
	getAll(semester = null, showToast = false, cache = false){
		return new Promise((resolve, reject) => {
			semester = semester || config.defaultSemester
			if(cache){
				console.log('cache')
				let data = uni.getStorageSync('schedule_cache')
				if(data) resolve(data)
				else reject("No cache")
			}else{
				request('/eduadmin/schedule/schedules', 'GET', {
					'sid': semester
				}, null, showToast).then(data => {
					uni.setStorageSync('schedule_cache', data)
					resolve(data)
				}).catch(err => {
					reject(err)
				})
			}
		})
	},
	getWeek(semester = null, week = null, cache = false){
		return new Promise((resolve, reject) => {
			var result = []
			semester = semester || config.defaultSemester
			this.getAll(semester, false, cache).then(data => {
				console.log(data)
				week = week || data.current_week
				data.lessons.forEach((item, index, err) => {
					for(const i of item.schedules){
						if(i.weeks.includes(week)){
							result.push(item)
							break
						}
					}
				})
				console.log(result)
				resolve(result)
			}).catch(err => {
				reject(err)
			})
		})
	},
	getDay(semester = null, week = null, day = null, showToast = false, cache = false){
		return new Promise((resolve, reject) => {
			var result = []
			semester = semester || config.defaultSemester
			day = day || new Date().getDay()
			this.getAll(semester, showToast, cache).then(data => {
				week = week || data.current_week
				for(const item of data.lessons){
					for(const i of item.schedules){
						if(i.day == day){
							if(i.weeks.includes(week)){
								result.push(item)
								break
							}
						}
					}
				}
				resolve(result)
			})
		}).catch(err => {
			reject(err)
		})
	}
}

export default schedule