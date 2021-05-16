<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 行程报备
        </el-breadcrumb-item>
        <el-breadcrumb-item>低中高风险/海外行程报备</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="plugins-tips" style="color:#606266">
        如来自中高风险地区或者海外地区，进入此小区前请及时进行行程报备。
      </div>
      <div class="form-box" >
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
          <el-form-item label="身份证号" prop="identityId">
            <el-input v-model="form.identityId" placeholder="请输入身份证号"  style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="出发地点" prop="departure">
            <el-input v-model="form.departure" placeholder="请输入出发地"  style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="到达时间" prop="whenSick">
            <el-date-picker
                v-model="form.whenSick"
                type="date"
                placeholder="请选择到达时间"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">行程报备</el-button>
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
  name: 'EpidemicReporter',
  data() {
    return {
      form: {
        whenSick:'',
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
        ],
        departure:[
          { required: true, message: '请输入出发地', trigger: 'blur' }
        ],
        whenSick:[
          { required: true, message: '请选择预期到达时间', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    onSubmit() {
      let url = 'http://localhost:8181/arrival/addArrival'
      const that = this
      let params = {
        identityId: this.form.identityId,
        departureLocation: this.form.departure,
        arriveTime:this.form.whenSick,
      }
      let header = { 'content-type': 'application/x-www-form-urlencoded' }
      axios.post(url, qs.stringify(params), {headers: header}).then(function (resp) {
        console.log(resp)
        if(resp.data.code == "200"){
          that.$message({
            message: '行程报备成功！',
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