<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">小区疫情防控综合管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="identityId">
                    <el-input v-model="param.identityId" placeholder="请输入身份证号">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <div class="login-btn">
                    <el-button type="info" @click="registerInfo()">注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
      submitForm() {
        let url = "http://localhost:8181/manager/login"
        let params = {
          identityId:this.param.identityId,
          password:this.param.password
        }
        const that = this
        this.$refs.login.validate(valid => {
          that.axios.get(url, {params:params}).then(function (resp) {
            if(resp.data.data.status === 200){
              that.$message.success('登录成功');
              localStorage.setItem('ms_username', resp.data.data.communityUserInfo.identityId);
              localStorage.setItem('username', resp.data.data.communityUserInfo.username);
              localStorage.setItem("picUrl", resp.data.data.communityUserInfo.picurl)
              localStorage.setItem("nowTime", resp.data.data.nowTime)
              localStorage.setItem("address", resp.data.data.address)
              if(resp.data.data.role === "user")
                  localStorage.setItem('nowRole', "0")
              else localStorage.setItem("nowRole", "1")

              that.$store
                  .dispatch('user/login',{role: resp.data.data.role,
                  h:'1'})
                  .then(()=>{
                    that.$router.push('/dashboard');
                  })
                  .catch(err=>{

                  })
            }else {
              that.$message.error('帐号或密码有误');
              console.log('error submit!!');
              return false;
            }
          })
        });
      },
      registerInfo(){
        this.$router.push('/register');
      }
    }
  ,
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpeg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #000000;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>