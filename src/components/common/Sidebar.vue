<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
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
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'table',
                    title: '居民信息管理'
                },
              {
                icon: 'el-icon-lx-cascades',
                index: 'addcommunityuserinfo',
                title: '添加居民信息'
              },
              {
                    icon: 'el-icon-lx-copy',
                    index: 'tabs',
                    title: 'tab选项卡'
                },
              {
                icon: 'el-icon-lx-cascades',
                index: '8',
                title: '病情人员管理',
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
                title: '公告管理',
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
                title: '疫情数据分析',
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
                title: '物资管理',
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
                title: '疫情新闻管理',
                subs: [
                  {
                    icon: 'el-icon-lx-attention',
                    index: 'CovidNewsList',
                    title: '疫情新闻'
                  }
                ]
              },
              {
                icon: 'el-icon-lx-cascades',
                index: 'rumorList',
                title: '疫情谣言专区'
              },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '表单相关',
                    subs: [
                        {
                            index: 'form',
                            title: '基本表单'
                        },
                        {
                            index: '3-2',
                            title: '三级菜单',
                            subs: [
                                {
                                    index: 'editor',
                                    title: '富文本编辑器'
                                },
                                {
                                    index: 'markdown',
                                    title: 'markdown编辑器'
                                }
                            ]
                        },
                        {
                            index: 'upload',
                            title: '文件上传'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'icon',
                    title: '自定义图标'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'charts',
                    title: 'schart图表'
                },
                // {
                //     icon: 'el-icon-rank',
                //     index: '6',
                //     title: '拖拽组件',
                //     subs: [
                //         {
                //             index: 'drag',
                //             title: '拖拽列表'
                //         },
                //         {
                //             index: 'dialog',
                //             title: '拖拽弹框'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-global',
                //     index: 'i18n',
                //     title: '国际化功能'
                // },
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '错误处理',
                    subs: [
                        {
                            index: 'permission',
                            title: '权限测试'
                        },
                        {
                            index: '404',
                            title: '404页面'
                        }
                    ]
                },
                // {
                //     icon: 'el-icon-lx-redpacket_fill',
                //     index: '/donate',
                //     title: '支持作者'
                // }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
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
