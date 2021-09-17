<template>
	<view class="px-3">
		<uni-list>
			<uni-list-item title="账户安全" clickable @click="authJump('/pages/user-safe/user-safe')"></uni-list-item>
			<uni-list-item title="清楚缓存" clickable :showArrow="false" @click="clear">
				<template slot="right">
					<text>{{currentSize | formatCurrentSize}}</text>
				</template>
			</uni-list-item>
			<uni-list-item title="检查更新"></uni-list-item>
			<uni-list-item title="当前版本" :showArrow="false">
				<template slot="right">
					<text>1.0.1</text>
				</template>
			</uni-list-item>
		</uni-list>
		<view v-if="user">
			<main-button @click="handleLogOut">退出登录</main-button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import tool from '@/common/tool.js'
	export default {
		data() {
			return {
				currentSize: 0,
				keys: []
			}
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		filters: {
			formatCurrentSize(value) {
				return tool.bytesToSize(value)
			}
		},
		created() {
			this.getSize()
		},
		methods: {
			// 获取缓存
			getSize() {
				const res = uni.getStorageInfoSync();
				this.keys = res.keys.filter(item => item != 'user')
				this.currentSize = res.currentSize
			},
			// 清除缓存
			clear() {
				uni.showModal({
					title: '确定要清除缓存？',
					success: (res) => {
						if (res.cancel) {
							return
						}
						this.keys.forEach((key) => {
							uni.removeStorageSync(key);
						})
						this.$toast('清除成功')
						this.getSize()
					}
				})
			},
			// 退出登录
			handleLogOut() {
				uni.showModal({
					title: '提示',
					content: '确定要退出吗？',
					success: res => {
						if (res.cancel) {
							return
						}
						this.$api.logout()
						this.$store.dispatch('logOut').then(res => {
							uni.showToast({
								title: '退出成功'
							})
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text ::v-deep .uni-list-item__extra-text {
		color: black;
	}
</style>
