<template name="s-item">
	<view class="item">
		<view class="button">
			<u-cell-item
			:title="title"
			:value="value"
			:label="label"
			hover-class="none"
			:arrow="arrow"
			:border-bottom="false"
			:title-style="titleStyle"
			:value-style="valueStyle"
			:label-style="labelStyle"
			:center="true"
			>
				<view slot="right-icon">
					<slot />
				</view>
			</u-cell-item>
		</view>
	</view>
</template>

<script>
	import uCellItem from '../../uview-ui/components/u-cell-item/u-cell-item.vue'
	export default {
		name:"s-item",
		components: {
			uCellItem
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: ''
			},
			label: {
				type: String,
				default: ''
			},
			arrow: {
				type: Boolean,
				default: false
			},
			titleStyle: {
				type: Object,
				default() {
					return {}
				}
			},
			valueStyle: {
				type: Object,
				default() {
					return {}
				}
			},
			labelStyle: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.item{
		border: 1px;
		border-style: solid;
		border-color: #C0C0C0;
		border-radius: 15px;
		margin-bottom: 10px;
		background-color: #FFFFFF;
		padding: 5px;
	}
	.button{
		
	}
</style>
