<template>
	<view class="body">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="input">
			<u-search
				placeholder="请输入查询关键词"
				v-model="keyword"
				shape="round"
				bg-color="#FFFFFF"
				:show-action="false"
				@search="search"
			></u-search>
		</view>
		<s-list :empty="showEmpty" bg-color="#FFFFFF">
			<u-cell-item v-for="(item, i) in data" :title="item.title" @click="showInfo(i)"
				:label="`${item.author} ${item.publisher}`" :key="i"
			></u-cell-item>
		</s-list>
		<u-loadmore :status="loading" v-show="showLoadMore"></u-loadmore>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				data: [],
				currentPage: -1,
				loading: 'loadmore',
				filters: [],
				scrollTop: 0,
				showEmpty: false,
				showLoadMore: false
			};
		},
		methods: {
			search(value){
				if(!value){
					uni.showToast({
						icon: 'none',
						title: '请输入关键词'
					})
					return
				}
				this.currentPage = 1
				this.$request('/library/book_search', 'POST', null, {
					page: 1,
					word: this.keyword,
					filters: this.filters
				}).then(data => {
					this.data = data.content
					console.log(this.data.length)
					this.showEmpty = (this.data.length == 0)
					this.showLoadMore = (this.data.length != 0)
				}).catch(err => {
					if(err.error)
						this.$refs.uTips.show({
							title: err.error,
							type: 'error'
						})
				})
				this.loading = 'loadmore'
			},
			showInfo(index){
				uni.navigateTo({
					url: '/pages/library/bookinfo?marc=' + this.data[index].marcRecNo
				})
			}
		},
		onReachBottom() {
			if(this.loading == 'loadmore' && this.currentPage != -1){
				this.loading = 'loading'
				this.$request('/library/book_search', 'POST', null, {
					page: ++this.currentPage,
					word: this.keyword,
					filters: this.filters
				}).then(data => {
					if(data.content.length == 0){
						this.loading = 'nomore'
						return
					}
					data.content.forEach((item, index, arr) => {
						this.data.push(item)
					})
					this.loading = 'loadmore'
				}).catch(err => {
					this.$refs.uTips.show({
						title: err.error,
						type: 'erroe'
					})
				})
			}
		},
		onPageScroll(e){
			this.scrollTop = e.scrollTop
		}
	}
</script>

<style lang="scss">
	.body{
		margin: 10rpx;
	}
	.input{
		margin: 20rpx;
	}
</style>
