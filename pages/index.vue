<template>
	<view>
		<view class="body">
			<menu-page v-show="current == 0" />
			<today v-show="current == 1" />
			<my v-show="current == 2" />
		</view>
		<u-tabbar v-model="current" :list="list" :mid-button="true" active-color="#4da0e0" :border-top="false"></u-tabbar>
		<s-popup :title="`v${updateLog_[0].version} 更新日志`" v-model="showUpdate" mode="center">
			<text>{{updateLog_[0].log}}</text>
		</s-popup>
	</view>
</template>

<script>
	import my from './home/my.vue'
	import today from './home/today.vue'
	import menuPage from './home/menu.vue'
	import updateLog from '../common/data/update_log.js'
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
				updateLog_: updateLog
			}
		},
		onLoad() {
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
</style>
