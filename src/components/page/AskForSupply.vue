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
      <span style="color:#606266;line-height: 50px">工作人员会根据物资数据统计情况为大家分配物资，不可能面面俱到，请大家谅解！</span>
      <div class="form-box" >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="身份证号">
            <el-input v-model="form.identityId" placeholder="请输入身份证号"  style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="物资类型">
            <el-select v-model="form.supplyTypes.label" placeholder="请选择物资类型" @focus="getAllSupply">
              <el-option v-for="supplyType in form.supplyTypes" :key="supplyType" :value="supplyType" :label="supplyType"/>
            </el-select>
          </el-form-item>
          <el-form-item label="详细物资">
            <el-select v-model="form.supplyContents.label" placeholder="请选择详细物资" @focus="getAllSupplyContent">
              <el-option v-for="supplyContent in form.supplyContents" :key="supplyContent" :value="supplyContent" :label="supplyContent"/>
            </el-select>
          </el-form-item>
          <el-form-item label="是否紧急">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="建议">
            <el-input type="textarea" rows="5" v-model="form.desc" placeholder="可以给出您的建议，例如增加某种物资分类，或者得到的物资的状况，例如：蔬菜不够新鲜。"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交报备</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'AskForSupply',
  data() {
    return {
      form: {
        identityId: '',
        supplyTypes: [],
        supplyContents: [],
        delivery: true,
        desc: '',
      }
    };
  },
  methods: {
    onSubmit() {
      this.$message.success('提交成功！');
    },
    getAllSupply(){
      let url = 'http://localhost:8181/common/getAllSupplyKind'
      const that = this
      axios.get(url).then(function (resp){
        console.log(resp)
        that.form.supplyTypes = resp.data.data
      })
    },
    getAllSupplyContent(){
     // alert(this.form.supplyTypes.label)
      let url = 'http://localhost:8181/common/getSupplyContentByKind'
      const that = this
      let params = {
        supplyKind:this.form.supplyTypes.label
      }
      axios.get(url, {params:params}).then(function (resp) {
        that.form.supplyContents = resp.data.data
        console.log("cities",that.form.cities)
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