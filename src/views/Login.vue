<template>
  <div class="login-container">
    <div class="login_box">
      <!--使用v-loading在接口未请求到数据之前，显示加载中，直到请求到数据后消失。
      loading-text是登陆文本-->
      <!--  username  el-form表格，el-form-item表格元素 -->
      <el-form label-width="0px" class="login_form" :rules="rules" :model="loginForm" ref="loginFormRef">
      <el-form-item prop="adminName">
        <el-input size="normal" type="text" v-model="loginForm.adminName" auto-complete="off"
                  placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <!--  password    -->
      <el-form-item prop="adminPassword">
        <el-input size="normal" type="password" v-model="loginForm.adminPassword" auto-complete="off"
                  placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item class="login_btn">
        <el-button type="primary" plain class="login" @click="login">登陆</el-button>
        <el-button type="info" plain style="padding: 12px 25px" @click="reset">重置</el-button>
      </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:"Login",
  data(){
    return{
      loading:false,
      loginForm:{
        adminName:'',
        adminPassword:'',
      },
      checked:true,
      rules:{
        adminName: [
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:1,max:10,message: '长度在1到10个字符',trigger: 'blur'}
        ],
        adminPassword: [
          {required:true,message:'请输入密码',trigger:'blur'},
          {min:3,max:10,message: '长度在3到10个字符',trigger: 'blur'}
        ],
      }
    }
  },


  created() {
    let _self = this;
    document.onkeydown=function (e){
      e=e||window.event;
      if(e.which===1){
        _self.login();
      }
    }
  },
  methods:{
    login()
    {
      this.$refs.loginFormRef.validate(valid=>{
        if(valid){
          this.loading=true;
          this.$http.post('/user/login',this.loginForm).then(resp=>{
            console.log(resp);
            if(resp&&resp.status===200){
              let _data = resp.data
              this.$store.commit('login',_data)
              this.$router.replace("/home");
            }
            else{
              this.loading=false;
            }
          })
        }
        else{
          return false;
        }
      });
    },
    reset(){
      this.$refs.loginFormRef.resetFields();
    }
  }

}
</script>

<style scoped>
.login-container{
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.login_box
{
  width: 400px;
  height: 400px;
  background-color: #fff;
  position: absolute;
  left:60%;
  top:25%;
  border:10px solid rgba(100,200,200,1);
}
.login_form
{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
.login_btn{
  display: flex;
  justify-content: center;
  padding: 7px 25px;
}
.login .login_box{
  margin-inline-start: 10px;
  margin-inline-end: 28px;
  padding: 12px 25px;
}
</style>