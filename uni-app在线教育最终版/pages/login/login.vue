<template>
	<view>
		<view class="active-arrow">
			<uni-icons type="arrowleft" size="20" color="#fff" @click="back"></uni-icons>
		</view>
		<view class="login-bg"></view>
		<view class="login">
			<view class="flex">
				<text class="title">{{ type == 'login' ? '登 录' : '注 册'}}</text>
			</view>
			<view class="login-form">
				<uni-icons type="person" size="20"></uni-icons>
				<input type="text" v-model="form.username" class="rounded font-md" placeholder="请输入用户名" />
			</view>
			<view class="login-form">
				<uni-icons type="locked" size="20"></uni-icons>
				<input type="text" v-model="form.password" class="rounded font-md" placeholder="请输入密码" />
			</view>
			<view class="login-form" v-if="type == 'reg'">
				<uni-icons type="locked" size="20"></uni-icons>
				<input type="text" v-model="form.repassword" class="rounded font-md" placeholder="请输入确认密码" />
			</view>
			<view class="btn bg-main" hover-class="bg-main-hover" @click="submit">{{ type == 'login' ? '登 录' : '注 册'}}</view>

			<view class="flex justify-between align-center my-5">
				<view class="text-main font-sm" @click="changeType">{{ type == 'login' ? '注册账号' : '去登录'}}</view>
				<view class="text-light-muted font-sm" @click="openForget">忘记密码？</view>
			</view>
			<view class="flex justify-center align-center weChat">
				<uni-icons type="weixin" color="#5ccc84" size="25"></uni-icons>
			</view>
			<view class="flex justify-center align-center mt-3" v-if="type == 'login'">
				<checkbox-group @change="handleCheckboxChange">
					<label>
						<checkbox value="1" color="#5ccc84" style="transform: scale(0.7);" /><text class="text-light-muted font-sm">已阅读并同意用户协议&隐私声明</text>
					</label>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// props: {
		// 	type: {
		// 		type: String,
		// 		default: 'login'
		// 	}
		// },
		data() {
			return {
				confirm: false,
				type: "login",
				form: {
					username: '',
					password: '',
					repassword: ''
				}
			}
		},
		methods: {
			// checkbox改变
			handleCheckboxChange(e) {
				console.log("e: ",e.target.value);
				this.confirm = !!e.target.value.length
			},
			// 忘记密码
			openForget() {
				uni.navigateTo({
					url: '../forget/forget',
				});
			},
			// 返回
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 登录和注册页面切换
			changeType() {
				this.type = (this.type == 'login' ? 'reg' : 'login')
			},
			// 重置表单
			restForm() {
				this.form = {
					username: '',
					password: '',
					repassword: ''
				}
			},
			// 提交
			submit() {
				console.log("this.confirm: ",this.confirm);
				console.log("this.type: ",this.type);
				if (!this.confirm && this.type == 'login') {
					return this.$toast('请先阅读并同意用户协议&隐私声明')
				}
				uni.showLoading({
					title: '提交中……',
					mask: false
				});
				let data = Object.assign(this.form, {})
				this.$api[this.type](data).then(user => {
					if (this.type == 'reg') {
						this.$toast('注册成功')
						this.restForm()
						this.changeType()
					} else {
						this.$toast('登录成功')
						this.$store.dispatch('login', user)
						if (!user.phone) {
							console.log('phone')
							uni.redirectTo({
								url: '../bind-phone/bind-phone'
							});
							return
						}
						setTimeout(() => {
							this.back()
						}, 350)
					}
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
