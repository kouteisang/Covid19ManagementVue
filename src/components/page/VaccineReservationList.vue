<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 疫苗接种记录
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.realName" placeholder="姓名" class="handle-input-name mr10"></el-input>
        <el-input v-model="query.phone" placeholder="手机号" class="handle-input-name mr10"></el-input>
        <el-input v-model="query.identityId" placeholder="身份证号" class="handle-input mr10"></el-input>
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
        <el-table-column prop="identityId" label="身份证号" align="center"></el-table-column>
        <el-table-column prop="realName" label="姓名" ></el-table-column>
        <el-table-column prop="phone" label="联系电话" ></el-table-column>
        <el-table-column prop="hospitalName" label="接种医院"></el-table-column>
        <el-table-column prop="vaccineStatus" label="接种状态" ></el-table-column>
        <el-table-column prop="vaccineType" label="疫苗品种" ></el-table-column>
        <el-table-column label="接种完成图片信息" align="center">
          <template v-if="scope.row.picurl != ''" slot-scope="scope">
            <el-image
                class="table-td-thumb"
                :src="scope.row.picurl"
                :preview-src-list="[scope.row.picurl]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
                type="text"
                icon="el-icon-chat-line-square"
                @click="handleEdit(scope.$index, scope.row)"
            >接种详情</el-button>
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
    <el-dialog title="接种详情" :visible.sync="editVisible" width="30%">
      <el-timeline :reverse="reverse">
        <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData } from '../../api/index';
import axios from "axios";
import qs from "qs";
export default {
  name: 'VaccineReservationList',
  data() {
    return {
      query: {
        identityId: '',
        realName: '',
        phone:'',
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
      id: -1,
      reverse: true,
      activities: [{
        content: '',
        timestamp: ''
      }]
    };
  },
  created() {
    const that = this;
    let url = 'http://localhost:8181/vacinne/getVaccineReservationList'
    let params = {
      page: 1,
      size: 10,
      realName: "",
      phone: "",
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
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      fetchData(this.query).then(res => {
        console.log(res);
        this.tableData = res.list;
        this.pageTotal = res.pageTotal || 50;
      });
    },
    clearInfo(){
      this.query.identityId = ""
      this.query.realName = ""
      this.query.phone = ""
      const that = this;
      let url = 'http://localhost:8181/user/findUser'
      let params = {
        page: 1,
        size: 10,
        name: this.query.identityId,
        phone: this.query.realName,
        identityId: this.query.realName
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
    ,
    // 触发搜索按钮
    handleSearch() {
      const that = this
      this.$set(this.query, 'pageIndex', 1);
      let url = 'http://localhost:8181/user/findUser'
      let params = {
        page: 1,
        size: 10,
        name: this.query.realName,
        phone: this.query.phone,
        identityId: this.query.identityId
      }
      axios.get(url,{params:params}).then(function (resp) {
        that.tableData = resp.data.data.list;
        that.pageTotal = resp.data.data.total;
        that.size = resp.data.data.size;
      }).catch(function (resp) {

      })
    },
    // 多选操作
    handleSelectionChange(row) {
      this.multipleSelection = row;
    },
    // 编辑操作
    handleEdit(index, row) {
      const that = this;
      this.idx = index;
      this.form = row;
      this.editVisible = true;
      let url = "http://localhost:8181/vacinne/getVaccineSpecificByIdentityId?identityId=" + localStorage.getItem("ms_username")
      axios.get(url).then(function (resp){
        that.activities = resp.data.data.vaccineSpevificDTOS
      })
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    page(currentPage){
      this.$set(this.query, 'pageIndex', 1);
      const that = this;
      let url = 'http://localhost:8181/user/findUser'
      let params = {
        page: currentPage,
        size: 10,
        name: this.query.realName,
        phone: this.query.phone,
        identityId: this.query.identityId
      }
      axios.get(url,{
        params:params
      }).then(function (response) {
        that.tableData = response.data.data.list;
        that.pageTotal = response.data.data.total;
        that.size = response.data.data.size;
      }).catch(function (resposne) {

      })
    }
  }
};
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
