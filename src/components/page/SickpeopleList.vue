<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 居民信息管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
            type="primary"
            icon="el-icon-delete"
            class="handle-del mr10"
            @click="delAllSelection"
        >批量删除</el-button>
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
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="identityId" label="身份证号" width="165" align="center"></el-table-column>
        <el-table-column prop="realName" label="姓名" width = "80"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width = "120"></el-table-column>
        <el-table-column prop="sickReason" label="病因" width = "80"></el-table-column>
        <el-table-column prop="whenSick" label="生病日期" width = "105"></el-table-column>
        <el-table-column prop="ifFavour" label="是否发烧" width = "80"></el-table-column>
        <el-table-column prop="covidTest" label="核酸检测结果" width = "110"></el-table-column>
        <el-table-column prop="bodyTemperature" label="体温报备" width = "85"></el-table-column>
        <el-table-column prop="community" label="详细地址" width = "235"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
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
          <el-input v-model="form.community"></el-input>
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
import axios from "_axios@0.18.1@axios";

export default {
  name: "SickpeopleList",
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
      id: -1
    };
  },
  created() {
    let url  = 'http://localhost:8181/manager/sick/getSickUserList'
    const that = this
    let params = {
      page: 1,
      size: 10,
      realName: "",
      identityId: "",
      phone: ""
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
