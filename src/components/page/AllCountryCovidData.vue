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
      <div class="form-box">
          <div class="handle-box">
            <el-select v-model="regions.label" placeholder="请选择国家或地区" style="width:50%" class="mr10">
              <el-option v-for="region in regions" :key="region" :value="region" :label="region"/>
            </el-select>
            <el-button type="primary" @click="onSubmit">数据搜索</el-button>
          </div>
          <div class="schart-box">
            <schart class="schart" canvasId="pie" :options="options"></schart>
          </div>
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
      regions:[],
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
      }
    }
  },
  created() {
    let url = "http://localhost:8181/covidApi/getAllSupportCities"
    const that = this
    axios.get(url).then(function (resp) {
      console.log(resp)
      that.regions = resp.data.data;

    })
  },
  methods:{
    onSubmit(){
      const that = this
      let url = "http://localhost:8181/covidApi/getCovidDataByCountry";
      let params = {
        country: this.regions.label
      }
      axios.get(url,{params:params}).then(function (resp) {
        console.log(resp)
        //alert(that.options.datasets[0].data)
        that.options.title.text = resp.data.data.countryName + '疫情数据分析饼状图'
        let currentConfirmedCount = parseInt(resp.data.data.currentConfirmedCount)
        let confirmedCount = parseInt(resp.data.data.confirmedCount)
        let suspectedCount = parseInt(resp.data.data.suspectedCount)
        let curedCount = parseInt(resp.data.data.curedCount)
        let deadCount = parseInt(resp.data.data.deadCount)
        that.options.datasets[0].data = [currentConfirmedCount,confirmedCount,suspectedCount,curedCount,deadCount]
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