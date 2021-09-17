<template>
	<view>
		<view style="background-color: #f5f5f1;height: 74rpx;" class="flex justify-center align-center mx-1 my-2 rounded">
			<uni-icons type="search" color="#9a9a9a" size="20"></uni-icons>
			<text style="color:#6f6f6f" class="ml-2">{{placeholder}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			placeholder:{
				type:String,
				default:''
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
