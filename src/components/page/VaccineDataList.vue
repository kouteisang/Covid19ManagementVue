<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 疫苗预约/报备
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.hospitalName" placeholder="医院名称" class="handle-input-name mr10"></el-input>
        <el-input v-model="query.hospitalLocation" placeholder="医院详细地址" class="handle-input-name mr10"></el-input>
        <el-input v-model="query.hospitalTel" placeholder="医院联系电话" class="handle-input mr10"></el-input>
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
        <el-table-column prop="hospitalName" label="医院名称" width="165" align="center"></el-table-column>
        <el-table-column prop="hospitalLocation" label="医院详细地址" ></el-table-column>
        <el-table-column prop="hostipalTel" label="医院联系电话"></el-table-column>
        <el-table-column prop="type" label="支持疫苗类型"></el-table-column>
        <el-table-column label="医院地址图片" align="center">
          <template slot-scope="scope">
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
                icon="el-icon-thumb"
                @click="handleEdit(scope.$index, scope.row)"
            >疫苗预约</el-button>
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
    <el-dialog title="疫苗预约" :visible.sync="editVisible" width="30%">
        <div>您确定进行疫苗预约吗？</div><br>
        <div>预约后将在系统中添加预约记录，你可以在「预约记录」中取消疫苗预约或修改疫苗接种状态</div><br>
        <div>请选择预约针次</div><br>
          <el-select v-model="options.label"  placeholder="请选择预约针次">
            <el-option v-for="option in options" :key="option.value" :value="option.value" :label="option.label"/>
          </el-select><br><br>
        <div>请选择预约品牌</div><br>
        <el-select v-model="vaccineTypes.label"  placeholder="请选择预约品牌">
          <el-option v-for="vaccineType in vaccineTypes" :key="vaccineType" :value="vaccineType" :label="vaccineType"/>
        </el-select>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "VaccineDataList",
  data() {
    return {
      query: {
        hospitalName: '',
        hospitalLocation: '',
        hospitalTel:'',
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
      id: -1
    };
  },
  created() {
    let url  = 'http://localhost:8181/vacinne/getVaccineList'
    const that = this
    let params = {
      page: 1,
      size: 10,
      hospitalName: "",
      hospitalLocation: "",
      hospitalTel: ""
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
    // 确定预约
    saveEdit() {
      //alert(this.unread.hospitalName)
      //alert(localStorage.getItem("ms_username"))
      //alert(this.vaccineTypes.label)
      var type
      if(this.vaccineTypes.label === "北京生物"){
        type = 1
      }else if(this.vaccineTypes.label === "北京科兴"){
        type = 2
      }else if(this.vaccineTypes.label == "武汉生物"){
        type = 3
      }
      this.editVisible = false;
      let url = 'http://localhost:8181/vacinne/reserveVaccine'
      let params = {
        identityId: localStorage.getItem("ms_username"),
        hospitalName: this.unread.hospitalName,
        vaccineStatus: parseInt(this.options.label),
        vaccineType: parseInt(type)
      }
      const that = this;
      let header = { 'content-type': 'application/x-www-form-urlencoded' }
      axios.post(url, qs.stringify(params), {headers: header}).then(function (resp){
        console.log(resp)
        console.log(resp.data.code)
        if(resp.data.code == "200"){
          that.$message.success('预约疫苗接种成功');
        }
      })

    },
    handleEdit(index, row) {
      const that = this
      this.idx = index;
      this.unread = row;
      this.editVisible = true;
      let url = "http://localhost:8181/common/dealWithVaccinetype"
      let params = {
        vaccineType: row.type
      }
      axios.get(url, {params:params}).then(function (resp) {
        that.vaccineTypes = resp.data.data.types
        console.log(that.vaccineTypes)
      })
      console.log(this.unread)
      },
    handleSearch(){
        const that = this
        this.$set(this.query, 'pageIndex', 1);
        let url  = 'http://localhost:8181/vacinne/getVaccineList'
        let params = {
          page: 1,
          size: 10,
          hospitalName: this.query.hospitalName,
          hospitalLocation: this.query.hospitalLocation,
          hospitalTel: this.query.hospitalTel
        }
        axios.get(url,{params:params}).then(function (resp) {
          that.tableData = resp.data.data.list;
          that.pageTotal = resp.data.data.total;
          that.size = resp.data.data.size;
        }).catch(function (resp) {

        })
    },
    clearInfo(){
      this.query.hospitalName = ""
      this.query.hospitalLocation = ""
      this.query.hospitalTel = ""

      let url  = 'http://localhost:8181/vacinne/getVaccineList'
      const that = this
      let params = {
        page: 1,
        size: 10,
        hospitalName: "",
        hospitalLocation: "",
        hospitalTel: ""
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
