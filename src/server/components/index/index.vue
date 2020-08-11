<template>
	<div class="index">
		<div class="index_">
	  		<div class="index_user">
	  			<div class="index_user_logo">
	  				<img :src="user.logo" />
	  			</div>
	  			<div class="index_user_info">
	  				<p>
	  					<span>您好！</span>
	  					<span v-html="user.name"></span>
	  					<span>。</span>
	  					<span>现在已经</span>
	  					<span v-html="hellow"></span>
	  				</p>
	  				<p>
	  					<span v-html="user.department"></span>|
	  					<span v-html="user.job"></span>
	  				</p>
	  			</div>
	  			<ul>
	  				<li>
	  					<p>我的客户</p>
	  					<p v-html="user.customerCount"></p>
	  				</li>
	  				<li>
	  					<p>团队内排名</p>
	  					<p><span v-html="user.rank"></span>/<span v-html="userCount"></span></p>
	  				</li>
	  				<li>
	  					<p>客户总数</p>
	  					<p v-html="customerCount"></p>
	  				</li>
	  			</ul>
	  		</div>
	  		<div class="index_progress">
	  			<ul>
	  				<li v-for="item in user.process">
	  					<p v-html="item.name">今日进度</p>
	  					<p><span v-html="item.process"></span>%</p>
	  					<p>
	  						<span :style="{width:item.process+ '%'}"></span>
	  					</p>
	  				</li>
	  			</ul>
	  		</div>
	  		<div class="index_statistic">
	  			<div ref="bar" class="index_statistic_item"></div>
	  			<div ref="line" class="index_statistic_item"></div>
	  			<div ref="pie" class="index_statistic_item"></div>
	  		</div>
	  		<div class="index_bot" ref="geoMap"></div>
		</div>
	</div>
</template>

