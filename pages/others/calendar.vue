<template>
	<view>
		<view class="selector">
			<u-subsection :list="list" :current="currentCampus" @change="changeCampus"></u-subsection>
		</view>
		<view v-for="(pic, i) in pictures" class="image" :key="i">
			<u-image :src="pic" mode="widthFix" @click="showImage(i)"></u-image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name: '合肥校区',
						key: 'hefei'
					}, 
					{
						name: '宣城校区',
						key: 'xuancheng'
					}
				],
				currentCampus: 0,
				pictures: []
			}
		},
		methods: {
			changeCampus(index){
				this.currentCampus = index
				this.$request('/others/timetable?campus=' + this.list[index].key).then(data => {
					console.log(data)
					this.pictures = data
				})
			},
			showImage(index){
				uni.previewImage({
					urls: this.pictures,
					current: index
				})
			}
		},
		onLoad(){
			this.changeCampus(this.currentCampus)
		}
	}
</script>

<style>
	.selector{
		margin: 10rpx;
	}
	.image{
		margin-top: 15rpx;
	}
</style>
