<template>
	<view class="body">
		<view v-for="(item, i) in items">
			<view v-if="item.type == 'radio'">
				<view style="font-size: 30rpx;">
					<text>{{item.data.title}}(单选)</text>
				</view>
				<u-radio-group v-model="answers[i]">
					<u-radio
						v-for="(answer, j) in item.data.options"
						:name="answer.name"
						:key="j"
					>
						<view style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 660rpx;">
							<text>{{'(' + answer.score + '分)' + answer.name}}</text>
						</view>
					</u-radio>
				</u-radio-group>
			</view>
			<view v-if="item.type == 'blank'">
				<text style="font-size: 30rpx;">{{item.data.title}}(问答)</text>
				<u-input type="textarea" v-model="answers[i]" :border="true" style="margin-top: 10rpx; margin-bottom: 20rpx;"></u-input>
			</view>
			<view v-if="item.type == 'header'">
				<text style="font-size: 35rpx; font-weight: bold;">{{item.data.title}}</text>
			</view>
			<u-divider :useSlot="false" margin-top="10" margin-bottom="10" half-width="350"></u-divider>
		</view>
		<u-button type="primary" @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [],
				answers: [],
				id: 0,
				assoc: 0
			};
		},
		methods: {
			submit(){
				var radioAnswers = Array();
				var blankAnswers = Array();
				for(var i = 0; i < this.answers.length; i++){
					if(!this.answers[i] && this.items[i].type == 'radio'){
						uni.showToast({
							icon: 'none',
							title: '请完成所有选项！'
						})
						return
					}
					if(this.items[i].type == 'radio'){
						radioAnswers.push({
							questionId: this.items[i].data.id,
							optionName: this.answers[i]
						})
					}
					if(this.items[i].type == 'blank'){
						blankAnswers.push({
							questionId: this.items[i].data.id,
							content: this.answers[i]
						})
					}
				}
				this.$request('/eduadmin/evaluate/submit', 'POST', null, {
					surveyAssoc: this.assoc,
					lessonSurveyTaskAssoc: this.id,
					radioQuestionAnswers: radioAnswers,
					blankQuestionAnswers: blankAnswers
				}).then(data => {
					uni.showToast({
						icon: 'success',
						title: '提交成功！'
					})
					setTimeout(function(){
						uni.navigateBack()
					}, 1500)
				}).catch(err => {
					console.log(err)
				})
			},
			autoFill(){
				for(var i = 0; i < this.answers.length; i++){
					if(this.items[i].type == 'radio'){
						this.answers[i] = this.items[i].data.options[0].name
						console.log(this.items[i].data.options[0].name)
					}
				}
			}
		},
		onLoad(res) {
			this.$request('/eduadmin/evaluate/questions?id=' + res.id).then(data => {
				this.assoc = data.assoc
				this.items = data.questions
				this.id = parseInt(res.id)
				this.answers = Array(data.questions.length)
				this.autoFill()
			})
		}
	}
</script>

<style lang="scss">
	page{
		margin: 30rpx;
		background-color: #FFFFFF;
	}
	.body{
		width: 690rpx;
	}
</style>
