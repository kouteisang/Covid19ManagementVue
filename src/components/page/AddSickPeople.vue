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
          <el-form-item label="身份证号" prop="identityId">
            <el-input v-model="form.identityId" placeholder="请输入身份证号" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="病症" prop="sickReason">
            <el-input v-model="form.sickReason" placeholder="请输入病症" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="体温" prop="bodyTemperature">
            <el-input v-model="form.bodyTemperature" placeholder="请输入精确体温" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="生病日期" prop="whenSick">
            <el-date-picker
                v-model="form.whenSick"
                type="date"
                placeholder="请选择生病选择日期"
                value-format="yyyy-MM-dd">
            </el-date-picker>
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
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加生病人员</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
//import axios from "_axios@0.18.1@axios";
import axios from "axios";
import qs from "qs";
export default {
  name: "AddSickPeople",
  data(){
    return {
      operatorId: localStorage.getItem("ms_username"),
      if_favour: '',
      if_covidTest: '',
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
        sickReason: '',
        bodyTemperature: '',
        whenSick:'',
        ifFavour: [],
        covidTest: []
      },
      rules:{
          identityId: [
            { required: true, message: '请输入身份证号', trigger: 'blur' }
          ],
          sickReason: [
            { required: true, message: '请输入病症', trigger: 'blur' }
          ],
          bodyTemperature:[
            { required: true, message: '请输入体温', trigger: 'blur' }
          ],
          whenSick:[
            { required: true, message: '请选择生病日期', trigger: 'blur' }
          ],
          ifFavour:[
            { required: true, message: '请选择是否发烧', trigger: 'blur' }
          ],
          covidTest:[
            { required: true, message: '请选择核酸检测结果', trigger: 'blur' }
          ]
      }
    }
  },
  methods:{
    onSubmit(){
      console.log(this.form.whenSick)
      let addSickUserUrl = 'http://localhost:8181/manager/sick/addSickUser'
      const that = this
      let params = {
        identityId: this.form.identityId,
        sickReason: this.form.sickReason,
        bodyTemperature:this.form.bodyTemperature,
        whenSick:this.form.whenSick,
        ifFavour: this.if_favour,
        covidTest: this.if_covidTest,
        operator: this.operatorId
      }
      let header = { 'content-type': 'application/x-www-form-urlencoded' }
      axios.post(addSickUserUrl, qs.stringify(params), {headers: header}).then(function (resp) {
        if(resp.data.code == "600"){
          that.$message({
            message: '您无权限操作，请先进行实名认证！',
            type:'warning'
          })
        }
        else if(resp.data.code == "500"){
          that.$message({
            message: '您输入的格式有误，请仔细检查后重新输入！',
            type:'warning'
          })
        }
        else if(resp.data.code == "200"){
          that.$message({
            message: '添加生病人员成功',
            type: 'success'
          });
        }else if(resp.data.code == "404"){
          that.$message({
            message: '小区内无此住户，请先添加此用户！',
            type: 'error'
          });
        }
      })
    },
    getIfFavour(val){
      this.if_favour = val
    },
    getCovidTest(val){
      this.if_covidTest = val
    }
  }
}
</script>

<style scoped>

</style>