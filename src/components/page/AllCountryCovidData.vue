<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-pie-chart"></i> 全球疫情数据
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="plugins-tips" style="color:#606266">
        最新数据更新时间：{{updateTime}}
        <br>
        关于新型冠状病毒(Covid-19)：
        <br>
        小贴士1：
        {{note1}}
        <br>
        小贴士2：
        {{note2}}
        <br>
        小贴士3：
        {{note3}}
        <br>
        小贴士4：
        {{remark1}}
        <br>
        小贴士5：
        {{remark2}}
        <br>
        小贴士6：
        {{remark3}}
        <br>
        现存确诊人数：
        {{currentConfirmedCount}} 人
      </div>
        <div class="form-box">
          <div class="handle-box">
            <el-select v-model="form.regions.label" placeholder="请选择国家或地区" style="width:50%" class="mr10" @focus="getAllSupportCities">
              <el-option v-for="region in form.regions" :key="region" :value="region" :label="region"/>
            </el-select>
            <el-button type="primary" @click="onSubmit">数据搜索</el-button>
          </div>
          </div>
          <div class="schart-box">
            <schart class="schart" canvasId="pie" :options="options"></schart>
          </div>
      <div class="schart-box">
        <schart class="schart" canvasId="bar" :options="options1"></schart>
      </div>
      </div>
    </div>
</template>

<script>
import Schart from "_vue-schart@2.0.0@vue-schart";
import axios from "axios";
export default {
  name: "AllCountryCovidData",
  components: {
    Schart
  },
  data(){
    return{
      form:{
        regions:[]
      },
      currentConfirmedCount:0,
      regions:[],
      updateTime:'',
      note1:'',
      note2:'',
      note3:'',
      remark1:'',
      remark2:'',
      remark3:'',
      options: {
        type: 'pie',
        title: {
          text: '疫情数据分析图标'
        },
        legend: {
          position: 'left'
        },
        bgColor: '#fbfbfb',
        labels: ['现存确诊人数', '累计确诊人数', '疑似感染人数', '治愈人数', '死亡人数'],
        datasets: [
          {
            data: [334, 278, 190, 235, 260]
          }
        ]
      },
      options1: {
        type: 'bar',
        title: {
          text: '全球疫情数据分析柱状图'
        },
        bgColor: '#fbfbfb',
        labels: ['昨日', '今日'],
        datasets: [
          {
            label: '累计确诊人数',
            fillColor: 'rgba(241, 49, 74, 0.5)',
            data: [234, 278, 270, 190, 230]
          },
          {
            label: '治愈人数',
            data: [164, 178, 190, 135, 160]
          },
          {
            label: '死亡人数',
            data: [164, 178, 190, 135, 160]
          }
        ]
      }
    }
  },
  created() {

    const that = this
    let urlOverAll = "http://localhost:8181/covidApi/getOverAll"
    axios.get(urlOverAll).then(function (resp) {
      console.log(resp)
      that.note1 = resp.data.data.note1
      that.note2 = resp.data.data.note2
      that.note3 = resp.data.data.note3
      that.remark1 = resp.data.data.remark1
      that.remark2 = resp.data.data.remark2
      that.remark3 = resp.data.data.remark3
      that.updateTime = resp.data.data.updateTime
      let confirmedCount = parseInt(resp.data.data.confirmedCount)
      let confirmedCountYes = parseInt(resp.data.data.confirmedCountYes)
      let curedCount = parseInt(resp.data.data.curedCount)
      let curedCountYes = parseInt(resp.data.data.curedCountYes)
      let deadCount = parseInt(resp.data.data.deadCount)
      let deadCountYes = parseInt(resp.data.data.deadCountYes)
      let currentConfirmedCount = parseInt(resp.data.data.currentConfirmedCount)
      that.options1.datasets[0].data = [confirmedCountYes,confirmedCount]
      that.options1.datasets[1].data = [curedCountYes,curedCount]
      that.options1.datasets[2].data = [deadCountYes,deadCount]
      that.currentConfirmedCount = currentConfirmedCount
      that.options1.labels = [resp.data.data.yesterday, resp.data.data.now]
    })

  },
  methods:{
    getAllSupportCities(){
      const that = this
      let url = "http://localhost:8181/covidApi/getAllSupportCities";
      axios.get(url).then(function (resp){
        console.log(resp.data.data)
        that.form.regions = resp.data.data
      })
    },
    onSubmit(){
      const that = this
      let url = "http://localhost:8181/covidApi/getCovidDataByCountry";
      let params = {
        country: this.form.regions.label
      }
      axios.get(url,{params:params}).then(function (resp) {
        that.options.title.text = resp.data.data.countryName + '疫情数据分析饼状图'
        let currentConfirmedCount = parseInt(resp.data.data.currentConfirmedCount)
        let confirmedCount = parseInt(resp.data.data.confirmedCount)
        let suspectedCount = parseInt(resp.data.data.suspectedCount)
        let curedCount = parseInt(resp.data.data.curedCount)
        let deadCount = parseInt(resp.data.data.deadCount)
        that.options.datasets[0].data = [currentConfirmedCount,confirmedCount,suspectedCount,curedCount,deadCount]
        that.updateTime = resp.data.data.updateTime
      })
    }
  }
}
</script>

<style scoped>
.schart-box {
  display: inline-block;
  margin: 20px;
}
.schart {
  width: 600px;
  height: 400px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.mr10 {
  margin-right: 20px;
}
</style>
