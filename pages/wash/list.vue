<template>
	<view>
		<u-tabs :is-scroll="false" :list="campus" :current="current_campus" />
		<u-tabs :list="buildings" :current="current_building" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				campus: [
					{name: '翡翠湖校区'},
					{name: '屯溪路校区'}
				],
				current_campus: 0,
				buildings: [
					{name: '1号楼'},
					{name: '2号楼'},
					{name: '3号楼'},
					{name: '4号楼'},
					{name: '1号楼'},
					{name: '2号楼'},
					{name: '3号楼'},
					{name: '4号楼'},
				],
				current_building: 0,
				machines: []
			};
		},
		methods: {
			change_campus(){
				
			},
			change_building(){
				
			}
		},
		onPullDownRefresh() {
			
		}
	}
</script>

<style lang="scss">

</style>
