<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 物资管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>缺失物资报备</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="plugins-tips" style="color:#606266">
        工作人员会根据物资数据统计情况为大家分配物资，不可能面面俱到，请大家谅解！
      </div>
      <div class="form-box" >
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="身份证号" prop="identityId">
            <el-input v-model="form.identityId" placeholder="请输入身份证号"  style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="物资类型" prop="supplyTypes">
            <el-select v-model="form.supplyTypes.label" placeholder="请选择物资类型" @focus="getAllSupply">
              <el-option v-for="supplyType in form.supplyTypes" :key="supplyType" :value="supplyType" :label="supplyType"/>
            </el-select>
          </el-form-item>
          <el-form-item label="详细物资" prop="supplyContents">
            <el-select v-model="form.supplyContents.label" placeholder="请选择详细物资" @focus="getAllSupplyContent">
              <el-option v-for="supplyContent in form.supplyContents" :key="supplyContent" :value="supplyContent" :label="supplyContent"/>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄段" prop="ages">
            <el-select v-model="form.ages.label" placeholder="请选择您的年龄段">
              <el-option v-for="age in form.ages" :key="age.value" :value="age.value" :label="age.label"/>
            </el-select>
          </el-form-item>
          <el-form-item label="是否紧急" prop="isEmergency">
            <el-switch v-model="form.isEmergency" :active-value="1" :inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item label="建议" prop="suggestion">
            <el-input type="textarea" rows="5" v-model="form.suggestion" placeholder="可以给出您的建议，例如增加某种物资分类，或者得到的物资的状况，例如：蔬菜不够新鲜。"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交缺失物资报备</el-button>
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
  name: 'AskForSupply',
  data() {
    return {
      form: {
        identityId: '',
        supplyTypes: [],
        supplyContents: [],
        suggestion: '',
        ages:[{
          value: 1,
          label:'7 ~ 12 岁'
        },{
          value: 2,
          label:'13 ~ 19 岁'
        },{
          value: 3,
          label:'20 ~ 39 岁'
        },{
          value: 4,
          label:'40 ~ 59 岁'
        },{
          value: 5,
          label:'> 60 岁'
        }],
        isEmergency:''
      },
      rules:{
        identityId: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        supplyTypes: [
          { required: true, message: '请选择物资类型', trigger: 'blur' }
        ],
        supplyContents:[
          { required: true, message: '请选择详细物资', trigger: 'blur' }
        ],
        ages:[
          { required: true, message: '请选择年龄段', trigger: 'blur' }
        ],
        isEmergency:[
          { required: true, message: '请选择是否为紧急物资', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      let url = 'http://localhost:8181/user/supply/applySupply'
      const that = this
      let params = {
        identityId: this.form.identityId,
        supplyType: this.form.supplyTypes.label,
        supplyContent:this.form.supplyContents.label,
        age: parseInt(this.form.ages.label),
        isEmergency: this.form.isEmergency,
        suggestion: this.form.suggestion
      }
      let header = { 'content-type': 'application/x-www-form-urlencoded' }
      axios.post(url, qs.stringify(params), {headers: header}).then(function (resp) {
        console.log(resp)
        if(resp.data.code == "200"){
          that.$message({
            message: '物资需求报备成功',
            type: 'success'
          });
        }else if(resp.data.code == "404"){
          that.$message({
            message: '小区内无此住户，请先添加此用户！',
            type: 'error'
          });
        }else{
          that.$message({
            message: '物资报备失败！',
            type: 'error'
          });
        }
      })
    },
    getAllSupply(){
      let url = 'http://localhost:8181/common/getAllSupplyKind'
      const that = this
      axios.get(url).then(function (resp){
        that.form.supplyTypes = resp.data.data
      })
    },
    getAllSupplyContent(){
      let url = 'http://localhost:8181/common/getSupplyContentByKind'
      const that = this
      let params = {
        supplyKind:this.form.supplyTypes.label
      }
      axios.get(url, {params:params}).then(function (resp) {
        that.form.supplyContents = resp.data.data
      })
    }
  }
  ,created() {
      let url = 'http://localhost:8181/common/getAllSupplyKind'
      const that = this
      axios.get(url).then(function (resp){
        console.log(resp)
        that.form.supplyTypes = resp.data.data
      })
  }
};
</script>