<template name="my">
	<view>
		<u-top-tips ref="uTips" :navbar-height="titleHeight"></u-top-tips>
		<view class="group">
			<u-cell-group :border="false">
				<u-cell-item :arrow="false" :border-bottom="false" @click="showDev">
					<view class="avatar" slot="icon">
						<view v-if="debug">
							<image src="../../static/img/avatar_default.jpg" class="avatarimg" mode='widthFix'></image>
						</view>
						<view v-else>
							<open-data type="userAvatarUrl" slot="icon" class="avatarimg"></open-data>
						</view>
					</view>
					<view slot="title" style="padding-left: 30rpx;">
						<text style="font-size: 40rpx;">{{userInfo.name}}</text><br />
						<text style="font-size: 30rpx;">{{userInfo.className}}</text>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="group">
			<u-cell-group :border="false" title="设置">
				<u-cell-item icon="account" title="帐号密码" @click="showPassword = true"></u-cell-item>
				<u-cell-item icon="setting" title="其他设置" @click="showOtherSettings = true"></u-cell-item>
				<u-cell-item icon="home" title="聚合今日首页" @click="coming()"></u-cell-item>
				<u-cell-item icon="calendar" title="课程表" @click="coming()" :border-bottom="false"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="group">
			<u-cell-group :border="false">
				<u-cell-item icon="info-circle" title="关于小程序" @click="showAbout = true"></u-cell-item>
				<u-cell-item icon="kefu-ermai" title="反馈" @click="showContact = true"></u-cell-item>
				<u-cell-item icon="close-circle" title="退出登录" :border-bottom="false" @click="logout"></u-cell-item>
			</u-cell-group>
		</view>
		<text class="copyright">Sora 版权所有 ©2021</text>
		<s-popup title="关于" v-model="showAbout" class="about">
			<text>Sora 版权所有 ©2021</text>
			<!--
			<u-link href="https://www.sorasky.in/" :under-line="true" font-size="35">博客：https://www.sorasky.in/</u-link><br />
			<u-link href="https://github.com/hfutgo-server/" :under-line="true" font-size="35">服务端开源地址：https://github.com/hfutgo-server/</u-link><br />
			<u-link href="https://github.com/HFUTGo-miniprogram/" :under-line="true" font-size="35">小程序端开源地址：https://github.com/HFUTGo-miniprogram/</u-link><br />
			<text>喜欢的话给个Star呗！</text>
			-->
			<view class="update-log">
				<text class="subtitle">更新日志</text>
				<u-collapse>
					<u-collapse-item :title="'V' + item.version" v-for="(item, i) in updateLog.slice(0, 3)" :key="i">
						<rich-text :nodes="item.log"></rich-text>
					</u-collapse-item>
				</u-collapse>
			</view>
		</s-popup>
		<s-popup title="反馈" v-model="showContact">
			<view style="margin-bottom: 20rpx;">
				<u-button type="success" open-type="contact">点击联系作者微信</u-button>
			</view>
			<view>
				<u-button @click="copyGroupNum()" type="primary">点击加入QQ交流群：862212085</u-button>
			</view>
		</s-popup>
		<s-popup title="设置" v-model="showOtherSettings" @open="getEduadminPwd">
			<u-cell-group>
				<u-cell-item
					title="重置本地缓存并重启小程序"
					@click="resetAll"
					label="仅限出现未知bug时尝试,谨慎使用!"
					:title-style="{color: '#FF0000'}"
				></u-cell-item>
			</u-cell-group>
		</s-popup>
		<s-popup title="帐号密码" v-model="showPassword">
			<u-field
				placeholder="请输入新密码"
				label="教务密码"
				right-icon="checkmark-circle-fill"
				v-model="eduPwd"
				@confirm="setEduadminPwd"
				:error-message="showEduPwdErrMsg ? '必须包含大小写和数字，无汉字等特殊字符，8-16位' : false"
				@input="eduPwdInput"
			></u-field>
		</s-popup>
		<s-popup title="课表设置" v-model="showSchedule">
			
		</s-popup>
	</view>
