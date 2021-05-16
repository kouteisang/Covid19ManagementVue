<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>各城市/区疫情数据表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="schart-box">
        <schart class="schartCity" canvasId="bar" :options="options1"></schart>
      </div>
      <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
          :default-sort = "{prop: 'confirmedCount', order: 'descending',
                                  prop:'suspectedCount', order:'descending',
                                  prop:'curedCount', order:'descending',
                                  prop:'deadCount', order:'descending',
                                  prop:'highDangerCount', order:'descending',
                                  prop:'midDangerCount', order:'descending',
                                  prop:'currentConfirmedCount', order:'currentConfirmedCount',
                                  }"
      >
        <el-table-column prop="cityName" label="城市名"></el-table-column>
        <el-table-column prop="currentConfirmedCount" label="当前确诊人数" sortable></el-table-column>
        <el-table-column prop="confirmedCount" label="累计确诊人数" sortable></el-table-column>
        <el-table-column prop="suspectedCount" label="疑似病例" sortable></el-table-column>
        <el-table-column prop="curedCount" label="治愈人数" sortable></el-table-column>
        <el-table-column prop="deadCount" label="死亡人数" sortable></el-table-column>
        <el-table-column prop="highDangerCount" label="重症患者人数" sortable></el-table-column>
        <el-table-column prop="midDangerCount" label="中轻度患者人数" sortable></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
                v-if="parseInt(scope.row.confirmedCount)>=100 && scope.row.cityName != '境外输入'"
                :type="'danger'"
            >曾发生严重疫情</el-tag>
            <el-tag
                v-else-if="scope.row.cityName == '境外输入'"
                :type="'danger'"
            >境外输入</el-tag>
            <el-tag
                v-else
                :type="'success'"
            >未发生严重疫情</el-tag>
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
import Schart from 'vue-schart';

export default {
  name: 'CityCovidData',
  components:{
    Schart
  },
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
    const that = this
    let url = 'http://localhost:8181/covidApi/getCovidDataByProvince?province='+this.$route.query.province
    axios.get(url).then(function (resp) {
      that.tableData = resp.data.data.list;
      if(resp.data.data.provinceName != "北京市" && resp.data.data.provinceName != "天津市" && resp.data.data.provinceName != "上海市" && resp.data.data.provinceName != "重庆市")
        that.options1.title.text = resp.data.data.provinceName+"各城市疫情数据分析图"
      else
        that.options1.title.text = resp.data.data.provinceName+"各区疫情数据分析图"
      that.options1.labels = resp.data.data.cityNames
      that.options1.datasets[0].label = "累计确诊人数"
      that.options1.datasets[0].data = resp.data.data.confirmedCountList
      that.options1.datasets[1].label = "累计治愈人数"
      that.options1.datasets[1].data = resp.data.data.curedCountList
      that.options1.datasets[2].label = "累计死亡人数"
      that.options1.datasets[2].data = resp.data.data.deadCountList

    });
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
      this.idx = index;
      this.form = row;
      this.editVisible = true;
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
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>
