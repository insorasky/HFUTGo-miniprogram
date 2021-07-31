<template>
	<view class="body">
		<u-top-tips refs="uTips"></u-top-tips>
		<u-navbar title="" :show-title="false" :background="{backgroundColor: '#4da0e0'}" back-icon-color="#FFFFFF">
			<view
				class="selector"
				@click="selectorClick"
			>
				<u-icon name="calendar" class="selector-icon" size="30"></u-icon>
				<view class="selector-text">
					<text>第{{currentWeek[1] + 1}}周</text>
				</view>
				<u-icon name="arrow-down-fill" class="selector-icon2" size="30"></u-icon>
				<u-select v-model="showSelector" mode="multi-column" :list="list" @confirm="selectWeek" :default-value="currentWeek"></u-select>
			</view>
		</u-navbar>
		<uni-fab
			horizontal="right"
			:popMenu="false"
			@fabClick="nextWeek"
		>
			<u-icon name="arrow-rightward" color="white" size="64"></u-icon>
		</uni-fab>
		<uni-fab
			horizontal="left"
			:popMenu="false"
			@fabClick="previousWeek"
		>
			<u-icon name="arrow-leftward" color="white" size="64"></u-icon>
		</uni-fab>
		<view class="content">
			<scroll-view>
				<view class="table-main">
					<view class="table-row">
						<view class="table-title table-title-nonlast">
							
						</view>
						<view class="table-item-number">
							<view>
								<view class="lessonnumber">
									<text>1</text>
								</view>
								<view class="lessonnumber">
									<text>2</text>
								</view>
							</view>
						</view>
						<view class="table-item-number">
							<view>
								<view class="lessonnumber">
									<text>3</text>
								</view>
								<view class="lessonnumber">
									<text>4</text>
								</view>
							</view>
						</view>
						<view class="table-item-number">
							<view>
								<view class="lessonnumber">
									<text>5</text>
								</view>
								<view class="lessonnumber">
									<text>6</text>
								</view>
							</view>
						</view>
						<view class="table-item-number">
							<view>
								<view class="lessonnumber">
									<text>7</text>
								</view>
								<view class="lessonnumber">
									<text>8</text>
								</view>
							</view>
						</view>
						<view class="table-item-number">
							<view>
								<view class="lessonnumber911">
									<text>9</text>
								</view>
								<view class="lessonnumber911">
									<text>10</text>
								</view>
								<view class="lessonnumber911">
									<text>11</text>
								</view>
							</view>
						</view>
					</view>
					<view v-for="(day, i) in content" class="table-row">
						<view class="table-title table-title-nonlast">
							<view class="dayname">
								<text>{{day.num}}</text>
							</view>
							<view class="date">
								<text>{{day.date}}</text>
							</view>
						</view>
						<view v-for="(lesson, i) in day.lessons" class="table-border">
							<view
								class="table-item"
								:style="{
									backgroundColor: $hfutgo.hashColor(lesson.name)
								}"
								@click="showDetails()"
								@touchstart=""
								@touchend=""
								v-if="lesson.available"
							>
								<view>
									<view class="lessonname">
										<text>{{lesson.name}}</text>
									</view>
									<view class="lessonroom">
										<text>{{lesson.room}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom-place">
					<u-icon name="heart" label="加油！"></u-icon>
				</view>
			</scroll-view>
		</view>
		<s-popup title="课程详情" v-model="showDetail">
			<view class="lesson-details">
				<u-cell-group>
					<u-cell-item title="课程名称" value="Java技术" :arrow="false"></u-cell-item>
					<u-cell-item title="课程代码" value="0X154648-23" :arrow="false"></u-cell-item>
					<u-cell-item title="班级" value="智能科学与技术20-1班" :arrow="false"></u-cell-item>
					<u-cell-item title="课程类型" value="各专业选修课" :arrow="false"></u-cell-item>
					<u-cell-item title="教师" value="路强" :arrow="false"></u-cell-item>
					<u-button type="primary" style="margin-top: 20rpx;">查看该课程时间安排</u-button>
				</u-cell-group>
			</view>
		</s-popup>
	</view>
</template>

<script>
	import schedule from '../../common/func/schedule.js'
	export default {
		data() {
			return {
				showSelector: false,
				showPrevious: true,
				showNext: true,
				data: {},
				semesters: [],
				list: [
					[
						{ value: "154", label: '2021-2022学年第一学期' },
						{ value: "134", label: '2020-2021学年第二学期' },
						{ value: "114", label: '2020-2021学年第一学期' },
					], Array.from(Array(20), (v, k) => {
						return {value: k + 1, label: "第" + (k + 1) + "周"}
					})
				],
				content: this.generateDefaultTable(),
				default_content: Array.from(Array(7), (v, k) => {
					return {
						num: "周X",
						date: "xx.xx",
						lessons: Array.from(Array(5), (v, k) => {
							return {available: false}
						})
					}
				}),
				currentWeek: [0, 0],
				colors: {
					'高等数学': 1,
					'数据结构': 2,
					'人际交往心理学': 3,
					'Java技术': 4,
					'大学英语（2）': 5,
					'大学体育（2）': 6,
				},
				showDetail: false,
				sentence: "加油！",
				lessons: 0,
			}
		},
		methods: {
			selectorClick(){
				this.showSelector = true;
			},
			previousWeek(){
				if(this.currentWeek[1] == 0){
					uni.showToast({
						icon: 'none',
						title: '已经是第一周了！'
					})
					return
				}
				this.currentWeek[1]--
				this.goWeek(false)
			},
			nextWeek(){
				if(this.currentWeek[1] == 19){
					uni.showToast({
						icon: 'none',
						title: '已经是最后一周了！'
					})
					return
				}
				this.currentWeek[1]++
				this.goWeek(false)
			},
			showDetails(){
				this.showDetail = true
			},
			selectWeek(res){
				var refresh = false
				this.list[0].forEach((item, index, arr) => {
					if(item.value == res[0].value){
						this.currentWeek[0] = index
						refresh = true
					}
				})
				this.list[1].forEach((item, index, arr) => {
					if(item.value == res[1].value) this.currentWeek[1] = index
				})
				this.goWeek(refresh)
			},
			generateDefaultTable(){
				let chinese = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				var result = Array.from(Array(7), (v, k) => {
					return {
						num: chinese[k],
						date: "xx.xx",
						lessons: Array.from(Array(5), (v, k) => {
							return {available: false}
						})
					}
				})
				return result
			},
			goWeek(refresh){
				// console.log(refresh)
				this.content = this.generateDefaultTable()
				// 获取数据
				schedule.getWeekByDay(this.list[0][this.currentWeek[0]].value, this.currentWeek[1] + 1, true, !refresh).then(w_data => {
					this.data = w_data
					// 跳转到当前周
					//console.log(JSON.stringify([this.list[0][this.currentWeek[0]], this.currentWeek[1]]))
					//console.log(JSON.stringify(this.data))
					w_data.schedule.forEach((day, daynum, arr) => {
						//console.log(JSON.stringify(day))
						for(const item of day){
							//console.log(JSON.stringify(item))
							for(const i of item.schedules){
								for(const n of [...new Array(5).keys()]){
									if(i.day == daynum + 1 && (i['class'].includes(2 * n + 1) || i['class'].includes(2 * n + 2))){
										this.content[daynum].lessons[n].name = item.name
										this.content[daynum].lessons[n].room = i.room
										this.content[daynum].lessons[n].available = true
									}
								}
							}
						}
					})
				}).catch(err => {
					console.log(err)
				})
			}
		},
		onLoad() {
			if(!uni.getStorageSync("sentence"))
				uni.setStorageSync("sentence", "加油！")
			this.sentence = uni.getStorageSync("sentence")
			// 获取学期
			schedule.getSemesters().then(s_data => {
				this.semesters = s_data
				this.list[0] = s_data.semesters
				this.currentWeek[0] = s_data.semesters.findIndex((res) => {return res.value == s_data.default})
				this.goWeek(false)
			})
		}
	}
</script>

<style>
	.body{
		
	}
	.content{
		margin: 5rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.table-main{
		display: flex;
		margin: 5rpx;
	}
	.table-title{
		text-align: center;
		height: 70rpx;
		border-bottom-width: 2rpx;
		border-bottom-style: solid;
		border-bottom-color: #F0F0F0;
	}
	.table-title-nonlast{
		border-right-width: 2rpx;
		border-right-style: solid;
		border-right-color: #F0F0F0;
	}
	.table-item{
		width: calc(652rpx / 7);
		text-align: center;
		background-color: #DBF1E1;
		height: 200rpx;
		border-radius: 10rpx;
		margin: 3rpx;
		display: flex;    
		justify-content:center;
		align-items:center;
		float: left;
	}
	.table-item-number{
		width: 30rpx;
		text-align: center;
		height: 210rpx;
	}
	.table-border{
		border: #F6F6F6;
		border-style: solid;
		border-width: 1rpx;
		border-top: none;
		height: 210rpx;
		width: calc(708rpx / 7);
	}
	.table-row{
		
	}
	.selector{
		background-color: #F6F6F6;
		border-radius: 20rpx;
		padding: 10rpx;
		flex: 1;
		margin-right: 20rpx;
		display: flex;
	}
	.selector-text{
		margin-left: 10rpx;
		text-align: center;
	}
	.selector-icon{
		float: left;
		margin: 4rpx;
	}
	.selector-icon2{
		float: right;
		margin: 4rpx;
		margin-left: auto;
	}
	.lessonname{
		font-size: 28rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}
	.lessonroom{
		font-size: 20rpx;
	}
	.lessonnumber{
		height: 105rpx;
		display: flex;
		justify-content:center;
		align-items:center;
		border-bottom-width: 1rpx;
		border-bottom-style: solid;
		border-bottom-color: #F0F0F0;
		color: #999999;
	}
	.lessonnumber911{
		height: 87rpx;
		display: flex;
		justify-content:center;
		align-items:center;
		border-bottom-width: 1rpx;
		border-bottom-style: solid;
		border-bottom-color: #F0F0F0;
		color: #999999;
	}
	.bottom-place{
		height: 150rpx;
		text-align: center;
		margin-top: 30rpx;
	}
	.dayname{
		font-size: 25rpx;
		color: #999999;
	}
	.date{
		font-size: 22rpx;
		color: #999999;
	}
</style>