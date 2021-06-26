<template>
	<view class="body">
		<u-top-tips refs="uTips"></u-top-tips>
		<u-navbar title="" :show-title="false" :background="{backgroundColor: '#4da0e0'}" back-icon-color="#FFFFFF">
			<view
				class="selector"
				@click="selectorClick"
			>
				<u-icon name="calendar" class="selector-icon" size="30"></u-icon>
				<view class="selector-text">
					<text>第15周</text>
				</view>
				<u-icon name="arrow-down-fill" class="selector-icon2" size="30"></u-icon>
				<u-select v-model="showSelector" :list="list"></u-select>
			</view>
		</u-navbar>
		<uni-fab
			horizontal="right"
			:popMenu="false"
			@fabClick="nextWeek"
		>
			<u-icon name="arrow-rightward" color="white" size="64"></u-icon>
		</uni-fab>
		<uni-fab
			horizontal="left"
			:popMenu="false"
			@fabClick="lastWeek"
		>
			<u-icon name="arrow-leftward" color="white" size="64"></u-icon>
		</uni-fab>
		<view class="content">
			<scroll-view>
				<view class="table-main">
					<view class="table-row">
						<view class="table-title table-title-nonlast">
							
						</view>
						<view class="table-item-number">
							<view>
								<view class="lessonnumber">
									<text>1</text>
								</view>
								<view class="lessonnumber">
									<text>2</text>
								</view>
							</view>
						</view>
						<view class="table-item-number">
							<view>
								<view class="lessonnumber">
									<text>3</text>
								</view>
								<view class="lessonnumber">
									<text>4</text>
								</view>
							</view>
						</view>
						<view class="table-item-number">
							<view>
								<view class="lessonnumber">
									<text>5</text>
								</view>
								<view class="lessonnumber">
									<text>6</text>
								</view>
							</view>
						</view>
						<view class="table-item-number">
							<view>
								<view class="lessonnumber">
									<text>7</text>
								</view>
								<view class="lessonnumber">
									<text>8</text>
								</view>
							</view>
						</view>
						<view class="table-item-number">
							<view>
								<view class="lessonnumber911">
									<text>9</text>
								</view>
								<view class="lessonnumber911">
									<text>10</text>
								</view>
								<view class="lessonnumber911">
									<text>11</text>
								</view>
							</view>
						</view>
					</view>
					<view class="table-row">
						<view class="table-title table-title-nonlast">
							周一<br />6.21
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
							<view class="table-item" :style="{backgroundColor: $hfutgo.randColor()}">
								<view>
									<view class="lessonname">
										<text>高等数学（上）</text>
									</view>
									<view class="lessonroom">
										<text>翠五教105</text>
									</view>
								</view>
							</view>
						</view>
						<view class="table-border">
							<view class="table-item" :style="{backgroundColor: $hfutgo.randColor()}">
								<view>
									<view class="lessonname">
										<text>数据结构</text>
									</view>
									<view class="lessonroom">
										<text>翠十教204</text>
									</view>
								</view>
							</view>
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
							<view class="table-item" :style="{backgroundColor: $hfutgo.randColor()}">
								<view>
									<view class="lessonname">
										<text>人际交往心理学</text>
									</view>
									<view class="lessonroom">
										<text>翠五教105</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="table-row">
						<view class="table-title table-title-nonlast">
							周二<br />6.22
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
							<view class="table-item" :style="{backgroundColor: $hfutgo.randColor()}">
								<view>
									<view class="lessonname">
										<text>Java技术</text>
									</view>
									<view class="lessonroom">
										<text>翠十一教406</text>
									</view>
								</view>
							</view>
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
						</view>
					</view>
					<view class="table-row">
						<view class="table-title table-title-nonlast">
							周三<br />6.23
						</view>
						<view class="table-border">
							<view class="table-item" :style="{backgroundColor: $hfutgo.randColor()}">
								<view>
									<view class="lessonname">
										<text>高等数学（上）</text>
									</view>
									<view class="lessonroom">
										<text>翠五教105</text>
									</view>
								</view>
							</view>
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
						</view>
					</view>
					<view class="table-row">
						<view class="table-title table-title-nonlast">
							周四<br />6.24
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
							<view class="table-item" :style="{backgroundColor: $hfutgo.randColor()}">
								<view>
									<view class="lessonname">
										<text>大学英语（2）</text>
									</view>
									<view class="lessonroom">
										<text>翠六教208</text>
									</view>
								</view>
							</view>
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
							<view class="table-item" :style="{backgroundColor: $hfutgo.randColor()}">
								<view>
									<view class="lessonname">
										<text>大学体育（2）</text>
									</view>
									<view class="lessonroom">
										<text></text>
									</view>
								</view>
							</view>
						</view>
						<view class="table-border">
						</view>
					</view>
					<view class="table-row">
						<view class="table-title table-title-nonlast">
							周五<br />6.25
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
							<view class="table-item" :style="{backgroundColor: $hfutgo.randColor()}">
								<view>
									<view class="lessonname">
										<text>高等数学（上）</text>
									</view>
									<view class="lessonroom">
										<text>翠五教105</text>
									</view>
								</view>
							</view>
						</view>
						<view class="table-border">
							<view class="table-item" v-if="false">
								<view>
									<view class="lessonname">
										<text>Java技术</text>
									</view>
									<view class="lessonroom">
										<text>翠十一教406</text>
									</view>
								</view>
							</view>
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
						</view>
					</view>
					<view class="table-row">
						<view class="table-title table-title-nonlast">
							周六<br />6.26
						</view>
						<view class="table-border">
							<view class="table-item" :style="{backgroundColor: $hfutgo.randColor()}">
								<view>
									<view class="lessonname">
										<text>数据结构</text>
									</view>
									<view class="lessonroom">
										<text>翠十教204</text>
									</view>
								</view>
							</view>
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
						</view>
					</view>
					<view class="table-row">
						<view class="table-title">
							周日<br />6.27
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
						</view>
						<view class="table-border">
						</view>
					</view>
				</view>
				<view class="bottom-place">
					<u-icon name="heart" label="嘤嘤嘤"></u-icon>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSelector: false,
				list: [
					{ value: 134, label: '2020-2021学年第二学期' },
					{ value: 114, label: '2020-2021学年第一学期' },
				]
			}
		},
		methods: {
			selectorClick(){
				this.showSelector = true;
			},
			previousWeek(){
				
			},
			nextWeek(){
				
			},
			lastWeek(){
				
			}
		}
	}
