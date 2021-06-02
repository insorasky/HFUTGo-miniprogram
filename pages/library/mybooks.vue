<template>
	<view class="body">
		<s-list :empty="data.length == 0" bg-color="#FFFFFF">
			<u-cell-item
				v-for="(item, i) in data"
				:title="item.name"
				:label="`起止时间：${item.starttime}~${item.endtime}`"
			></u-cell-item>
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
			})
		}
	}
</script>

<style lang="scss">
	.body{
		
	}
</style>