<script>
	import {geoCityMap,geoCityData} from '@/files/city'
	export default{
		data () {
			return{
				hellow:"",
				user:{},
				customerCount:0,
				userCount:0,
				users:{},
				geoCityMap,
				geoCityData
			}
		},
		mounted(){
			this.getData()
			this.geoCityMap = geoCityMap
			this.geoCityData = geoCityData
	        var time = new Date()
	        if(time.getHours() < 6 && time.getHours() >= 0){
	        	this.hellow = "凌晨了"
	        }else if(time.getHours() < 11 && time.getHours() >= 6 ){
	        	this.hellow = "早上了"
	        }else if(time.getHours() < 14 && time.getHours() >= 11){
	        	this.hellow = "中午了"
	        }else if(time.getHours() < 17 && time.getHours() >= 14){
	        	this.hellow = "下午了"
	        }else if(time.getHours() < 19 && time.getHours() >= 17){
	        	this.hellow = "傍晚了"
	        }else{
	        	this.hellow = "晚上了"
	        }
	        //console.log(1)
		},
		beforeUpdate () {
			//console.log(2)
			this.setBar()
			this.setLine()
			this.setPie()
			this.geoCity()
		},
		methods:{
			getData(){
				var that = this
				$.ajax({
		            url: 'http://wap.yjydg.com/json/json.php',
		            type: 'get',
		        }).then(res => {
		        	//console.log(res)
		            //console.log(JSON.parse(res));
		            const data = JSON.parse(res)
		            that.user = data[2].user[0]
		            that.users = data[2].user
		            //console.log(data[2].user)
		            that.customerCount = data[1].customer.length
		            that.userCount = data[2].user.length
		            //console.log(that.user,that.userCount,that.customerCount)
		        }).fail(()=> {
		            console.log('失败');
		        })
			},
			setBar(){
				var echarts = require('echarts')
				var myChart = echarts.init(this.$refs.bar)
				//console.log(this.$refs.bar)
				var bookData = []
				var visitedData = []
				var recordTime = []
				if(this.user.daily){
					for( let i =0; i<this.user.daily.length; i++){
						if(i>(this.user.daily.length - 8)){
							bookData.push(this.user.daily[i].bookCount)
							visitedData.push(this.user.daily[i].visited)
							recordTime.push(this.user.daily[i].recordTime)
						}
					}
				}
				//console.log(visitedData,bookData,recordTime)
				myChart.setOption({
					color:['#2674f6',"#f00"],
			        title: {
			          text: '数据柱状图展示',
			          left:'left',
			          top:'top'
			        },
			        grid: {
			        	top:'15%',
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    legend: {
				        data: ['预约数','实到数'],
				        left:'right'
				    },
			        tooltip: {
				        trigger: 'axis',
				        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
			        xAxis: {
			          data: recordTime
			        },
			        yAxis: [{
			        	type:'value',
			        	data:[2,4,6,8,10,12,14,16,18]
			        }],
			        series: [{
				        name: '预约数',
				        type: 'bar',
				        data: bookData
			        },{
				        name: '实到数',
				        type: 'bar',
				        barGap: 0,
				        data: visitedData
			        }]
			    })
			},
			setLine(){
				var echarts = require('echarts')
				var myChart = echarts.init(this.$refs.line)
				//console.log(this.$refs.bar)
				var browseData = []
				var consultData = []
				var recordTime = []
				if(this.user.daily){
					for( let i =0; i<this.user.daily.length; i++){
						if(i>(this.user.daily.length - 8)){
							browseData.push(this.user.daily[i].browseCount)
							consultData.push(this.user.daily[i].consult)
							recordTime.push(this.user.daily[i].recordTime)
						}
					}
				}
				myChart.setOption({
					color:['#2674f6',"#f00"],
			        title: {
			          text: '折线图展示',
			          left:'left',
			          top:'top'
			        },
			        grid: {
			        	top:'15%',
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    legend: {
				        data: ['浏览量','咨询数'],
				        left:'right'
				    },
			        tooltip: {
				        trigger: 'axis',
				        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
			        xAxis: {
			          data: recordTime,
			          boundaryGap: false
			        },
			        yAxis: [{
			        	type:'value',
			        	data:[2,4,6,8,10,12,14,16,18]
			        }],
			        series: [{
				        name: '浏览量',
				        type: 'line',
				        smooth: true,
				        areaStyle: {},
				        data: browseData
			        },{
				        name: '咨询数',
				        type: 'line',
				        smooth: true,
				        areaStyle: {},
				        data: consultData
			        }]
			    })
			},
			setPie(){
				var echarts = require('echarts')
				var myChart = echarts.init(this.$refs.pie)
				//console.log(this.$refs.bar)
				var customerData = []
				var nameData = []
				if(this.users){
					for( let i =0; i<this.users.length; i++){
						customerData.push({value:this.users[i].customerCount,name:this.users[i].name})
						nameData.push(this.users[i].name)
					}
				}
				//console.log(customerData,nameData)
				myChart.setOption({
					title: {
				        text: '饼状图展示',
				        left: 'left'
				    },
				    grid: {
			        	top:'15%',
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    tooltip: {
				        trigger: 'item',
				        formatter: '{a} <br/>{b} : {c} ({d}%)'
				    },
				    legend: {
				        //type: 'scroll',
				        //orient: 'vertical',
				        left: 'right',
				        top: 20,
				        //bottom: 20,
				        data:nameData
				    },
				    series: [
				        {
				            name: '顾客数占比',
				            type: 'pie',
				            radius: '55%',
				            center: ['45%', '60%'],
				            data: customerData,
				            emphasis: {
				                itemStyle: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
			    })
			},
			geoCity(){
				const geoCityMap = this.geoCityMap
				const data = this.geoCityData
				var echarts = require('echarts')
				var myChart = echarts.init(this.$refs.geoMap)
				var option = null
				var convertData = function(data) {
					var res = [];
					for(var i = 0; i < data.length; i++) {
						var geoCoord = geoCityMap[data[i].title];
						if(geoCoord) {
							res.push({
								name: data[i].name,
								title: data[i].title,
								value: geoCoord.concat(data[i].value)
							});
						}
					}
					//console.log(res)
					return res;
				};
				option = {
					backgroundColor: '#fefefe',
					title: {
						text: '全国人口分布图',
						subtext: '2019年人口统计',
						sublink: 'http://www.baidu.com',
						left: 'center',
						top: 20,
						textStyle: {
							color: '#111'
						}
					},
					tooltip: { //设置提示框
						backgroundColor: '#666', 
						trigger: 'item',
						showDelay: 0, //提示框显示的延迟时间
						transitionDuration: 0.3, //提示框运动时间
						formatter: function(params) {
							return params.data.name + '<br/>' + "省会" + " : " + params.data.title + '<br/>' + "人口" + ' : ' + params.data.value[2] + "万";
						}
					},
					visualMap: { // 左下角说明
						min: 0,
						max: 12000,
						realtime: false,
						calculable: true,
						inRange: {
							color: ['lightskyblue', 'yellow', 'orangered']
						},
						textStyle: {
							color: '#111'
						}
					},
					geo: {
					    map: 'china',
					    label: { //隐藏省份名字
							normal: {
								show: false 
							},
							emphasis: {
								show: false
							}
						},
					},
					series: [{
						name: '人口分布图',
						type: 'scatter', //设置地图的类型为散点
						coordinateSystem: 'geo',
						data: convertData(data),
						symbolSize: 10, //点的大小
						label: {  //隐藏地理位置
							normal: {
								show: false 
							},
							emphasis: {
								show: false
							}
						},
						itemStyle: { //设置小圆点
					        normal: {
					            borderColor: '#111'
					        },
					        emphasis: {
					        	
					        }
					    }
					}]
				}
				if(option && typeof option === "object") {
					//console.log(option)
					myChart.setOption(option, true);
				}
			},
		}
	}
</script>

<style lang="scss">
	@-webkit-keyframes mybot{
	    0% { transform: translate(0,100%);}
	    100% { transform: translate(0,0);}
	}
	@-webkit-keyframes myleft{
	    0% { transform: translate(-100%,0);}
	    100% { transform: translate(0,0);}
	}
	.index{
		position: relative; left: 0; top: 10%; right: 0; width: 100%; height:auto; overflow: hidden;
		.index_{
			width: 93%; height: auto; background: #fff; margin: 0 auto; padding: 0 1%;
		}
		.index_user{
			width: 100%; height: 100px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; margin-bottom: 30px;
			.index_user_logo{
				width: 80px; height: 80px; overflow: hidden; margin: 10px; border-radius: 100%;
			}
			.index_user_info{
				flex: 1; height: 80px; padding: 10px 0;
				p:nth-child(1){
					height: 50px; line-height: 50px; font-size: 25px; color: #555;
					span{
						float: left;
					}
				}
				p:nth-child(2){
					height: 30px; line-height: 30px; font-size: 16px; color: #555;
					span{
						padding: 0 8px;
					}
				}
			}
			ul{
				width: auto; height: 80px; padding: 10px 0; display: inline-flex;
				li{
					width: auto; height: 80px;
					p{
						width: auto; padding: 0 30px; height: 40px; line-height: 40px; text-align: center; font-size: 16px;
						&:nth-child(1){
							color: #666;
						}
						&:nth-child(2){
							font-size: 25px;
						}
						span{
							padding: 0 8px;
						}
					}
				}
			}
		}
		.index_progress{
			width: 100%; height: auto; padding: 20px 0;
			ul{
				width: 100%; display: flex; height: auto; justify-content: space-between;
				li{
					width: 19%; height: auto; padding: 15px 0; box-shadow: 0 0 5px rgba(0,0,0,0.2); border-radius: 5px; overflow: hidden;
					p{
						height: 30px; line-height: 30px; font-size: 16px; color: #666; width: 90%; margin: 0 auto;
						&:nth-child(2){
							height: 45px; line-height: 45px; font-size: 25px; color: #222; margin: 10px auto;
						}
						&:nth-child(3){
							border-radius: 13px; height: 26px; background: #eee; position: relative; overflow: hidden;
							span{
								display: block; position: absolute; left: 0; top: 0; width: 30%; height: 100%; background: #2674f6; border-radius: 13px; overflow: hidden;
								animation: myleft 1s; animation-fill-mode: forwards;
							}
						}
					}
				}
			}
		}
		.index_statistic{
			width: 100%; height: auto; display: flex; justify-content: space-between; margin-bottom: 30px;
			.index_statistic_item{
				width: 30%; height: 300px; padding: 15px 1%; background: #fefefe; position: relative; box-shadow: 0 0 5px rgba(0,0,0,0.2); border-radius: 5px; 
				overflow: hidden;
			}
		}
		.index_bot{
			width: 100%; height: 700px; position: relative; background: #fff; box-shadow: 0 0 5px rgba(0,0,0,0.2); border-radius: 5px; overflow: hidden;
		}
	}
</style>