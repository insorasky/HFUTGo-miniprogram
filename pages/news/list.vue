<template>
	<view>
		<u-cell-group>
			<u-cell-item
				v-for="(item, i) in data"
				:key="i"
				:title="item.title"
				@click="showNotice(i)"
			></u-cell-item>
		</u-cell-group>
		<view style="margin: 30rpx;">
			<u-loadmore :status="status"></u-loadmore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentPage: 0,
				data: [],
				status: 'loadmore',
				hasNext: true
			};
		},
		methods: {
			showNotice(i){
				uni.navigateTo({
					url: '/pages/news/content?url=' + encodeURIComponent(this.data[i].url)
				})
			},
			showNext(){
				this.$request('/channel/channels/one_notice', 'GET', {
					size: 25,
					page: ++this.currentPage
				}).then(data => {
					if(data.length == 0){
						this.status = 'nomore'
						return
					}
					this.data = this.data.concat(data)
					this.status = 'loadmore'
				}).catch(err => {
					console.log(err)
					this.status = 'loadmore'
				})
			}
		},
		onLoad() {
			this.showNext()
		},
		onReachBottom() {
			if(this.status == 'loadmore'){
				this.status = 'loading'
				this.showNext()
			}
		}
	}
</script>

<style lang="scss">

</style>
