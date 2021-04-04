<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>基本表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="110px">
          <el-form-item label="姓名">
            <el-input v-model="form.realName" placeholder="请输入姓名" style="width:200px" ></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="form.identityId" placeholder="请输入身份证号" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone" placeholder="请输入手机号" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="省份">
            <el-select v-model="form.provinces.label"  placeholder="请选择省份" @focus="getAllProvince">
              <el-option v-for="province in form.provinces" :key="province" :value="province" :label="province"/>
            </el-select>
         </el-form-item>
          <el-form-item label="城市">
            <el-select v-model="form.city" placeholder="请选择城市">
              <el-option key="bbk" label="步步高" value="bbk"></el-option>
              <el-option key="xtc" label="小天才" value="xtc"></el-option>
              <el-option key="imoo" label="imoo" value="imoo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市辖区">
            <el-select v-model="form.district" placeholder="请选择市辖区">
              <el-option key="bbk" label="步步高" value="bbk"></el-option>
              <el-option key="xtc" label="小天才" value="xtc"></el-option>
              <el-option key="imoo" label="imoo" value="imoo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="form.community" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人姓名">
            <el-input v-model="form.emergencyName" placeholder="请输入紧急联系人姓名" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人电话">
            <el-input v-model="form.emergencyPhone" placeholder="请输入紧急联系人电话" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加用户</el-button>
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
  name: 'addcommunityuserinfo',
  data() {
    return {
      //provinces: [],
      form: {
        realName: '',
        identityId: '',
        phone: '',
        provinces:[],
        city: [],
        district: [],
        emergencyName: '',
        community: '',
        emergencyPhone: ''
      }
    };
  },
  methods: {
    onSubmit() {
      this.$message.success('提交成功！');
    },
    getAllProvince(){
      let url = 'http://localhost:8181/common/getAllProvince'
      const that = this
      axios.get(url).then(function (resp) {
        that.form.provinces = []
        that.form.provinces = resp.data.data.provinces
        console.log("sad",that.form.provinces)
      })
    }
  }
  ,
  created() {
      let url = 'http://localhost:8181/common/getAllProvince'
      const that = this
      axios.get(url).then(function (resp) {
        that.form.provinces = resp.data.data.provinces
        console.log(resp)
      })
  }
};
</script>