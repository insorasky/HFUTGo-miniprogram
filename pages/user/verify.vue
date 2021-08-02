<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<u-steps
			:list="[
				{ name: '设置邮箱' },
				{ name: '设置手机' },
				{ name: '设置密码' },
				{ name: '完成设置' },
			]"
			style="margin-top: 40rpx; margin-bottom: 20rpx;"
			:current="currentStep"
			mode="number"
			icon="map"
		></u-steps>
		<view class="body">
			<view v-show="currentStep == 0">
				<s-input placeholder="请输入邮件地址" v-model="email"></s-input>
				<u-button type="primary" @click="getEmailCode" :disabled="!emailCodeAvailable">{{emailTip}}</u-button>
				<u-verification-code seconds="60" ref="email" @change="emailChange"></u-verification-code>
				<s-input placeholder="请输入验证码" v-model="email_code"></s-input>
				<u-button type="success" @click="setEmail" :disabled="!emailCanNext">下一步</u-button>
			</view>
			<view v-show="currentStep == 1">
				<s-input placeholder="请输入手机号码" v-model="phone"></s-input>
				<u-button type="primary" @click="getPhoneCode" :disabled="!phoneCodeAvailable">{{phoneTip}}</u-button>
				<u-verification-code seconds="60" ref="phone" @change="phoneChange"></u-verification-code>
				<s-input placeholder="请输入验证码" v-model="phone_code"></s-input>
				<u-button type="success" @click="setPhone" :disabled="!phoneCanNext">下一步</u-button>
			</view>
			<view v-show="currentStep == 2">
				<s-input placeholder="请输入新密码" v-model="password" :password="true"></s-input>
				<u-button type="success" @click="setPassword">下一步</u-button>
			</view>
			<view v-show="currentStep == 3" class="finish">
				<u-icon size="250" name="checkmark-circle-fill" color="#009933"></u-icon>
				<view style="font-size: 45rpx; text-align: center; margin-bottom: 35rpx;">
					<text>设置完成！</text>
				</view>
				<u-button type="success" @click="finish">返回登录页</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentStep: 0,
				vpn_ticket: '',
				boss_ticket: '',
				username: '',
				email: '',
				email_code: '',
				phone: '',
				phone_code: '',
				password: '',
				old_password: '',
				emailTip: '',
				phoneTip: '',
			}
		},
		methods: {
			getEmailCode(){
				this.$request('/user/new_user/get_email_code', 'GET', {
					vpn_ticket: this.vpn_ticket,
					username: this.username,
					email: this.email
				}).then(data => {
					this.$refs.uTips.show({
						title: '验证码已经发送，请注意查收',
						type: 'success',
						duration: 2000
					})
					this.$refs.email.start()
				}).catch(err => {
					this.$refs.uTips.show({
						title: err.error,
						type: 'error',
						duration: 2000
					})
					console.log(err)
				})
			},
			setEmail(){
				this.$request('/user/new_user/verify_email', 'GET', {
					vpn_ticket: this.vpn_ticket,
					username: this.username,
					email: this.email,
					code: this.email_code,
					boss_ticket: this.boss_ticket
				}).then(data => {
					this.currentStep = 1
				}).catch(err => {
					this.$refs.uTips.show({
						title: err.error,
						type: 'error',
						duration: 2000
					})
				})
			},
			getPhoneCode(){
				this.$request('/user/new_user/get_phone_code', 'GET', {
					vpn_ticket: this.vpn_ticket,
					username: this.username,
					phone: this.phone
				}).then(data => {
					this.$refs.uTips.show({
						title: '验证码已经发送，请注意查收',
						type: 'success',
						duration: 2000
					})
					this.$refs.phone.start()
				}).catch(err => {
					this.$refs.uTips.show({
						title: err.error,
						type: 'error',
						duration: 2000
					})
					console.log(err)
				})
			},
			setPhone(){
				this.$request('/user/new_user/verify_phone', 'GET', {
					vpn_ticket: this.vpn_ticket,
					username: this.username,
					phone: this.phone,
					code: this.phone_code,
					boss_ticket: this.boss_ticket
				}).then(data => {
					this.currentStep = 2
				}).catch(err => {
					console.log(err)
					this.$refs.uTips.show({
						title: err.error,
						type: 'error',
						duration: 2000
					})
				})
			},
			setPassword(){
				this.$request('/user/new_user/set_password', 'GET', {
					username: this.username,
					old: this.old_password,
					new: this.password,
					vpn_ticket: this.vpn_ticket
				}).then(data => {
					this.currentStep = 3
				}).catch(err => {
					console.log(err)
					this.$refs.uTips.show({
						title: err.error,
						type: 'error',
						duration: 2000
					})
				})
			},
			finish(){
				uni.navigateBack()
			},
			emailChange(text){
				this.emailTip = text
			},
			phoneChange(text){
				this.phoneTip = text
			}
		},
		onLoad(res) {
			this.vpn_ticket = res.vpn_ticket
			this.boss_ticket = res.boss_ticket
			this.username = res.username
			this.old_password = res.old_password
		},
		computed: {
			emailCodeAvailable(){
				return this.email != "" && this.$refs.email.canGetCode
			},
			phoneCodeAvailable(){
				return this.phone != "" && this.$refs.phone.canGetCode
			},
			emailCanNext(){
				return this.email_code != "" && this.email != ""
			},
			phoneCanNext(){
				return this.phone_code != "" && this.phone != ""
			}
		}
	}
</script>

<style>
	.body{
		margin: 40rpx;
	}
	.finish{
		display: table;
		margin: 0 auto;
		margin-top: 100rpx;
	}
</style>
