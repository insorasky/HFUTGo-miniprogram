<template>
	<view class="body">
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
		</view>
		<view
			style="margin-top: 50rpx; color: #007AFF; float: right;"
			@click="showHelp = true">
			<text>忘记密码/密码正确仍无法登录？</text>
		</view>
		<s-popup title="无法登录？" v-model="showHelp">
			<text class="subtitle">密码正确却无法登录？</text>
			<view class="tipbody">
				<text>请确认使用的是您在新版东软平台（新版信息门户：one.hfut.edu.cn）而非旧版金智平台（旧版信息门户：my.hfut.edu.cn）/教务系统/VPN/校园网的帐号。</text>
			</view>
			<text class="subtitle">我忘记了密码？</text>
			<view class="tipbody">
				<text>默认密码为身份证号后六位。如果您修改过密码，请登录信息门户或前往本校区信息化中心重置密码。</text>
			</view>
			<text class="subtitle">还是无法登录？</text>
			<view class="tipbody">
				<text>可能是学校系统又抽风或更改设置了，请点击下方的按钮联系作者反馈问题：</text>
			</view>
			<u-button type="primary" shape="circle" plain :ripple="true" open-type="contact" style="margin-top: 15px;">联系作者微信</u-button>
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
			login(){
				console.log(this.$user.login(this.id, this.password))
			}
		},
		onLoad() {
			
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
