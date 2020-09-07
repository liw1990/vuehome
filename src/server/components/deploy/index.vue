<template>
	<div class="deploy">
		<p>{{name}}</p>
		{{sun.a}}
		<v-part :partMsg="msg" @partClick="change"></v-part>
	</div>
</template>
<script>
	import parts from "@/server/components/common/windows.vue"
	export default{
		data () {
			return{
				sun:{a:1},
				logo:"这是一个logo",
				name:'',
				msg:'这是个组件之间传递的数据'
			}
		},
		mounted () {
			this.handle()
			this.getData()
		},
		components:{
			"v-part" : parts,
		},
		methods : {
			handle(){
				this.sun.a = 2
			},
			change(e){
				console.log(e)
				this.name=e
			},
			getData(){
				console.log(1)
				$.ajax("http://wap.yjydg.com/json/json.php", {
					jsonpCallback: "moty",
					dataType: "jsonp",
					success: function(json) {
						console.log(json)
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.deploy{
		padding: 100px 0 0 300px;
	}
</style>