<template>
	<view>
		<!-- 骨架屏 -->
		<index-skeleton v-if="loading"></index-skeleton>
		<view v-else>
			<block v-for="(item,index) in templates" :key="index">
				<!-- 搜索框 -->
				<f-search-bar v-if="item.type ==='search'" :placeholder="item.placeholder"></f-search-bar>
				<view v-else-if="item.type === 'swiper'">
					<!-- 轮播图 -->
					<view class="mx-2">
						<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="height: 310rpx;">
							<swiper-item v-for="(s,sI) in item.data" :key="sI">
								<image style="width:100%;height: 300rpx;" class="rounded" :src="s.src" mode="scaleToFill"></image>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<!-- icon-nav -->
				<icon-nav v-else-if="item.type === 'icons'" :list="item.data"></icon-nav>
				<view v-else-if="item.type === 'coupon'">
					<!-- 优惠券组件 -->
					<coupon-list ref="couponList"></coupon-list>
				</view>
				<view v-else-if="item.type === 'promotion'">
					<active-list type="item.listType"></active-list>
				</view>
			
				<view v-else-if="item.type =='list'">
					<!-- 分割线 -->
					<view class="divider"></view>
			
					<view style="margin:20rpx 20rpx 0 20rpx;">
						<view class="flex justify-between">
							<text class="font-weight-bold">{{item.title}}</text>
							<text class="text-light-muted font-sm" v-if="item.showMore">查看全部</text>
						</view>
					</view>
			
					<!-- 最新列表 -->
					<view class="mb-3">
						<view>
							<course-list :type="item.listType" v-for="(course,index) in item.data" :key="index" :item="course"></course-list>
						</view>
					</view>
				</view>
			
				<view v-else-if="item.type === 'imageAd'">
					<view class="divider"></view>
					<view class="m-2">
						<image :src="item.data" mode="aspectFill" style="width:710rpx;height: 326rpx;"></image>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import indexSkeleton from './index-skeleton.vue'
	export default {
		components:{
			indexSkeleton
		},
		data() {
			return {
				loading:false,
				templates: []
			}
		},
		onPullDownRefresh() {
			this.getData()
			this.refreshCouponList()
		},
		created() {
			this.getData()
			uni.$on('userLogin',()=>{
				this.refreshCouponList()
			})
			uni.$on('userLogout',()=>{
				this.refreshCouponList()
			})
		},
		methods: {
			refreshCouponList(){
				if(this.$refs.couponList && this.$refs.couponList[0]){
					this.$refs.couponList[0].getData()
				}
			},
			getData() {
				this.loading = true
				this.$api.getIndexData().then(data => {
					this.templates = data
				}).finally(() => {
					uni.stopPullDownRefresh()
					this.loading = false
				})
			}
		}
	}
</script>

<style>
</style>
