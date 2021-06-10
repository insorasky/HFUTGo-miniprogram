<template name="today">
	<view>
		<s-notice page="home" />
		<view>
			<view class="link">
				<u-grid col="4" :border="false">
					<u-grid-item>
						<u-icon name="rmb-circle" :label="balance" label-pos="bottom" size="80" label-size="30" @click="navigate('others/card')"></u-icon>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="email" :label="unread_email + '封未读'" label-pos="bottom" size="80" label-size="30"></u-icon>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="bookmark" :label="borrow_books + '本待还'" label-pos="bottom" size="80" label-size="30" @click="navigate('library/mybooks')"></u-icon>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="bookmark" :label="subscribe_books + '本预约'" label-pos="bottom" size="80" label-size="30"></u-icon>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="schedule">
				<view class="title" style="padding-left: 30rpx; padding-top: 20rpx;">
					<text>今日课程</text>
				</view>
				<view class="schedule_body">
					<view class="schedule_item" :style="{backgroundColor: lessons[0].color}">
						<u-row>
							<u-col span="1">
								<text style="font-size: 40rpx;">1</text>
							</u-col>
							<u-col span="11">
								<text style="font-size: 35rpx;">{{lessons[0].name}}</text><br />
								<text>{{lessons[0].room}}</text>
							</u-col>
						</u-row>
					</view>
					<view class="schedule_item" :style="{backgroundColor: lessons[1].color}">
						<u-row>
							<u-col span="1">
								<text style="font-size: 40rpx;">2</text>
							</u-col>
							<u-col span="11">
								<text style="font-size: 35rpx;">{{lessons[1].name}}</text><br />
								<text>{{lessons[1].room}}</text>
							</u-col>
						</u-row>
					</view>
					<view class="schedule_item" :style="{backgroundColor: lessons[2].color}">
						<u-row>
							<u-col span="1">
								<text style="font-size: 40rpx;">3</text>
							</u-col>
							<u-col span="11">
								<text style="font-size: 35rpx;">{{lessons[2].name}}</text><br />
								<text>{{lessons[2].room}}</text>
							</u-col>
						</u-row>
					</view>
					<view class="schedule_item" :style="{backgroundColor: lessons[3].color}">
						<u-row>
							<u-col span="1">
								<text style="font-size: 40rpx;">4</text>
							</u-col>
							<u-col span="11">
								<text style="font-size: 35rpx;">{{lessons[3].name}}</text><br />
								<text>{{lessons[3].room}}</text>
							</u-col>
						</u-row>
					</view>
					<view class="schedule_item" :style="{backgroundColor: lessons[4].color}">
						<u-row>
							<u-col span="1">
								<text style="font-size: 40rpx;">5</text>
							</u-col>
							<u-col span="11">
								<text style="font-size: 35rpx;">{{lessons[4].name}}</text><br />
								<text>{{lessons[4].room}}</text>
							</u-col>
						</u-row>
					</view>
				</view>
			</view>
			
			<view class="secondclass" v-if="false">
				<view class="title">
					<text>第二课堂</text>
				</view>
				<s-list :border="false" :empty="scProjects.length == 0">
					<u-cell-item v-for="(project, i) in scProjects" :title="project.name" :label="project.organizer" @click="" :border-bottom="false" :key="i"></u-cell-item>
				</s-list>
			</view>
			<view class="news" v-if="false">
				<view class="title">
					<text>校园要闻</text>
				</view>
				<s-list :border="false">
					<u-cell-item title="合肥工业大学关于与中国科学技术大学合并的通知" :border-bottom="false"></u-cell-item>
					<u-cell-item title="两校合并,你需要知道些什么？" :border-bottom="false"></u-cell-item>
					<u-cell-item title="中科大和合工大合并" :border-bottom="false"></u-cell-item>
					<u-cell-item title="教务系统切换通知" :border-bottom="false"></u-cell-item>
				</s-list>
			</view>
			
		</view>
	</view>
</template>

