<template>
	<view class="p-3">
		<view class="flex rounded shadow" style="background-color: #FFFFFF;">
			<view v-for="(item,index) in icons" :key="index" hover-class="bg-light" class="flex justify-center align-center flex-1 flex-column py-3" @click="open(item)">
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
		},
		methods:{
			open(item){
				if(!item.path){
					return
				}
				this.authJump(item.path)
			}
		}
	}
</script>

<style>
</style>
