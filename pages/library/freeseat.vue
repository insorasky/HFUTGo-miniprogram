<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<s-list :cell-group="true">
			<s-item v-for="(item, i) in data" :title="item.name" :key="i" label="翡翠湖校区" :value="`已占用：${item.unavailable};空闲：${item.available}`"></s-item>
		</s-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: []
			};
		},
		onLoad() {
			this.$request('/library/room_free').then(data => {
				this.data = data
			}).catch(err => {
				this.$refs.uTips.show({
					title: err.error,
					type: 'error'
				})
			})
		}
	}
</script>

<style lang="scss">

</style>
