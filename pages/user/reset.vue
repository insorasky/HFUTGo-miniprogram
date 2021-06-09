<template>
	<view class="body">
		<u-top-tips ref="uTips"></u-top-tips>
		<u-steps :list="list" :current="currentStep" mode="number" class="steps"></u-steps>
		<view v-if="currentStep == 0" class="form">
			<s-input placeholder="请输入要找回的学工号" v-model="id"></s-input>
			<view class="item">
				<view class="title">
					<text>请选择找回方式：</text>
				</view>
				<u-radio-group v-model="method">
					<u-radio name="phone">手机</u-radio>
					<u-radio name="mail">邮箱</u-radio>
				</u-radio-group>
			</view>
			<u-row gutter="16">
				<u-col span="8">
					<s-input placeholder="请输入验证码" v-model="captcha"></s-input>
				</u-col>
				<u-col span="4">
					<u-image :src="captchaImage" mode="aspectFit" height="100" @click="newSession"></u-image>
				</u-col>
			</u-row>
			<u-button @tap="getCode" type="primary" @click="getCode">获取验证码</u-button>
		</view>
		<view v-else-if="currentStep == 1" class="form">
			<s-input placeholder="请输入您收到的验证码" v-model="code"></s-input>
			<u-button @tap="verifyCode" type="success" @click="verifyCode" :disabled="code == ''">提交验证码</u-button>
			<u-verification-code
				:seconds="60"
				@change="codeTimeChange"
				ref="uCode"
				start-text="没收到？重新获取"
				change-text="x秒后重新获取"
				end-text="没收到？重新获取"
			></u-verification-code>
			<u-button @tap="newCode" type="primary" @click="newCode" style="margin-top: 30rpx;" :plain="codeTip != '没收到？重新获取'" :disabled="codeTip != '没收到？重新获取'">{{codeTip}}</u-button>
			<u-button @tap="goStep(0)" @click="goStep(0)" style="margin-top: 30rpx;">返回上一步</u-button>
		</view>
		<view v-else-if="currentStep == 2" class="form">
			<s-input v-model="password" placeholder="请输入新密码" :password="true"></s-input>
			<s-input v-model="password2" placeholder="请再次输入新密码" :password="true"></s-input>
			<u-alert-tips type="error" v-show="password != password2" title="两次密码不相同"></u-alert-tips>
			<u-button @click="setPassword" :disabled="(password != password2) || (password == '') || (password2 == '')" style="margin-top: 30rpx;">重置密码</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{name: '填写信息'},
					{name: '短信/邮箱验证'},
					{name: '重置密码'}
				],
				currentStep: 0,
				method: 'phone',
				id: '',
				captcha: '',
				captchaImage: '',
				code: '',
				ticket: '',
				boss_ticket: '',
				random: '',
				codeTip: '',
				password: '',
				password2: '',
			};
		},
		methods:{
			getCode(){
				this.$request('/user/forgot/get_code', 'GET', {
					id: this.id,
					type: this.method,
					captcha: this.captcha,
					vpn_ticket: this.ticket
				}).then(data => {
					this.random = data.random
					this.currentStep = 1
					this.$refs.uCode.start()
				}).catch(err => {
					this.$refs.uTips.show(err.error)
				})
			},
			newSession(){
				this.$request('/user/forgot/get_session').then(data => {
					this.captchaImage = data.captcha
					this.ticket = data.vpn_ticket
				})
			},
			verifyCode(){
				this.$request('/user/forgot/verify', 'GET', {
					id: this.id,
					code: this.code,
					random: this.random,
					vpn_ticket: this.ticket
				}).then(data => {
					this.boss_ticket = data.boss_ticket
					this.currentStep = 2
				}).catch(err => {
					this.$refs.uTips.show(err.error)
				})
			},
			goStep(index){
				if(index == 0) this.newSession()
				this.currentStep = index
			},
			newCode(){
				this.getCode()
			},
			codeTimeChange(text){
				this.codeTip = text
			},
			setPassword(){
				this.$request('/user/forgot/reset', 'GET', {
					'ticket': this.boss_ticket,
					'password': this.password,
					'vpn_ticket': this.ticket
				}).then(data => {
					this.$refs.uTips.show('修改成功')
					setInterval(() => {
						uni.navigateBack()
					}, 2000)
				})
			}
		},
		onLoad() {
			this.newSession()
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
