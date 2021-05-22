<template name="s-list">
	<view>
		<u-cell-group :border="border">
			<slot />
			<u-empty :show="empty" text="是空的诶o(╥﹏╥)o" :mode="mode" :class="full ? 'full_empty' : ''" margin-top="30rpx"></u-empty>
		</u-cell-group>
	</view>
</template>

<script>
	import uCellGroup from '../../uview-ui/components/u-cell-group/u-cell-group.vue'
	export default {
		name:"s-list",
		props: {
			empty: {
				type: Boolean,
				default: false
			},
			full: {
				type: Boolean,
				default: false
			},
			mode: {
				type: String,
				default: 'list'
			},
			border: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.full_empty{
		
	}
</style>
