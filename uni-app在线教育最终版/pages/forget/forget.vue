<template>
	<view>
		<view class="active-arrow">
			<uni-icons type="arrowleft" size="20" color="#fff" @click="back"></uni-icons>
		</view>
		<view class="login-bg"></view>
		<view class="login">
			<view class="flex">
				<text class="title">找回密码</text>
			</view>
			<view class="login-form">
				<uni-icons type="person" size="20"></uni-icons>
				<input type="text" v-model="form.phone" placeholder="请输入手机号" />
			</view>
			<view class="login-form">
				<uni-icons type="email" size="20"></uni-icons>
				<input type="text" v-model="form.code" placeholder="验证码" />
				<code-btn :phone="form.phone"></code-btn>
			</view>
			<view class="login-form">
				<uni-icons type="person" size="20"></uni-icons>
				<input type="text" v-model="form.password" class="rounded font-md" placeholder="请输入密码" />
			</view>
			<view class="login-form">
				<uni-icons type="locked" size="20"></uni-icons>
				<input type="text" v-model="form.repassword" class="rounded font-md" placeholder="请输入确认密码" />
			</view>
			<view class="btn bg-main" hover-class="bg-main-hover" @click="submit">立即找回</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					phone: "",
					code: "",
					password:"",
					repassword:""
				}
			}
		},
		methods: {
			// 返回
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			submit() {
				uni.showLoading({
					title: '提交中……',
					mask: false
				});
				let data = Object.assign(this.form, {})
				this.$api.forget(data).then(res => {
					this.$toast('找回成功')
					setTimeout(() => {
						this.back()
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
