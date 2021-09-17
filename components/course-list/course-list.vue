<template>
	<view class="scroll-row-item course p-2" :class="'course-'+type">
		<view class="position-relative">
			<image :src="item.cover" mode="aspectFill"></image>
			<view>{{item.type | formatType}}</view>
		</view>
		<view class=" flex flex-column flex-shrink">
			<text class="text-ellipsis font-md mb-1">{{item.title}}</text>

			<view v-if="item.try" class="font-sm text-light-muted" v-html="item.try"></view>
			<view class="flex flex-1 align-end">
				<text class="font-md text-danger">￥{{item.price}}</text>
				<text class="font-sm text-light-muted text-through ml-1">￥{{item.t_price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	let opt = {
		media: '图文',
		audio: '音频',
		video: '视频',
		column: '专栏'
	}
	export default {
		name: 'course-list',
		props: {
			item: {
				type: Object
			},
			type: {
				type: String,
				default: 'two'
			}
		},
		filters: {
			formatType(k) {
				return opt[k]
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.course-two {
		width: 340rpx;
		margin-bottom: 20rpx;
	}

	.course-two image,.course-two>view:first-child {
		width: 340rpx;
		height: 186rpx;
	}

	.course>view:first-child>view {
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
		background-color: rgb(0, 0, 0, 0.4);
		padding: 0 10rpx;
		color: white;
		font-size: 14rpx;
	}

	.course-one image,
	.course-one>view:first-child {
		width: 300rpx;
		height: 170rpx;
		flex-shrink: 1;
	}

	.course-one {
		display: flex !important;
		padding: 20rpx;
		border-bottom: 1px solid #f7f8fa;
	}

	.course-one>view:first-child {
		margin-right: 20rpx;
	}
</style>
