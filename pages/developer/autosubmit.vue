<template>
	<view class="body">
		<u-top-tips ref="uTips"></u-top-tips>
		<view>
			<view style="margin-bottom: 30rpx;">
				<u-alert-tips
					type="warning"
					title="开发者模式——自动打卡"
					description="这是实验性功能，请务必低调使用，不宜声张。若使用此功能出现任何问题和风险，作者不承担任何责任，所有风险由您自己承担。"
					:show-icon="true"
				></u-alert-tips>
			</view>
			<!--
			<view style="margin-bottom: 30rpx;">
				<u-alert-tips type="primary" description="当您点击启用该功能时，可能会弹出微信登录和打卡通知提醒，请点击同意并勾选不再提示。"
					style="margin-bottom: 30rpx;"></u-alert-tips>
			</view>
			<view style="margin-bottom: 30rpx;">
				<u-alert-tips type="primary" description="学工系统默认密码为身份证后8位。"
					style="margin-bottom: 30rpx;"></u-alert-tips>
			</view>
			-->
		</view>
		<view class="form">
			<view style="padding: 25rpx;">
				<text>当前状态：{{enabled ? '已启用' : '已禁用'}}</text>
			</view>
			<!--<u-field label="学工密码" v-model="password" :password="true" v-if="!enabled"></u-field>-->
			<u-button type="primary" @click="submit">{{enabled ? '禁用' : '启用'}}自动打卡</u-button>
		</view>
		<view class="form">
			<s-list title="打卡记录(最近20条)" :empty="log.length == 0" :cell-group="true" :border="false">
				<u-cell-item v-for="(item,i) in log" :title="item.time" :value="item.log" :arrow="false" :key="i"></u-cell-item>
			</s-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				enabled: false,
				log: [],
			};
		},
		onLoad() {
			this.$request('/dev/auto_submit/status').then(data => {
				this.enabled = data.result
			})
			this.$request('/dev/auto_submit/log?page=1').then(data => {
				this.log = data
			})
		},
		methods:{
			submit(){
				if(this.enabled){
					this.$request('/dev/auto_submit/stop').then(data => {
						this.enabled = false
						this.$refs.uTips.show({
							title: '已禁用',
							type: 'success'
						})
					})
				}else{
					/*
					console.log("weixin")
					uni.login({
						provider: 'weixin',
						success: (res) => {
					*/
					this.$request('/dev/auto_submit/setup', 'GET', {
						password: this.$user.getUserInfo()['password']
					}).then(data => {
						if(data == true){
							this.enabled = true
							this.$refs.uTips.show({
								title: '设置成功',
								type: 'success'
							})
							/*
							wx.requestSubscribeMessage({
								tmplIds: ['5IPVDE4c6CH09H1fMX_MQVHAA3rrf7amPuyEAH_YBQ4'],
								success: (res) => {
									if(res['5IPVDE4c6CH09H1fMX_MQVHAA3rrf7amPuyEAH_YBQ4'] == 'accept'){
										uni.showToast({
											title: '设置成功',
											icon: 'success'
										})
									}else{
										uni.showToast({
											title: '设置成功但通知激活失败，如需通知请禁用重试',
											icon: 'none'
										})
									}
								}
							})
							*/
						}
					}).catch(err => {
						this.$refs.uTips.show({
							title: err.error + "(" + err.status + ")",
							type: 'error'
						})
					})
					/*
						},
						fail: (res) => {
							uni.showToast({
								title: '登录失败',
								icon: 'none'
							})
							console.log(res)
						}
					})
					*/
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #555555;
	}
	.body{
		margin: 30rpx;
	}
	.form{
		background-color: #FFFFFF;
		border-radius: 15rpx;
		padding: 10rpx;
		margin-bottom: 30rpx;
	}
</style>
