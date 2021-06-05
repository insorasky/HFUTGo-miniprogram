<template name="my">
	<view>
		<view class="group">
			<u-cell-group :border="false">
				<u-cell-item :arrow="false" :border-bottom="false">
					<view class="avatar" slot="icon">
						<view v-if="debug">
							<image src="../../static/img/avatar_default.jpg" class="avatarimg" mode='widthFix'></image>
						</view>
						<view v-else>
							<open-data type="userAvatarUrl" slot="icon" class="avatarimg"></open-data>
						</view>
					</view>
					<view slot="title" style="padding-left: 30rpx;">
						<text style="font-size: 40rpx;">{{userInfo.name}}</text><br />
						<text style="font-size: 30rpx;">{{userInfo.className}}</text>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="group">
			<u-cell-group :border="false" title="设置">
				<u-cell-item icon="home" title="聚合今日首页" @click="coming()"></u-cell-item>
				<u-cell-item icon="account" title="帐号密码" @click="coming()"></u-cell-item>
				<u-cell-item icon="calendar" title="课程表" @click="coming()"></u-cell-item>
				<u-cell-item icon="setting" title="其他设置" :border-bottom="false" @click="coming()"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="group">
			<u-cell-group :border="false">
				<u-cell-item icon="info-circle" title="关于小程序" @click="showAbout = true"></u-cell-item>
				<u-cell-item icon="kefu-ermai" title="反馈" @click="showContact = true"></u-cell-item>
				<u-cell-item icon="close-circle" title="退出登录" :border-bottom="false" @click="logout"></u-cell-item>
			</u-cell-group>
		</view>
		<text class="copyright">Sora 版权所有 ©2021</text>
		<s-popup title="关于" v-model="showAbout" class="about">
			<text>Sora 版权所有 ©2021</text><br />
			<u-link href="https://www.sorasky.in/" :under-line="true" font-size="35">博客：https://www.sorasky.in/</u-link><br />
			<u-link href="https://github.com/hfutgo-server/" :under-line="true" font-size="35">服务端开源地址：https://github.com/hfutgo-server/</u-link><br />
			<u-link href="https://github.com/HFUTGo-miniprogram/" :under-line="true" font-size="35">小程序端开源地址：https://github.com/HFUTGo-miniprogram/</u-link><br />
			<text>喜欢的话给个Star呗！</text>
		</s-popup>
		<s-popup title="反馈" v-model="showContact">
			<u-button type="success" open-type="contact" style="margin-bottom: 20rpx;">点击联系作者微信</u-button>
			<u-button @click="copyGroupNum()" type="primary">点击加入QQ交流群：862212085</u-button>
		</s-popup>
	</view>
</template>

<script>
	export default {
		name:'my',
		data() {
			return {
				userInfo: this.$user.getUserInfo(),
				showAbout: false,
				showContact: false,
				debug: (process.env.NODE_ENV == 'development')
			};
		},
		methods:{
			logout(){
				uni.showModal({
					title:'退出登录',
					content:'确定要退出登录吗？',
					success: (res) => {
						if(res.confirm){
							this.$user.logout()
							uni.reLaunch({
								url: '/pages/user/login'
							})
						}
					}
				})
			},
			coming(){
				uni.showToast({
					icon: 'none',
					title: '敬请期待！'
				})
			},
			copyGroupNum(){
				uni.setClipboardData({
					data: '862212085'
				})
				uni.showToast({
					title: '已复制群号'
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
		padding: 3px;
	}
	.copyright{
		color: #808080;
		display:flex;
		flex-direction:row;
		justify-content:center;
	}
	.about{
		font-size: 35rpx;
		line-height: 60rpx;
	}
	.avatar{
		height: 120rpx;
		width: 120rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.avatarimg{
		width: 100%;
	}
</style>
