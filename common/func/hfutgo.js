import config from '../data/config.js'

const go = {
	randColor(){
		let max = config.rand_color.length
		parseInt(Math.random()*(max+1),10)
		return config.rand_color[Math.floor(Math.random()*(max+1))]
	},
	djb2(str){
	  var hash = 5381;
	  for (var i = 0; i < str.length; i++) {
	    hash = ((hash << 5) + hash) + str.charCodeAt(i);
	  }
	  return hash;
	},
	hashColor(str){
	  var hash, r, g, b;
	  do{
	  	str = str + "sora";
	    hash = this.djb2(str);
	    r = (hash & 0xFF0000) >> 16;
	    g = (hash & 0x00FF00) >> 8;
	    b = hash & 0x0000FF;
	  }while(r * 0.299 + g * 0.587 + b * 0.114 < 200);
	  return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
	}
}

export default go