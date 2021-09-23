<template>
	<view class="flex flex-wrap py-1">
		<view style="width:25%" v-for="(item,index) in list" :key="index" class="flex flex-column align-center justify-center py-1" hover-class="bg-light">
			<image style="width:68rpx;height: 68rpx;" :src="item.src" mode="aspectFill"></image>
			<text class="mt-1">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:'icon-nav',
		props:{
			list:{
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
