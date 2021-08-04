<template>
	<view>
		<view style="margin: 10rpx;">
			<u-alert-tips type="warning" :description="alert"></u-alert-tips>
			<view style="margin-top: 10rpx;">
				<u-button type="primary" @click="copyLink">复制原文链接</u-button>
			</view>
			<!--<rich-text :nodes="html" type="text"></rich-text>-->
			<view class="content">
				<text>{{text}}</text>
			</view>
		</view>
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
			this.url = decodeURIComponent(res.url)
			this.$request('/channel/article', 'GET', {
				'url': this.url
			}).then(data => {
				this.html = data.html
				this.text = data.text.replace(/ +/g, ' ').replace(/ \n/g, '').replace(/\n+/g, '\n')
			}).catch(err => {
				this.text = '该链接非学校域名（hfut.edu.cn）下的链接，请点击上方”复制原文链接”按钮后到浏览器查看原文！'
			})
		}
	}
</script>

<style lang="scss">
	.content{
		margin-top: 10rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		border-style: solid;
		border-width: 2rpx;
		padding: 20rpx;
	}
</style>
