<template>
	<div class="manage">
  		<div class="leftNav">
			<ul>
				<li v-for="item in leftNav" v-html="item.name" @click="leftNavTab(item)" :class="item.id == leftNavId ? 'ys_01':'ys_02'"></li>
			</ul>
		</div>
		<div class="manage-item">
			<div class="manage-btn">
				<p @click="addPageShow()">添加</p>
				<div class="search"><input type="text" placeholder="请输入你想查询的姓名" v-model="searchTxt" /><label @click="search()">搜索</label></div>
			</div>
			<div v-show="addPage" class="add">
				<div class="add_">
					<ul>
						<p>基本信息</p>
						<li>
							<label>姓名</label>
							<input type="text" v-model="person.name" class="name txt" />
						</li>
						<li>
							<div class="sex">
								<label class="sex" @click="selectSex(1)" :class="person.sex == 1 ? 'ys':''"></label>
								<label class="sex" @click="selectSex(2)" :class="person.sex !== 1 ? 'ys':''"></label>
							</div>
						</li>
						<li>
							<label>电话</label>
							<input type="text" class="tel txt" v-model="person.tel" maxlength="11" @blur="blur(person)" />
							<i>*</i>
						</li>
						<li>
							<label>年龄</label>
							<input type="text" class="like txt" v-model="person.age" />
						</li>
						<li>
							<label>职业</label>
							<input type="text" class="job txt" v-model="person.job" />
						</li>
						<li>
							<label>地址</label>
							<input type="text" class="address txt" v-model="person.address" @blur="blur(person)" />
							<i>*</i>
						</li>
					</ul>
					<ul>
						<p>预约信息</p>
						<li>
							<label>预约时间</label>
							<input type="text" class="bookTime txt" id="bookTime" placeholder="请输入预约时间" />
						</li>
						<li>
							<label>购买意向</label>
							<input type="text" class="intention txt" v-model="person.intention" />
						</li>
						<li>
							<label>预约人</label>
							<input type="text" class="userId txt" v-model="person.userId" />
						</li>
						<li>
							<label>备注信息</label>
							<input type="text" class="remarks txt" v-model="person.remarks" />
						</li>
					</ul>
					<div class="add_btn">
						<div class="btn_no" @click="addNo()">返回</div>
						<div class="btn_ok" @click="addOk()">确定</div>
					</div>
					
				</div>
			</div>
			<div class="manage-list">
				<ul>
					<li>
						<dl :class="boxShadow == 1 ? '':'ys_box_01'" :style="{height:ulHeight}">
							<dt>
								<p>id</p>
								<p>姓名</p>
							</dt>
							<dd v-for="(item,index) in customer" @mouseover="mouseover(index)" :class="mouseoverIndex == index   ? 'ys':''">
								<p>{{item.id}}</p>
								<p>
									<label v-html="item.name" v-if="item.isEdit"></label>
									<input type="text" v-model="item.name" v-if="!item.isEdit" />
								</p>
							</dd>
						</dl>
					</li>
					<li @scroll="scroll">
						<dl>
							<dt>
								<p>年龄/性别</p>
								<p>电话</p>
								<p>职业</p>
								<p>爱好</p>
								<p>地址</p>
								<p>预约时间</p>
								<p>购买意向</p>
								<p>咨询时间</p>
								<p>备注信息</p>
								<p>咨询人</p>
							</dt>
							<dd v-for="(item,index) in customer" @mouseover="mouseover(index)" :class="mouseoverIndex == index   ? 'ys':''">
								<p>
									<label class="age" v-html="item.age" v-if="item.isEdit"></label>
									<input class="age" type="text" v-model="item.age" v-if="!item.isEdit" /> 
									/
									<label class="sex" :class="item.sex == 1 ? 'ys_01':'ys_02'" v-if="item.isEdit"></label>
									<label class="sexSelect" @click="changeSex(item,1)" v-if="!item.isEdit">
										<i :class="item.sex == 1 ? 'ys':''">✔</i>
									</label>
									<label class="sexSelect" @click="changeSex(item,2)" v-if="!item.isEdit">
										<i :class="item.sex == 2 ? 'ys':''">✔</i>
									</label>
								</p>
								<p>
									<label v-html="item.tel" v-if="item.isEdit"></label>
									<input type="text" v-model="item.tel" v-if="!item.isEdit" />
								</p>
								<p>
									<label v-html="item.job" v-if="item.isEdit"></label>
									<input type="text" v-model="item.job" v-if="!item.isEdit" />
								</p>
								<p>
									<label v-html="item.like" v-if="item.isEdit"></label>
									<input type="text" v-model="item.like" v-if="!item.isEdit" />
								</p>
								<p>
									<label v-html="item.address" v-if="item.isEdit"></label>
									<input type="text" v-model="item.address" v-if="!item.isEdit" />
								</p>
								<p>
									<label v-html="item.bookTime" v-if="item.isEdit"></label>
									<input type="text" v-model="item.bookTime" v-if="!item.isEdit" />
								</p>
								<p>
									<label v-html="item.intention" v-if="item.isEdit"></label>
									<input type="text" v-model="item.intention" v-if="!item.isEdit" />
								</p>
								<p>
									<label v-html="item.recordTime" v-if="item.isEdit"></label>
									<input type="text" v-model="item.recordTime" v-if="!item.isEdit" />
								</p>
								<p>
									<label v-html="item.remarks" v-if="item.isEdit"></label>
									<input type="text" v-model="item.remarks" v-if="!item.isEdit" />
								</p>
								<p>
									<label v-html="item.userId" v-if="item.isEdit"></label>
									<input type="text" v-model="item.userId" v-if="!item.isEdit" />
								</p>
							</dd>
						</dl>
					</li>
					<li>
						<dl :class="boxShadow == 3  ? '':'ys_box_02'" :style="{height:ulHeight}">
							<dt>
								<p>状态</p>
								<p>操作</p>
							</dt>
							<dd v-for="(item,index) in customer" @mouseover="mouseover(index)" :class="mouseoverIndex == index   ? 'ys':''">
								<p>
									<span @click="visited(item)" v-if="item.visited == 0" :class="item.visited == 0   ? 'ys_01':''">未到诊</span>
									<span @click="visited(item)" v-if="item.visited == 1" :class="item.visited == 1   ? 'ys_02':''">已到诊</span>
								</p>
								<p>
									<span @click="edit(item)" v-html="item.editOk" :class="item.editOk == true   ? 'ys_01':'ys_02'"></span>
									<span @click="del(index)">删除</span>
									<!--<span>转移</span>-->
								</p>
							</dd>
						</dl>
					</li>
				</ul>
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
				mouseoverIndex:-1,
				customer:{},
				searchTxt:'',
				addPage:false,
				timeSelect:false,
				ulHeight:0,
				boxShadow:1,
				person:{
					id:0, name:"",age:18,sex:1,tel:"",job:"",like:"",bookTime:"2020/05/05",userId:1,recordTime:"2020/06/24",address:"",
					intention:"",remarks:"",isEdit:true,editOk:"修改",visited:0
				}
			}
		},
		mounted(){
			this.getData()
			laydate.render({
		        elem: '#bookTime',
		        format:"yyyy/MM/dd",
		        min: 0,
		        done: (value) => {
		        	//console.log(value)
		        	this.person.bookTime = value
		        }
		    })
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
		        }).then(function (res) {
		            const data = JSON.parse(res)
		            that.leftNav = data[0].navs[1].navs
		            //console.log(data[1].customer)
		            that.customer = data[1].customer
		            that.ulHeight = data[1].customer.length * 50  + 50 + "px"
		        }).fail(function () {
		            console.log('失败');
		        })
			},
			//左侧列表
			leftNavTab(e){
				//console.log(e.id)
				this.$router.push({ path:'/manage/' + e.id  })
				this.leftNavId = e.id
				//location.reload()
				//console.log(this.leftNavId,e.id)
			},
			//列表的左右滚动
			scroll(e){
				//console.log(e.target.clientWidth,e.target.scrollLeft)
				if(e.target.scrollLeft == 0){
					this.boxShadow = 1
				}else if( 0< e.target.scrollLeft && e.target.scrollLeft < e.path[0].children[0].clientWidth - e.target.clientWidth){
					this.boxShadow = 2
				}else {
					this.boxShadow = 3
				}
			},
			search(){
				console.log()
				var that = this
				$.ajax({
		            url: 'http://wap.yjydg.com/json/json.php',
		            type: 'get',
		        }).then(function (res) {
		            const data = JSON.parse(res)
		            that.leftNav = data[0].navs[1].navs
		            //console.log(data[1].customer)
		            that.customer = data[1].customer
		            var arr=[]
		            for(var i=0;i<that.customer.length;i++){
		            	if(that.searchTxt == that.customer[i].name){
		            		console.log(that.customer[i])
		            	} 
		            }
		            //console.log(that.customer)
		            that.ulHeight = data[1].customer.length * 50  + 50 + "px"
		        }).fail(function () {
		            console.log('失败');
		        })
			},
			//添加页面展示
			addPageShow(){
				this.addPage = true
			},
			//选择性别
			selectSex(e){
				if(e==1){
					this.person.sex = 1
				}else{
					this.person.sex = 2
				}
			},
			//手机号判定
			blur(e){
				//console.log(e)
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(e.tel == ''){
					alert("请输入手机号码")
					return false
				}else if(!myreg.test(e.tel)){
					alert("请输入正确的手机号码")
					return false
				}
			},
			//添加页面的取消事件
			addNo(){
				//console.log("取消")
				this.addPage = false
			},
			//添加页面的确定事件
			addOk(){
				//console.log("确定")
				//console.log(this.person)
				var id = 0
				for(var i = 0; i<this.customer.length ; i++){
					if( id > this.customer[i].id ){
						id = id
					}else{
						id = this.customer[i].id
					}
				}
				var time = new Date()
				this.person.id = parseInt(id) + 1
				var year = time.getFullYear()
				var month = time.getMonth() +1
				var day = time.getDate()
				if(month<10){
					month = "0" + month
				}
				if(day<10){
					day = "0" + day
				}
				this.person.recordTime = year + '/' + month + '/' + day
				this.customer.push(this.person)
				this.person ={
					id:0, name:"",age:18,sex:1,tel:"",job:"",like:"",bookTime:"2020/05/05",userId:1,recordTime:'',address:"",
					intention:"",remarks:"",isEdit:true,editOk:"修改",visited:0
				}
				this.ulHeight = this.customer.length * 50  + 50 + "px"
				this.addPage = false
			},
			//选择是否到诊
			visited(e){
				if(e.visited == 0){
					e.visited = 1
				}else{
					e.visited = 0
				}
			},
			//删除
			del(e){
				//console.log(e)
				this.customer.splice(e,1)
				this.ulHeight = this.customer.length * 50  + 50 + "px"
			},
			//修改性别
			changeSex(item,e){
				//console.log(item,e)
				if(e==1){
					item.sex = 1
				}else{
					item.sex = 2
				}
			},
			//编辑
			edit(e){
				//console.log(e)
				if(e.editOk == "修改"){
					e.editOk = "确定"
					e.isEdit = false
				}else{
					e.editOk = "修改"
					e.isEdit = true
				}
			},
			//鼠标经过列表事件
			mouseover(index){
				//console.log(index)
				this.mouseoverIndex = index
			}
		}
	}
