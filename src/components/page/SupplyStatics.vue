<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-pie-chart"></i> 物资缺失统计
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="schart-box">
        <schart class="schart" canvasId="line" :options="options2"></schart>
      </div>
      <div class="schart-box">
        <schart class="schart" canvasId="pie" :options="options3"></schart>
      </div>
      <el-link>推荐采购的物品数量前三名为：</el-link> <el-link type="danger" >{{recommendation}}</el-link>
    </div>
  </div>
</template>

<script>
import Schart from 'vue-schart';
import axios from "axios";
export default {
  name: 'SupplyStatics',
  components: {
    Schart
  },
  data() {
    return {
      recommendation:'',
      options2: {
        type: 'line',
        title: {
          text: '近五天缺失物品种类统计'
        },
        bgColor: '#fbfbfb',
        labels: ['6月', '7月', '8月', '9月', '10月'],
        datasets: [
          {
            label: '',
            data: []
          },
          {
            label: '',
            data: []
          },
          {
            label: '',
            data: []
          },
          {
            label: '',
            data: []
          },
          {
            label: '',
            data: []
          }
        ]
      },
      options3: {
        type: 'pie',
        title: {
          text: '不同年龄段最缺失物资'
        },
        legend: {
          position: 'left'
        },
        bgColor: '#fbfbfb',
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      }
    };
  },
  created() {
    //不同年龄段最缺失物资
    let getSupplyContentByAge = 'http://localhost:8181/user/supply/getSupplyContentByAge'
    const that = this;
    axios.get(getSupplyContentByAge).then(function (resp) {
      let _7To12 = '7~12:' + resp.data.data.supplyContent[0]
      let _13To19 = '13～19:' + resp.data.data.supplyContent[1]
      let _20To39 = '20～39:' + resp.data.data.supplyContent[2]
      let _40To59 = '40～59:' + resp.data.data.supplyContent[3]
      let _60more = '>60:' + resp.data.data.supplyContent[4]
      let _7To12Num = parseInt(resp.data.data.supplyCount[0])
      let _13To19Num = parseInt(resp.data.data.supplyCount[1])
      let _20To39Num = parseInt(resp.data.data.supplyCount[2])
      let _40To59Num = parseInt(resp.data.data.supplyCount[3])
      let _60moreNum = parseInt(resp.data.data.supplyCount[4])
      that.options3.labels = [_7To12, _13To19, _20To39, _40To59, _60more]
      that.options3.datasets[0].data = [_7To12Num, _13To19Num, _20To39Num, _40To59Num, _60moreNum]
    })

    let getSupplyKindCountByDay = 'http://localhost:8181/user/supply/getSupplyKindByDay'
    axios.get(getSupplyKindCountByDay).then(function (resp) {
      console.log(resp)
      that.options2.labels = resp.data.data.days
      that.options2.datasets[0].label = "医疗应急物资"
      that.options2.datasets[0].data = resp.data.data.医疗应急物资
      that.options2.datasets[1].label = "果蔬品"
      that.options2.datasets[1].data = resp.data.data.果蔬品
      that.options2.datasets[2].label = "水产品"
      that.options2.datasets[2].data = resp.data.data.水产品
      that.options2.datasets[3].label = "生活物资"
      that.options2.datasets[3].data = resp.data.data.生活物资
      that.options2.datasets[4].label = "调料"
      that.options2.datasets[4].data = resp.data.data.调料
    })

    let urlRecommendation = 'http://localhost:8181/user/supply/recommendBuySupply'
    axios.get(urlRecommendation).then(function (resp){
      that.recommendation = resp.data.data.sb
    })
  }
};
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
</style>