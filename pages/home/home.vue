<template>
	<view>
		<u-navbar :is-back="false" title="" :show-title="false" :background="{backgroundColor: $cfg.background_color}" :border-bottom="false">
			<text class="nav-item">HFUTGo</text>
			<u-loading mode="circle" class="nav-item" :color="$cfg.theme_color" size="40" :show="showLoading"></u-loading>
		</u-navbar>
		<view class="body">
			<menu-page v-show="current == 0" v-model="current"/>
			<today v-show="current == 1" v-model="showLoading" />
			<my v-show="current == 2" />
		</view>
		<u-tabbar v-model="current" :list="list" :mid-button="true" active-color="#4da0e0" :border-top="true"></u-tabbar>
		<s-popup :title="`v${updateLog_[0].version} 更新日志`" v-model="showUpdate" mode="center">
			<rich-text :nodes="updateLog_[0].log"></rich-text>
		</s-popup>
	</view>
</template>

<script>
	import my from './my.vue'
	import today from './today.vue'
	import menuPage from './menu.vue'
	import updateLog from '../../common/data/update_log.js'
	export default {
		components:{
			my,
			today,
			menuPage
		},
		data() {
			return {
				current: 1,
				list: [
					{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '功能大全',
						customIcon: false,
					},
					{
						iconPath: "/static/icon/home.png",
						selectedIconPath: "/static/icon/home_selected.png",
						text: '今日',
						midButton: true,
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						isDot: false,
						customIcon: false,
					},
				],
				showUpdate: false,
				updateLog_: updateLog,
				showLoading: true
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN  
			if(wx.hideHomeButton){  
			    wx.hideHomeButton();  
			}  
			// #endif
			this.loadUpdate()
		},
		methods: {
			loadUpdate(){
				let updating = uni.getStorageSync('updating')
				console.log(updating)
				if(updating){
					this.showUpdate = true
					uni.setStorageSync('updating', false)
				}
			}
		}
	}
</script>

<style>
	.body{
		padding: 30rpx;
	}
	.todaybody{
		padding: 20rpx;
	}
	.nav-item{
		margin-left: 30rpx;
	}
</style>
