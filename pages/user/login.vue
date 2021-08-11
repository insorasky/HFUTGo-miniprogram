<template>
	<view class="body">
		<u-top-tips ref="uTips"></u-top-tips>
		<s-notice page="login" />
		<view class="title">
			<text>登录</text>
		</view>
		<view class="subtitle">
			<text>请使用新信息门户帐号密码登录</text>
		</view>
		<view class="form">
			<s-input placeholder="请输入学工号" v-model="id"></s-input>
			<s-input placeholder="请输入密码" v-model="password" :password="true"></s-input>
			<u-button type="primary" shape="circle" :ripple="true" @click="login">登录</u-button>
			<view style="margin-top: 20rpx;">
				<u-button type="success" shape="circle" :ripple="true" @click="guest_login">游客模式（新同学）</u-button>
			</view>
		</view>
		<view
			style="margin-top: 50rpx; color: #007AFF; float: left;"
			@click="goForgot">
			<text>重置密码</text>
		</view>
		<view
			style="margin-top: 50rpx; color: #007AFF; float: right;"
			@click="showHelp = true">
			<text>密码正确仍无法登录？</text>
		</view>
		<s-popup title="无法登录？" v-model="showHelp">
			<text class="subtitle">密码正确却无法登录？</text>
			<view class="tipbody">
				<text>请确认使用的是您在新版东软平台（新版信息门户：one.hfut.edu.cn）而非旧版金智平台/教务系统/VPN/校园网的帐号。</text>
			</view>
			<text class="subtitle">我忘记了密码？</text>
			<view class="tipbody">
				<text>默认密码为身份证号后六位。如果您修改过密码，请点击左侧忘记密码或登录信息门户重置密码。</text>
			</view>
			<text class="subtitle">还是无法登录？</text>
			<view class="tipbody">
				<text>可能是学校系统又抽风了，请点击下方的按钮添加交流群或联系作者反馈问题：</text>
			</view>
			<view style="margin-top: 15px;">
				<u-button type="primary" shape="circle" plain :ripple="true" open-type="contact">联系作者微信</u-button>
				<u-button @click="copyGroupNum()" type="primary" shape="circle" plain :ripple="true" open-type="contact" style="margin-top: 20rpx;">点击加入QQ交流群：862212085</u-button>
			</view>
		</s-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showHelp: false,
				id: '',
				password: ''
			};
		},
		methods: {
			copyGroupNum(){
				uni.setClipboardData({
					data: '862212085'
				})
				uni.showToast({
					title: '已复制群号'
				})
			},
			login(){
				if(!this.id || !this.password){
					this.$refs.uTips.show({
						title: '请输入帐号密码！'
					})
					return
				}
				uni.showLoading({
					title: '拼命登录中',
					mask: true
				})
				this.$user.login(this.id, this.password, false).then(data => {
					uni.reLaunch({
						url:'/pages/home/home'
					})
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
					if(err.status == 3301)
						uni.navigateTo({
							url: './verify?username=' + this.id + '&boss_ticket=' + err.error.boss_ticket + '&vpn_ticket=' + err.error.ticket + '&old_password=' + this.password
						})
					else if(err.status == 3303)
						this.$refs.uTips.show({
							title: '密码错误'
						})
					else
						this.$refs.uTips.show({
							title: '未知错误：' + err.error
						})
				})
			},
			goForgot(){
				uni.navigateTo({
					url: '/pages/user/reset'
				})
			},
			guest_login(){
				this.$guest.login()
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN  
			if(wx.hideHomeButton){  
			    wx.hideHomeButton();  
			}  
			// #endif
		},
		onShow() {
			this.password = ''
		}
	}
</script>

<style lang="scss">
	.body{
		padding-top: 140rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}
	.title{
		margin-top: 40rpx;
		font-size: 70rpx;
		padding-bottom: 10rpx;
	}
	.tipbody{
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		font-size: 35rpx;
	}
	.subtitle{
		font-size: 35rpx;
		position:relative;
		padding-left:30rpx;
		color: #808080;
		box-sizing:content-box;
		&::after{
			position:absolute;
			content:"";
			left:10rpx;top:10rpx;
			height:24rpx;width:6rpx;
			border-radius:30px;
			background-color:#999;
			z-index:2;
		}
	}
	.form{
		margin-top: 100rpx;
	}
</style>
