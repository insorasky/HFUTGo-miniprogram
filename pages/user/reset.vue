<template>
	<view class="body">
		<u-steps :list="list" :current="currentStep" mode="number" class="steps"></u-steps>
		<view v-if="currentStep == 0" class="form">
			<s-input placeholder="请输入要找回的学工号"></s-input>
			<view class="item">
				<view class="title">
					<text>请选择找回方式：</text>
				</view>
				<u-radio-group v-model="method">
					<u-radio name="phone">手机</u-radio>
					<u-radio name="email">邮箱</u-radio>
				</u-radio-group>
			</view>
			<s-input placeholder="请输入验证码"></s-input>
			<u-verification-code seconds="60" @end="" @start="" ref="uCode" @change=""></u-verification-code>
			<u-row gutter="16">
				<u-col span="6">
					<u-button @tap="getCode" type="primary">获取验证码</u-button>
				</u-col>
				<u-col span="6">
					<u-button type="success">验证</u-button>
				</u-col>
			</u-row>
		</view>
		<view v-else-if="currentStep == 1" class="form">
			<text>找回密码</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{name: '填写信息'},
					{name: '重置密码'}
				],
				currentStep: 0,
				method: 'phone'
			};
		}
	}
</script>

<style lang="scss">
	.body{
		margin: 30rpx;
	}
	.steps{
		background-color: #FFFFFF;
		border-radius: 30rpx;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
	}
	.form{
		margin-top: 30rpx;
	}
	.item{
		margin-top: 30rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		width: 100%;
		padding: 10rpx;
		font-size: 30rpx;
	}
	.title{
		float: left;
		margin: 5rpx;
		margin-left: 20rpx;
	}
</style>
