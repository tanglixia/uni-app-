<template>
	<view class="animate__animated animate__bounceInDown animate__faster">
		<view class="home-bg"></view>
		<view class="position-relative">
			<view class="flex align-center justify-between px-3" v-if="!user" @click="navigateTo('/pages/login/login')">
				<view class="flex justify-center py-5">
					<image src="/static/demo/icon/hd.png" style="width:120rpx;height: 120rpx;"></image>
					<view class="text-white ml-3">
						<view class="font-md">立即登录</view>
						<view class="font-sm mt-2">登录解锁更多功能</view>
					</view>
				</view>
			</view>
			
			<view class="flex align-center justify-between px-3" v-else @click="authJump('/pages/user-info/user-info')">
				<view class="flex justify-center py-5">
					<image v-if="user.avatar" :src="user.avatar" style="width:120rpx;height: 120rpx;"></image>
					<image v-else src="/static/demo/icon/hd.png" style="width:120rpx;height: 120rpx;"></image>
					<view class="text-white ml-3">
						<view class="font-md">{{user.nickname || user.username || user.phone}}</view>
						<view class="font-sm mt-2">{{user.desc || '暂无简介'}}</view>
					</view>
				</view>
				<view>
					<text class="iconfont icon-leimupinleifenleileibie" style="color: #FFFFFF;"></text>
				</view>
			</view>

			<icons-card :icons="icons"></icons-card>
			
			<view class="home-card px-3">
				<uni-list>
					<uni-list-item title="我的优惠券" @click="authJump('/pages/my-coupon/my-coupon')">
						 <text class="iconfont icon-9 mr-2" style="color:#4396ec;;font-size: 20px;"></text>
					</uni-list-item>
					<uni-list-item title="常见问题" >
						<text class="iconfont icon-help mr-2" style="color:#4396ec;;font-size: 20px;"></text>
					</uni-list-item>
					<uni-list-item title="设置" @click="navigateTo('/pages/setting/setting')">
						<text class="iconfont icon-leimupinleifenleileibie mr-2" style="color:#4396ec;;font-size: 20px;"></text>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				icons: [{
						icon: 'icon-OrderHistory',
						name: '订单'
					},
					{
						icon: 'icon-pinglun2',
						name: '消息'
					},
					{
						icon: 'icon-shoucang1',
						name: '收藏'
					},
					{
						icon: 'icon-e-learning-monitor',
						name: '在学'
					},

				]
			}
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		onNavigationBarButtonTap() {
			this.navigateTo('/pages/setting/setting')
		},
		methods: {
			openLogin() {
				uni.navigateTo({
					url: '../../login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-bg {
		background-color: #5CCC84;
		height: 350rpx;
		width: 750rpx;
		border-bottom-left-radius: 100rpx;
		border-bottom-right-radius: 100rpx;
		position: fixed;
	}
	.home-card ::v-deep .uni-list-item__content{
		flex-direction: row;
		align-items: center;
	}
</style>
