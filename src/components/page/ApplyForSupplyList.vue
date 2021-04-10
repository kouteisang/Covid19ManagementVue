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
        <el-select v-model="query.supplyTypes.label" placeholder="请选择物资类型" style="width: 180px" class="handle-select mr10" @focus="getAllSupply">
          <el-option v-for="supplyType in query.supplyTypes" :key="supplyType" :value="supplyType" :label="supplyType"/>
        </el-select>
        <el-select v-model="query.supplyContents.label" placeholder="请选择详细物资" style="width: 180px" class="handle-select mr10" @focus="getAllSupplyContent">
          <el-option v-for="supplyContent in query.supplyContents" :key="supplyContent" :value="supplyContent" :label="supplyContent" />
        </el-select>
        <el-select v-model="query.emergencies.label" placeholder="是否紧急" class="handle-select mr10">
          <el-option v-for="emergency in query.emergencies" :key="emergency.label" :value="emergency.value" :label="emergency.label"/>
        </el-select>
        <el-button type="primary" icon="el-icon-search" style="border-left: 20px" @click="handleSearch">搜索</el-button>
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
        <el-table-column prop="identityId" label="身份证号" width="165" align="center"></el-table-column>
        <el-table-column prop="realName" label="姓名" width = "80"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width = "120"></el-table-column>
        <el-table-column prop="community" label="详细地址" width = "230"></el-table-column>
        <el-table-column prop="supplyType" label="物资类型" width = "120"></el-table-column>
        <el-table-column prop="supplyContent" label="物资内容" width = "120"></el-table-column>
        <el-table-column prop="ageValue" label="年龄段" width = "100"></el-table-column>
        <el-table-column prop="isEmergencyValue" label="是否紧急" width = "80"></el-table-column>
        <el-table-column prop="createTime" label="报备时间" width = "175"></el-table-column>
        <el-table-column label="操作" width="105" align="center">
          <template slot-scope="scope" >
            <el-popover
                placement="bottom"
                width="200"
                trigger="click">
              <p>{{suggestion}} </p>
              <el-button prop="suggestion" slot="reference" icon="el-icon-message" type="text" @click="handleEdit(scope.$index, scope.row)">查看建议</el-button>
            </el-popover>
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
  name: 'ApplyForSupplyList',
  data() {
    return {
      query: {
        supplyTypes:'',
        supplyContents:'',
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
    let url = 'http://localhost:8181/user/supply/getAskForSupplyList'
    let params = {
      page: 1,
      size: 10,
      supplyType: "",
      supplyContent: "",
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
    handleEdit(index, row){
      this.suggestion = row.suggestion
    }
    ,
    // 触发搜索按钮
    handleSearch() {

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
      alert("??/")
      this.$set(this.query, 'pageIndex', 1);
      const that = this;
      let url = 'http://localhost:8181/user/supply/getAskForSupplyList'
      alert(this.query.supplyTypes.label)
      alert(this.query.supplyContents.label)


      let params = {
        page: currentPage,
        size: 10,
        supplyType: this.query.supplyContent.label,
        supplyContent: this.query.supplyContent.label,
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
