<template>
	<header>
		<ul>
			<li v-for="(item,index) in navs">
				<router-link :to="item.href">{{item.name}}</router-link>
			</li>
		</ul>
		<div class="login" @click="login_out_show">
			<div class="login_img">
				<img :src="user.logo" />
			</div>
			<div class="login_out"><span v-if="!login_out_btn">▼</span><span v-if="login_out_btn">▲</span><p v-if="login_out_btn" @click.stop="login_out">退出账号</p></div>
		</div>
	</header>
</template>

<script>
export default{
	data () {
		return{
			navs:[],
			user:{},
			login_out_btn:false
		}
	},
	created: function () {
		var that = this
		$.ajax({
            url: 'http://wap.yjydg.com/json/json.php',
            type: 'get',
        }).then(function (res) {
            //console.log(JSON.parse(res));
            const data = JSON.parse(res)
            that.navs = data[0].navs
            that.user = data[2].user[0]
        }).fail(function () {
            console.log('失败');
        })
	},
	methods : {
		login_out_show(){
			if(this.login_out_btn == false){
				this.login_out_btn = true
			}else{
				this.login_out_btn = false
			}
		},
		login_out(){
			console.log("退出")
		}
	}
}
</script>

<style lang="scss">
	header{
		position: fixed; left: 0; top: 0; width: 100%; display: flex; justify-content: space-between; height: 60px; background: #2674f6; z-index: 9;
		&:before{
			position: absolute; left: 0; top: 0; display: block; width: 100%; height: 100%; background: #2674f6; content: ''; z-index: -1;
		}
		ul{
			width: auto; margin-left: 10px; display: inline-flex; position: relative;
			li{
				width: auto; height: 60px; line-height: 60px; font-size: 16px; cursor: default;
				a{
					display: block; width: auto; height: 58px;  padding: 0 25px; border-bottom: 2px solid #2674f6; color: #fff; position: relative; z-index: 1;
					&:before{
						position: absolute; left: 0; top: 0; display: block; width: 100%; height: 100%; z-index: -1;
					}
				}
				dl{
					position: fixed; left: 0; top: 60px; width: 210px; height: 100%; background: #fff;
				}
				&:hover{
					a{
						&:before{
							background: #000; opacity: 0.3; content: '';
						}
					}
				}
			}
		}
		.login{
			width: 80px; height: 100%; display: inline-flex; cursor: pointer; margin-right: 10px;
			.login_img{
				width: 50px; height: 50px; border-radius: 100%; overflow: hidden; background: #000; margin: 5px;
				img{
					width: 100%; height: auto;
				}
			}
			.login_out{
				margin-left: -5px; width: 20px; height: 20px; margin-top: 30px; text-align: center; font-size: 15px; color: #fff; position: relative;
				p{
					position: absolute; bottom: -45px; right: 0; height: 30px; line-height: 30px; width: 80px; background: #aaa; color: #000; border-radius: 5px; font-size: 14px;
				}
			}
		}
	}
	@media screen and (max-width: 1200px) and (min-width:960px){
		header{
			width: 100%;
		}
	}
	@media screen and (max-width: 750px){
		header{
			width: 100%; position: fixed; left: 0; top: 0; width: 100px; height: 100%; background: none; flex-wrap: wrap;
			ul{
				width: 100%; height: auto; flex-wrap: wrap; margin-top: 60px; display: block; margin-left: 0;
				li{
					width: 100%; height: auto; position: relative;
					a{
						padding: 0; width: 100%; text-align: center;
					}
					dl{
						width: 100%; height: auto; position: relative;
						dd{
							width: 100%; height: 40px; line-height: 40px; text-align: center; line-height: 40px; font-size:14px; color: #eee;
						}
					}
				}
			}
			.login{
				position: absolute; top: 0; left: 0; width: 100%; height: 60px; justify-content: center;
			}
		}
	}
</style>