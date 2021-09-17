<template>
	<view>
		<view style="background-color: rgb(245,245,241);" :style="getStyle" :class="getClass"></view>
	</view>
</template>

<script>
	export default {
		props:{
			width:{
				type:[String,Number],
				default:0
			},
			height:{
				type:[String,Number],
				default:0
			},
			circle:{
				type:Boolean,
				default:false
			},
			oClass:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			getStyle(){
				return `width:${this.width};height:${this.height};`
			},
			getClass(){
				let c = ''
				if(this.circle){
					c+='rounded-circle'
				}
				return `${c} ${this.oClass}`
			}
		}
	}
</script>

<style>

</style>
