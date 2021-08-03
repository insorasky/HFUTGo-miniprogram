<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="tip">
			<u-loading size="100" :color="$cfg.theme_color"></u-loading>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			if(!uni.getStorageSync('userInfo')){
				uni.reLaunch({
					url: '/pages/user/login'
				})
				return
			}
			this.$user.initialize().then(data => {
				uni.reLaunch({
					url: '/pages/home/home'
				})
			}).catch(err => {
				if(err == 'password_error'){
					this.$refs.uTips.show({
						title: '密码错误',
						type: 'error'
					})
					setTimeout(function(){
						uni.reLaunch({
							url: '/pages/user/login'
						})
					}, 2000)
				}else{
					uni.reLaunch({
						url: '/pages/home/home'
					})
				}
				console.log(err)
			})
		}
	}
</script>

<style lang="scss">
	.tip{
		position: absolute;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>