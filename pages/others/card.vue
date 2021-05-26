<template>
	<view class="body">
		<view class="head">
			<view class="left">
				<view class="title">
					<text>可用余额</text>
				</view>
				<view class="number">
					<text>{{info.available}}</text>
				</view>
			</view>
			<view class="right">
				<view class="title">
					<text>待圈存余额</text>
				</view>
				<view class="number">
					<text>{{info.waiting}}</text>
				</view>
			</view>
			<view class="info">
				<u-cell-item title="校园卡编号" :value="info.id" :arrow="false" />
				<u-cell-item title="是否冻结" :value="info.freeze ? '已冻结' : '未冻结'" :arrow="false" />
				<u-cell-item title="是否丢失" :value="info.lost ? '已丢失' : '未丢失'" />
			</view>
		</view>
		<view class="details">
			<s-list :empty="false" :cellGroup="false">
				<u-cell-item
					v-for="(item, i) in details"
					:title="item.time"
					:label="item.place + ' 余额:' + item.balance + '元'"
					:value="item.consume"
					@click="showDetailPopup(i)"
					:key="i"
				/>
				<u-loadmore :status="loading" @loadmore="loadMore" />
			</s-list>
		</view>
		<s-popup v-model="showDetail" title="交易详情">
			<view>
				<u-cell-item title="交易时间" :value="details[currentDetailIndex]['time']" :arrow="false"></u-cell-item>
				<u-cell-item title="交易类型" :value="details[currentDetailIndex]['type']" :arrow="false"></u-cell-item>
				<u-cell-item title="交易地点" :value="details[currentDetailIndex]['place']" :arrow="false"></u-cell-item>
				<u-cell-item title="交易金额" :value="details[currentDetailIndex]['consume']" :arrow="false"></u-cell-item>
				<u-cell-item title="余额" :value="details[currentDetailIndex]['balance']" :arrow="false"></u-cell-item>
				<u-cell-item title="备注" :value="details[currentDetailIndex]['info'] || '无备注'" :arrow="false"></u-cell-item>
			</view>
		</s-popup>
		<s-popup v-model="showLose">
			
		</s-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					id: '',
					sum: '',
					available: '',
					waiting: '',
					freeze: true,
					lost: false
				},
				details: [
					{
						"time": "加载中",
						"type": "加载中",
						"place": "加载中",
						"consume": "加载中",
						"balance": "加载中",
						"info": ""
					}
				],
				currentDetailIndex: 0,
				currentPage: 1,
				showLose: false,
				showDetail: false,
				loading: false,
				loadText: {
					loadmore: '上拉或点击加载下一页',
					loading: '在获取了在获取了',
					nomore: '莫得了',
				},
			};
		},
		methods: {
			showDetailPopup(index){
				this.currentDetailIndex = index
				this.showDetail = true
			},
			showLosePopup(index){
				this.showLose = true
			},
			loadMore(){
				
			}
		},
		onLoad(){
			uni.startPullDownRefresh()
		},
		onPullDownRefresh() {
			this.$request('/card/info').then(data => {
				this.info = data
				this.$request('/card/details_today').then(data => {
					this.details = data.details
					uni.hideLoading()
					this.$request('/card/details_past?page=1').then(data => {
						for(const item in data.details)
							this.details.push(item)
						uni.stopPullDownRefresh()
					})
				})
			})
		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style lang="scss">
	.body{
		margin: 15rpx;
	}
	.head{
		border: 1px;
		background-color: #FFFFFF;
		border-radius: 25rpx;
		border-style: solid;
		border-color: #C0C0C0;
		margin: 50rpx;
	}
	.left{
		border-right: 1px solid #C0C0C0;
		border-bottom: 1px solid #C0C0C0;
		padding-top: 50rpx;
		padding-bottom: 50rpx;
		float: left;
		width: 50%;
	}
	.right{
		padding-top: 50rpx;
		padding-bottom: 50rpx;
		border-bottom: 1px solid #C0C0C0;
	}
	.info{
		
	}
	.title{
		font-size: 35rpx;
		color: #C0C0C0;
		display: flex; 
		flex-direction: row; 
		justify-content: center;
	}
	.number{
		font-size: 70rpx;
		display: flex;
		flex-direction: row; 
		justify-content: center;
	}
	.details{
		border: 1px;
		background-color: #FFFFFF;
		border-radius: 25rpx;
		border-style: solid;
		border-color: #C0C0C0;
		margin: 30rpx;
	}
</style>
