<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>  缺失物资列表
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
        <el-table-column prop="departureLocation" label="出发地" ></el-table-column>
        <el-table-column prop="arriveTime" label="到达时间"></el-table-column>
        <el-table-column prop="emergencyName" label="紧急联系人姓名" ></el-table-column>
        <el-table-column prop="emergencyPhone" label="紧急联系人电话" ></el-table-column>
        <el-table-column prop="community" label="家庭住址" ></el-table-column>
        <el-table-column label="操作" width="105" align="center">
          <template slot-scope="scope">
            <el-tag
                v-if="scope.row.state === '居家隔离未满14天'"
                :type="'danger'"
            >隔离未满14天</el-tag>
            <el-tag
                v-if="scope.row.state === '居家隔离已满14天'"
                :type="'success'"
            >隔离已满14天</el-tag>
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
  name: 'ArrivalList',
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
    let url = 'http://localhost:8181/arrival/getArrivalList'
    let params = {
      page: 1,
      size: 10,
      identityId: '',
      realName: '',
      phone: '',

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
      const that = this;
      let url = 'http://localhost:8181/arrival/getArrivalList'
      let params = {
        page: 1,
        size: 10,
        identityId: '',
        realName: '',
        phone: '',

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
    handleEdit(index, row){
      this.suggestion = row.suggestion
    }
    ,
    // 触发搜索按钮
    handleSearch() {
      const that = this;
      let url = 'http://localhost:8181/arrival/getArrivalList'
      let params = {
        page: 1,
        size: 10,
        identityId: this.query.identityId,
        realName: this.query.realName,
        phone: this.query.phone,

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
