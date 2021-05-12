<template name="s-notice">
	<view>
		<u-notice-bar border-radius="100" mode="horizontal" :list="noticeList" :type="theme" :more-icon="true" @getMore="showList = true" @click="showList = true" />
		<s-popup title="通知列表" v-model="showList" mode="center">
			<view v-for="(notice, index) in notices" :key="index">
				<view class="notice_item">
					<u-alert-tips :type="notice.theme" :title="notice.text" :desc-style="desc_style" />
				</view>
			</view>
		</s-popup>
	</view>
</template>

<script>
	import uNoticeBar from '../../uview-ui/components/u-notice-bar/u-notice-bar.vue'
	import uAlertTips from '../../uview-ui/components/u-alert-tips/u-alert-tips.vue'
	import sPopup from '../s-popup/s-popup.vue'
	export default {
		name:"s-notice",
		components:{
			uNoticeBar,
			uAlertTips,
			sPopup
		},
		props: {
			page: {
				type: String,
				default: 'login'
			}
		},
		data() {
			return {
				notices: [],
				noticeList: [],
				theme: '',
				showList: false,
				desc_style: {
					'font-size': '30rpx'
				}
			};
		},
		created() {
			this.$request('/others/notice', 'GET', {'page': this.page}).then(res => {
				this.notices = res.notices
				res.notices.forEach((item, index, arr) => {
					this.noticeList.push(item.text)
				})
				this.theme = res.theme
			})
		}
	}
</script>

<style lang="scss">
	.notice_item{
		padding-top: 15rpx;
		padding-bottom: 15rpx;
	}
</style>
