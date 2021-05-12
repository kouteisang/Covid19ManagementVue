<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" >
                    <div class="user-info">
                        <img :src="picUrl" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        当前登录时间：
                        <span>{{nowTime}}</span>
                    </div>
                  <div class="user-info-list">
                    当前登录地区：
                    <span>{{address}}</span>
                  </div>
                </el-card>
                <el-card shadow="hover" >
                    <div slot="header" class="clearfix">
                        <span>感染人数详情</span>
                    </div>
                    累计感染人数<el-progress :percentage="confirmedPeople" color="#2d8cf0"></el-progress>
                    累计治愈人数<el-progress :percentage="curedPeople" color="#64d572"></el-progress>
                    累计死亡人数<el-progress :percentage="deadPeople" color="#f15e43"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-remove-outline grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ confirmedCount }}</div>
                                    <div>累计感染人数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-circle-check grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ curedCount }}</div>
                                    <div>累计治愈人数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-circle-close grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ deadCount }}</div>
                                    <div>累计死亡人数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>📝待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="addTodo()">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;" max-height="300">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status" @change="finishTodo(scope.row)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
<!--            <el-col :span="12">-->
<!--                <el-card shadow="hover">-->
<!--                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>-->
<!--                </el-card>-->
<!--            </el-col>-->
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>

          <el-card >
            <div  class="text item">
              <b>预防措施</b><br>
              1、尽量减少外出，不要去人群聚集处，避免近距离接触任何有感冒或流感样症状的人。<br>
              2、外出前往公共场所、就医和乘坐交通工具时，注意佩戴医用外科口罩或N95口罩。<br>
              3、不要接触、购买和食用野生动物(即野味)，避免在未加防护的情况 下接触野生动物和家禽家畜。<br>
              4、注意手卫生，勤洗手，使用洗手液或肥皂，流水洗手，或使用含酒精成分的免洗洗手液。<br>
              5、打喷嚏或咳嗽时不要用手去捂，要用手肘部或纸巾遮住口、鼻。<br>
              6、居室及工作场所保持清洁，勤开窗，多保持通风状态。<br>
              7、注意多喝水、多休息、避免熬夜、适度运动，以提高个体免疫能力，注意营养、合理饮食，肉类、禽类和蛋类要充分煮熟后食用。<br>
              8、准备常用物资，如体温计、-次性口罩、家庭用消毒用品等。<br>
              9、出现呼吸道症状时应及时到发热门门]诊就医。近期去过高风险地区或与确诊、疑似病例有接触史的，应主动进行新型冠状病毒核酸检测。<br>
              10、积极接种新冠疫苗。<br>
            </div>
          </el-card>
        </el-row>


      <!-- 编辑弹出框 -->
      <el-dialog title="添加待办事件" :visible.sync="editVisible" width="30%">
        <el-input v-model="toDoThing" placeholder="请输入待办事项"></el-input>
        <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
      </el-dialog>



    </div>
</template>
<script>
import Schart from 'vue-schart';
import qs from "qs";
import Maps from 'map'
import axios from "axios";
export default {
    name: 'dashboard',
    data() {
        return {
          address:localStorage.getItem("address"),
            confirmedCount: 158823878,
          curedCount: 120929393,
          deadCount: 3329787,
            confirmedPeople: 56.7,
            curedPeople:43.1,
            deadPeople:0.2,
            toDoThing:'',
            editVisible: false,
            nowTime: localStorage.getItem("nowTime"),
            picUrl: localStorage.getItem("picUrl"),
            name: localStorage.getItem('username'),
            todoList: [
                {
                    id:1,
                    title: '',
                    status: false
                }
            ],
            data: [
                {
                    name: '2018/09/04',
                    value: 1083
                },
                {
                    name: '2018/09/05',
                    value: 941
                },
                {
                    name: '2018/09/06',
                    value: 1139
                },
                {
                    name: '2018/09/07',
                    value: 816
                },
                {
                    name: '2018/09/08',
                    value: 327
                },
                {
                    name: '2018/09/09',
                    value: 228
                },
                {
                    name: '2018/09/10',
                    value: 1065
                }
            ],

            options2: {
                type: 'line',
                title: {
                    text: '近期天气预报'
                },
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '白天温度',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '夜晚温度',
                        data: [164, 178, 150, 135, 160]
                    }
                ]
            }
        };
    },
    components: {
        Schart,
        Maps
    },
    computed: {
        role() {
            return localStorage.getItem("nowRole") === '1' ? '管理员' : '普通用户';
        }
    },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
      addTodo(){
        this.todoThing = ''
        this.editVisible = true;
      },
      saveEdit(){
          const that = this
          let url = 'http://localhost:8181/todo/addTodoList'
          let params = {
            identityId: localStorage.getItem('ms_username'),
            todoThing: this.toDoThing
          }
          axios.post(url,qs.stringify(params),{headers:{ 'content-type': 'application/x-www-form-urlencoded' }}).then(function (resp){
             that.$message.success('添加待办任务成功');
             that.editVisible = false;
             let urlTodoList = 'http://localhost:8181/todo/getTodoList?identityId=' + localStorage.getItem('ms_username')
             axios.get(urlTodoList).then(function (resp) {
               that.todoList = resp.data.data.todoList
             })
          })
      },
      finishTodo(row){
          const that = this
          let url = 'http://localhost:8181/todo/editTodoListStatus'
          let param = {
            identityId: localStorage.getItem('ms_username'),
            id: parseInt(row.id)
          }
          axios.post(url, qs.stringify(param),{headers:{ 'content-type': 'application/x-www-form-urlencoded' }}).then(function (resp) {
            let urlTodoList = 'http://localhost:8181/todo/getTodoList?identityId=' + localStorage.getItem('ms_username')
            axios.get(urlTodoList).then(function (resp) {
              that.todoList = resp.data.data.todoList
            })
          })
      }
    },created() {
        if(localStorage.getItem("nowRole") == null){
          this.$router.push('/login')
        }
        const that = this
        let urlTodoList = 'http://localhost:8181/todo/getTodoList?identityId=' + localStorage.getItem('ms_username')
        axios.get(urlTodoList).then(function (resp) {
          that.todoList = resp.data.data.todoList
        })

        let urlOverAll = "http://localhost:8181/covidApi/getOverAll"
        axios.get(urlOverAll).then(function (resp) {
          that.confirmedPeople = resp.data.data.currentConfirmedCountPercent;
          that.curedPeople = resp.data.data.curedCountPercent;
          that.deadPeople = resp.data.data.deadCountPercent;
          that.confirmedCount = resp.data.data.confirmedCount;
          that.curedCount = resp.data.data.curedCount;
          that.deadCount = resp.data.data.deadCount;
        })

        let weatherUrl = 'http://localhost:8181/common/getWeatherInfo'
        axios.get(weatherUrl).then(function (resp) {
            that.options2.labels = resp.data.data.dateList
            that.options2.datasets[0].data = resp.data.data.daytempList
            that.options2.datasets[1].data = resp.data.data.nighttempList
        })


  }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
