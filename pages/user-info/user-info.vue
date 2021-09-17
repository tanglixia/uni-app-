<template>
	<view class="mx-3">
		<uni-list>
			<uni-list-item title="头像" :showArrow="false" clickable @click="changeAvatar">
				<template slot="right">
					<image src="/static/demo/icon/book.png" mode="aspectFill" style="width: 82rpx;height: 82rpx;border-radius: 50%;"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="昵称" :showArrow="false">
				<template slot="right">
					<input type="text" v-model="form.nickname" style="text-align:right" />
				</template>
			</uni-list-item>
			<uni-list-item title="性别" clickable :showArrow="false" @click="changeSex">
				<template slot="right">
					<text>{{form.sex}}</text>
				</template>
			</uni-list-item>
			<uni-list-item title="手机" :showArrow="false" clickable @click="navigateTo('/pages/bind-phone/bind-phone')">
				<template slot="right">
					<text>{{user.phone || '未绑定'}}</text>
				</template>
			</uni-list-item>
		</uni-list>

		<main-button @click="submit">保存</main-button>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				form: {
					avatar: "",
					nickname: "123456",
					sex: "未知"
				}
			}
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		created() {
			this.form = {
				avatar:this.user.avatar,
				nickname:this.user.nickname,
				sex:this.user.sex,
				
			}
		},
		methods: {
			// 性别弹框
			changeSex() {
				let sexOptions = ['未知', '男', '女']
				uni.showActionSheet({
					itemList: sexOptions,
					success: (res) => {
						this.form.sex = sexOptions[res.tapIndex]
					}
				});
			},
			// 上传头像
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						console.log(res.tempFilePaths[0])
						this.$api.upload(res.tempFilePaths[0], (progress) => {
							console.log('progress', progress)
						}).then(url => {
							console.log('url', url)
						})
					}
				})
			},
			// 保存
			submit() {
				uni.showToast({
					title: '提交中',
					mask: true
				});
				let data = Object.assign(this.form, {})
				this.$api.updatePassword(data).then(res => {
					this.$toast('修改成功')
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
						this.$store.dispatch('logOut')
					}, 350)
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>
