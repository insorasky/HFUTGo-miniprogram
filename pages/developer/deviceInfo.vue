<template>
	<view class="body">
		<u-card title="系统信息" margin="20rpx">
			<view slot="body">
				<textarea
					:value="info"
					:disabled="true"
					style="width: 100%; border-style: solid; border-color: #DFDFDF; border-width: 1rpx;"
					:auto-height="true"
				></textarea>
				<u-checkbox
					v-model="pwd"
					@change="showPwd"
				>我愿意提供信息门户密码用于解决少数问题（勾选此项后请勿发表到公开页面）</u-checkbox>
				<u-button style="margin-top: 10rpx;" type="primary" @click="copy">复制数据</u-button>
			</view>
		</u-card>
		<u-card title="食用方法" margin="20rpx">
			<view slot="body" style="font-size: 30rpx;">
				<text>请将上述内容复制后，通过“我的——反馈问题”中的任一渠道发送给作者，便于作者分析问题；\n</text>
				<text>如果您是预科生/研究生/教职工或因特殊原因导致您的结果与他人不同，建议勾选“我愿意提供信息门户密码用于解决少数问题”以便于本科生作者登录您的帐号排查问题。</text>
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pwd: false,
				info: JSON.stringify(uni.getSystemInfoSync())
			};
		},
		methods: {
			showPwd(){
				var data = uni.getSystemInfoSync()
				let user = this.pwd ? {} : {
					id: this.$user.getUserInfo().id,
					password: this.$user.getUserInfo().password
				};
				Object.assign(data, user)
				this.info = JSON.stringify(data)
			},
			copy(){
				uni.setClipboardData({
					data: this.info,
					success() {
						uni.showToast({
							icon: 'success',
							title: '复制成功'
						})
					},
					fail() {
						uni.showToast({
							icon: 'none',
							title: '复制失败'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