<script>
	import sNotice from '../../components/s-notice/s-notice.vue'
	import uLoading from '../../uview-ui/components/u-loading/u-loading.vue'
	import schedule from '../../common/func/schedule.js'
	export default {
		name: 'today',
		components:{
			sNotice,
			uLoading
		},
		data() {
			return {
				balance: '',
				subscribe_books: 0,
				borrow_books: 0,
				unread_email: 0,
				lessons: [
					{
						color: this.$cfg.default_color,
						name: '',
						room: ''
					},
					{
						color: this.$cfg.default_color,
						name: '',
						room: ''
					},
					{
						color: this.$cfg.default_color,
						name: '',
						room: ''
					},
					{
						color: this.$cfg.default_color,
						name: '',
						room: ''
					},
					{
						color: this.$cfg.default_color,
						name: '',
						room: ''
					}
				],
				scProjects: [],
				stopLoading: 0
			};
		},
		beforeCreate() {
			let that = this
			this.$emit('input', true)
			uni.showLoading({
				title: '登录中',
				icon: 'none'
			})
			this.$user.initialize().then(data => {
				console.log("initialized")
				uni.hideLoading()
				this.initSchedule(true)
				this.$request('/user/today_page/balance', null, null, false).then(data => {
					this.balance = data.balance
					this.stopLoading++;
				})
				this.$request('/user/today_page/borrow', null, null, false).then(data => {
					this.borrow_books = data.borrow_books
					this.stopLoading++;
				})
				this.$request('/user/today_page/subscribe', null, null, false).then(data => {
					this.subscribe_books = data.subscribe_books
					this.stopLoading++;
				})
				this.$request('/user/today_page/email', null, null, false).then(data => {
					this.unread_email = data.unread_email
					this.stopLoading++;
				})
				this.$request('/eduadmin/login', 'GET', null, null, false).then(data => {
					this.initSchedule(false)
				})
				/*
				this.$request('/sc/my_projects?type=waiting').then(data => {
					this.scProjects = data
				})*/
			}).catch(err => {
				console.log(err)
				if(err == 'password_error')
					uni.showToast({
						title: '密码错误',
						icon: 'none'
					})
				uni.reLaunch({
					url: '/pages/user/login'
				})
			})
		},
		methods: {
			navigate(path){
				uni.navigateTo({
					url: '/pages/' + path
				})
			},
			initSchedule(cache){
				let day = new Date().getDay()
				schedule.getDay(null, null, null, false, cache).then(data => {
					for(const item of data){
						for(const i of item.schedules){
							for(const n of [...new Array(5).keys()]){
								if(i.day == day && (i['class'].includes(2 * n + 1) || i['class'].includes(2 * n + 2))){
									this.lessons[n].name = item.name
									this.lessons[n].room = i.room
									if(cache) this.lessons[n].color = this.$hfutgo.randColor()
									break
								}
							}
						}
					}
					if(!cache) this.stopLoading++;
				}).catch(err => {
					console.log(err)
				})
			}
		},
		props: {
			value: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			stopLoading(newVal){
				console.log('stopLoading' + newVal)
				if(newVal == 5) this.$emit('input', false)
			}
		}
	}
</script>

<style lang="scss">
	.schedule{
		background-color: #FFFFFF;
		border-radius: 30rpx;
		margin-bottom: 20rpx;
		padding: 1rpx;
	}
	.schedule_body{
		padding: 15rpx
	}
	.secondclass{
		background-color: #FFFFFF;
		border-radius: 30rpx;
		padding: 15rpx;
		margin-bottom: 20rpx;
	}
	.link{
		background-color: #FFFFFF;
		border-radius: 30rpx;
		padding: 10rpx;
		margin-bottom: 20rpx;
		margin-top: 30rpx;
	}
	.schedule_item{
		background-color: #71D5A1;
		border-radius: 15rpx;
		margin: 20rpx;
		padding-left: 20rpx;
		padding-right: 15rpx;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		height: 140rpx;
	}
	.title{
		padding-top: 10rpx;
		padding-left: 20rpx;
		font-size: 35rpx;
		color: #555555
	}
	.news{
		background-color: #FFFFFF;
		border-radius: 30rpx;
		padding: 15rpx;
	}
</style>
