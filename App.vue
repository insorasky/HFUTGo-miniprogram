<script>
export default {
	onLaunch: function(){
		new Promise((resolve, reject) => {
			this.$user.initialize().then(data => {
				resolve('success')
			}).catch(err => {
				reject('error')
			})
		})
		console.log("initialized")
		console.log(process.env.NODE_ENV)
		console.log(uni.getSystemInfoSync().platform)
		// 检查更新
		if (wx.canIUse("getUpdateManager")) {
			let updateManager = wx.getUpdateManager()
			updateManager.onCheckForUpdate((res) => {
				console.log(res.hasUpdate)
			})
			updateManager.onUpdateReady(() => {
				wx.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success: (res) => {
						if (res.confirm) {
							updateManager.applyUpdate()
						} else if (res.cancel) {
							return false
						}
					}
				})
			})
			updateManager.onUpdateFailed(() => {
				wx.hideLoading();
				wx.showModal({
					title: '升级失败',
					content: '新版本下载失败，请检查网络！',
					showCancel: false
				});
			});
		}
	}
}
</script>

<style lang="scss">
	@import 'uview-ui/index.scss';
	@import 'static/global.scss';
	page{
		background-color: #F1F1F1;
	}
</style>
