<template name="s-input">
	<view class="item" :style="'background-color:' + bgColor">
		<view class="input">
			<input :placeholder="placeholder" v-model="content" :password="password" />
		</view>
	</view>
</template>

<script>
	export default {
		name:"s-input",
		data() {
			return {
				content: "",
			}
		},
		props: {
			value: {
				type: String,
				default: ""
			},
			placeholder: {
				type: String,
				default: "请输入内容"
			},
			password: {
				type: Boolean,
				default: false
			},
			bgColor: {
				type: String,
				default: '#FFFFFF'
			}
		},
		watch:{
			value(newVal, oldVal){
				if(newVal != oldVal) this.content = newVal
			},
			content(newVal, oldVal){
				if(newVal != oldVal) this.$emit('input', newVal)
			}
		},
		created() {
			this.content = this.value
		}
	}
</script>

<style lang="scss">
	.item{
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		border-radius: 10px;
	}
	.input{
		padding: 20rpx;
	}
</style>
