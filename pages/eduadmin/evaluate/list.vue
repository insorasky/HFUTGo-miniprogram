<template>
	<view>
		<s-list :empty="isEmpty" margin="0rpx">
			<u-card
				v-for="(item, i) in data"
				margin="20rpx"
				:title="item.name"
				:sub-title="item.period.end"
				:key="i"
				:body-style="{
					'margin': '-30rpx'
				}"
			>
				<u-cell-group slot="body" :border="false">
					<u-cell-item
						v-for="(task, j) in item.tasks"
						:title="task.teacher"
						:value="task.submitted ? '已提交' : '未提交'"
						@click="startEvaluate(i, j)"
						:key="j"
						:arrow="!task.submitted"
					></u-cell-item>
				</u-cell-group>
			</u-card>
		</s-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				semesters: [],
				data: []
			};
		},
		methods: {
			startEvaluate(i, j){
				if(this.data[i].tasks[j].submitted) return
				uni.navigateTo({
					url: './evaluate?id=' + this.data[i].tasks[j].id
				})
			}
		},
		onShow() {
			this.$request("/eduadmin/evaluate/subjects?sid=134&").then(data => {
				// console.log(JSON.stringify(data))
				this.data = data
			})
		},
		computed:{
			isEmpty(){
				return this.data.length == 0
			}
		}
	}
</script>

<style lang="scss">
</style>
