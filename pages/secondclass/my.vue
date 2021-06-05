<template>
	<view>
		<u-subsection :list="list" :current="currentType" class="selector" @change="changeType"></u-subsection>
		<s-list :empty="data.length == 0" :cell-group="true" bg-color="#FFFFFF">
			<u-cell-item v-for="(item, i) in data" :key="i" :title="item.name" :label="item.organizer" @click="selectItem(i)"></u-cell-item>
		</s-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{name: '未开始', type: 'waiting'},
					{name: '已结束', type: 'end'}
				],
				currentType: 0,
				data: []
			}
		},
		methods: {
			changeType(index){
				this.currentType = index
				this.$request('/sc/my_projects?type=' + this.list[index].type).then(data => {
					this.data = data
				})
			},
			selectItem(index){
				uni.navigateTo({
					url: '/pages/secondclass/info?id=' + this.data[index].id
				})
			}
		},
		onLoad() {
			this.changeType(0)
		}
	}
</script>

<style>
	.selector{
		margin: 20rpx;
	}
</style>
