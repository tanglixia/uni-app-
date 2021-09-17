<template>
	<view>
		<view class="divider"></view>
		<view class="font-weight-bold" style="margin:20rpx 20rpx 0 20rpx;">
			<view>
				<text>{{type ==='group' ? '拼团':'秒杀'}}</text>
			</view>
		</view>
		<view class="mb-3">
			<scroll-view scroll-x="true" class="scroll-row">
				<course-list v-for="(item,index) in list" :key="index" :item="item"></course-list>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			type:{
				type:String,
				default:'group'
			}
		},
		data() {
			return {
				list:[]
			};
		},
		created() {
			let k = this.type == 'group' ? 'getGroup' : 'getFlashsale'
			this.$api[k]({
				usable:1
			}).then(res=>{
				this.list = res.rows
			})
		}
	}
</script>

<style>

</style>
