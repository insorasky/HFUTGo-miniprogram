<template>
	<view>
		<s-list :cell-group="true">
			<u-cell-item :arrow="false" :title="data['name']" v-show="data['name']"></u-cell-item>
			<u-cell-item title="项目模块" :arrow="false" :value="data['module']" v-show="data['module']"></u-cell-item>
			<u-cell-item title="项目形式" :arrow="false" :value="data['form']" v-show="data['form']"></u-cell-item>
			<u-cell-item title="项目级别" :arrow="false" :value="data['level']" v-show="data['level']"></u-cell-item>
			<u-cell-item title="类别" :arrow="false" :value="data['category']" v-show="data['category']"></u-cell-item>
			<u-cell-item title="标签" :arrow="false" :value="data['tag']" v-show="data['tag']"></u-cell-item>
			<u-cell-item title="审核校区" :arrow="false" :value="data['campus']" v-show="data['campus']"></u-cell-item>
			<u-cell-item title="创建时间" :arrow="false" :value="data['createtime']" v-show="data['createtime']"></u-cell-item>
			<u-cell-item title="报名开始时间" :arrow="false" :value="data['applystart']" v-show="data['applystart']"></u-cell-item>
			<u-cell-item title="报名结束时间" :arrow="false" :value="data['applyend']" v-show="data['applyend']"></u-cell-item>
			<u-cell-item title="活动开始时间" :arrow="false" :value="data['projectstart']" v-show="data['projectstart']"></u-cell-item>
			<u-cell-item title="活动结束时间" :arrow="false" :value="data['projectend']" v-show="data['projectend']"></u-cell-item>
			<u-cell-item title="活动地点" :arrow="false" :value="data['location']" v-show="data['location']"></u-cell-item>
			<u-cell-item title="主办单位" :arrow="false" :value="data['sponsor']" v-show="data['sponsor']"></u-cell-item>
			<u-cell-item title="承办单位" :arrow="false" :value="data['organizer']" v-show="data['organizer']"></u-cell-item>
			<u-cell-item title="负责老师" :arrow="false" :value="data['teacher']" v-show="data['teacher']"></u-cell-item>
			<u-cell-item title="联系电话" :value="data['phone']" v-show="data['phone']" @click="call"></u-cell-item>
			<u-cell-item title="五育目标设计" :arrow="false" :value="data['goal']" v-show="data['goal']"></u-cell-item>
			<u-cell-item title="报名方式" :arrow="false" :value="data['applyway']" v-show="data['applyway']"></u-cell-item>
			<u-cell-item title="已报名数量" :arrow="false" :value="data['applynum']"></u-cell-item>
			<u-cell-item title="最高数量" :arrow="false" :value="data['fullnum']" v-show="data['fullnum']"></u-cell-item>
			<u-cell-item title="团队最大人数" :arrow="false" :value="data['teamsize']" v-show="data['teamsize']"></u-cell-item>
		</s-list>
		<view class="content">
			<rich-text space="nbsp" :nodes="data.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {},
				id: '',
			};
		},
		methods: {
			call(){
				uni.makePhoneCall({
					phoneNumber: this.data['phone']
				})
			}
		},
		onLoad(data) {
			this.id = data.id
			this.$request('/sc/info?pid=' + this.id).then(data => {
				this.data = data
				console.log(JSON.stringify(this.data))
			})
		}
	}
</script>

<style lang="scss">
.content{
	margin: 20rpx;
	padding: 30rpx;
	border-radius: 20rpx;
	background-color: #FFFFFF;
}
</style>
