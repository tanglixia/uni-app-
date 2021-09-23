<template>
	<view>
		<view v-if="list.length">
			<view class="flex justify-between align-center px-2 mt-3">
				<text class="font-weight-bold">历史记录</text>
				<text class="font-sm text-light-muted" @click="clear">清除全部</text>
			</view>
			<view class="flex flex-wrap px-2 mt-2">
				<uni-badge :text="item" v-for="(item,index) in list" :key="index" class="mr-2 mb-2" @click="handleSearchEvent(item)"></uni-badge>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				keyWord:""
			}
		},
		// 导航栏搜索改变
		onNavigationBarSearchInputChanged(e) {
			this.keyWord = e.text
		},
		// 监听搜索按钮事件
		onNavigationBarButtonTap() {
			this.handleSearchEvent()
		},
		// 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。 
		onNavigationBarSearchInputConfirmed() {
			this.handleSearchEvent()
		},
		onLoad() {
			let list = uni.getStorageSync('historyKeyWord')
			if(list){
				this.list = JSON.parse(list)
			}
		},
		methods: {
			handleSearchEvent(value = ''){
				if(value){
					this.keyWord = value
				}
				if(this.keyWord == ''){
					this.$toast('请输入关键词')
					return
				}
				//跳转到搜索结果页
				uni.navigateTo({
					url:'/pages/search-result/search-result?keyword='+this.keyWord
				})
				// 加入到历史记录
				this.addHistory()
			},
			addHistory(){
				// 数组中是否包含搜索内容
				let index = this.list.findIndex(v => v == this.keyWord)
				if(index != -1){
					this.objToFirst(this.list,index)
				}else {
					this.list.unshift(this.keyWord)
				}
				uni.setStorageSync('historyKeyWord',JSON.stringify(this.list))
			},
			// 置顶数组某一项
			objToFirst(arr,index){
				if(index !=0){
					arr.unshift(arr.splice(index,1)[0])
				}
				return arr
			},
			clear() {
				uni.showModal({
					content: '是否要清除搜索记录？',
					success: res => {
						if (res.confirm) {
							this.list = []
							uni.removeStorageSync('historyKeyWord')
						}
					},
				});
			}
		}
	}
</script>

<style>

</style>
