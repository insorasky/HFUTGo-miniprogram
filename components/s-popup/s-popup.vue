<template name="s-popup">
	<view>
		<u-popup :mode="mode" border-radius="14" v-model="showing" :closeable="true" :width="width" :border-radius="35">
			<view class="popupbody">
				<view class="popuptitle">
					<text>{{title}}</text>
				</view>
				<view class="subtitle" v-show="subtitle != ''">
					<text>{{subtitle}}</text>
				</view>
				<scroll-view scroll-y="true" :style="'height: ' + height + ';'">
					<view>
						<slot />
					</view>
				</scroll-view>
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
			subtitle:{
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
				this.height = '750rpx'
				this.width = '650rpx'
			}
		},
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
	.subtitle{
		font-size: 35rpx;
		position:relative;
		padding-left:30rpx;
		color: #808080;
		box-sizing:content-box;
		&::after{
			position:absolute;
			content:"";
			left:10rpx;top:10rpx;
			height:24rpx;width:6rpx;
			border-radius:30px;
			background-color:#999;
			z-index:2;
		}
	}
</style>
