<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户中心/审批中心
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.username" placeholder="用户名" class="handle-input-name mr10"></el-input>
        <el-input v-model="query.identityId" placeholder="身份证号" class="handle-input-name mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="danger" icon="el-icon-circle-close" @click="clearInfo">清空</el-button>
      </div>
      <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
      >
        <el-table-column label="用户头像" align="center">
          <template slot-scope="scope">
            <el-image
                class="table-td-thumb"
                :src="scope.row.picurl"
                :preview-src-list="[scope.row.picurl]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="165" align="center"></el-table-column>
        <el-table-column prop="identityId" label="身份证号" ></el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
                v-if="scope.row.certificate == 0"
                type="text"
                icon="el-icon-circle-check"
                @click="pass(scope.$index, scope.row)"
            >审核通过</el-button>
            <el-button
                type="text"
                icon="el-icon-chat-line-square"
                @click="handleEdit(scope.$index, scope.row)"
            >审核详情</el-button>
          </template>
        </el-table-column>

      </el-table>
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

    <!-- 编辑弹出框 -->
    <el-dialog title="审核详情" :visible.sync="editVisible" width="30%">
      <el-timeline :reverse="reverse">
        <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.createTime">
          {{activity.info}}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: 'bpm',
  data() {
    return {
      username: localStorage.getItem('username'),
      query: {
        username: '',
        identityId: '',
        pageIndex: 1,
        pageSize: 10
      },
      options:[
        {
          value: 1,
          label:"第一针"
        },
        {
          value: 2,
          label:"第二针"
        }
      ],
      vaccineTypes:[],
      tableData: [],
      num:'',
      unread:[],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      reverse: true,
      activities: [{
        info: '',
        createTime: '',
        color: '#0bbd87'
      }]
    };
  },
  created() {
    let url  = 'http://localhost:8181/manager/getNeedAusInfo'
    const that = this
    let params = {
      page: 1,
      size: 10,
      username: "",
      identityId: ""
    }
    axios.get(url,{
      params:params
    }).then(function (response) {
      console.log(response)
      that.tableData = response.data.data.list;
      that.pageTotal = response.data.data.total;
      that.size = response.data.data.size;
    }).catch(function (resposne) {

    })
  },
  methods:{
    pass(index, row){
      const that = this;
      this.$confirm('确定要审批通过吗？', '提示', {
        type: 'success'
      })
          .then(() => {
            let url = 'http://localhost:8181/manager/pass'
            let params = {
              operator: this.username,
              identityId:row.identityId
            }
            axios.post(url,qs.stringify(params),{headers:{ 'content-type': 'application/x-www-form-urlencoded' }}).then(function (resp){
              console.log("resp = ", resp)
              if(resp.data.code == 200){
                window.location.reload()
              }
            })
            this.$message.success('审批通过');
          })
          .catch(() => {});
    },
    handleEdit(index, row) {
      const that = this;
      this.idx = index;
      this.form = row;
      this.editVisible = true;
      let url = "http://localhost:8181/manager/getAusSpecificList?identityId=" + row.identityId
      axios.get(url).then(function (resp){
        that.activities = resp.data.data.ausSpecificList
      })
    },
    handleSearch(){
      let url  = 'http://localhost:8181/manager/getNeedAusInfo'
      const that = this
      let params = {
        page: 1,
        size: 10,
        username: this.query.username,
        identityId: this.query.identityId
      }
      axios.get(url,{
        params:params
      }).then(function (response) {
        console.log(response)
        that.tableData = response.data.data.list;
        that.pageTotal = response.data.data.total;
        that.size = response.data.data.size;
      }).catch(function (resposne) {

      })
    },
    clearInfo(){
      this.query.username = ""
      this.query.identityId = ""

      let url  = 'http://localhost:8181/manager/getNeedAusInfo'
      const that = this
      let params = {
        page: 1,
        size: 10,
        username: "",
        identityId: ""
      }
      axios.get(url,{
        params:params
      }).then(function (response) {
        console.log(response)
        that.tableData = response.data.data.list;
        that.pageTotal = response.data.data.total;
        that.size = response.data.data.size;
      }).catch(function (resposne) {

      })
    }
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.handle-input-name {
  width: 150px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
