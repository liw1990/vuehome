<template>
	<div id="app">
		<v-header></v-header>
		<v-scroll>
			<router-view></router-view>
		</v-scroll>
	</div>
</template>

<script>
	import scroll from '@/server/components/common/scroll.vue'
	import header from '@/server/components/common/header.vue'
	export default {
		data (){
			return{
				
			}
		},
		components:{
			"v-scroll" : scroll,
			"v-header" : header
		},
		methods : {
			scroll(event) {
				this.pos = event.target.scrollTop
				//console.log('scroll', event.target.scrollTop)
            },
		}
	}
</script>
<style lang="scss">
	*{ margin: 0; padding: 0;}
	html,body{
		width: 100%; height: 100%; font-size: 12px; background: #f5f5f5;
	}
	li,dd,dt{
		list-style: none;
	}
	img{
		display: block;
	}
	a{
		color: #fff; text-decoration: none;
	}
	input{
		border: none;
	}
	input,a,div,span,p,{
		outline-style: none;
	}
	#app{
		width: 100%; height: 100%; position: fixed; left: 0; top: 0;
		img{
			width: 100%; height: auto;
		}
	}
</style>
