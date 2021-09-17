<template>
	<view class="mx-3">
		<uni-list>
			<uni-list-item title="原密码" :showArrow="false">
				<template slot="right">
					<input type="text" v-model="form.opassword" style="text-align:right" placeholder="请输入原密码" />
				</template>
			</uni-list-item>
			<uni-list-item title="新密码" :showArrow="false">
				<template slot="right">
					<input type="text" v-model="form.password" style="text-align:right" placeholder="请输入新密码" />
				</template>
			</uni-list-item>
			<uni-list-item title="确认密码" :showArrow="false">
				<template slot="right">
					<input type="text" v-model="form.repassword" style="text-align:right" placeholder="请输入确认密码" />
				</template>
			</uni-list-item>
		</uni-list>

		<main-button @click="submit">保存</main-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					opassword: "",
					password: "",
					repassword: ""
				}
			}
		},
		methods: {
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
