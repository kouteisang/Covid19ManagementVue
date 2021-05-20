<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 疫情期间Top10旅游推荐区域
        </el-breadcrumb-item>
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
          :default-sort = "{prop: 'score', order: 'descending'}"
      >
        <el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column label="省份景点" align="center">
          <template slot-scope="scope">
            <el-image
                class="table-td-thumb"
                :src="scope.row.picUrl"
                :preview-src-list="[scope.row.picUrl]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="综合得分" sortable></el-table-column>
        <el-table-column prop="info" label="简介" sortable></el-table-column>
        <!--              <el-table-column prop="date" label="注册时间"></el-table-column>-->
      </el-table>
    </div>
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
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
export default {
  name: 'TravelCityInfo',
  data() {
    return {
      options1: {
        type: 'bar',
        title: {
          text: '疫情数据分析图'
        },
        bgColor: '#fbfbfb',
        labels: [],
        datasets: [
          {
            label: '',
            fillColor: 'rgba(241, 49, 74, 0.5)',
            data: []
          },
          {
            label: '',
            data: []
          },
          {
            label: '',
            data: []
          },
        ]
      },
      pictureurl:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      query: {
        address: '',
        name: '',
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
    this.getData();
  },
  mounted() {
    this.getAllProvincesCovidData()
  },
  methods: {
    getAllProvincesCovidData(){
      const that = this;
      var url = "http://localhost:8181/travel/getTravelProvinceInfo"
      axios.get(url).then(function (resp) {
        that.tableData = resp.data.data.top10;
        that.options1.title.text = resp.data.data.provinceName+"各城市疫情数据分析图"
      })
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      fetchData(this.query).then(res => {
        console.log(res);
        this.tableData = res.list;
        this.pageTotal = res.pageTotal || 50;
      });
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
          .then(() => {
            this.$message.success('删除成功');
            this.tableData.splice(index, 1);
          })
          .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = '';
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' ';
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      this.$router.push({
        path:'/cityCovidData',
        query:{
          province:row.province
        }
      })
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
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
.schart-box {
  display: inline-block;
  margin: 20px;
}
.schartCity {
  width: 1250px;
  height: 400px;
}
</style>
