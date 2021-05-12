<template name="menu-page">
	<view>
		<view class="group">
			<text class="title">日常生活</text>
			<u-grid col="3" :border="false">
				<u-grid-item>
					<u-icon name="photo" :size="46"></u-icon>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="group">
			<text class="title">日常生活</text>
			<u-grid col="3" :border="false">
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="group">
			<text class="title">日常生活</text>
			<u-grid col="3" :border="false">
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
				<u-grid-item>
					<text>test</text>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'menu-page',
		data() {
			return {
				
			};
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
		padding: 5px;
	}
	.title{
		padding: 20rpx;
		font-size: 30rpx;
	}
</style>
