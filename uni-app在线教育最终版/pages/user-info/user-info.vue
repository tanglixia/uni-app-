<template>
	<view class="mx-3">
		<uni-list>
			<uni-list-item title="头像" :showArrow="false" clickable @click="changeAvatar">
				<template slot="right">
					<image :src="form.avatar" mode="aspectFill" style="width: 82rpx;height: 82rpx;border-radius: 50%;"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="昵称" :showArrow="false">
				<template slot="right">
					<input type="text" v-model="form.nickname" placeholder="未填写" style="text-align:right" />
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
					nickname: "",
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
				avatar: this.user.avatar,
				nickname: this.user.nickname,
				sex: this.user.sex,

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
							this.$toast('上传中……')
						}).then(url => {
							this.form.avatar = url
						})
					}
				})
			},
			// 保存
			submit() {
				uni.showLoading({
					title: '提交中...'
				})
				let d = Object.assign(this.form, {})
				this.$api.updateInfo(d).then(res => {
					this.$store.dispatch('updateInfo', d)
					this.$toast('保存成功')
					uni.navigateBack({
						delta:1
					})
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>
