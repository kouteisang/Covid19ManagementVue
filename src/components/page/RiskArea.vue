<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>  行程报备专区
        </el-breadcrumb-item>
        <el-breadcrumb-item>国内低中高风险查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
      >
        <el-table-column prop="province" label="省份" align="center"></el-table-column>
        <el-table-column prop="city" label="城市" ></el-table-column>
        <el-table-column prop="nowConfirm" label="现有确诊" ></el-table-column>
        <el-table-column label="新增确诊">
          <template slot-scope="scope">
            <el-tag
                v-if="scope.row.confirmAdd != 0"
                :type="'danger'"
            >+{{scope.row.confirmAdd}}</el-tag>
            <el-tag
                v-if="scope.row.confirmAdd === 0"
                :type="'success'"
            >+0</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="confirm" label="总共确诊" ></el-table-column>
        <el-table-column prop="dead" label="死亡人数"></el-table-column>
        <el-table-column prop="heal" label="治疗人数" ></el-table-column>
        <el-table-column prop="sdate" label="起始日期"></el-table-column>
        <el-table-column prop="date" label="当前日期"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
                v-if="scope.row.grade.indexOf('高风险') != -1"
                :type="'danger'"
            >{{scope.row.grade}}</el-tag>
            <el-tag
                v-else-if="scope.row.grade.indexOf('中风险') != -1"
                :type="'warning'"
            >{{scope.row.grade}}</el-tag>
            <el-tag
                v-else
                :type="'info'"
            >{{scope.row.grade}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData } from '../../api/index';
import axios from "axios";
import qs from "qs";
export default {
  name: 'RiskArea',
  data() {
    return {
      query: {
        supplyTypes:[],
        supplyContents:[],
        emergencies:[{
          value:0,
          label:"否"
        },{
          value: 1,
          label: "是"
        }],
        pageIndex: 1,
        pageSize: 10
      },
      suggestion:'',
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    const that = this;
    let url = 'http://localhost:8181/covidApi/getRiskArea'
    axios.get(url,{
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
      this.query.supplyTypes = ""
      this.query.supplyContents = ""
      this.query.emergencies = ""
      const that = this;
      let url = 'http://localhost:8181/user/supply/getAskForSupplyList'
      let params = {
        page: 1,
        size: 10,
      }
      axios.get(url,{
        params:params
      }).then(function (response) {
        that.tableData = response.data.data.list;
        that.pageTotal = response.data.data.total;
        that.size = response.data.data.size;
      }).catch(function (resposne) {

      })
      this.query.emergencies = [{value:0, label:"否"},{value: 1, label: "是"}]
    }
    ,
    handleEdit(index, row){
      this.suggestion = row.suggestion
    }
    ,
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
      const that = this;
      let url = 'http://localhost:8181/user/supply/getAskForSupplyList'

      let params = {
        page: 1,
        size: 10,
        supplyType: this.query.supplyTypes.label,
        supplyContent: this.query.supplyContents.label,
        isEmergency: this.query.emergencies.label
      }
      axios.get(url,{
        params:params
      }).then(function (response) {
        that.tableData = response.data.data.list;
        that.pageTotal = response.data.data.total;
        that.size = response.data.data.size;
      }).catch(function (resposne) {

      })
    },
    getAllSupply(){
      let url = 'http://localhost:8181/common/getAllSupplyKind'
      const that = this
      axios.get(url).then(function (resp){
        console.log(resp)
        that.query.supplyTypes = resp.data.data
      })
    },
    getAllSupplyContent(){
      let url = 'http://localhost:8181/common/getSupplyContentByKind'
      const that = this
      let params = {
        supplyKind:this.query.supplyTypes.label
      }
      axios.get(url, {params:params}).then(function (resp) {
        that.query.supplyContents = resp.data.data
      })
    },
    page(currentPage){
      this.$set(this.query, 'pageIndex', 1);
      const that = this;
      let url = 'http://localhost:8181/user/supply/getAskForSupplyList'

      let params = {
        page: currentPage,
        size: 10,
        supplyType: this.query.supplyTypes.label,
        supplyContent: this.query.supplyContents.label,
        isEmergency: this.query.emergencies.label
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
