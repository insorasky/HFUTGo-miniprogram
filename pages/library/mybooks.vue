<template>
	<view class="body">
		<u-top-tips ref="uTips"></u-top-tips>
		<s-list :empty="showEmpty" bg-color="#FFFFFF">
			<u-cell-item
				v-for="(item, i) in data"
				:title="item.name"
				:label="`起止时间：${item.starttime}~${item.endtime}`"
				:key="i"
				@click="showInfo(i)"
			></u-cell-item>
		</s-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				showEmpty: true
			};
		},
		methods: {
			showInfo(index){
				uni.navigateTo({
					url: '/pages/library/bookinfo?marc=' + this.data[index].marc
				})
			}
		},
		onLoad() {
			this.$request('/library/my_books').then(data => {
				this.data = data
				this.showEmpty = (data.length == 0)
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
	.body{
		
	}
</style>
