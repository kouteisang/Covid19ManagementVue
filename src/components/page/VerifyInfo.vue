<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar">身份认证</i>
        </el-breadcrumb-item>
        <!--        <el-breadcrumb-item>基本表单</el-breadcrumb-item>-->
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">

        <el-form ref="form" :model="form" label-width="150px" :rules="rules">

          <el-form-item label="本人签字图片上传">
            <el-upload class="upload-demo" action="auto" :http-request="uploadSignPic" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
            </el-upload>
          </el-form-item>

          <el-form-item label="身份证头像面上传">
            <el-upload class="upload-demo" action="auto" :http-request="uploadFacePic" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
            </el-upload>
          </el-form-item>

          <el-form-item label="身份证国徽面上传">
            <el-upload class="upload-demo" action="auto" :http-request="nationalEmblem" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">身份认证</el-button>
          </el-form-item>

          <div v-if="form.name != ''">姓名：{{form.name}}</div>
          <div v-if="form.identityId != ''">身份证号：{{form.identityId}}</div>
          <div v-if="form.birth != ''">出生年月：{{form.birth}}</div>
          <div v-if="form.sex != ''">性别：{{form.sex}}</div>
          <div v-if="form.nationality != ''">民族：{{form.nationality}}</div>
          <div v-if="form.startDate != ''">有效日期：{{form.startDate}}-{{form.endDate}}</div>
          <div v-if="form.issue != ''">签发机构：{{form.issue}}</div>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import qs from "qs";
export default {
  name: 'VerifyInfo',
  data() {
    return {
      form: {
          name: '',
          identityId:'',
          sex:'',
          nationality:'',
          birth:'',
          startDate:'',
          endDate:'',
          issue:''
      },
      fileUrls:[]
    };
  },
  methods: {
    uploadSignPic(param){
      let fileObj = param.file;
      const isLt2M = fileObj.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return;
      }
      if (fileObj.type === "image/jpeg") {
        this.signPic = new File([fileObj], new Date().getTime() + ".jpg", {
          type: "image/jpeg"
        });
      } else if (fileObj.type === "image/png") {
        this.signPic = new File([fileObj], new Date().getTime() + ".png", {
          type: "image/png"
        });
      } else {
        this.$message.error("只能上传jpg/png文件");
        return;
      }
    },
    uploadFacePic(param){
      let fileObj = param.file;
      const isLt2M = fileObj.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return;
      }
      if (fileObj.type === "image/jpeg") {
        this.faceFile = new File([fileObj], new Date().getTime() + ".jpg", {
          type: "image/jpeg"
        });
      } else if (fileObj.type === "image/png") {
        this.faceFile = new File([fileObj], new Date().getTime() + ".png", {
          type: "image/png"
        });
      } else {
        this.$message.error("只能上传jpg/png文件");
        return;
      }
    },
    nationalEmblem(param){
      let fileObj = param.file;
      const isLt2M = fileObj.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return;
      }
      if (fileObj.type === "image/jpeg") {
        this.nationFile = new File([fileObj], new Date().getTime() + ".jpg", {
          type: "image/jpeg"
        });
      } else if (fileObj.type === "image/png") {
        this.nationFile = new File([fileObj], new Date().getTime() + ".png", {
          type: "image/png"
        });
      } else {
        this.$message.error("只能上传jpg/png文件");
        return;
      }
    },
    onSubmit() {
      const that = this
      let url = "http://localhost:8181/upload/uploadImgs";
      let header = { 'content-type': 'multipart/form-data;boundary=ebf9f03029db4c2799ae16b5428b06bd' }
      let formData = new FormData();
      let urlData = "http://localhost:8181/verify/verifyInfo";
      formData.append("file", this.signPic)
      formData.append("file", this.faceFile);
      formData.append("file", this.nationFile);
      axios.post(url, formData, {headers: header}).then(function (resp){
        let postHead = { 'content-type': 'application/x-www-form-urlencoded' }
        that.fileUrls = resp.data.data.fileUrls;
        alert(that.fileUrls[0])
        let paramsInfo = {
          signUrl: that.fileUrls[0],
          faceUrl:that.fileUrls[1],
          backUrl:that.fileUrls[2]
        }
        axios.post(urlData, qs.stringify(paramsInfo), {headers:postHead}).then(function (resp){
          console.log(resp)
            that.form.name = resp.data.data.name
            that.form.identityId = resp.data.data.face.identityId;
          that.form.address = resp.data.data.face.address;
          that.form.sex = resp.data.data.face.sex;
          that.form.nationality = resp.data.data.face.nationality;
          that.form.issue = resp.data.data.back.issue
          that.form.startDate = resp.data.data.back.start_date
          that.form.endDate = resp.data.data.back.end_date



        })
      })
    }
  }
};
</script>