<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar">疫苗接种点添加</i>
        </el-breadcrumb-item>
<!--        <el-breadcrumb-item>基本表单</el-breadcrumb-item>-->
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="接种点名称" prop="hospitalName">
            <el-input style="width:300px" v-model="form.hospitalName"></el-input>
          </el-form-item>
          <el-form-item label="接种点地址" prop="hospitalLocation">
            <el-input v-model="form.hospitalLocation"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="hospitalTel">
            <el-input style="width:200px"  v-model="form.hospitalTel"></el-input>
          </el-form-item>
          <el-form-item label="支持疫苗种类">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="北京生物" name="type"></el-checkbox>
              <el-checkbox label="北京科兴" name="type"></el-checkbox>
              <el-checkbox label="武汉生物" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

        <el-form-item label="图片地址上传">
          <el-upload class="upload-demo" action="auto" :http-request="uploadSectionFile" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
          </el-upload>
        </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">疫苗接种点地址添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import qs from "qs";
export default {
  name: 'AddVaccineInfo',
  data() {
    return {
      form: {
        hospitalName: '',
        hospitalAddress: '',
        hospitalTel: '',
        type: ['北京生物','北京科兴','武汉生物'],
      },
      rules:{
        hospitalName: [
          { required: true, message: '请输入接种点名称', trigger: 'blur' }
        ],
        hospitalLocation: [
          { required: true, message: '请输入接种点地址', trigger: 'blur' }
        ],
        hospitalTel:[
          { required: true, message: '请输入接种点联系电话', trigger: 'blur' }
        ]
      }
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
        onSubmit() {
          const that = this
          let url = "http://localhost:8181/upload/uploadImg";
          let header = { 'content-type': 'multipart/form-data;boundary=ebf9f03029db4c2799ae16b5428b06bd' }
          let formData = new FormData();
          let urlAddVaccineLocation = "http://localhost:8181/vacinne/addVaccineLocation";
          formData.append("file", this.uploadFile)
          axios.post(url, formData, {headers: header}).then(function (resp){
            let postHead = { 'content-type': 'application/x-www-form-urlencoded' }
            let params = {
              hospitalName: that.form.hospitalName,
              hospitalLocation: that.form.hospitalLocation,
              hospitalTel: that.form.hospitalTel,
              type: that.form.type.join(","),
              picUrl: resp.data.data.picUrl
            }
            axios.post(urlAddVaccineLocation, qs.stringify(params), {headers: postHead}).then(function (resp){
              that.$message.success('保存接种点信息成功！');
            })
          })
          // alert(this.form.type)
          // this.$message.success('提交成功！');
        }
    }
};
</script>