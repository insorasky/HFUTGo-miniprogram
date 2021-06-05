const config = {
	baseurl: process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:8000' : 'https://hfut-new.heppy.wang',
	defaultSemester: '134',
	theme_color: '#4da0e0',
	background_color: '#F7F7F7',
	rand_color: [
		'#AFEEEE',
		'#DBF1E1',
		'#FAB6B6',
		'#71D5A1',
		'#FAFAD2',
		'#DDA0DD',
		'#7FFFAA',
		'#F0E68C',
	],
	default_color: '#C0C0C0'
}
export default config