</template>

<script>
	import updateLog from '../../common/data/update_log.js'
	export default {
		name:'my',
		data() {
			return {
				titleHeight: uni.getSystemInfoSync().statusBarHeight + 44,
				userInfo: this.$user.getUserInfo(),
				showAbout: false,
				showContact: false,
				showOtherSettings: false,
				showSchedule: false,
				showPassword: false,
				updateLog: updateLog,
				eduPwd: '',
				showEduPwdErrMsg: false,
				debug: (process.env.NODE_ENV == 'development'),
				clickTimes: 0,
				sentence: "",
			};
		},
		methods:{
			logout(){
				uni.showModal({
					title:'退出登录',
					content:'确定要退出登录吗？',
					success: (res) => {
						if(res.confirm){
							this.$user.logout()
							uni.reLaunch({
								url: '/pages/user/login'
							})
						}
					}
				})
			},
			coming(){
				uni.showToast({
					icon: 'none',
					title: '敬请期待！'
				})
			},
			copyGroupNum(){
				uni.setClipboardData({
					data: '862212085'
				})
				uni.showToast({
					title: '已复制群号'
				})
			},
			resetAll(){
				uni.showModal({
					title: '确定要重置所有数据？',
					content: '所有数据（密码、个人偏好等）将被删除，不可找回！',
					success: (res) => {
						if(res.confirm){
							uni.clearStorageSync()
							this.$user.reset()
							uni.reLaunch({
								url: '/pages/user/login'
							})
						}
					}
				})
			},
			getEduadminPwd(){
				console.log("getEduadminPwd")
				this.$request('/eduadmin/password/get').then(data => {
					this.eduPwd = data.password
				}).catch(err => {
					this.$refs.uTips.show({
						title: err.error,
						type: 'error'
					})
				})
			},
			setEduadminPwd(){
				if(this.eduPwd == '' || this.showEduPwdErrMsg) return
				this.$request('/eduadmin/password/reset', 'GET', {
					password: this.eduPwd
				}).then(data => {
					this.$refs.uTips.show({
						title: '设置成功',
						type: 'success'
					})
				}).catch(err => {
					console.log(err)
					this.$refs.uTips.show({
						title: err.error,
						type: 'error'
					})
				})
			},
			eduPwdInput(){
				let re1 = /(?=^[\x00-\x7F]{8,16})(?=(.*\d)+)(?=(.*[a-z])+)(?=(.*[A-Z])+)(?=(.*[\x00-\x7F])+).*/i
				this.showEduPwdErrMsg = (this.eduPwd && this.eduPwd.search(re1) == -1)
			},
			showDev(){
				let current = uni.getStorageSync('showDev')
				this.clickTimes++;
				if(this.clickTimes == 5){
					uni.setStorageSync('showDev', !current)
					uni.showToast({
						title: `已${!current ? "启用" : "禁用"}开发者模式`,
						icon: 'none'
					})
					this.clickTimes = 0
				}
			},
			setSentence(){
				uni.setStorageSync("sentence", "")
			}
		},
		beforeCreate() {
			this.sentence = uni.getStorageSync("sentence")
		}
	}
</script>

<style lang="scss">
	.group{
		border: 1px;
		border-style: solid;
		border-radius: 15px;
		border-color: #FFFFFF;
		background-color: #FFFFFF;
		margin-bottom: 20px;
		padding: 3px;
	}
	.copyright{
		color: #808080;
		display:flex;
		flex-direction:row;
		justify-content:center;
	}
	.about{
		font-size: 35rpx;
		line-height: 60rpx;
	}
	.avatar{
		height: 120rpx;
		width: 120rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.avatarimg{
		width: 100%;
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
	.update-log{
		border-radius: 15rpx;
		border-style: solid;
		border-width: 1rpx;
		padding: 25rpx;
		margin-top: 20rpx;
		border-color: #C0C0C0;
	}
</style>
