<template>
	<div class="followUp">
		<div class="leftNav">
			<ul>
				<li v-for="item in leftNav" v-html="item.name" @click="leftNavTab(item)" :class="item.id == leftNavId ? 'ys_01':'ys_02'"></li>
			</ul>
		</div>
		<div class="followUp-content">
			<div class="followUp-list">
				<div class="btn">需要跟进</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data () {
			return{
				leftNav:{},
				leftNavId:1,
			}
		},
		mounted () {
			this.getData()
		},
		methods : {
			getData(){
				if(this.$route.params.id == undefined){
					this.$route.params.id =1
				}
				//console.log(this.$route.params.id)
				this.leftNavId = this.$route.params.id
				var that = this
				$.ajax({
		            url: 'http://wap.yjydg.com/json/json.php',
		            type: 'get',
		        }).then (res => {
		            const data = JSON.parse(res)
		            that.leftNav = data[0].navs[2].navs
		            //console.log(that.leftNav)
//		            that.customer = data[1].customer
//		            that.ulHeight = data[1].customer.length * 50  + 50 + "px"
		        }).fail (() => {
		            console.log('失败');
		        })
			},
			//左侧列表
			leftNavTab(e){
				//console.log(e.id)
				this.$router.push({ path:'/followUp/' + e.id  })
				this.leftNavId = e.id
			},
		},
	}
</script>

<style lang="scss">
	.layui-laydate1{
		position: absolute; z-index: 999; background: #000;
	}
	.followUp{
		width: 100%; height: 100%; position: relative;
		.leftNav{
			position: fixed; left: 0; top: 60px; width: 205px; height: 100%; border-right:1px solid #e0e0e0; z-index: 3;
			ul{
				width: 100%; height: auto;
				li{
					width: 90%; height: 50px; line-height: 50px; font-size: 14px; cursor: default; padding: 0 5%; 
					&:hover{
						background: #c0e4f6;
					}
					&.ys_01{
						color: #4fb8ef;
					}
					&.ys_02{
						color: #161616;
					}
				}
			}
		}
		.followUp-content{
			width: 100%; height: 100%; position: relative; top: 60px; padding-top: 20px;
			.followUp-list{
				margin:0 35px 0 220px; height: auto; overflow: hidden;
			}
		}
	}
</style>