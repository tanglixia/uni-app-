<template>
	<view class="flex justify-around align-center" style="border-bottom: 1rpx solid #f4f4f4;">
		<view v-for="(item,index) in tabs" :key="index" @click="$emit('change',index)">
			<view class="tabs-item" :class="current == index ? 'tabs-item-active':''">
				<text class="mb-3 font">{{item.name}}</text>
				<view class="tabs-line animate__animated animate__fadeIn animate__faster" v-if="current == index"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tabs',
		props: {
			current: {
				type: Number,
				default: 0
			},
			tabs: {
				type: Array
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.tabs-item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
		color: #888888;
		font-weight: bold;
	}

	.tabs-line {
		position: absolute;
		bottom: 0;
		width: 50rpx;
		height: 10rpx;
		background-color: #65c888;
		border-radius: 4rpx;
	}

	.tabs-item-active {
		color: #65c888
	}
</style>
