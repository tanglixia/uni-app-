<template>
	<view class="p-3">
		<view class="flex text-white mb-2" v-for="(item,index) in list" :key="index">
			<view class="flex flex-column p-2 bg-hover-warning flex-1">
				<text class="font-lg">￥{{item.price}}</text>
				<text class="font-sm mt-1">适用{{item.typeName}}:{{item.title}}</text>
			</view>
			<view class="coupon-right bg-warning">
				{{item.btn}}
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus: 'loading',
				page: 1,
				limit: 5,
				list: []
			}
		},
		created() {
			this.getData()
		},
		// 下拉加载更多
		onPullDownRefresh() {
			this.page = 1
			this.getData().finally(() => {
				uni.stopPullDownRefresh()
			})
		},
		// 上拉加载更多
		onReachBottom() {
			this.handleLoadMore()
		},
		methods: {
			handleLoadMore() {
				if (this.loadStatus != 'more') {
					return
				}
				this.page = 1
				this.getData()
			},
			getData() {
				let page = this.page
				return this.$api.userCoupon({
					page: this.page,
					limit: this.limit
				}).then(res => {
					res.rows = this.formatList(res.rows)
					this.list = page == 1 ? res.rows : [...this.list, ...res.rows]
					this.loadStatus = res.rows.length < this.limit ? 'noMore' : 'more'
				}).catch(err => {
					this.loadStatus = 'more'
					if (page > 1) {
						this.page = this.page - 1
					}
				})
			},
			// 处理获取到的数据
			formatList(list){
				list.forEach((v)=>{
					const now = (new Date()).getTime()
					const end = (new Date(v.end_time)).getTime()
					v.expired = end < now
					v.btn = v.used = 1 ? '已使用': (v.expired ? '已过期' : '立即使用')
					v.typeName = v.type =='course' ? '课程' : '专栏'
				})
				return list
				
			}
		}
	}
</script>

<style>
.coupon-right{
	display: flex;
	justify-content: center;
	align-items: center;
	width:200rpx;
}
.coupon-used >view{
	background-color: #CCCCCC;
}
</style>
