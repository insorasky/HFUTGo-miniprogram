<template name="s-list">
	<view
		class="list"
		:style="full ? {
			height: 'calc(100vh - ' + otherHeight + ')',
			margin: margin
		}: {
			margin: margin
		}"
	>
		<u-cell-group :border="border" v-show="cellGroup" :bg-color="bgColor" :title="title">
			<slot />
		</u-cell-group>
		<view v-show="!cellGroup">
			<slot />
		</view>
		<view class="parent">
			<u-empty
				v-show="showEmpty"
				text="是空的诶o(╥﹏╥)o"
				:mode="mode"
				:class="full ? 'full_empty' : ''"
				margin-top="30rpx"
				:style="full ? {
					height: 'calc(100vh - ' + otherHeight + ')'
				}: {}"
			></u-empty>
		</view>
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
			},
			otherHeight: {
				type: String,
				default: '0rpx'
			},
			cellGroup: {
				type: Boolean,
				default: true
			},
			bgColor: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			margin: {
				type: String,
				default: '20rpx'
			}
		},
		data() {
			return {
				showEmpty: false
			};
		},
		watch:{
			empty: {
				immediate: true,
				handler(newVal, oldVal){
					console.log('empty')
					console.log(newVal)
					if(newVal != oldVal) this.showEmpty = newVal
				}
			}
		},
		created() {
			this.showEmpty = this.empty
		}
	}
</script>

<style lang="scss">
	.list{
		
	}
	.full_empty{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.parent{
		position: absolute;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
