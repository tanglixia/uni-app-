<template>
	<view style="height: 100%;display: flex; flex-direction: column;">
		<tabs :current="current" :tabs="tabs" @change="clickTabs"></tabs>
		<swiper :duration="200" class="flex-1" @change="swiperChange">
			<swiper-item v-for="(t,tI) in tabs" :key="tI">
				<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="handleLoadMore(t)">
					<course-list v-for="(item,index) in t.list" :key="index" :item="item" type="one"></course-list>
					<uni-load-more :status="t.loadStatus"></uni-load-more>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<view>B</view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				keyword: "",
				tabs: [{
						name: '课程',
						loadStatus: 'more',
						list: [],
						type: 'course',
						page: 1
					},
					{
						name: '专栏',
						loadStatus: 'more',
						list: [],
						type: 'column',
						page: 1
					}
				]
			}
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateBack({
				delta: 1
			})
		},
		onLoad(e) {
			this.keyword = e.keyword
			this.getData()
		},
		methods: {
			// tab切换
			clickTabs(index) {
				this.current = index
			},
			// swiper 改变
			swiperChange(e){
				this.current = e.detail.current
				let tab = this.tabs[this.current]
				if(tab.loadStatus == 'more' && tab.page == 1){
					this.getData()
				}
			},
			// 获取数据
			getData() {
				let tab = this.tabs[this.current]
				tab.loadStatus = 'loading'
				this.$api.search({
					keyword: this.keyword,
					page: tab.page,
					type: tab.type
				}).then(res => {
					console.log('res', res.rows)
					tab.list = tab.page == 1 ? res.rows : [...tab.list, ...res.rows]
					tab.loadStatus = res.rows.length < 10 ? 'noMore' : 'more'
					console.log('list', tab.list)
				}).catch(err => {
					tab.loadStatus = 'more'
					if (tab.page > 1) {
						tab.page = tab.page - 1
					}
				})
			},
			handleLoadMore(t){
				if(t.loadStatus !='more') return 
				t.page = t.page + 1
				this.getData()
			}
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
