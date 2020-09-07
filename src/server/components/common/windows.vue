<template>
	<div class="windows">
		<div ref="cs">测试</div>
		<div class="cs_btn" @click="btn_cs">测试按钮</div>
		<input type="text" v-model="name" />
		<div @click="changeTxt">{{partMsg}}</div>
		
		<div class="btn">
			<div @click="select" class="xh">选号</div>
			<div class="selectN xh" @click="selectAll">一键选号</div>
			<div @click="resetNum" class="reset xh">重选</div>
			<div @click="selectNum" class="selectN xh">筛选</div>
			<div @click="selectNumT" class="selectN xh">特别号</div>
		</div>
		<div class="haoma">
			<p v-for="item in num" v-html="item"></p>
			<p v-html="numT"></p>
		</div>
		<div class="fc_box">
			<div class="fc_item" v-for="item in 10">
				<p v-for="num in fc[item-1]" v-html="num"></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				name:"姓名",
				fc:[],
				num:[],
				numT:0
			}
		},
		props:["partMsg"],
		methods:{
			changeTxt(){
				this.$emit("partClick",this.name)
			},
			select(){
				var arr =[]
				var t=0
				function sj(){
					t = parseInt(Math.random()*100%33)+1
					return t
				}
				for(var n=1; n<=6 ; n++){
					sj()
					for(var m=0;m<arr.length;m++){
						if(t==arr[m]){
							sj()
						}
					}
					arr.push(t)
				}
				arr.sort(function(a,b){
					return a - b;
				})
				var b = parseInt(Math.random()*100%16) +1
				arr.push(b)
				this.fc.push(arr)
				
				//console.log(arr)
//				this.fc.fc_.fc_b = b
				//console.log(this.fc)
			},
			selectAll(){
				for(var i=0;i<10;i++){
					this.select();
				}
			},
			resetNum(){
				this.fc = []
			},
			btn_cs(){
				console.log(this.$refs.cs.innerHTML)
				this.$refs.cs.innerHTML = "你好"
				
			},
			selectNum(){
				//console.log(this.fc)
				var arr = []
				for(var i=0;i<this.fc.length;i++){
					arr = arr.concat(this.fc[i].slice(0,6))
				}
				var arr = [... new Set(arr)] //去重
				
				arr.sort(function(a,b){ //排序
					return a - b;
				})
				var arr1 = []
				for( var i=1; i<=33 ;i++){
					arr1 = arr1.concat(i)
				}
				
				function getArrDifference(arr1, arr) {
			        return arr1.concat(arr).filter(function(v, i, arr2) {
			            return arr2.indexOf(v) === arr2.lastIndexOf(v);
			        });
			    }
				var arr = getArrDifference(arr1,arr)
				//console.log(arr)
				this.num = arr
			},
			selectNumT(){
				this.numT = parseInt(Math.random()*100%16) +1
			}
		}
		
	}
</script>

<style lang="scss">
	.xh{
		width: 100px; height: 35px; text-align: center; line-height: 35px; font-size: 16px; cursor: pointer; background: green; color: #fff;
	}
	.reset{
		background: #f00;
	}
	.selectN{
		background: deepskyblue;
	}
	.btn{
		width: 100%; display: flex;
	}
	.haoma{
		width: 600px; height: 50px; padding: 15px 0; display: flex;
		p{
			width: 50px; height: 50px; border-radius: 100%; margin-right: 15px; font-size: 18px; background: red; color: #fff; text-align: center;
			line-height: 50px;
			&:nth-last-child(1){
				background: blue;
			}
		}
	}
	.fc_box{
		width: 1200px; height: auto; display: flex; flex-wrap: wrap; justify-content: space-between;
		.fc_item{
			width: 45%; height: 50px; padding: 10px 0; border-bottom: 1px solid #000; display: flex;
			p{
				width: 50px; height: 50px; text-align: center; line-height: 50px; border-radius: 100%; margin-right: 10px; background: #f00; color: #fff; 
				font-size: 26px;
				&:nth-last-child(1){
					background: blue;
				}
			}
		}
	}
</style>