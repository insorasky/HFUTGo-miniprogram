<template>
	<view>
		<view class="selector">
			<u-subsection :list="list" :current="currentCategary" @change="changeCategory"></u-subsection>
		</view>
		<scroll-view
			:scroll-y="true"
			:style="{
				'height': height
			}"
		>
			<s-list :cell-group="true" bg-color="#FFFFFF">
				<u-cell-item v-for="(item, i) in data" :key="i" :title="item.name" :value="`共${item.sum}分`" @click="showItem(i)" :label="item.clazz"></u-cell-item>
			</s-list>
		</scroll-view>
		<s-popup v-if="currentItem != -1" :title="data[currentItem].name || ''" v-model="showPopup">
			<s-list :cell-group="true">
				<u-cell-item v-for="(item, i) in data[currentItem].data" :title="item.title" :key="i" :arrow="false">
					<u-rate :count="5" v-model="item.score" :disabled="false" active-color="#F9F900"></u-rate>
				</u-cell-item>
			</s-list>
		</s-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name: '专业排名'
					},
					{
						name: '年级排名'
					},
					{
						name: '全校排名'
					}
				],
				currentCategary: 0,
				data: [],
				currentItem: -1,
				showPopup: false,
			};
		},
		computed: {
			height(){
				return 'calc(' + uni.getSystemInfoSync().windowHeight + 'px - 90rpx)'
			}
		},
		methods:{
			changeCategory(index){
				uni.showLoading()
				this.currentCategary = index
				this.$request('/sc/ranking?type=' + index).then(data => {
					this.data = data
					/*
					data.forEach((item, index, arr) => {
						this.$request('/sc/check?id=' + item.id).then(data => {
							this.data[index].clazz = data.classname
							this.data[index].hour = data.hour
						})
					})
					*/
					uni.hideLoading()
				})
			},
			showItem(index){
				this.currentItem = index
				this.showPopup = true
			}
		},
		onLoad() {
			this.changeCategory(0)
		}
	}
</script>

<style lang="scss">
	.selector{
		margin: 20rpx;
	}
</style>
