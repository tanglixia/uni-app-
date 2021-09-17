<template>
	<view>
		<view class="main-btn bg-main mt-4" hover-class="bg-main-hover" @click="onClick"><slot></slot></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			onClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style>

</style>
