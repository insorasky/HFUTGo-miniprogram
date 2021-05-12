<template name="today">
	<view>
		<s-notice page="home" />
		<view class="body">
			<u-row align="top" style="position: relative;">
				<u-col span="9">
					<view class="schedule">
						<view class="title" style="padding-left: 30rpx; padding-top: 20rpx;">
							<text>今日课程</text>
						</view>
						<view class="schedule_item">
							<u-row>
								<u-col span="1">
									<text style="font-size: 40rpx;">1</text>
								</u-col>
								<u-col span="11">
									<text style="font-size: 35rpx;">高等数学</text><br />
									<text>翠五教302-1</text>
								</u-col>
							</u-row>
						</view>
						<view class="schedule_item">
							<u-row>
								<u-col span="1">
									<text style="font-size: 40rpx;">2</text>
								</u-col>
								<u-col span="11">
									<text style="font-size: 35rpx;">高等数学</text><br />
									<text>翠五教302-1</text>
								</u-col>
							</u-row>
						</view>
						<view class="schedule_item">
							<u-row>
								<u-col span="1">
									<text style="font-size: 40rpx;">3</text>
								</u-col>
								<u-col span="11">
									<text style="font-size: 35rpx;">高等数学</text><br />
									<text>翠五教302-1</text>
								</u-col>
							</u-row>
						</view>
						<view class="schedule_item">
							<u-row>
								<u-col span="1">
									<text style="font-size: 40rpx;">4</text>
								</u-col>
								<u-col span="11">
									<text style="font-size: 35rpx;">高等数学</text><br />
									<text>翠五教302-1</text>
								</u-col>
							</u-row>
						</view>
						<view class="schedule_item">
							<u-row>
								<u-col span="1">
									<text style="font-size: 40rpx;">5</text>
								</u-col>
								<u-col span="11">
									<text style="font-size: 35rpx;">高等数学</text><br />
									<text>翠五教302-1</text>
								</u-col>
							</u-row>
						</view>
					</view>
					<view class="secondclass">
						<view class="title">
							<text>第二课堂</text>
						</view>
						<u-cell-group :border="false">
							<u-cell-item title="合工大某某神奇的活动" :border-bottom="false"></u-cell-item>
						</u-cell-group>
					</view>
				</u-col>
				<u-col span="3">
					<view class="rightcol">
						<scroll-view :scroll-y="true" class="rightscroll">
							<u-grid col="1" :border="false">
								<u-grid-item>
									<u-icon name="rmb-circle" label="31.67" label-pos="bottom" size="80" label-size="30"></u-icon>
								</u-grid-item>
								<u-grid-item>
									<u-icon name="email" label="5封未读" label-pos="bottom" size="80" label-size="30"></u-icon>
								</u-grid-item>
								<u-grid-item>
									<u-icon name="bookmark" label="5本待还" label-pos="bottom" size="80" label-size="30"></u-icon>
								</u-grid-item>
								<u-grid-item>
									<u-icon name="photo" label="洗衣机" label-pos="bottom" size="80" label-size="30"></u-icon>
								</u-grid-item>
								<u-grid-item>
									<u-icon name="edit-pen" label="考试安排" label-pos="bottom" size="80" label-size="30"></u-icon>
								</u-grid-item>
								<u-grid-item>
									<u-icon name="order" label="空教室" label-pos="bottom" size="80" label-size="30"></u-icon>
								</u-grid-item>
							</u-grid>
						</scroll-view>
					</view>
				</u-col>
			</u-row>
			<u-row>
				<u-col>
					<view class="news">
						<view class="title">
							<text>校园要闻</text>
						</view>
						<u-cell-group :border="false">
							<u-cell-item title="合工大某某神奇的新闻" :border-bottom="false"></u-cell-item>
							<u-cell-item title="合工大某某同学又拿了什么奖" :border-bottom="false"></u-cell-item>
							<u-cell-item title="中科大和合工大合并" :border-bottom="false"></u-cell-item>
							<u-cell-item title="合工大某某活动开展" :border-bottom="false"></u-cell-item>
						</u-cell-group>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import sNotice from '../../components/s-notice/s-notice.vue'
	export default {
		name: 'today',
		components:{
			sNotice
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.schedule{
		background-color: #FFFFFF;
		border-radius: 30rpx;
		padding: 1rpx;
		margin-bottom: 20rpx;
	}
	.secondclass{
		background-color: #FFFFFF;
		border-radius: 30rpx;
		padding: 15rpx;
		margin-bottom: 20rpx;
	}
	.rightcol{
		background-color: #FFFFFF;
		position: absolute;
		top: 0;
		bottom: 0;
		border-radius: 30rpx;
		padding: 10rpx;
		margin-bottom: 20rpx;
	}
	.rightscroll{
		height: 100%;
	}
	.body{
		padding-top: 30rpx;
	}
	.schedule_item{
		background-color: #71D5A1;
		border-radius: 15rpx;
		margin: 20rpx;
		padding-left: 20rpx;
		padding-right: 15rpx;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
	}
	.title{
		padding-top: 10rpx;
		padding-left: 20rpx;
		font-size: 35rpx;
		color: #555555
	}
	.news{
		background-color: #FFFFFF;
		border-radius: 30rpx;
		padding: 15rpx;
	}
</style>
