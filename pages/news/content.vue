<template>
	<view>
		<view style="margin: 10rpx; margin-bottom: 130rpx;">
			<view class="content">
				<view class="title">
					<text>{{title}}</text>
				</view>
				<u-divider :useSlot="false" margin-top="10" margin-bottom="10" half-width="350"></u-divider>
				<rich-text :nodes="html"></rich-text>
			</view>
			<view class="bottom">
				<text>看什么？莫得了</text>
			</view>
			<uni-fab
				horizontal="right"
				:popMenu="true"
				:content="[
					{
						text: '复制链接',
						iconPath: '/static/icon/copy.png',
						active: false
					}
				]"
				@trigger="copyLink"
			>
				<u-icon name="info" color="white" size="64"></u-icon>
			</uni-fab>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				text: '',
				title: '',
				html: '',
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
				this.title = data.title
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
		word-wrap: break-word;
	}
	.title{
		font-size: 35rpx;
	}
	.bottom{
		margin: 10rpx;
		text-align: center;
		color: #82848A;
	}
</style>
