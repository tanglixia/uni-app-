<template>
	<view>
		<view class="p-2">
			<skeleton width="710rpx" height="75rpx" oClass="mb-2 rounded"></skeleton>
			<skeleton width="710rpx" height="300rpx" oClass="rounded"></skeleton>
		</view>
		<view class="flex flex-wrap py-2">
			<view class="flex flex-column justify-center align-center" style="width:25%" v-for="i in 8" :key="i">
				<skeleton width="70rpx" height="70rpx" circle oClass="mb-2"></skeleton>
				<skeleton width="46rpx" height="23rpx" oClass="mb-2"></skeleton>
			</view>
		</view>
		<view class="flex justify-between p-2">
			<skeleton width="340rpx" height="130rpx"></skeleton>
			<skeleton width="340rpx" height="130rpx"></skeleton>
		</view>
		<view class="p-2">
			<skeleton width="60rpx" height="30rpx"></skeleton>
		</view>
		<view class="flex justify-between align-center p-2">
			<view>
				<skeleton width="340rpx" height="188rpx"></skeleton>
				<skeleton width="340rpx" height="28rpx" oClass="my-2"></skeleton>
				<skeleton width="102rpx" height="28rpx" oClass="mb-1"></skeleton>
				<skeleton width="164rpx" height="30rpx"></skeleton>
			</view>
			<view>
				<skeleton width="340rpx" height="188rpx"></skeleton>
				<skeleton width="340rpx" height="28rpx" oClass="my-2"></skeleton>
				<skeleton width="102rpx" height="28rpx" oClass="mb-1"></skeleton>
				<skeleton width="164rpx" height="30rpx"></skeleton>
			</view>
		</view>
		<view class="flex justify-between p-2">
			<skeleton width="126rpx" height="30rpx"></skeleton>
			<skeleton width="89rpx" height="24rpx"></skeleton>
		</view>
		<view class="flex flex-column justify-center p-2">
			<view class="flex">
				<skeleton width="340rpx" height="188rpx"></skeleton>
				<view class="flex flex-column justify-between ml-2">
					<view>
						<skeleton width="340rpx" height="28rpx" oClass="my-2"></skeleton>
						<skeleton width="102rpx" height="28rpx" oClass="mb-1"></skeleton>
					</view>
					<view>
						<skeleton width="164rpx" height="30rpx"></skeleton>
					</view>
				</view>
			</view>
			<view class="flex mt-2">
				<skeleton width="340rpx" height="188rpx"></skeleton>
				<view class="flex flex-column justify-between ml-2">
					<view>
						<skeleton width="340rpx" height="28rpx" oClass="my-2"></skeleton>
						<skeleton width="102rpx" height="28rpx" oClass="mb-1"></skeleton>
					</view>
					<view>
						<skeleton width="164rpx" height="30rpx"></skeleton>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		}
	}
</script>

<style>
</style>
