<template>
	<view>
		<view class="position-relative">
			<image :src="detail.cover" mode="aspectFill" style="width:100%;height: 420rpx;"></image>
			<view class="course-txt">
				<view class="font-sm">图文</view>
			</view>
		</view>
		<view class="px-3 mb-2">
			<view class="font-lg my-2">{{detail.title}}</view>
			<view class="mb-2 text-light-muted font-sm">{{detail.sub_count}} 学过</view>
			<view>
				<text class="text-danger font-md  align-end">￥{{detail.price}}</text>
				<text class="font-sm text-light-muted ml-1 text-through">￥{{detail.t_price}}</text>
			</view>
		</view>
			
			<view class="divider"></view>
			
		<view>
			<uni-card title="课程介绍" isFull :border="false">
				<mp-html :content="detail.try" />
			</uni-card>
		</view>
		<view style="height: 84px;"></view>
		<view class="px-3 bg-white fixed-bottom pb-3">
			<main-button>立即订阅￥9.98</main-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {
					id: 12,
					title: "unicloud商城全栈开发",
					cover: "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/79023e0596c23aff09e6.png",
					try: "<p>unicloud商城全栈开发</p>",
					price: "10.00",
					t_price: "20.00",
					type: "media",
					sub_count: 0,
					content: "<p>unicloud商城全栈开发</p>",
					isbuy: true,
					isfava: true
				}
			}
		},
		onLoad(e) {
			this.detail.id = e.id
		},
		methods: {

		}
	}
</script>

<style>
	.course-txt {
		position: absolute;
		right: 10rpx;
		bottom: 16rpx;
		background-color: rgba(0, 0, 0, 0.4);
		color: #FFFFFF;
		padding: 4rpx 10rpx;
	}
</style>
