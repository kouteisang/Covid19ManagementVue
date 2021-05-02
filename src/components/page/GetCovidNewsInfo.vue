<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 疫情
        </el-breadcrumb-item>
        <el-breadcrumb-item>疫情新闻详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form"  label-width="100px">
          <el-form-item label="新闻标题:" prop="newsTitle">
            <div style="color:#606266">{{form.newsTitle}}</div>
          </el-form-item>
          <el-form-item  label="新闻来源:" >
              <div style="color:#606266">{{form.infoSource}}</div>
          </el-form-item>
          <el-form-item  label="新闻摘要:" >
            <div style="color:#606266">{{form.summary}}...</div>
          </el-form-item>
          <el-form-item  label="新闻链接:" >
            <a  target="_blank"  style="color:#deaf92" :href="form.sourceUrl">点击查看全文</a>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">返回</el-button>
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
  name: "GetCovidNewsInfo",
  data(){
    return{
      form:{
        newsTitle:'',
        infoSource:'',
        summary:'',
        sourceUrl:''
      }
    }
  },
  created() {
    this.form.newsTitle = this.$route.query.title
    this.form.infoSource = this.$route.query.infoSource
    this.form.summary = this.$route.query.summary
    this.form.sourceUrl = this.$route.query.sourceUrl
  },
  methods:{
    onSubmit(){
    }
  }
}
</script>

<style scoped>


.inputDeep>>>.elinput__inner{
  border: 0;
}

</style>