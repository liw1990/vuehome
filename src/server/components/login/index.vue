<template>
	<div class="login">
		<dl>
			<dt></dt>
			<dd :class="nameBorderColor ? 'b_eee':'b_f00'">
				<label></label>
				<input type="text" placeholder="请输入登录账号" :value="userName" />
			</dd>
			<dd :class="psdBorderColor ? 'b_eee':'b_f00'">
				<label></label>
				<input type="password" maxlength="18" placeholder="请输入登录密码" :value="userPsd" />
			</dd>
			<dd>登  录</dd>
		</dl>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				userName:'',
				userPsd:'',
				nameBorderColor:true,
				psdBorderColor:true,
			}
		},
		methods : {
			
		}
	}
</script>

<style lang="scss">
	.login{
		width: 100%; height: 100%; background: #2674f6; display: flex; justify-content: center; align-items: center;
		dl{
			width: 500px; height: 460px; padding: 30px 0; margin: 0 auto; background: #fff; border-radius: 15px; box-shadow: 0 0 10px rgba(0,0,0,0.3) inset; 
			dt{
				width: 150px; height: 150px; background: url(../../image/1.jpg) no-repeat center; border-radius: 100%; overflow: hidden; margin: 0 auto;
			}
			dd{
				width: 80%; margin: 0 auto; display: flex; height: 50px; background: #fff; border-radius: 5px; margin-top: 30px; overflow: hidden;
				label{
					display: block; width: 80px; height: 100%;
				}
				input{
					flex: 1; display: block; height: 100%; padding-left: 8px; font-size: 16px; color: #222;
				}
				&:nth-child(2){
					label{
						background: #eee url(../../image/user.png) no-repeat center / 28px 28px;
					}
				}
				&:nth-child(3){
					label{
						background: #eee url(../../image/password.png) no-repeat center / 28px 28px;
					}
				}
				&:nth-child(4){
					justify-content: center; line-height: 50px; font-size: 18px; color: #fff; background: #2674f6; cursor: pointer;			
				}
				&.b_eee{
					border:1px solid #eee;
				}
				&.b_f00{
					border:1px solid #f00;
				}
			}
		}
	}
</style>