<template>
	<view>
		<u-tabs :is-scroll="false" :list="campus" :current="current_campus" @change="change_campus" />
		<u-tabs :list="buildings" :current="current_building" @change="change_building" />
		<s-list :empty="false" :full="false" :cell-group="true">
			<s-item
				v-for="(machine, i) in machines"
				:title="machine.name"
				:value="machine.status"
				:value-style="(machine.status == '空闲') ? availableStyle : defaultStyle"
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
					{name: '载入中'},
				],
				current_building: 0,
				machines: [
					{
						name: '载入中',
						type: 1,
						NQT: '',
						machineid: '',
						status: '载入中'
					}
				],
				types: ['企鹅洗衣', '海尔云洗衣', 'U净洗衣'],
				availableStyle: {
					color: '#00BB00',
					fontWeight: 'bold',
				},
				defaultStyle: {}
			};
		},
		methods: {
			change_campus(index, setBuilding = false){
				this.current_campus = index
				uni.setStorageSync('wash_campus', index)
				let storageBuilding = uni.getStorageSync('wash_building')
				this.$request('/wash/buildings?campus=' + this.campus[this.current_campus].name).then(data => {
					this.buildings = data
					this.current_building = 0
					this.buildings.forEach((item, index, err) => {
						if(setBuilding && item.name == storageBuilding){
							this.current_building = index
							console.log(item.name)
						}
					})
					console.log(this.current_building)
					uni.startPullDownRefresh()
				})
			},
			change_building(index){
				this.current_building = index
				uni.setStorageSync('wash_building', this.buildings[index].name)
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
			this.change_campus(this.current_campus, true)
		}
	}
</script>

<style lang="scss">

</style>
