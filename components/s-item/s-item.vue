<template name="s-item">
	<view class="item">
		<view class="button">
			<u-cell-item title="123"></u-cell-item>
		</view>
	</view>
</template>

<script>
	export default {
		name:"s-item",
		data() {
			return {
				customStyle: {
					
				}
			};
		}
	}
</script>

<style lang="scss">
	.item{
		margin: 20px;
		border: 1rpx;
		border-style: solid;
		border-radius: 15px;
	}
</style>
