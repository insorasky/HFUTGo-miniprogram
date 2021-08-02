<template>
	<view>
		<u-dropdown style="background-color: #FFFFFF;">
			<u-dropdown-item
				v-model="currentSemester"
				:title="currentSemesterName"
				:options="semesters"
				@change="refresh"
			></u-dropdown-item>
		</u-dropdown>
		<scroll-view
			:scroll-y="true"
			:style="{
				'height': height
			}"
		>
			<u-card
				v-for="(item, i) in scores"
				:key="i"
				:title="item.name"
				:sub-title="item.pending ? '未评教' : '成绩：' + item.score + '；GPA：' + item.point"
				:body-style="{
					'margin': '-30rpx'
				}"
				margin="20rpx"
			>
				<u-cell-group slot="body" :border="false">
					<u-cell-item
						v-if="!item.pending"
						v-for="(score, j) in item.details"
						:key="j"
						:title="score.name"
						:value="score.score"
						:arrow="false"
					></u-cell-item>
					<u-cell-item
						v-if="item.pending"
						title="点击前往评教"
						@click="goEvaluate"
					></u-cell-item>
				</u-cell-group>
			</u-card>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentSemester: "",
				semesters: [],
				scores: [],
			};
		},
		methods: {
			refresh(){
				uni.startPullDownRefresh()
			},
			goEvaluate(){
				uni.navigateTo({
					url: './evaluate/list'
				})
			}
		},
		computed: {
			currentSemesterName(){
				if(this.semesters.length == 0) return "载入中"
				return this.semesters.find((n) => n.value == this.currentSemester).label
			},
			height(){
				return 'calc(' + uni.getSystemInfoSync().windowHeight + 'px - 80rpx)'
			}
		},
		onLoad() {
			this.$request('/eduadmin/score/semester').then(data => {
				this.semesters = Array.from(data, (v, k) => {
					return {
						label: v.name,
						value: v.sid
					}
				})
				this.currentSemester = data[0].sid
				uni.startPullDownRefresh()
			}).catch(err => {
				console.log(err)
			})
		},
		onShow() {
			uni.startPullDownRefresh()
		},
		onPullDownRefresh() {
			this.$request('/eduadmin/score/info?sid=' + this.currentSemester).then(data => {
				this.scores = data
				uni.stopPullDownRefresh()
			})
		}
	}
</script>

<style lang="scss">

</style>
