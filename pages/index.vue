<template>
	<view>
		<view class="body">
			<menu-page v-show="current == 0" />
			<today v-show="current == 1" />
			<my v-show="current == 2" />
		</view>
		<u-tabbar v-model="current" :list="list" :mid-button="true" :active-color="$cfg.theme_color"></u-tabbar>
	</view>
</template>

<script>
	import my from './home/my.vue'
	import today from './home/today.vue'
	import menuPage from './home/menu.vue'
	export default {
		components:{
			my,
			today,
			menuPage
		},
		data() {
			return {
				user: {},
				current: 1,
				list: [
					{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '功能大全',
						customIcon: false,
					},
					{
						iconPath: "home",
						selectedIconPath: "home-fill",
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
				]
			}
		},
		onLoad() {
			this.user = this.$user.getUserInfo()
			console.log(this.user.name)
		},
		methods: {

		}
	}
</script>

<style>
	.body{
		padding: 30rpx;
	}
</style>
