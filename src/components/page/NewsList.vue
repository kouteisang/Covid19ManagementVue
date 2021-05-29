<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 公告管理专区
        </el-breadcrumb-item>
        <el-breadcrumb-item>公告列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`公告消息(${news_size})条`" name="first">
          <el-table :data="unread" :show-header="false" style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.newsTitle}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" width="180"></el-table-column>
            <el-table-column width="200">
              <template slot-scope="scope">
                <el-button  size="small" @click="handleRead(scope.$index, scope.row)">查看详情</el-button>
                <el-button  v-if="nowRole == 1" size="small" @click="handleEdit(scope.$index, scope.row)">修改公告</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        </el-tabs>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="size"
            :total="pageTotal"
            @current-change="page"
        ></el-pagination>
      </div>
    </div>



        <el-dialog title="公告详情" :visible.sync="editVisible" width="30%">
          <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="标题：">
              <div>{{title}}</div>
            </el-form-item>
            <el-form-item label="详情：">
              <div>{{content}}</div>
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
axios.withCredentials = true
axios.defaults.withCredentials=true
let url = 'http://localhost:8181/manager/news/getNewsList'
export default {
  name: 'NewsList',
  data() {
    return {
      title:'',
      content:'',
      nowRole: localStorage.getItem("nowRole"),
      news_size:'',
      message: 'first',
      showHeader: false,
      unread: [],
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
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


    handleRead(index, row){
      this.title = row.newsTitle;
      this.content = row.newsContent;
      this.idx = index;
      this.editVisible = true;
    },

    handleEdit(index, row) {
      this.$router.push({
        path:'/editNewsInfo',
        query:{
          id:row.id
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
      this.$set(this.query, 'pageIndex', 1);
      const that = this;
      let params = {
        page: currentPage,
        size: 10
      }
      axios.get(url,{
        params:params
      }).then(function (resp) {
        that.unread = resp.data.data.list;
        that.pageTotal = resp.data.data.total;
        that.size = resp.data.data.size;
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
    let params = {
      page:1,
      size:10
    }
    this.axios.get(url,{params:params}).then(function (resp) {
      that.unread = resp.data.data.list;
      that.pageTotal = resp.data.data.total;
      that.size = resp.data.data.size;
      that.news_size = resp.data.data.total;
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

