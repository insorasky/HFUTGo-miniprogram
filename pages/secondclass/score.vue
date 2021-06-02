<template>
	<view class="body">
		<s-item v-for="(item, i) in data" :title="item.title" :key="i">
			<u-rate :count="5" v-model="item.score" :disabled="false" active-color="#F9F900"></u-rate>
		</s-item>
		<s-item title="志愿服务时长" :value="hours + '小时'" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hours: 0,
				data: [],
			};
		},
		onLoad() {
			this.$request('/sc/score').then(data => {
				this.data = data.data
				this.hours = data.hour
			})
		}
	}
</script>

<style lang="scss">
	.body{
		margin: 30rpx;
	}
</style>
