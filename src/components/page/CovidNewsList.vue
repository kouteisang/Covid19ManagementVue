<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 疫情新闻</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`疫情新闻`" name="first">
          <el-table :data="unread" :show-header="false" style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="pubDate" width="180"></el-table-column>
            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button size="small" @click="handleRead(scope.$index, scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :total="9700"
            @current-change="page"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
let url = 'http://localhost:8181/covidnews/getCovidNews'
export default {
  name: 'CovidNewsList',
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
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    }
  },
  methods: {
    handleRead(index, row) {
      this.$router.push({
        path:'/getCovidNewsInfo',
        query:{
          title: row.title,
          infoSource: row.infoSource,
          sourceUrl: row.sourceUrl,
          summary: row.summary
        }
      })
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
   //location.reload()
    const that = this
    let params = {
      page:1
    }
    axios.get(url,{params:params}).then(function (resp) {
      that.unread = resp.data.data.list;
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

