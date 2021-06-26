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
	},
	getExam(showToast = false, cache = false){
		let reg = /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})~(\d{2}:\d{2})/i
		let lessontime = [
			{ start: Date.parse('2002-01-01 08:10'), end: Date.parse('2002-01-01 10:00') },
			{ start: Date.parse('2002-01-01 10:20'), end: Date.parse('2002-01-01 12:10') },
			{ start: Date.parse('2002-01-01 14:00'), end: Date.parse('2002-01-01 15:50') },
			{ start: Date.parse('2002-01-01 16:00'), end: Date.parse('2002-01-01 17:50') },
			{ start: Date.parse('2002-01-01 19:00'), end: Date.parse('2002-01-01 21:50') },
		]
		return new Promise((resolve, reject) => {
			request('/eduadmin/exams').then(data => {
				let result = data
				result.forEach((item, index, arr) => {
					time = item.time.match(reg)
					result[index].date = time[1]
					result[index].start = time[2]
					result[index].end = time[3]
					result[index].lessons = []
					let start = Date.parse(`2002-01-01 ${time[1]}`)
					let end = Date.parse(`2002-01-01 ${time[2]}`)
					lessontime.forEach((item, i, arr) => {
						if(item.start >= start && item.start < end)
							result[index].lessons.push(i + 1)
					})
				})
				resolve(result)
			}).catch(err => {
				reject(err)
			})
		})
	}
}

export default schedule