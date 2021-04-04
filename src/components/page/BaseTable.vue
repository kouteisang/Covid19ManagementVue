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
                <el-table-column prop="province" label="省份" width = "80"></el-table-column>
              <el-table-column prop="city" label="城市" width = "72"></el-table-column>
                <el-table-column prop="district" label="市辖区" width = "70"></el-table-column>
               <el-table-column prop="community" label="详细地址" width = "230"></el-table-column>
              <el-table-column prop="emergencyName" label="紧急联系人姓名" width = "120"></el-table-column>
                <el-table-column prop="emergencyPhone" label="紧急联系人电话" width = "120"></el-table-column>
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
    name: 'basetable',
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
    const that = this;
    let url = 'http://localhost:8181/user/findUser'
    let params = {
      page: 1,
      size: 10,
      name: "",
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
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    let url = 'http://localhost:8181/user/deleteUser'
                    let params = {
                      identityId: row.identityId
                    }
                    axios.post(url,qs.stringify(params),{headers:{ 'content-type': 'application/x-www-form-urlencoded' }}).then(function (resp){
                        if(resp.data.data == 200){
                          window.location.reload()
                        }
                    })
                    this.$message.success('删除成功');
                  //  this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(row) {
            this.multipleSelection = row;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            const that = this
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
              type: 'warning'
            }).then(() => {
                  let url = 'http://localhost:8181/user/deleteUser'
                      for(var i = 0; i < length; i ++){
                  let params = {
                    identityId: that.multipleSelection[i].identityId
                  }
                    axios.post(url, qs.stringify(params), {headers: {'content-type': 'application/x-www-form-urlencoded'}}).then(function (resp) {
                      if (resp.data.data == 200) {
                        window.location.reload()
                      }
                    })
                 }
              that.$message.success(`删除成功`);
              that.multipleSelection = [];
                })
                .catch(() => {});
        },
        // 编辑操作
        handleEdit(index, row) {
          this.$router.push({
            path:'/editCommunityUserInfo',
            query:{
              identityId:row.identityId
            }
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
