<template>
	<view class="body">
		<u-subsection :list="list" :current="currentType" @change="changeType" class="selector"></u-subsection>
		<s-list :cell-group="true" bg-color="#FFFFFF">
			<u-cell-item
				v-for="(item, i) in data"
				:title="item.name"
				:label="item.organizer"
				@click="showInfo(i)"
			></u-cell-item>
		</s-list>
		<u-loadmore :status="loadStatus"></u-loadmore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{name: '报名中', type: 'applying'},
					{name: '待录成绩', type: 'waiting'},
					{name: '已结束', type: 'end'},
				],
				data: [],
				currentType: 0,
				currentPage: 1,
				loadStatus: 'loadmore'
			};
		},
		methods:{
			changeType(index){
				this.currentType = index
				this.$request('/sc/list?page=1&type=' + this.list[index].type).then(data => {
					this.data = data.data
				})
			},
			showInfo(index){
				uni.navigateTo({
					url: '/pages/secondclass/info?id=' + this.data[index].id
				})
			}
		},
		onLoad() {
			this.changeType(0)
		},
		onReachBottom() {
			if(this.loadStatus == 'loadmore'){
				this.$request(`/sc/list?type=${this.list[this.currentType].type}&page=${++this.currentPage})`)
				.then(data => {
					data.data.forEach((item, index, arr) => {
						this.data.push(item)
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.selector{
		margin: 20rpx;
	}
	.body{
		margin: 20rpx;
	}
</style>
