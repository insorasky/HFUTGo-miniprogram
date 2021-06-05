<template name="menu-page">
	<view>
		<view class="group">
			<view class="title">
				<text>日常生活</text>
			</view>
			<u-grid col="3" :border="false">
				<u-grid-item>
					<u-icon name="photo" :size="iconSize" label="洗衣机" label-pos="bottom" margin-top="20rpx" @click="navigate('wash/list')"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="rmb-circle" :size="iconSize" label="校园卡" label-pos="bottom" margin-top="20rpx" @click="navigate('others/card')"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="calendar" :size="iconSize" label="校历表" label-pos="bottom" margin-top="20rpx" @click="navigate('others/calendar')"/>
				</u-grid-item>
				<!--
				<u-grid-item>
					<u-icon name="attach" :size="iconSize" label="信息公开" label-pos="bottom" margin-top="20rpx"/>
				</u-grid-item>
				-->
			</u-grid>
		</view>
		<!--
		<view class="group">
			<view class="title">
				<text>教学服务</text>
			</view>
			<u-grid col="3" :border="false">
				<u-grid-item>
					<u-icon name="list-dot" :size="iconSize" label="课程表" label-pos="bottom" margin-top="20rpx"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="edit-pen" :size="iconSize" label="考试安排" label-pos="bottom" margin-top="20rpx"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="search" :size="iconSize" label="课程检索" label-pos="bottom" margin-top="20rpx"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="thumb-up" :size="iconSize" label="成绩查询" label-pos="bottom" margin-top="20rpx"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="server-man" :size="iconSize" label="我的评教" label-pos="bottom" margin-top="20rpx"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="order" :size="iconSize" label="空教室查询" label-pos="bottom" margin-top="20rpx"/>
				</u-grid-item>
			</u-grid>
		</view>
		-->
		<view class="group">
			<view class="title">
				<text>图书馆</text>
			</view>
			<u-grid col="3" :border="false">
				<u-grid-item>
					<u-icon name="map" :size="iconSize" label="图书馆余位" label-pos="bottom" margin-top="20rpx" @click="navigate('library/freeseat')"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="star" :size="iconSize" label="热门借阅" label-pos="bottom" margin-top="20rpx" @click="navigate('library/hot')"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="search" :size="iconSize" label="馆藏检索" label-pos="bottom" margin-top="20rpx" @click="navigate('library/search')"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="info-circle" :size="iconSize" label="借阅查询" label-pos="bottom" margin-top="20rpx" @click="navigate('library/mybooks')"/>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="group">
			<view class="title">
				<text>第二课堂</text>
			</view>
			<u-grid col="3" :border="false">
				<u-grid-item>
					<u-icon name="file-text" :size="iconSize" label="成绩查询" label-pos="bottom" margin-top="20rpx" @click="navigate('secondclass/score')"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="integral" :size="iconSize" label="排行榜" label-pos="bottom" margin-top="20rpx" @click="navigate('secondclass/ranking')"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="more-circle" :size="iconSize" label="项目列表" label-pos="bottom" margin-top="20rpx" @click="navigate('secondclass/list')"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="bag" :size="iconSize" label="已报名项目" label-pos="bottom" margin-top="20rpx" @click="navigate('secondclass/my')"/>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="group" v-if="showDev">
			<view class="title">
				<u-icon style="float: left" name="warning" :size="50" label="开发者模式" label-size="35" margin-left="15" />
			</view>
			<u-grid col="3" :border="false">
				<u-grid-item>
					<u-icon name="android-fill" :size="iconSize" label="自动打卡" label-pos="bottom" margin-top="20rpx"/>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="heart" :size="iconSize" label="健跑刷分" label-pos="bottom" margin-top="20rpx"/>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'menu-page',
		data() {
			return {
				iconSize: 120,
				showDev: false
			};
		},
		onLoad() {
			uni.getStorage({
				key: 'devMode',
				success: (res) => {
					this.showDev = res.data
				}
			})
		},
		methods: {
			navigate(path){
				uni.navigateTo({
					url: '/pages/' + path
				})
			}
		}
	}
</script>

<style lang="scss">
	.group{
		border: 1px;
		border-style: solid;
		border-radius: 15px;
		border-color: #FFFFFF;
		background-color: #FFFFFF;
		margin-bottom: 20px;
		padding: 5px;
	}
	.title{
		padding-top: 20rpx;
		padding-left: 20rpx;
		font-size: 35rpx;
		color: #555555
	}
</style>
