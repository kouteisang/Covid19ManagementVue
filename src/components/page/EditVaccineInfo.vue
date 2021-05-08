<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 病情人员管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>添加生病人员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-form-item label="身份证号">
            <div> {{form.identityId}} </div>
          </el-form-item>
          <el-form-item label="姓名">
            <div> {{form.realName}} </div>
          </el-form-item>
          <el-form-item label="联系电话">
            <div>{{form.phone}}</div>
          </el-form-item>
          <el-form-item label="预约状态">
            <div>{{form.vaccineStatus}}</div>
          </el-form-item>
          <el-form-item label="预约品牌" >
            <div>{{form.vaccineType}}</div>
          </el-form-item>
          <el-form-item label="预约时间" >
            <div>{{form.createTime}}</div>
          </el-form-item>
          <el-form-item label="上传接种凭证">
            <el-upload class="upload-demo" action="auto" :http-request="uploadSectionFile" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirmReservation">确认已接种改针次</el-button>
            <el-button type="danger" @click="cancelReservation">取消预约</el-button>
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
  name: "EditVaccineInfo",
  data(){
    return {
      form: {
        identityId: '',
        realName: '',
        phone: '',
        vaccineStatus:'',
        vaccineType: '',
        createTime: ''
      }
    }
  },
  methods:{
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
    confirmReservation(){

      const that = this
      let url = "http://localhost:8181/upload/uploadImg";
      let header = { 'content-type': 'multipart/form-data;boundary=ebf9f03029db4c2799ae16b5428b06bd' }
      let formData = new FormData();
      let urlUpdateVaccineInfo = "http://localhost:8181/vacinne/updateVaccineReservation";
      var vaccineStatusTemp = 0
      formData.append("file", this.uploadFile)
      if(this.form.vaccineStatus == "已预约第一针"){
          vaccineStatusTemp = 3
      }else if(this.form.vaccineStatus == "已预约第二针"){
          vaccineStatusTemp = 4
      }
      axios.post(url, formData, {headers: header}).then(function (resp){
        let postHead = { 'content-type': 'application/x-www-form-urlencoded' }
        let params = {
          vaccineStatus: vaccineStatusTemp,
          picUrl: resp.data.data.picUrl,
          identityId: localStorage.getItem("ms_username"),
          hospitalName: that.form.hospitalName
        }
        axios.post(urlUpdateVaccineInfo, qs.stringify(params), {headers: postHead}).then(function (resp){
          that.$message.success('修改接种状态成功！');
        })
      })


    },
    cancelReservation(){
      const that = this
      let postHead = { 'content-type': 'application/x-www-form-urlencoded' }
      if(this.form.vaccineStatus == "已接种第一针" || this.form.vaccineStatus == "已接种第二针"){
        this.$message.warning('您已接种，无法取消！');
      }else{

        var tempStatus = 0
        if(this.form.vaccineStatus == "已预约第一针"){
          tempStatus = 1
        }else if(this.form.vaccineStatus == "已预约第二针"){
          tempStatus = 2
        }
        let urlCancel = 'http://localhost:8181/vacinne/updateVaccineReservationCancel'
        let paramCancel = {
          identityId: localStorage.getItem("ms_username"),
          vaccineStatus: tempStatus
        }
        //如果预约了第一针并取消了，需要将vaccine_reservation中数据删除并将reservation_specific中is_delete设为1
        //如果预约了第二针并取消，需要回退将vaccine_reservation中数据职位3，并将reservation_specific中is_delete设为1
          axios.post(urlCancel, qs.stringify(paramCancel),{headers: postHead}).then(function (resp) {
             that.$message.success('取消预约成功！');
          })
      }
    }
  },
  created() {
    let url = 'http://localhost:8181/vacinne/getVaccineInfoByIdentityId?identityId=' + localStorage.getItem("ms_username")
    const that = this

    axios.get(url).then(function (resp) {
      that.form = resp.data.data.vaccineReservationDTO
    })
  }
}
</script>

<style scoped>

</style>