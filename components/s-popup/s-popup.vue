<template name="s-popup">
	<view>
		<u-popup :mode="mode" border-radius="14" v-model="showing" :closeable="true" :width="width" :height="height">
			<view class="popupbody">
				<view class="popuptitle">
					<text>{{title}}</text>
				</view>
				<view>
					<slot />
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uPopup from '../../uview-ui/components/u-popup/u-popup.vue'
	export default {
		name:"s-popup",
		components:{
			uPopup
		},
		props:{
			value: {
				type: Boolean,
				default: false
			},
			title:{
				type: String,
				default: ''
			},
			mode:{
				type: String,
				default: 'bottom'
			}
		},
		data() {
			return {
				showing: true,
				height: "",
				width: ""
			};
		},
		watch:{
			value(newVal, oldVal){
				if(newVal != oldVal) this.showing = newVal
			},
			showing(newVal, oldVal){
				if(newVal != oldVal) this.$emit('input', newVal)
			}
		},
		created() {
			this.showing = this.value
			if(this.mode != 'bottom'){
				this.height = '850rpx'
				this.width = '600rpx'
			}
		}
	}
</script>

<style lang="scss">
	.popupbody{
		padding: 50rpx;
	}
	.popuptitle{
		font-size: 50rpx;
		padding-bottom: 20rpx;
	}
</style>
