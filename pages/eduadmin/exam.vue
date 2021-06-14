<template>
	<view class="body">
		<u-top-tips ref="uTips"></u-top-tips>
		<s-list :cell-group="true" :empty="showEmpty">
			<s-item
				v-for="(item, i) in exams"
				:title="item.name"
				:label="item.building + ' ' + item.room + ' ' + item.time"
				:key="i"
			></s-item>
		</s-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				exams: [],
				showEmpty: true,
			};
		},
		onLoad() {
			this.$request('/eduadmin/exams').then(data => {
				this.exams = data
				this.showEmpty = (data.length == 0)
			}).catch(err => {
				this.$refs.uTips.show({
					title: err.error,
					type: 'error'
				})
			})
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.body{
		
	}
</style>
