<template>
	<view class="p-3">
		<view class="flex rounded shadow" style="background-color: #FFFFFF;">
			<view v-for="(item,index) in icons" :key="index" class="flex justify-center align-center flex-1 flex-column my-3">
				<text class="iconfont" :class="item.icon" style="font-size: 20px;color: #febd00;"></text>
				<text class="text-secondary font-sm mt-1">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			icons:{
				type:Array
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
</style>
