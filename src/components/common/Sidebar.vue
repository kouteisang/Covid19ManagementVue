<template>
    <div class="sidebar">
        <el-menu
            :style="{display:visible}"
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template

                v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        <el-menu
          :style="{display:visible2}"
          class="sidebar-el-menu"
          :default-active="onRoutes"
          :collapse="collapse"
          background-color="#324157"
          text-color="#bfcbd9"
          active-text-color="#20a0ff"
          unique-opened
          router
      >
        <template

            v-for="item in items2">
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-submenu
                    v-if="subItem.subs"
                    :index="subItem.index"
                    :key="subItem.index"
                >
                  <template slot="title">{{ subItem.title }}</template>
                  <el-menu-item
                      v-for="(threeItem,i) in subItem.subs"
                      :key="i"
                      :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item>
                </el-submenu>
                <el-menu-item
                    v-else
                    :index="subItem.index"
                    :key="subItem.index"
                >{{ subItem.title }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
          role:0,
          visible:'',
          visible2:'none',
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: '16',
                    title: '居民信息管理专区',
                  subs: [
                    {
                      icon: 'el-icon-lx-attention',
                      index: 'table',
                      title: '居民信息管理'
                    },
                    {
                      icon: 'el-icon-lx-attention',
                      index: 'addcommunityuserinfo',
                      title: '添加居民信息'
                    }
                  ]
                },
              {
                icon: 'el-icon-lx-cascades',
                index: '8',
                title: '病情人员管理专区',
                subs: [
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'addsickpeople',
                    title: '添加生病人员'
                  },
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'sickpeoplelist',
                    title: '生病人员管理'
                  }
                ]
              },
              {
                icon: 'el-icon-lx-cascades',
                index: '9',
                title: '公告管理专区',
                subs: [
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'addNews',
                    title: '发布公告'
                  },
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'newsList',
                    title: '公告列表'
                  }
                ]
              },
              {
                icon: 'el-icon-lx-cascades',
                index: '10',
                title: '疫情数据分析专区',
                subs: [
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'allCountryCovidData',
                    title: '全球疫情数据'
                  },
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'chinaCovidData',
                    title: '中国疫情数据'
                  },
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'provinceCovidData',
                    title: '各地区疫情数据'
                  }
                ]
              },
              {
                icon: 'el-icon-lx-cascades',
                index: '11',
                title: '物资管理专区',
                subs: [
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'AskForSupply',
                    title: '物资缺失报备'
                  },
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'ApplyForSupplyList',
                    title: '物资缺失列表'
                  },
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'SupplyStatics',
                    title: '物资缺失统计'
                  },
                ]
              },{
                icon: 'el-icon-lx-cascades',
                index: '12',
                title: '疫情新闻管理专区',
                subs: [
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'CovidNewsList',
                    title: '疫情新闻'
                  },
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'CovidNewsListTencent',
                    title: '各省市新闻'
                  }
                ]
              },
              {
                icon: 'el-icon-lx-cascades',
                index: '15',
                title: '疫情谣言专区',
                subs: [
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'rumorList',
                    title: '疫情谣言'
                  }
                ]
              },
              {
                icon: 'el-icon-lx-cascades',
                index: '13',
                title: '疫苗专区',
                subs: [
                  {
                    icon: 'el-icon-lx-cascades',
                    index: 'VacinneData',
                    title: '全球疫情接种信息'
                  },
                  {
                    icon: 'el-icon-lx-cascades',
                    index: 'AddVaccineInfo',
                    title: '添加疫苗接种点'
                  },
                  {
                    icon: 'el-icon-lx-cascades',
                    index: 'VaccineDataList',
                    title: '疫苗预约/报备'
                  },
                  {
                    icon: 'el-icon-lx-cascades',
                    index: 'VaccineReservationList',
                    title: '疫苗接种记录'
                  },
                  {
                    icon: 'el-icon-lx-cascades',
                    index: 'EditVaccineInfo',
                    title: '修改疫苗接种状态'
                  }
                ]
              },{
                icon: 'el-icon-lx-cascades',
                index: '20',
                title: '行程报备专区',
                subs: [
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'riskArea',
                    title: '风险地区查询'
                  },
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'epidemicReport',
                    title: '风险地区/海外行程报备'
                  }
                ]
              }
            ],
          items2: [
            {
              icon: 'el-icon-lx-home',
              index: 'dashboard',
              title: '系统首页'
            },
            {
              icon: 'el-icon-lx-cascades',
              index: '16',
              title: '居民信息报备专区',
              subs: [
                {
                  icon: 'el-icon-lx-attention',
                  index: 'addcommunityuserinfo',
                  title: '居民信息报备'
                }
              ]
            },
            {
              icon: 'el-icon-lx-cascades',
              index: '8',
              title: '病情人员报备专区',
              subs: [
                {
                  icon: 'el-icon-lx-attention',
                  index: 'addsickpeople',
                  title: '生病人员报备'
                },
              ]
            },
            {
              icon: 'el-icon-lx-cascades',
              index: '9',
              title: '公告查阅专区',
              subs: [
                {
                  icon: 'el-icon-lx-attention',
                  index: 'newsList',
                  title: '公告列表'
                }
              ]
            },
            {
              icon: 'el-icon-lx-cascades',
              index: '10',
              title: '疫情数据分析专区',
              subs: [
                {
                  icon: 'el-icon-lx-attention',
                  index: 'allCountryCovidData',
                  title: '全球疫情数据'
                },
                {
                  icon: 'el-icon-lx-attention',
                  index: 'chinaCovidData',
                  title: '中国疫情数据'
                },
                {
                  icon: 'el-icon-lx-attention',
                  index: 'provinceCovidData',
                  title: '各地区疫情数据'
                }
              ]
            },
            {
              icon: 'el-icon-lx-cascades',
              index: '11',
              title: '物资缺失报备专区',
              subs: [
                {
                  icon: 'el-icon-lx-attention',
                  index: 'AskForSupply',
                  title: '物资缺失报备'
                },
                {
                  icon: 'el-icon-lx-attention',
                  index: 'SupplyStatics',
                  title: '物资缺失统计'
                },
              ]
            },{
              icon: 'el-icon-lx-cascades',
              index: '12',
              title: '疫情新闻管理专区',
              subs: [
                {
                  icon: 'el-icon-lx-attention',
                  index: 'CovidNewsList',
                  title: '疫情新闻'
                },
                {
                  icon: 'el-icon-lx-attention',
                  index: 'CovidNewsListTencent',
                  title: '各省市新闻'
                }
              ]
            },
            {
              icon: 'el-icon-lx-cascades',
              index: '15',
              title: '疫情谣言专区',
              subs: [
                {
                  icon: 'el-icon-lx-attention',
                  index: 'rumorList',
                  title: '疫情谣言'
                }
              ]
            },
            {
              icon: 'el-icon-lx-cascades',
              index: '13',
              title: '疫苗专区',
              subs: [
                {
                  icon: 'el-icon-lx-cascades',
                  index: 'VacinneData',
                  title: '全球疫情接种信息'
                },
                {
                  icon: 'el-icon-lx-cascades',
                  index: 'VaccineDataList',
                  title: '疫苗预约/报备'
                },
                {
                  icon: 'el-icon-lx-cascades',
                  index: 'EditVaccineInfo',
                  title: '修改疫苗接种状态'
                }
              ]
            },
            {
              icon: 'el-icon-lx-cascades',
              index: '20',
              title: '行程报备专区',
              subs: [
                {
                  icon: 'el-icon-lx-attention',
                  index: 'riskArea',
                  title: '风险地区查询'
                },
                {
                  icon: 'el-icon-lx-attention',
                  index: 'epidemicReport',
                  title: '风险地区/海外行程报备'
                }
              ]
            }
          ],
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
      // 0表示用户
      // 1表示管理员
      let role = localStorage.getItem("nowRole");
      if(role === "0") {
        this.visible = 'none';
        this.visible2='';
      }
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
  mounted() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("userMsg")) {
      this.role=sessionStorage.getItem("userMsg");
    }
    if(this.GLOBAL.state.nowrole!=-1) this.role=this.GLOBAL.state.nowrole;
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("userMsg", this.role);
    })
  }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
