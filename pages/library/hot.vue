<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="selector">
			<u-subsection :list="list" :current="currentType" @change="changeType"></u-subsection>
		</view>
		<s-list :cell-group="true" bg-color="#FFFFFF">
			<u-cell-item v-for="(item, i) in data[list[currentType].type]" :title="item.title" :key="i" @click="showBook(i)"></u-cell-item>
		</s-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					borrow_list: [],
					book_list: []
				},
				list: [
					{name: '热门借阅', type: 'borrow_list'},
					{name: '热门图书', type: 'book_list'}
				],
				currentType: 0
			};
		},
		methods: {
			changeType(index){
				this.currentType = index
			},
			showBook(index){
				uni.navigateTo({
					url: '/pages/library/bookinfo?marc=' + this.data[this.list[this.currentType].type][index].marc
				})
			}
		},
		onLoad() {
			this.$request('/library/hot').then(data => {
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
	.selector{
		margin: 20rpx;
	}
</style>
