<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 病情管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>修改生病人员病情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" :rules="rules"  label-width="125px">
          <el-form-item label="身份证号" prop="identityId">
            <el-input v-model="form.identityId" placeholder="请输入身份证号" readonly="true" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="form.realName" placeholder="请输入姓名" readonly="true" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入联系电话" readonly="true" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="病因" prop="sickReason">
            <el-input v-model="form.sickReason" placeholder="请输入病因" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="生病日期" prop="whenSick">
            <el-date-picker
                v-model="form.whenSick"
                type="date"
                placeholder="请选择生病选择日期"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="体温" prop="bodyTemperature">
            <el-input v-model="form.bodyTemperature" placeholder="请输入精确体温" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="是否发烧" prop="ifFavour">
            <el-select v-model="form.ifFavour" placeholder="请选择是否发烧" style="width:220px" @change="getIfFavour">
              <el-option v-for = "item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="核酸检测结果" prop="covidTest">
            <el-select v-model="form.covidTest" placeholder="请选择核酸检测结果" style="width:220px" @change="getCovidTest">
              <el-option v-for = "item in optionCovid" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="community">
            <el-input v-model="form.community" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改居民病情信息</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "_axios@0.18.1@axios";

export default {
  name: "EditSickUserInfo",
  data(){
    return{
      options:[
        {
          value:"是",
          label:"是"
        },
        {
          value:"否",
          label:"否"
        }
      ],
      optionCovid:[
        {
          value:"阳性",
          label:"阳性"
        },
        {
          value:"阴性",
          label:"阴性"
        },
        {
          value:"未进行",
          label:"未进行"
        }
      ],
      form: {
        identityId: '',
        realName: '',
        phone: '',
        sickReason:'',
        whenSick: '',
        bodyTemperature: '',
        ifFavour: '',
        covidTest: '',
        community: ''
      }
    }
  },created() {
    const that = this
    let url = 'http://localhost:8181/manager/sick/getSickUserInfoByIdentityId?identityId='+this.$route.query.identityId
    axios.get(url).then(function (resp){
      console.log(resp)
      console.log(resp)
      that.form.realName = resp.data.data.realName
      that.form.identityId = resp.data.data.identityId
      that.form.phone = resp.data.data.phone
      that.form.sickReason = resp.data.data.sickReason
      that.form.community = resp.data.data.community
      that.form.bodyTemperature = resp.data.data.bodyTemperature
      that.form.ifFavour = resp.data.data.ifFavour
      that.form.covidTest = resp.data.data.covidTest
      that.form.whenSick = resp.data.data.whenSick
    })
  }
}
</script>

<style scoped>

</style>