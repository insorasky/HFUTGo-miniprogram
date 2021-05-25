<template>
	<view>
		<u-tabs :is-scroll="false" :list="campus" :current="current_campus" @change="change_campus" />
		<u-tabs :list="buildings" :current="current_building" @change="change_building" />
		<s-list :empty="false" :full="true" other-height="300rpx" :cell-group="false">
			<s-item
				v-for="(machine, i) in machines"
				:title="machine.name"
				:value="machine.status"
				:value-style="(machine.status == '空闲') ? availableStyle : {}"
				:label="types[machine.type - 1]"
				:key="i"
			></s-item>
		</s-list>
	</view>
</template>

<script>
	import {getTime} from '../../common/func/haier_des.js'
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
				machines: [
					{
						name: '新区2#南楼5楼1号机',
						type: 1,
						NQT: '',
						machineid: '',
						status: '空闲'
					},
					{
						name: '新区2#南楼5楼2号机',
						type: 2,
						NQT: '',
						machineid: '',
						status: '使用中'
					},
					{
						name: '新区2#南楼5楼3号机',
						type: 3,
						NQT: '',
						machineid: '',
						status: '设备损坏'
					},
				],
				types: ['企鹅洗衣', '海尔云洗衣', 'U净洗衣'],
				availableStyle: {
					color: '#00BB00',
					fontWeight: 'bold',
				}
			};
		},
		methods: {
			change_campus(index){
				this.current_campus = index
				uni.setStorageSync('wash_campus', index)
				this.$request('/wash/buildings?campus=' + this.campus[this.current_campus].name).then(data => {
					this.buildings = data
					this.current_building = 0
					uni.startPullDownRefresh()
				})
			},
			change_building(index){
				this.current_building = index
				uni.setStorageSync('wash_building', index)
				uni.startPullDownRefresh()
			}
		},
		onPullDownRefresh() {
			let urls = [
				'/wash/qie',
				'/wash/haier',
				'/wash/ujing'
			]
			this.machines = []
			this.$request('/wash/machines', 'GET', {
				building: this.buildings[this.current_building].name
			}).then(data => {
				data.forEach((item, index, err) => {
					this.machines.push({
						name: item.name,
						type: item.type,
						NQT: item.NQT,
						machinid: item.machineid,
						status: '载入中'
					})
					this.$request(urls[item.type-1], 'GET', {
						ssid: getTime(),
						mid: item.machineid,
						NQT: item.NQT
					}).then(data => {
						this.machines[index].status = data.status
					})
				})
				uni.stopPullDownRefresh()
			})
		},
		onLoad() {
			uni.getStorage({
				key: 'wash_campus',
				success: (res) => {
					this.current_campus = res.data
				}
			})
			this.change_campus(this.current_campus)
		}
	}
</script>

<style lang="scss">

</style>
