<template>
	<view>
		<view v-for="(item,index) in list" :key="index">
			<uni-card :isFull="true" note="true">
				<view class="flex justify-between text-muted">
					<text>订单时间：{{item.created_time}}</text>
					<text>订单号：{{item.no}}</text>
				</view>
				<view class="flex mt-3 font-md">
					{{item.goods}}
				</view>
				<view class="flex justify-end font text-danger font-weight-bold">￥{{item.price}}</view>
				<template slot="footer">
					<view :class="item.status == 'success' ? 'text-success':''">{{item.status == 'success' ? '交易成功':'等待支付'}}</view>
				</template>
			</uni-card>
			<view class="divider"></view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus:'loading',
				page:1,
				limit:5,
				list:[]
			}
		},
		created() {
			this.getData()
		},
		// 下拉加载更多
		onPullDownRefresh() {
			this.page = 1
			this.getData().finally(()=>{
				uni.stopPullDownRefresh()
			})
		},
		// 上拉加载更多
		onReachBottom() {
			this.handleLoadMore()
		},
		methods: {
			handleLoadMore(){
				if(this.loadStatus !='more'){
					return 
				}
				this.page = 1
				this.getData()
			},
			getData(){
				let page = this.page
				return this.$api.getOrderList({
					page:this.page,
					limit:this.limit
				}).then(row=>{
					this.list = page == 1 ? row.rows : [...this.list,...row.rows]
					this.loadStatus = row.rows.length < this.limit ? 'noMore' : 'more'
				}).catch(err=>{
					this.loadStatus = 'more'
					if(page > 1){
						this.page = this.page - 1
					}
				})
			}
		}
	}
</script>

<style>

</style>
