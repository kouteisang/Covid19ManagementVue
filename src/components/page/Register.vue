<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">小区疫情防控综合管理系统用户注册</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">


        <el-form-item>
          <el-upload class="upload-demo" action="auto" :http-request="uploadSectionFile" list-type="picture">
            <el-button size="small" type="primary">点击上传头像</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
          </el-upload>
        </el-form-item>

        <el-form-item prop="identityId">
          <el-input v-model="param.identityId" placeholder="请输入身份证号">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="请输入用户名">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>

          <el-form-item prop="请输入密码">
            <el-input
                type="password"
                placeholder="请输入密码"
                v-model="param.password"
            >
              <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
            </el-input>
          </el-form-item>

        <el-form-item prop="请再次输入密码">
          <el-input
              type="password"
              placeholder="请再次输入密码"
              v-model="param.passwordAgain"
              @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item  prop="ages">
          <el-select v-model="param.options.label" placeholder="请选择您所注册的角色">
            <el-option v-for="age in param.options" :key="age.value" :value="age.value" :label="age.label"/>
          </el-select>
        </el-form-item>

        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data: function() {
    return {
      param: {
        identityId: '',
        username: '',
        password: '',
        passwordAgain:'',
        options: [{
          value: '0',
          label: '普通用户'
        }, {
          value: '1',
          label: '管理员'
        }]
      },
      imageUrl: '',
      rules: {
        username: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    };
  },
  methods: {
    uploadSectionFile(param){
      let fileObj = param.file;
      const isLt2M = fileObj.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return;
      }
      if (fileObj.type === "image/jpeg") {
        this.uploadFile = new File([fileObj], new Date().getTime() + ".jpg", {
          type: "image/jpeg"
        });
      } else if (fileObj.type === "image/png") {
        this.uploadFile = new File([fileObj], new Date().getTime() + ".png", {
          type: "image/png"
        });
      } else {
        this.$message.error("只能上传jpg/png文件");
        return;
      }
    },
    submitForm() {
      const that = this;
      if(this.param.password != this.param.passwordAgain){
          this.$message.warning('两次输入密码不一致');
      }else{
        const that = this
        let url = "http://localhost:8181/upload/uploadImg";
        let header = { 'content-type': 'multipart/form-data;boundary=ebf9f03029db4c2799ae16b5428b06bd' }
        let formData = new FormData();
        let urlAddVaccineLocation = "http://localhost:8181/manager/register";
        formData.append("file", this.uploadFile)
        axios.post(url, formData, {headers: header}).then(function (resp){
          let postHead = { 'content-type': 'application/x-www-form-urlencoded' }
          let params = {
            identityId: that.param.identityId,
            password: that.param.password,
            username: that.param.username,
            picUrl: resp.data.data.picUrl,
            role: parseInt(that.param.options.label)
          }
          axios.post(urlAddVaccineLocation, qs.stringify(params), {headers: postHead}).then(function (resp){
            that.$message.success(resp.data.data.res);
          })
        })
      }
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>