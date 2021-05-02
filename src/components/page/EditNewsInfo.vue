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
        <el-form ref="form" :model="form" :rules="rules"  label-width="100px">
          <el-form-item label="公告标题" prop="newsTitle">
            <el-input v-model="form.newsTitle" placeholder="请输入公告标题" style="width:400px"/>
          </el-form-item>
          <el-form-item label="公告内容" prop="newsContent">
            <el-input v-model="form.newsContent" type="textarea" :rows="10" placeholder="请输入公告内容"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改公告</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "_axios@0.18.1@axios";
import qs from "qs";
let header = { 'content-type': 'application/x-www-form-urlencoded' }
export default {
  name: "EditNewsInfo",
  data(){
    return{
      form:{
        newsTitle:'',
        newsContent:''
      },
      rules:{
        newsTitle: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 5, message: '标题最少五个字符进行描述', trigger: 'blur' }
        ],
        newsContent: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    let url = 'http://localhost:8181/manager/news/getNewsInfoById?id='+this.$route.query.id
    const that = this
    axios.get(url).then(function (resp){
      console.log(resp)
      that.form.newsTitle = resp.data.data.newsTitle,
      that.form.newsContent = resp.data.data.newsContent
    })
  },
  methods:{
    onSubmit(){
      let url = 'http://localhost:8181/manager/news/updateNewsInfoById'
      const that = this
      let params = {
        id: this.$route.query.id,
        newsTitle: this.form.newsTitle,
        newsContent: this.form.newsContent
      }

      axios.post(url, qs.stringify(params), {headers:header}).then(function (resp){
        if(resp.data.code == "200") {
          that.$message({
            message: '修改公告成功',
            type: 'success'
          });
        }else if(resp.data.code != "200"){
          that.$message({
            message: '修改公告失败，请重新尝试！',
            type: 'error'
          });
        }
      })

    }
  }
}
</script>

<style scoped>

</style>