</script>

<style lang="scss">
	.layui-laydate1{
		position: absolute; z-index: 999; background: #000;
	}
	.manage{
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
		.manage-item{
			width: 100%; height: 100%; position: relative; top: 60px; padding-top: 20px;
			.manage-btn{
				height: auto; height: 45px; display: flex; padding: 5px 0; padding-left: 220px;
				p{
					width: 120px; height: 45px; line-height: 45px; text-align: center; font-size: 16px; border-radius: 8px; background: #33b505; 
					cursor: pointer; color: #fff;
				}
				.search{
					width: 300px; height: 30px; line-height: 30px; border:1px solid #e0e0e0; border-radius: 8px; overflow: hidden; position: relative;
					margin-top: 7px; margin-left: 50px;
					input{
						display: block; width: 100%; height: 100%; border: none; text-indent: 8px;
					}
					label{
						position: absolute; display: block; width: 80px; height: 100%; right: 0; top: 0; text-align: center; background: #aaa;
					}
				}
			}
			.add{
				position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 9;
				&:before{
					display: block; width: 100%; height: 100%; background: #000; opacity: 0.8; content: '';
				}
				.add_{
					position: absolute; left: 0; top: 20px; width: 80%; right: 0; margin: 0 auto; height: auto; min-height: 800px; background: #fefefe; border-radius: 10px;
					padding-top: 35px;
					ul{
						margin-left: 300px; width: 600px; height: auto; display: flex; flex-wrap: wrap; justify-content: space-between; border:1px solid #e0e0e0;
						padding: 0 25px; border-radius: 5px; margin-bottom: 25px; box-shadow: 0 0 5px rgba(0,0,0,0.1) inset; padding-bottom: 15px;
						p{
							width: 100%; height: 66px; line-height: 66px; font-size: 26px; border-bottom: 1px solid #f0f0f0; margin-bottom: 15px;
						}
						li{
							width: 45%; height: 60px; line-height: 60px; display: inline-flex; position: relative;
							label{
								height: 60px; font-size: 16px; display: inline-flex; justify-content: center; margin-right: 10px;
							}
							.txt{
								flex: 1; height: 40px; display: block; margin-top: 10px; line-height: 40px; font-size: 14px; text-indent: 15px; border-radius: 8px;
								background: #fff; border:1px solid #e0e0e0;
							}
							.radio{
								display: block; width: 20px; height: 20px; margin-top: 20px; margin-right: 5px;
							}
							.sex{
								width: 80px; height: 30px; margin-top: 15px; border-radius: 8px; background: #f6f6f6; display: flex; justify-content: center;
								label{
									width: 40px; height: 30px; margin: 0;
									&:before{
										display: block; width: 100%; height: 100%; content: '';
									}
									&:nth-child(1){
										&:before{
											background: url(../../image/sex_01.png) no-repeat center / 30px 30px;
										}
									}
									&:nth-child(2){
										&:before{
											background: url(../../image/sex_02.png) no-repeat center / 30px 30px;
										}
									}
									&.ys{
										background: #e6e6e6;
									}
								}
								
							}
							.timeSelect{
								position: absolute; left: 0; top: 60px; width: 100%; height: 300px; background: #fff; border-radius: 8px; z-index: 1;
								box-shadow: 0 0 3px rgba(0,0,0,0.3) inset;
							}
							i{
								position: absolute; right: -20px; font-style: normal; color: #f00; font-size: 16px; padding: 0 8px;
							}
						}
					}
					.add_btn{
						width: 100%; height: 50px; display: flex; justify-content: center;
						.btn_ok,.btn_no{
							width: 150px; height: 50px; border-radius: 8px; text-align: center; line-height: 50px; font-size: 16px; background: #3abb1c; color: #fff;
							margin: 0 auto; margin: 0 15px; cursor: pointer;
						}
						.btn_no{
							background: #f0f0f0; color: #222;
						}
					}
					
				}
			}
			.manage-list{
				margin:0 35px 0 220px; height: auto; overflow: hidden;
				ul{
					width: 100%; height: auto; display: flex;
					li{
						display: inline-flex; position: relative; flex-wrap: wrap;
						dl{
							width: 100%; height: auto;
							dt,dd{
								width: 100%; height: 50px; background: #f0f0f0; display: flex;
								p{
									width: 160px; line-height: 50px; color: #111; font-size: 14px; border:1px solid #e0e0e0; display: inline-flex; justify-content: center;
									&:nth-child(1)~p{
										border-left:none;
									}
								}
							}
							dd{
								background: none;
								p{
									font-size: 13px; border-top: none; display: flex; justify-content: center; position: relative;
									label,input{
										display: block; width: 100%; height: 100%; border:none; text-align: center;
									}
									span{
										display: block; width: 45%; height: 30px; margin-top: 10px; line-height: 30px; text-align: center; border-radius: 10px; 
										cursor: pointer; color: #fff;
										&:nth-child(1){
											&.ys_01{
												background: #888;
											}
											&.ys_02{
												background: #2d87e3;
											}
										}
										&:nth-child(2){
											background: #f54219;
										}
										&:nth-child(3){
											background: #3abb1c;
										}
									}
									.age{
										max-width: 30%;
									}
									label:nth-child(2){
										display: block; width: 30px; height: 30px; margin-top: 10px;
										&.ys_01{
											background: url(../../image/sex_01.png) no-repeat center / 20px 20px;
										}
										&.ys_02{
											background: url(../../image/sex_02.png) no-repeat center / 20px 20px;
										}
									}
									.sexSelect{
										width: 30px; height: 30px; position: relative; margin-top: 10px; border-radius: 100%; margin-left: 10px;
										i{
											position: absolute; display: block; width: 10px; height: 10px; border-radius: 100%; background: #3abb1c;
											color: #fff; right: 0px; font-size: 10px; text-align: center; line-height: 10px; bottom: 0px; display: none;
											overflow: hidden;
											&.ys{
												display: block;
											}
										}
										&.sexSelect:nth-child(2){
											background: #fff url(../../image/sex_01.png) no-repeat center / 30px 30px;
										}
										&.sexSelect:nth-child(3){
											background: #fff url(../../image/sex_02.png) no-repeat center / 30px 30px;
										}
									}
								}
								&.ys{
									background: #e7f3f5;
								}
							}
							&.ys_box_01{
								box-shadow: -3px 0 5px rgba(0,0,0,0.2) inset;
							}
							&.ys_box_02{
								box-shadow: 3px 0 5px rgba(0,0,0,0.2) inset;
							}
						}
						&:nth-child(1){
							width: 180px; z-index: 1;
							dl{
								overflow: hidden;
							}
						}
						&:nth-child(2){
							flex: 1; overflow-x: scroll; 
							dl{
								width: 8000%; flex-wrap: wrap;
								dt,dd{
									p{
										border-left:none;
										&:nth-last-child(1){
											border-right:none;
										}
									}
									
								}
							}
						}
						&:nth-child(3){
							width: 320px; z-index: 1;
							dl{
								overflow: hidden;
							}
						}
					}
				}
				
			}
			
		}
	}
</style>