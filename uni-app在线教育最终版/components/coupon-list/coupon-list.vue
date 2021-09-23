<template>
	<view class="p-2">
		<scroll-view :scroll-x="true" class="scroll-row">
			<view class="coupon" :class="item.isgetcoupon ? 'coupon-isget':''"  v-for="(item,index) in list" :key="index">
				<view>
					<text>￥{{item.price}}</text>
					<text class="font-small">适用{{ item.type | formatType }}：{{ item.value.title }}</text>
				</view>
				<view hover-class="bg-hover-warning" @click="receive(item)">
					<text>{{item.isgetcoupon ? '已领取':'领取'}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			};
		},
		filters:{
			formatType(value){
				let o = {
					course:'课程',
					column:'专栏'
				}
				return o[value]
			}
		},
		created() {
			this.getData()
		},
		methods:{
			getData(){
				this.$api.getCoupon().then(res=>{
					this.list = res
				})
			},
			receive(item){
				if(item.isgetcoupon){
					return this.$toast('你已经领取过了')
				}
				uni.showLoading({
					title:'领取中……',
					mask:false
				})
				this.$api.receiveCoupon({
					coupon_id:item.id
				}).then((res)=>{
					this.$toast('领取成功')
					item.isgetcoupon = true
				}).finally(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	.coupon{
		display: inline-flex;
		min-width:320rpx;
		color: #fff;
		margin-right: 30rpx;
	}
	.coupon>view:first-child{
		display: flex;
		flex-direction:column;
		justify-content: center;
		align-items: center;
		background-color: #d39e00;
		border-right:1px dashed #fff;
		padding: 30rpx;
	}
	.coupon>view:last-child{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 120rpx;
		background-color: #ffc107;
	}
	.coupon-isget>view:first-child{
		background-color: #cccccc;
	}
	.coupon-isget>view:last-child{
		background-color: #cccccc;
	}
</style>
