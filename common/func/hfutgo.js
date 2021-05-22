import config from '../data/config.js'

const go = {
	randColor(){
		let max = config.rand_color.length
		parseInt(Math.random()*(max+1),10)
		return config.rand_color[Math.floor(Math.random()*(max+1))]
	}
}

export default go