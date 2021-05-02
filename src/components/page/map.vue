<template>
    <div class="index-pay">
        <div class="index-pay-box">
            <span class="index-pay-box-name">中国疫情数据分析图</span>
            <div class="index-pay-box-select">
                <el-button-group>
                    <el-button type="mini" size="mini" @click="getCreateData">累计确诊人数</el-button>
                    <el-button size="mini" @click="getNowData">当前确诊人数</el-button>
                    <el-button size="mini" @click="getAllCured">累计治愈人数</el-button>
                   <el-button size="mini" @click="getAllDead">累计死亡人数</el-button>
                </el-button-group>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div>
                  <br><br><br><br><br><br><br><br><br>
                  <br><br><br><br><br><br><br><br><br>
                  <br><br><br><br><br><br>
                <el-table
                    :data="tableData"
                    height="500"
                    border
                    style="width: 100%">
                  <el-table-column
                      prop="province"
                      label="省份"
                      width="180">
                  </el-table-column>
                  <el-table-column
                      prop="count"
                      label="人数"
                      width="180">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div id="index-pay-box-charts">
                <div id="myChartChina" :style="{width: '100%', height: '500px'}"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs"
import optionMap from "element-ui";
var count = 0
var provinceData = []
export default {
    data(){
        return {
          tableData: [{
            province:'山东省',
            count:0
          }]
        }
    },
    mounted() {
      this.getCreateData();
    },
    methods:{
      getCreateData(){
        const that = this;
          var url = "http://localhost:8181/covidApi/getAllProvincesCovidData"
          axios.get(url).then(function (resp) {
            provinceData = resp.data.data.mapConfirmed;
            that.tableData = resp.data.data.listConfirmed;
            that.drawLineConfirmedCount();
          })
      },
      getNowData(){
        const that = this;
        var url = "http://localhost:8181/covidApi/getAllProvincesCovidData"
        axios.get(url).then(function (resp) {
          provinceData = resp.data.data.mapCurrent;
          that.tableData = resp.data.data.listCurrent;
          that.drawLinecurrentConfirmedCount();
        })
      },
      getAllCured(){
        const that = this;
        var url = "http://localhost:8181/covidApi/getAllProvincesCovidData"
        axios.get(url).then(function (resp) {
          provinceData = resp.data.data.mapCured;
          that.tableData = resp.data.data.listCured;
          that.drawLinecuredCount();
        })
      },
      getAllDead(){
        const that = this;
        var url = "http://localhost:8181/covidApi/getAllProvincesCovidData"
        axios.get(url).then(function (resp) {
          provinceData = resp.data.data.mapDead;
          that.tableData = resp.data.data.listDead;
          that.drawLineDeadCount();
        })
      }
      ,
      drawLineConfirmedCount(){
        // 基于准备好的dom，初始化echarts实例
        var myChartContainer = document.getElementById('myChartChina');       
        var resizeMyChartContainer = function(){
          myChartContainer.style.width=(document.body.offsetWidth/2)+'px'//页面一半的大小
        } 
         resizeMyChartContainer();
        var myChartChina = this.$echarts.init(myChartContainer); 

        function getConfirmedCount(province) {
          if(province === "北京市"){
            return provinceData.北京市
          }if(province === "天津市"){
            return provinceData.天津市
          }if(province === "上海市"){
            return provinceData.上海市
          }if(province === "重庆市"){
            return provinceData.重庆市
          }if(province === "河北省"){
            return provinceData.河北省
          }if(province === "河南省"){
            return provinceData.河南省
          }if(province === "云南省"){
            return provinceData.云南省
          }if(province === "辽宁省"){
            return provinceData.辽宁省
          }if(province === "黑龙江省"){
            return provinceData.黑龙江省
          }if(province === "湖南省"){
            return provinceData.湖南省
          }if(province === "安徽省"){
            return provinceData.安徽省
          }if(province === "山东省"){
            return provinceData.山东省
          }if(province === "新疆维吾尔自治区"){
            return provinceData.新疆维吾尔自治区
          }if(province === "浙江省"){
            return provinceData.浙江省
          }if(province === "江西省"){
            return provinceData.江西省
          }if(province === "湖北省"){
            return provinceData.湖北省
          }
          if(province === "广西壮族自治区"){
            return provinceData.广西壮族自治区
          }if(province === "甘肃省"){
            return provinceData.甘肃省
          }if(province === "山西省"){
            return provinceData.山西省
          }if(province === "内蒙古自治区"){
            return provinceData.内蒙古自治区
          }if(province === "陕西省"){
            return provinceData.陕西省
          }if(province === "吉林省"){
            return provinceData.吉林省
          }if(province === "福建省"){
            return provinceData.福建省
          }if(province === "贵州省"){
            return provinceData.贵州省
          }if(province === "广东省"){
            return provinceData.广东省
          }if(province === "青海省"){
            return provinceData.青海省
          }if(province === "西藏自治区"){
            return provinceData.西藏自治区
          }if(province === "宁夏回族自治区"){
            return provinceData.宁夏回族自治区
          }if(province === "海南省"){
            return provinceData.海南省
          }if(province === "台湾"){
            return provinceData.台湾
          }if(province === "香港"){
            return provinceData.香港
          }if(province === "澳门"){
            return provinceData.澳门
          }if(province === "四川省"){
            return provinceData.四川省
          }if(province === "湖南省"){
            return provinceData.湖南省
          }if(province === "江苏省"){
            return provinceData.江苏省
          }
        }
        // 绘制图表
       var optionMap = {  
              tooltip: {},
                 legend: {
                            orient: 'vertical',
                            left: 'left',
                            data:['']
                        },      
                 visualMap: {
                            min: 0,
                            max: 1500,
                            left: '10%',
                            top: 'bottom',
                            text: ['高','低'],
                            calculable : true,
                            color:['#930000','#ffffff']
                        },   
                 selectedMode: 'single',
                 series : [                         
                            {
                              name: '', 
                              type: 'map',
                              mapType: 'china',
                              itemStyle: {
                                    normal:{
                                        borderColor: 'rgba(0, 0, 0, 0.2)'
                                    },
                                    emphasis:{
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 0,
                                        shadowBlur: 20,
                                        borderWidth: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                },
                                showLegendSymbol: true,
                                label: {
                                    normal: {
                                        show: true
                                    },
                                    emphasis: {
                                        show: true
                                    }
                                },
                                data:[               
                                     {name: '北京',value: getConfirmedCount("北京市")},
                                      {name: '天津',value: getConfirmedCount("天津市") },
                                      {name: '上海',value: getConfirmedCount("上海市") },
                                      {name: '重庆',value: getConfirmedCount("重庆市") },
                                      {name: '河北',value: getConfirmedCount("河北省") },
                                      {name: '河南',value: getConfirmedCount("河南省") },
                                      {name: '云南',value: getConfirmedCount("云南省") },
                                      {name: '辽宁',value: getConfirmedCount("辽宁省") },
                                      {name: '黑龙江',value: getConfirmedCount("黑龙江省") },
                                      {name: '湖南',value: getConfirmedCount("湖南省") },
                                      {name: '安徽',value: getConfirmedCount("安徽省") },
                                      {name: '山东',value: getConfirmedCount("山东省") },
                                      {name: '新疆',value: getConfirmedCount("新疆维吾尔自治区") },
                                      {name: '江苏',value: getConfirmedCount("江苏省") },
                                      {name: '浙江',value: getConfirmedCount("浙江省") },
                                      {name: '江西',value: getConfirmedCount("江西省") },
                                      {name: '湖北',value: getConfirmedCount("湖北省") },
                                      {name: '广西',value: getConfirmedCount("广西壮族自治区") },
                                      {name: '甘肃',value: getConfirmedCount("甘肃省") },
                                      {name: '山西',value: getConfirmedCount("山西省") },
                                      {name: '内蒙古',value: getConfirmedCount("内蒙古自治区") },
                                      {name: '陕西',value: getConfirmedCount("陕西省") },
                                      {name: '吉林',value: getConfirmedCount("吉林省") },
                                      {name: '福建',value: getConfirmedCount("福建省") },
                                      {name: '贵州',value: getConfirmedCount("贵州省") },
                                      {name: '广东',value: getConfirmedCount("广东省") },
                                      {name: '青海',value: getConfirmedCount("青海省") },
                                      {name: '西藏',value: getConfirmedCount("西藏自治区") },
                                      {name: '四川',value: getConfirmedCount("四川省") },
                                      {name: '宁夏',value: getConfirmedCount("宁夏回族自治区") },
                                      {name: '海南',value: getConfirmedCount("海南省") },
                                      {name: '台湾',value: getConfirmedCount("台湾") },
                                      {name: '香港',value: getConfirmedCount("香港") },
                                     {name: '澳门',value: getConfirmedCount("澳门") }
                                ]
                            }
                        ]
               }
     
        myChartChina.setOption(optionMap);
        window.onresize=function(){
            resizeMyChartContainer();
            myChartChina.resize();
        }
      },
      drawLinecurrentConfirmedCount(){
        // 基于准备好的dom，初始化echarts实例
        var myChartContainer = document.getElementById('myChartChina');
        var resizeMyChartContainer = function(){
          myChartContainer.style.width=(document.body.offsetWidth/2)+'px'//页面一半的大小
        }
        resizeMyChartContainer();
        var myChartChina = this.$echarts.init(myChartContainer);

        function getConfirmedCount(province) {
          if(province === "北京市"){
            return provinceData.北京市
          }if(province === "天津市"){
            return provinceData.天津市
          }if(province === "上海市"){
            return provinceData.上海市
          }if(province === "重庆市"){
            return provinceData.重庆市
          }if(province === "河北省"){
            return provinceData.河北省
          }if(province === "河南省"){
            return provinceData.河南省
          }if(province === "云南省"){
            return provinceData.云南省
          }if(province === "辽宁省"){
            return provinceData.辽宁省
          }if(province === "黑龙江省"){
            return provinceData.黑龙江省
          }if(province === "湖南省"){
            return provinceData.湖南省
          }if(province === "安徽省"){
            return provinceData.安徽省
          }if(province === "山东省"){
            return provinceData.山东省
          }if(province === "新疆维吾尔自治区"){
            return provinceData.新疆维吾尔自治区
          }if(province === "浙江省"){
            return provinceData.浙江省
          }if(province === "江西省"){
            return provinceData.江西省
          }if(province === "湖北省"){
            return provinceData.湖北省
          }
          if(province === "广西壮族自治区"){
            return provinceData.广西壮族自治区
          }if(province === "甘肃省"){
            return provinceData.甘肃省
          }if(province === "山西省"){
            return provinceData.山西省
          }if(province === "内蒙古自治区"){
            return provinceData.内蒙古自治区
          }if(province === "陕西省"){
            return provinceData.陕西省
          }if(province === "吉林省"){
            return provinceData.吉林省
          }if(province === "福建省"){
            return provinceData.福建省
          }if(province === "贵州省"){
            return provinceData.贵州省
          }if(province === "广东省"){
            return provinceData.广东省
          }if(province === "青海省"){
            return provinceData.青海省
          }if(province === "西藏自治区"){
            return provinceData.西藏自治区
          }if(province === "宁夏回族自治区"){
            return provinceData.宁夏回族自治区
          }if(province === "海南省"){
            return provinceData.海南省
          }if(province === "台湾"){
            return provinceData.台湾
          }if(province === "香港"){
            return provinceData.香港
          }if(province === "澳门"){
            return provinceData.澳门
          }if(province === "四川省"){
            return provinceData.四川省
          }if(province === "湖南省"){
            return provinceData.湖南省
          }if(province === "江苏省"){
            return provinceData.江苏省
          }
        }
        // 绘制图表
        var optionMap = {
          tooltip: {},
          legend: {
            orient: 'vertical',
            left: 'left',
            data:['']
          },
          visualMap: {
            min: 0,
            max: 10,
            left: '10%',
            top: 'bottom',
            text: ['高','低'],
            calculable : true,
            color:['#3333FF','#ffffff']
          },
          selectedMode: 'single',
          series : [
            {
              name: '',
              type: 'map',
              mapType: 'china',
              itemStyle: {
                normal:{
                  borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis:{
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              showLegendSymbol: true,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data:[
                {name: '北京',value: getConfirmedCount("北京市")},
                {name: '天津',value: getConfirmedCount("天津市") },
                {name: '上海',value: getConfirmedCount("上海市") },
                {name: '重庆',value: getConfirmedCount("重庆市") },
                {name: '河北',value: getConfirmedCount("河北省") },
                {name: '河南',value: getConfirmedCount("河南省") },
                {name: '云南',value: getConfirmedCount("云南省") },
                {name: '辽宁',value: getConfirmedCount("辽宁省") },
                {name: '黑龙江',value: getConfirmedCount("黑龙江省") },
                {name: '湖南',value: getConfirmedCount("湖南省") },
                {name: '安徽',value: getConfirmedCount("安徽省") },
                {name: '山东',value: getConfirmedCount("山东省") },
                {name: '新疆',value: getConfirmedCount("新疆维吾尔自治区") },
                {name: '江苏',value: getConfirmedCount("江苏省") },
                {name: '浙江',value: getConfirmedCount("浙江省") },
                {name: '江西',value: getConfirmedCount("江西省") },
                {name: '湖北',value: getConfirmedCount("湖北省") },
                {name: '广西',value: getConfirmedCount("广西壮族自治区") },
                {name: '甘肃',value: getConfirmedCount("甘肃省") },
                {name: '山西',value: getConfirmedCount("山西省") },
                {name: '内蒙古',value: getConfirmedCount("内蒙古自治区") },
                {name: '陕西',value: getConfirmedCount("陕西省") },
                {name: '吉林',value: getConfirmedCount("吉林省") },
                {name: '福建',value: getConfirmedCount("福建省") },
                {name: '贵州',value: getConfirmedCount("贵州省") },
                {name: '广东',value: getConfirmedCount("广东省") },
                {name: '青海',value: getConfirmedCount("青海省") },
                {name: '西藏',value: getConfirmedCount("西藏自治区") },
                {name: '四川',value: getConfirmedCount("四川省") },
                {name: '宁夏',value: getConfirmedCount("宁夏回族自治区") },
                {name: '海南',value: getConfirmedCount("海南省") },
                {name: '台湾',value: getConfirmedCount("台湾") },
                {name: '香港',value: getConfirmedCount("香港") },
                {name: '澳门',value: getConfirmedCount("澳门") }
              ]
            }
          ]
        }

        myChartChina.setOption(optionMap);
        window.onresize=function(){
          resizeMyChartContainer();
          myChartChina.resize();
        }
      },
      drawLinecuredCount(){
        // 基于准备好的dom，初始化echarts实例
        var myChartContainer = document.getElementById('myChartChina');
        var resizeMyChartContainer = function(){
          myChartContainer.style.width=(document.body.offsetWidth/2)+'px'//页面一半的大小
        }
        resizeMyChartContainer();
        var myChartChina = this.$echarts.init(myChartContainer);

        function getConfirmedCount(province) {
          if(province === "北京市"){
            return provinceData.北京市
          }if(province === "天津市"){
            return provinceData.天津市
          }if(province === "上海市"){
            return provinceData.上海市
          }if(province === "重庆市"){
            return provinceData.重庆市
          }if(province === "河北省"){
            return provinceData.河北省
          }if(province === "河南省"){
            return provinceData.河南省
          }if(province === "云南省"){
            return provinceData.云南省
          }if(province === "辽宁省"){
            return provinceData.辽宁省
          }if(province === "黑龙江省"){
            return provinceData.黑龙江省
          }if(province === "湖南省"){
            return provinceData.湖南省
          }if(province === "安徽省"){
            return provinceData.安徽省
          }if(province === "山东省"){
            return provinceData.山东省
          }if(province === "新疆维吾尔自治区"){
            return provinceData.新疆维吾尔自治区
          }if(province === "浙江省"){
            return provinceData.浙江省
          }if(province === "江西省"){
            return provinceData.江西省
          }if(province === "湖北省"){
            return provinceData.湖北省
          }
          if(province === "广西壮族自治区"){
            return provinceData.广西壮族自治区
          }if(province === "甘肃省"){
            return provinceData.甘肃省
          }if(province === "山西省"){
            return provinceData.山西省
          }if(province === "内蒙古自治区"){
            return provinceData.内蒙古自治区
          }if(province === "陕西省"){
            return provinceData.陕西省
          }if(province === "吉林省"){
            return provinceData.吉林省
          }if(province === "福建省"){
            return provinceData.福建省
          }if(province === "贵州省"){
            return provinceData.贵州省
          }if(province === "广东省"){
            return provinceData.广东省
          }if(province === "青海省"){
            return provinceData.青海省
          }if(province === "西藏自治区"){
            return provinceData.西藏自治区
          }if(province === "宁夏回族自治区"){
            return provinceData.宁夏回族自治区
          }if(province === "海南省"){
            return provinceData.海南省
          }if(province === "台湾"){
            return provinceData.台湾
          }if(province === "香港"){
            return provinceData.香港
          }if(province === "澳门"){
            return provinceData.澳门
          }if(province === "四川省"){
            return provinceData.四川省
          }if(province === "湖南省"){
            return provinceData.湖南省
          }if(province === "江苏省"){
            return provinceData.江苏省
          }
        }
        // 绘制图表
        var optionMap = {
          tooltip: {},
          legend: {
            orient: 'vertical',
            left: 'left',
            data:['']
          },
          visualMap: {
            min: 0,
            max: 2000,
            left: '10%',
            top: 'bottom',
            text: ['高','低'],
            calculable : true,
            color:['#009900','#ffffff']
          },
          selectedMode: 'single',
          series : [
            {
              name: '',
              type: 'map',
              mapType: 'china',
              itemStyle: {
                normal:{
                  borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis:{
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              showLegendSymbol: true,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data:[
                {name: '北京',value: getConfirmedCount("北京市")},
                {name: '天津',value: getConfirmedCount("天津市") },
                {name: '上海',value: getConfirmedCount("上海市") },
                {name: '重庆',value: getConfirmedCount("重庆市") },
                {name: '河北',value: getConfirmedCount("河北省") },
                {name: '河南',value: getConfirmedCount("河南省") },
                {name: '云南',value: getConfirmedCount("云南省") },
                {name: '辽宁',value: getConfirmedCount("辽宁省") },
                {name: '黑龙江',value: getConfirmedCount("黑龙江省") },
                {name: '湖南',value: getConfirmedCount("湖南省") },
                {name: '安徽',value: getConfirmedCount("安徽省") },
                {name: '山东',value: getConfirmedCount("山东省") },
                {name: '新疆',value: getConfirmedCount("新疆维吾尔自治区") },
                {name: '江苏',value: getConfirmedCount("江苏省") },
                {name: '浙江',value: getConfirmedCount("浙江省") },
                {name: '江西',value: getConfirmedCount("江西省") },
                {name: '湖北',value: getConfirmedCount("湖北省") },
                {name: '广西',value: getConfirmedCount("广西壮族自治区") },
                {name: '甘肃',value: getConfirmedCount("甘肃省") },
                {name: '山西',value: getConfirmedCount("山西省") },
                {name: '内蒙古',value: getConfirmedCount("内蒙古自治区") },
                {name: '陕西',value: getConfirmedCount("陕西省") },
                {name: '吉林',value: getConfirmedCount("吉林省") },
                {name: '福建',value: getConfirmedCount("福建省") },
                {name: '贵州',value: getConfirmedCount("贵州省") },
                {name: '广东',value: getConfirmedCount("广东省") },
                {name: '青海',value: getConfirmedCount("青海省") },
                {name: '西藏',value: getConfirmedCount("西藏自治区") },
                {name: '四川',value: getConfirmedCount("四川省") },
                {name: '宁夏',value: getConfirmedCount("宁夏回族自治区") },
                {name: '海南',value: getConfirmedCount("海南省") },
                {name: '台湾',value: getConfirmedCount("台湾") },
                {name: '香港',value: getConfirmedCount("香港") },
                {name: '澳门',value: getConfirmedCount("澳门") }
              ]
            }
          ]
        }

        myChartChina.setOption(optionMap);
        window.onresize=function(){
          resizeMyChartContainer();
          myChartChina.resize();
        }
      },
      drawLineDeadCount(){
        // 基于准备好的dom，初始化echarts实例
        var myChartContainer = document.getElementById('myChartChina');
        var resizeMyChartContainer = function(){
          myChartContainer.style.width=(document.body.offsetWidth/2)+'px'//页面一半的大小
        }
        resizeMyChartContainer();
        var myChartChina = this.$echarts.init(myChartContainer);

        function getConfirmedCount(province) {
          if(province === "北京市"){
            return provinceData.北京市
          }if(province === "天津市"){
            return provinceData.天津市
          }if(province === "上海市"){
            return provinceData.上海市
          }if(province === "重庆市"){
            return provinceData.重庆市
          }if(province === "河北省"){
            return provinceData.河北省
          }if(province === "河南省"){
            return provinceData.河南省
          }if(province === "云南省"){
            return provinceData.云南省
          }if(province === "辽宁省"){
            return provinceData.辽宁省
          }if(province === "黑龙江省"){
            return provinceData.黑龙江省
          }if(province === "湖南省"){
            return provinceData.湖南省
          }if(province === "安徽省"){
            return provinceData.安徽省
          }if(province === "山东省"){
            return provinceData.山东省
          }if(province === "新疆维吾尔自治区"){
            return provinceData.新疆维吾尔自治区
          }if(province === "浙江省"){
            return provinceData.浙江省
          }if(province === "江西省"){
            return provinceData.江西省
          }if(province === "湖北省"){
            return provinceData.湖北省
          }
          if(province === "广西壮族自治区"){
            return provinceData.广西壮族自治区
          }if(province === "甘肃省"){
            return provinceData.甘肃省
          }if(province === "山西省"){
            return provinceData.山西省
          }if(province === "内蒙古自治区"){
            return provinceData.内蒙古自治区
          }if(province === "陕西省"){
            return provinceData.陕西省
          }if(province === "吉林省"){
            return provinceData.吉林省
          }if(province === "福建省"){
            return provinceData.福建省
          }if(province === "贵州省"){
            return provinceData.贵州省
          }if(province === "广东省"){
            return provinceData.广东省
          }if(province === "青海省"){
            return provinceData.青海省
          }if(province === "西藏自治区"){
            return provinceData.西藏自治区
          }if(province === "宁夏回族自治区"){
            return provinceData.宁夏回族自治区
          }if(province === "海南省"){
            return provinceData.海南省
          }if(province === "台湾"){
            return provinceData.台湾
          }if(province === "香港"){
            return provinceData.香港
          }if(province === "澳门"){
            return provinceData.澳门
          }if(province === "四川省"){
            return provinceData.四川省
          }if(province === "湖南省"){
            return provinceData.湖南省
          }if(province === "江苏省"){
            return provinceData.江苏省
          }
        }
        // 绘制图表
        var optionMap = {
          tooltip: {},
          legend: {
            orient: 'vertical',
            left: 'left',
            data:['']
          },
          visualMap: {
            min: 0,
            max: 25,
            left: '10%',
            top: 'bottom',
            text: ['高','低'],
            calculable : true,
            color:['#4B4B4B','#ffffff']
          },
          selectedMode: 'single',
          series : [
            {
              name: '',
              type: 'map',
              mapType: 'china',
              itemStyle: {
                normal:{
                  borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis:{
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              showLegendSymbol: true,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data:[
                {name: '北京',value: getConfirmedCount("北京市")},
                {name: '天津',value: getConfirmedCount("天津市") },
                {name: '上海',value: getConfirmedCount("上海市") },
                {name: '重庆',value: getConfirmedCount("重庆市") },
                {name: '河北',value: getConfirmedCount("河北省") },
                {name: '河南',value: getConfirmedCount("河南省") },
                {name: '云南',value: getConfirmedCount("云南省") },
                {name: '辽宁',value: getConfirmedCount("辽宁省") },
                {name: '黑龙江',value: getConfirmedCount("黑龙江省") },
                {name: '湖南',value: getConfirmedCount("湖南省") },
                {name: '安徽',value: getConfirmedCount("安徽省") },
                {name: '山东',value: getConfirmedCount("山东省") },
                {name: '新疆',value: getConfirmedCount("新疆维吾尔自治区") },
                {name: '江苏',value: getConfirmedCount("江苏省") },
                {name: '浙江',value: getConfirmedCount("浙江省") },
                {name: '江西',value: getConfirmedCount("江西省") },
                {name: '湖北',value: getConfirmedCount("湖北省") },
                {name: '广西',value: getConfirmedCount("广西壮族自治区") },
                {name: '甘肃',value: getConfirmedCount("甘肃省") },
                {name: '山西',value: getConfirmedCount("山西省") },
                {name: '内蒙古',value: getConfirmedCount("内蒙古自治区") },
                {name: '陕西',value: getConfirmedCount("陕西省") },
                {name: '吉林',value: getConfirmedCount("吉林省") },
                {name: '福建',value: getConfirmedCount("福建省") },
                {name: '贵州',value: getConfirmedCount("贵州省") },
                {name: '广东',value: getConfirmedCount("广东省") },
                {name: '青海',value: getConfirmedCount("青海省") },
                {name: '西藏',value: getConfirmedCount("西藏自治区") },
                {name: '四川',value: getConfirmedCount("四川省") },
                {name: '宁夏',value: getConfirmedCount("宁夏回族自治区") },
                {name: '海南',value: getConfirmedCount("海南省") },
                {name: '台湾',value: getConfirmedCount("台湾") },
                {name: '香港',value: getConfirmedCount("香港") },
                {name: '澳门',value: getConfirmedCount("澳门") }
              ]
            }
          ]
        }

        myChartChina.setOption(optionMap);
        window.onresize=function(){
          resizeMyChartContainer();
          myChartChina.resize();
        }
      }
    }
}
</script>

<style scoped>
.index-pay{
    width: 100%;
    height: auto;
    background: #ffffff;
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
}
.index-pay-box{
    width: 100%;
    /* height: 200px; */
    border:  1px solid #E6E6E6;
    position: relative;
    padding: 20px 15px;
    box-sizing: border-box;
}
.index-pay-box-name{
    position: absolute;
    width: 120px;
    height: 30px;
    background: #ffffff;
    display: inline-block;
    text-align: center;
    line-height: 30px;
    font-size: 13px;
    color: #000000;
    left: 25px;
    top: -15px;
}
.index-pay-box-select{
    width: 100%;
    height: 40px;
    /* background: burlywood; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
}
#index-pay-box-charts{
    width: 100%;
    height: 500px;
    /* background: chocolate; */
}
</style>