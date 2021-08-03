<template>
	<view>
		<view style="margin: 10rpx;">
			<u-alert-tips type="warning" :description="alert"></u-alert-tips>
			<u-button type="primary" @click="copyLink" style="margin-top: 10rpx;">复制原文链接</u-button>
		</view>
		<!--<rich-text :nodes="html" type="text"></rich-text>-->
		<text>{{text}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				text: '',
				html: '',
				alert: '此处的新闻内容为系统根据页面自动生成，仅供参考，可能因处理不完善造成排版出错或关键内容缺失。由于微信不允许小程序内显示网页，建议点击下方按钮复制原文链接后在浏览器中查看。'
			};
		},
		methods: {
			copyLink(){
				uni.setClipboardData({
					data: this.url,
					success() {
						uni.showToast({
							icon: 'success',
							title: '复制成功'
						})
					}
				})
			}
		},
		onLoad(res) {
			this.url = res.url
			this.$request('/channel/article', 'GET', {
				'url': res.url
			}).then(data => {
				this.html = data.html
				this.text = data.text
			})
		}
	}
</script>

<style lang="scss">
	
</style>
