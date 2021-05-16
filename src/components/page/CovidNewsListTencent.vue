<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 疫情新闻</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">

      <div class="handle-box">
        <el-select v-model="form.regions.label" placeholder="请选择国家或地区"  class="handle-input mr10" @focus="getAllSupportCities">
          <el-option v-for="region in form.regions" :key="region" :value="region" :label="region"/>
        </el-select>
        &nbsp;
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="danger" icon="el-icon-circle-close" @click="clearInfo">清空</el-button>
      </div>

        <el-tabs v-model="message">
          <el-tab-pane :label="`疫情新闻`" name="first">
            <el-table :data="tableData" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="publishTime" width="180"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button size="small" @click="handleRead(scope.$index, scope.row)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
    </div>


    <el-dialog title="新闻详情" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item>
        <template slot-scope="scope">
          <el-image
              class="table-td-thumb"
              :src="shortcut"
              :preview-src-list="[shortcut]"
          ></el-image>
        </template>
        </el-form-item>
        <el-form-item label="标题：">
          <div>{{title}}</div>
        </el-form-item>
        <el-form-item label="来源：">
          <div>{{srcform}}</div>
        </el-form-item>
        <el-form-item label="全文：">
          <a  target="_blank"  style="color:#deaf92" :href="newsUrl">点击查看全文</a>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editVisible = false">确 定</el-button>
                </span>
    </el-dialog>



  </div>
</template>

<script>
import axios from "axios";
let url = 'http://localhost:8181/covidnews/getCovidNews'
export default {
  name: 'CovidNewsListTencent',
  provide () {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      message: 'first',
      showHeader: false,
      unread: [],
      multipleSelection: [],
      delList: [],
      tableData:[],
      editVisible: false,
      pageTotal: 0,
      form: {
        regions:[]
      },
      idx: -1,
      id: -1,
      title:'',
      publishTime:'',
      newsUrl:'',
      srcform:'',
      shortcut:''
    }
  },
  methods: {
    getAllSupportCities(){
      let url = 'http://localhost:8181/common/getAllProvince'
      const that = this
      axios.get(url).then(function (resp) {
        that.form.regions = []
        that.form.regions = resp.data.data.provinces
      })
    },
    handleSearch(){
      const that = this
      let url = "http://localhost:8181/covidnews/getCovidNewsListTencent?province="+this.form.regions.label;
      axios.get(url).then(function (resp){
        console.log(resp.data.data.covidNewsTencentDTOS)
        that.tableData = resp.data.data.covidNewsTencentDTOS;
      })
    },
    handleRead(index, row) {
      this.publishTime = row.publishTime
      this.newsUrl = row.newsUrl
      this.srcform = row.srcform
      this.shortcut = row.shortcut
      this.title = row.title
      this.idx = index;
      this.editVisible = true
    },
    handleDel(index) {
      const item = this.read.splice(index, 1);
      this.recycle = item.concat(this.recycle);
    },
    handleRestore(index) {
      const item = this.recycle.splice(index, 1);
      this.read = item.concat(this.read);
    },
    page(currentPage){
      const that = this;
      let params = {
        page: currentPage,
      }
      axios.get(url,{
        params:params
      }).then(function (resp) {
        that.unread = resp.data.data.list;
      }).catch(function (resposne) {

      })
    }
  },
  computed: {
    unreadNum(){
      return this.unread.length;
    }
  },
  created() {
    const that = this
    let url = "http://localhost:8181/covidnews/getCovidNewsListTencent?province=sd"
    axios.get(url).then(function (resp){
      console.log(resp.data.data.covidNewsTencentDTOS)
      that.tableData = resp.data.data.covidNewsTencentDTOS;
    })
  }
}

</script>

<style>
.message-title{
  cursor: pointer;
}
.handle-row{
  margin-top: 30px;
}
</style>

