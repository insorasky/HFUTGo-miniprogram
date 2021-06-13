<template>
	<view class="body">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="head">
			<view class="left">
				<view class="title">
					<text>可用余额</text>
				</view>
				<view class="number">
					<text>{{info.available}}</text>
				</view>
			</view>
			<view class="right">
				<view class="title">
					<text>待圈存余额</text>
				</view>
				<view class="number">
					<text>{{info.waiting}}</text>
				</view>
			</view>
			<view class="info">
				<u-cell-item title="校园卡编号" :value="info.id" :arrow="false" />
				<u-cell-item title="是否冻结" :value="info.freeze" :arrow="false" />
				<u-cell-item title="是否丢失" :value="info.lost" @click="showLosePopup" />
			</view>
		</view>
		<view class="details">
			<s-list :empty="false" :cellGroup="true">
				<u-cell-item
					v-for="(item, i) in details"
					:title="item.time"
					:label="item.place + ' 余额:' + item.balance + '元'"
					:value="item.consume"
					@click="showDetailPopup(i)"
					:key="i"
				/>
				<u-loadmore :status="loading" @loadmore="loadMore" />
			</s-list>
		</view>
		<s-popup v-model="showDetail" title="交易详情">
			<view v-if="currentDetailIndex != -1">
				<u-cell-item title="交易时间" :value="details[currentDetailIndex]['time']" :arrow="false"></u-cell-item>
				<u-cell-item title="交易类型" :value="details[currentDetailIndex]['type']" :arrow="false"></u-cell-item>
				<u-cell-item title="交易地点" :value="details[currentDetailIndex]['place']" :arrow="false"></u-cell-item>
				<u-cell-item title="交易金额" :value="details[currentDetailIndex]['consume']" :arrow="false"></u-cell-item>
				<u-cell-item title="余额" :value="details[currentDetailIndex]['balance']" :arrow="false"></u-cell-item>
				<u-cell-item title="备注" :value="details[currentDetailIndex]['info'] || '无备注'" :arrow="false"></u-cell-item>
			</view>
		</s-popup>
		<s-popup v-model="showLose" title="挂失">
			<u-alert-tips bgColor="warning" title="警告：如果挂失，则必须到本校区网络中心或自助机上解除挂失！"></u-alert-tips>
			<s-input placeholder="请输入校园卡六位数密码" v-model="password" :password="true"></s-input>
			<u-button type="primary" @click="setLose">确定挂失</u-button>
		</s-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					id: '',
					sum: '',
					available: '',
					waiting: '',
					freeze: '',
					lost: ''
				},
				details: [],
				currentDetailIndex: -1,
				currentPage: 1,
				showLose: false,
				showDetail: false,
				loading: 'loading',
				loadText: {
					loadmore: '上拉或点击加载下一页',
					loading: '在获取了在获取了',
					nomore: '莫得了',
				},
				password: '',
			};
		},
		methods: {
			showDetailPopup(index){
				this.currentDetailIndex = index
				this.showDetail = true
			},
			showLosePopup(index){
				if(this.info.lost != '正常'){
					uni.showToast({
						icon:'none',
						title:'请到本校区网络中心或自助机解除挂失！'
					})
					return
				}
				this.showLose = true
			},
			loadMore(){
				if(this.loading == 'loadmore'){
					this.loading = 'loading'
					this.$request(`/card/details_past?page=${++this.currentPage}`).then(data => {
						if(data.details.length){
							for(const i in data.details)
								this.details.push(data.details[i])
							this.loading = 'loadmore'
						}else{
							this.loading = 'nomore'
						}
					}).catch(err => {
						this.$refs.uTips.show({
							title: err.error,
							type: 'error'
						})
					})
				}
			},
			setLose(){
				uni.showLoading({
					title: '正在挂失'
				})
				this.$request(`/card/lose?password=${this.password}`).then(data => {
					uni.hideLoading()
					uni.showToast({
						title: '挂失成功！',
						icon: 'success'
					})
					this.showLose = false
					uni.startPullDownRefresh()
				}).catch(err => {
					uni.hideLoading()
					this.$refs.uTips.show({
						title: '密码错误',
						type: 'error'
					})
				})
			}
		},
		onLoad(){
			uni.startPullDownRefresh()
		},
		onPullDownRefresh() {
			this.$request('/card/info').then(data => {
				this.info = data
				this.$request('/card/details_today').then(data => {
					this.details = data.details
					uni.hideLoading()
					this.$request('/card/details_past?page=1').then(data => {
						for(const i in data.details)
							this.details.push(data.details[i])
						uni.stopPullDownRefresh()
						this.loading = 'loadmore'
					})
				}).catch(err => {
					this.$refs.uTips.show({
						title: err.error,
						type: 'error'
					})
				})
			})
		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style lang="scss">
	.body{
		margin: 15rpx;
	}
	.head{
		border: 1px;
		background-color: #FFFFFF;
		border-radius: 25rpx;
		border-style: solid;
		border-color: #C0C0C0;
		margin: 30rpx;
	}
	.left{
		border-right: 1px solid #C0C0C0;
		border-bottom: 1px solid #C0C0C0;
		padding-top: 50rpx;
		padding-bottom: 50rpx;
		float: left;
		width: 50%;
	}
	.right{
		padding-top: 50rpx;
		padding-bottom: 50rpx;
		border-bottom: 1px solid #C0C0C0;
	}
	.info{
		
	}
	.title{
		font-size: 35rpx;
		color: #C0C0C0;
		display: flex; 
		flex-direction: row; 
		justify-content: center;
	}
	.number{
		font-size: 70rpx;
		display: flex;
		flex-direction: row; 
		justify-content: center;
	}
	.details{
		border: 1px;
		background-color: #FFFFFF;
		border-radius: 25rpx;
		border-style: solid;
		border-color: #C0C0C0;
		margin: 30rpx;
	}
</style>
