<template>
	<view>
		<view class="head">
			<view style="padding: 15rpx;">
				<u-search placeholder="请输入班级名称" :action-style="{
					backgroundColor: '#EEEEEE',
					height: '64rpx',
					borderRadius: '32rpx',
					lineHeight: '64rpx'
				}"></u-search>
			</view>
			<u-dropdown>
				<u-dropdown-item title="年级" :options="grades"></u-dropdown-item>
				<u-dropdown-item title="学院" :options="departments"></u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="content">
			<scroll-view :style="{
				height: height
			}" :scroll-y="true">
				<s-list :empty="empty" :cell-group="true" margin="0rpx" bg-color="#FFFFFF">
					<u-cell-item
						v-for="(item, i) in data"
						:key="i"
						:title="item.name"
						@click="showTable(i)"
						hover-class="u-hover-class"
					></u-cell-item>
				</s-list>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [{"name": "\u901a\u4fe1\u5de5\u7a0b21-1\u73ed", "code": "20211040101", "id": 6077, "grade": "2021", "department": "\u8ba1\u7b97\u673a\u5b66\u9662"}, {"name": "\u901a\u4fe1\u5de5\u7a0b21-2\u73ed", "code": "20211040102", "id": 6078, "grade": "2021", "department": "\u8ba1\u7b97\u673a\u5b66\u9662"}, {"name": "\u8ba1\u7b97\u673a21-1\u73ed", "code": "20211040201", "id": 6079, "grade": "2021", "department": "\u8ba1\u7b97\u673a\u5b66\u9662"}, {"name": "\u8ba1\u7b97\u673a21-2\u73ed", "code": "20211040202", "id": 6080, "grade": "2021", "department": "\u8ba1\u7b97\u673a\u5b66\u9662"}, {"name": "\u8ba1\u7b97\u673a21-3\u73ed", "code": "20211040203", "id": 6081, "grade": "2021", "department": "\u8ba1\u7b97\u673a\u5b66\u9662"}, {"name": "\u7535\u4fe1\u5de521-1\u73ed", "code": "20211040301", "id": 6082, "grade": "2021", "department": "\u8ba1\u7b97\u673a\u5b66\u9662"}, {"name": "\u7535\u4fe1\u5de521-2\u73ed", "code": "20211040302", "id": 6083, "grade": "2021", "department": "\u8ba1\u7b97\u673a\u5b66\u9662"}, {"name": "\u7535\u4fe1\u5de521-3\u73ed", "code": "20211040303", "id": 6084, "grade": "2021", "department": "\u8ba1\u7b97\u673a\u5b66\u9662"}, {"name": "\u4fe1\u606f\u5b8921-1\u73ed", "code": "20211040501", "id": 6085, "grade": "2021", "department": "\u8ba1\u7b97\u673a\u5b66\u9662"}, {"name": "\u667a\u80fd\u79d1\u628021-1\u73ed", "code": "20211040801", "id": 6086, "grade": "2021", "department": "\u8ba1\u7b97\u673a\u5b66\u9662"}],
				grades: [
					{ value: 2021, label: '2021' }
				],
				departments: [
					{ value: 166, label: '计算机与信息学院(人工智能学院)' }
				],
				page: 0
			};
		},
		methods: {
			showTable(i){
				uni.navigateTo({
					url: './timetable?id=' + this.data[i].id
				})
			}
		},
		onLoad() {
			
		},
		computed: {
			empty(){
				return this.data.length == 0
			},
			hasNext(){
				
			},
			height(){
				return 'calc(' + uni.getSystemInfoSync().windowHeight + 'px - 172rpx)'
			}
		}
	}
</script>

<style lang="scss">
	.head{
		background-color: #FFFFFF;
	}
	.content{
		
	}
</style>
