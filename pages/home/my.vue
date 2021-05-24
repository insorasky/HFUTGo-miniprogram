<template name="my">
	<view>
		<view class="group">
			<u-cell-group :border="false">
				<u-cell-item :arrow="false" :border-bottom="false">
					<u-avatar slot="icon" />
					<view slot="title" style="padding-left: 30rpx;">
						<text style="font-size: 40rpx;">{{userInfo.name}}</text><br />
						<text style="font-size: 30rpx;">{{userInfo.className}}</text>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="group">
			<u-cell-group :border="false" title="设置">
				<u-cell-item icon="home" title="聚合今日首页"></u-cell-item>
				<u-cell-item icon="account" title="帐号密码"></u-cell-item>
				<u-cell-item icon="calendar" title="课程表"></u-cell-item>
				<u-cell-item icon="setting" title="其他设置" :border-bottom="false"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="group">
			<u-cell-group :border="false">
				<u-cell-item icon="info-circle" title="关于小程序"></u-cell-item>
				<u-cell-item icon="kefu-ermai" title="反馈"></u-cell-item>
				<u-cell-item icon="close-circle" title="退出登录" :border-bottom="false" @click="logout"></u-cell-item>
			</u-cell-group>
		</view>
		<text class="copyright">Sora 版权所有 ©2021</text>
	</view>
</template>

<script>
	export default {
		name:'my',
		data() {
			return {
				userInfo: this.$user.getUserInfo()
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
</style>