</script>

<style>
	.body{
		
	}
	.content{
		margin: 5rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.table-main{
		display: flex;
		margin: 5rpx;
	}
	.table-title{
		text-align: center;
		height: 80rpx;
	}
	.table-title-nonlast{
		border-right-width: 2rpx;
		border-right-style: solid;
		border-right-color: #F0F0F0;
	}
	.table-item{
		width: calc(652rpx / 7);
		text-align: center;
		background-color: #DBF1E1;
		height: 250rpx;
		border-radius: 10rpx;
		margin: 3rpx;
		display: flex;    
		justify-content:center;
		align-items:center;
	}
	.table-item-number{
		width: 30rpx;
		text-align: center;
		height: 260rpx;
	}
	.table-border{
		border: #F6F6F6;
		border-style: solid;
		border-width: 1rpx;
		height: 260rpx;
		width: calc(708rpx / 7);
	}
	.table-row{
		
	}
	.selector{
		background-color: #F6F6F6;
		border-radius: 20rpx;
		padding: 10rpx;
		flex: 1;
		margin-right: 20rpx;
		display: flex;
	}
	.selector-text{
		margin-left: 10rpx;
		text-align: center;
	}
	.selector-icon{
		float: left;
		margin: 4rpx;
	}
	.selector-icon2{
		float: right;
		margin: 4rpx;
		margin-left: auto;
	}
	.lessonname{
		font-size: 28rpx;
	}
	.lessonroom{
		font-size: 25rpx;
	}
	.lessonnumber{
		height: 130rpx;
		display: flex;
		justify-content:center;
		align-items:center;
		border-bottom-width: 1rpx;
		border-bottom-style: solid;
		border-bottom-color: #F0F0F0;
	}
	.lessonnumber911{
		height: 87rpx;
		display: flex;
		justify-content:center;
		align-items:center;
		border-bottom-width: 1rpx;
		border-bottom-style: solid;
		border-bottom-color: #F0F0F0;
	}
	.bottom-place{
		height: 150rpx;
		text-align: center;
		margin-top: 30rpx;
	}
</style>
