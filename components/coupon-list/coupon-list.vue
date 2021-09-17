<template>
	<view class="p-2">
		<scroll-view :scroll-x="true" class="scroll-row">
			<view class="coupon" >
			<!-- 	<view class="flex flex-column justify-center align-center bg-hover-warning p-3" style="border-right: 2rpx dashed;">
					<text class="font">￥100</text>
					<text class="font-small">满￥200可用</text>
				</view>
				
				<view style="width:112rpx" class="flex justify-center align-center bg-warning" >
					<text>领用</text>
				</view> -->
				<view>
					<text>￥100</text>
					<text class="font-small">满￥200可用</text>
				</view>
				<view hover-class="bg-hover-warning">
					<text>领用</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style>
	.coupon{
		display: inline-flex;
		width:320rpx;
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
</style>
