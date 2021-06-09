import request from '../request/request.js'
import config from '../data/config.js'

const schedule = {
	getSemesters(){
		return request('/eduadmin/schedule/semesters')
	},
	getAll(semester = null, showToast = false){
		semester = semester || config.defaultSemester
		return request('/eduadmin/schedule/schedules', 'GET', {
			'sid': semester
		}, null, showToast)
	},
	getWeek(semester = null, week = null){
		return new Promise((resolve, reject) => {
			var result = []
			semester = semester || config.defaultSemester
			this.getAll(semester).then(data => {
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
	getDay(semester = null, week = null, day = null, showToast = false){
		return new Promise((resolve, reject) => {
			var result = []
			semester = semester || config.defaultSemester
			day = day || new Date().getDay()
			this.getAll(semester, showToast).then(data => {
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