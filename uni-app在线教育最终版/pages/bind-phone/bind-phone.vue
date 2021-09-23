<template>
	<view>
		<view class="active-arrow">
			<uni-icons type="arrowleft" size="20" color="#fff" @click="back"></uni-icons>
		</view>
		<view class="login-bg"></view>
		<view class="login">
			<view class="flex">
				<text class="title">绑定手机号</text>
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
			<view class="btn bg-main" hover-class="bg-main-hover" @click="submit">绑 定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					phone: "",
					code: ""
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
				this.$api.bindMobile(data).then(res => {
					this.$toast('绑定成功')
					this.$store.dispatch('updateInfo', {phone:data.phone})
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
	.login-bg {
		height: 220rpx;
		background-image: linear-gradient(120deg, #3bfdaf 0%, #70d6f2 100%);
	}

	.active-arrow {
		position: absolute;
		left: 0;
		top: 0;
		width: 66rpx;
		height: 66rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login {
		position: absolute;
		top: 200rpx;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		padding: 60rpx 70rpx 0 70rpx;
	}

	.login .title {
		font-size: 22px;
		margin-bottom: 50rpx;
		color: #35404b;
	}

	.login-form {
		position: relative;
		margin-bottom: 50rpx;
	}

	.login-form .uni-icons {
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #272727;
	}

	.login-form input {
		padding-left: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f5f5f5;
	}

	.login .btn {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		border-radius: 10rpx;
	}

	.weChat .uni-icons {
		width: 47px;
		height: 47px;
		line-height: 47px;
		border-radius: 100%;
		border: 1px solid #5ccc84;
	}
</style>
