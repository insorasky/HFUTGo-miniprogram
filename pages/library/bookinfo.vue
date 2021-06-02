<template>
	<view class="body">
		<view class="group">
			<s-list :cell-group="true" title="图书信息" bg-color="#FFFFFF">
				<u-cell-item v-for="(item, i) in data.info" :title="item.title" :value="item.value" :arrow="false"></u-cell-item>
			</s-list>
		</view>
		<view class="group" v-show="data.content != ''">
			<s-list :cell-group="true" title="图书简介" bg-color="#FFFFFF">
				<u-cell-item :arrow="false" :border-top="false" :border-bottom="false" hover-class="none">
					<view slot="title">
						<rich-text space="nbsp" :nodes="data.content"></rich-text>
					</view>
				</u-cell-item>
			</s-list>
		</view>
		<view class="group">
			<s-list :cell-group="true" title="借阅情况" bg-color="#FFFFFF">
				<u-cell-item
					v-for="(item, i) in data.available"
					:title="item.place"
					:label="`索书号：${item.bookno} ${item.status}`"
					:arrow="false"
					:key="i"
					@click="showBarcode(i)"
				></u-cell-item>
			</s-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					info: [],
					content: '',
					available: []
				}
			};
		},
		methods: {
			showBarcode(index){
				uni.showToast({
					icon: 'none',
					title: '条码号：' + this.data.available[index].barcode
				})
			}
		},
		onLoad(data) {
			this.$request('/library/book_info?marc=' + data.marc).then(data => {
				this.data = data
			})
		}
	}
</script>

<style lang="scss">
	.body{
		margin: 10rpx;
	}
	.group{
		background-color: #FFFFFF;
		border-radius: 15rpx;
		border-width: 1rpx;
		border-style: solid;
		border-color: #FFFFFF;
		margin: 20rpx;
	}
</style>
