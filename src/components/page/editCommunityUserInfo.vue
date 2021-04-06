<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 居民信息管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>修改居民信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" :rules="rules"  label-width="125px">
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="form.realName" placeholder="请输入姓名" readonly="true" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="identityId">
            <el-input v-model="form.identityId" placeholder="请输入身份证号" readonly="true" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="省份" prop="provinces">
            <el-select v-model="form.provinces.label"  placeholder="请选择省份" @focus="getAllProvince">
              <el-option v-for="province in form.provinces" :key="province" :value="province" :label="province"/>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="cities">
            <el-select v-model="form.cities.label" placeholder="请选择城市" @focus="getAllCities">
              <el-option v-for="city in form.cities" :key="city" :value="city" :label="city"/>
            </el-select>
          </el-form-item>
          <el-form-item label="市辖区" prop="districts">
            <el-select v-model="form.districts.label" placeholder="请选择市辖区" @focus="getAllDistricts">
              <el-option v-for="district in form.districts" :key="district" :value="district" :label="district"/>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="community">
            <el-input v-model="form.community" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人姓名" prop="emergencyName">
            <el-input v-model="form.emergencyName" placeholder="请输入紧急联系人姓名" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人电话" prop="emergencyPhone">
            <el-input v-model="form.emergencyPhone" placeholder="请输入紧急联系人电话" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改用户信息</el-button>
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
  name: "editCommunityUserInfo",
  data() {
    return {
      form: {
        realName: '',
        identityId: '',
        phone: '',
        provinces:[],
        cities: [],
        districts: [],
        emergencyName: '',
        community: '',
        emergencyPhone: ''
      },
      rules:{
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        identityId: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        provinces: [
          { required: true, message: '请选择省份', trigger: 'blur' }
        ],
        cities: [
          { required: true, message: '请选择城市', trigger: 'blur' },
        ],
        districts: [
          { required: true, message: '请选择市辖区', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
        ],
        community: [
          { required: true, message: '请输入详细居住地址', trigger: 'blur' }
        ],
        emergencyName: [
          { required: true, message: '请输入紧急联系人姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        emergencyPhone: [
          { required: true, message: '请输入紧急联系人电话', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
        ]
      }
    };
  },created() {
     const that = this
     let url = 'http://localhost:8181/user/findUserByIndentityId?identityId='+this.$route.query.identityId
     axios.get(url).then(function (resp){
       console.log(resp)
       that.form.realName = resp.data.data.realName
       that.form.identityId = resp.data.data.identityId
       that.form.phone = resp.data.data.phone
       that.form.provinces.label = resp.data.data.province
       that.form.cities.label = resp.data.data.city
       that.form.districts.label = resp.data.data.district
       that.form.community = resp.data.data.community
       that.form.emergencyPhone = resp.data.data.emergencyPhone
       that.form.emergencyName = resp.data.data.emergencyName
     })
  },methods: {
    onSubmit() {
      let editUserUrl = 'http://localhost:8181/user/editInfoByIdentityId'
      const that = this
      let params = {
        identityId: this.form.identityId,
        realName: this.form.realName,
        phone:this.form.phone,
        province: this.form.provinces.label,
        city: this.form.cities.label,
        district: this.form.districts.label,
        community: this.form.community,
        emergencyName: this.form.emergencyName,
        emergencyPhone: this.form.emergencyPhone
      }
      let header = { 'content-type': 'application/x-www-form-urlencoded' }
      axios.post(editUserUrl, qs.stringify(params), {headers: header}).then(function (resp) {

        if(resp.data.code == "200"){
          that.$message({
            message: '修改小区用户'+that.form.realName+'信息成功',
            type: 'success'
          });
        }
      })
    },
    getAllProvince(){
      let url = 'http://localhost:8181/common/getAllProvince'
      const that = this
      axios.get(url).then(function (resp) {
        that.form.provinces = []
        that.form.provinces = resp.data.data.provinces
        console.log("provinces",that.form.provinces)
      })
    },
    getAllCities(){
      let url = 'http://localhost:8181/common/getAllCities'
      const that = this
      let params = {
        province:this.form.provinces.label
      }
      axios.get(url, {params:params}).then(function (resp) {
        that.form.cities = []
        that.form.cities = resp.data.data.cities
        console.log("cities",that.form.cities)
      })
    },
    getAllDistricts(){
      let url = 'http://localhost:8181/common/getAllDistricts'
      const that = this
      let params = {
        city:this.form.cities.label
      }
      axios.get(url, {params:params}).then(function (resp) {
        that.form.districts = []
        that.form.districts = resp.data.data.districts
        console.log("districts",that.form.districts)
      })
    }
  }
}
</script>

<style scoped>

</style>