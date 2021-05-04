import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout' //布局页



Vue.use(VueRouter)

// 通用页面, 这里的配置不需要权限
export const constRouter = [
  {
      path: '/login',
      component: () => import('@/components/page/Login'),
      hidden: true //导航菜单忽略选项
  },
  {
    path: '/',
    //component: Layout, //应用布
    // 局页
    redirect: '/index',
    hidden: true,
  },
  {
    path: '',
    //component: Layout, //应用布局页
    name: 'index',
    meta:{
      title: "首页", //导航菜单项标题
      icon: 'el-icon-s-home',//导航菜单图标
    },
    children: [
      {
        path: '/index',
        component: () => import('@/components/page/index.vue'),
        name: 'indexs',
        meta: {
          title: "工作台",
          icon: 'el-icon-s-home',
        }
      }
    ]
  },
]

// 动态路由 communication
export const asyncRoutes = [
  {
    path: '/analyze',
    component: Layout,
    redirect: '/goods/index',
    meta: {
      title: "数据分析",
      icon: 'el-icon-data-line',
      hidden: false,
      roles: ['admi','super']
    },
    children: [
      {
        path: 'main',
        component: () => import('@/views/analyze/Index.vue'),
        name: 'analyzemain',
        meta: {
          title: "主控数据",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['admi','super']
        }
      },
      {
        path: 'others',
        component: () => import('@/views/analyze/Monitor.vue'),
        name: 'analyzeothers',
        meta: {
          title: "其他数据",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['admi','super']
        }
      },
    ]
  },
  {
    path: '/electric',
    component: Layout,
    redirect: '/electric/index',
    meta:{
      title: "电动车管理",
      icon: 'el-icon-bicycle',
      hidden: false,
      roles: ['user','admi','super'],
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/electric/Index.vue'),
        name: 'goodsindex',
        meta: {
          title: "在售电动车",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['user','admi','super'],
        }
      },
      {
        path: 'elecadd',
        component: () => import('@/views/electric/ElecAdd.vue'),
        name: 'fromgood',
        meta: {
          title: "添加电动车",
          icon: 'el-icon-tickets',
          hidden: true,
          roles: ['user','admi','super'],

        }
      },
      {
        path: 'elecedit',
        component: () => import('@/views/electric/ElecEdit.vue'),
        name: 'elecedit',
        meta: {
          title: "编辑电动车",
          icon: 'el-icon-tickets',
          hidden: true,
          roles:  ['user','admi','super'],

        }
      },
      {
        path: 'onindex',
        component: () => import('@/views/electric/OnIndex.vue'),
        name: 'onindex',
        meta: {
          title: "待上架电动车",
          icon: 'el-icon-tickets',
          hidden: false,
          roles:  ['user','admi','super'],
        }
      },
      {
        path: 'offindex',
        component: () => import('@/views/electric/OffIndex.vue'),
        name: 'offindex',
        meta: {
          title: "已下架电动车",
          icon: 'el-icon-tickets',
          hidden: false,
          roles:  ['user','admi','super'],
        }
      },
      {
        path: 'partsindex',
        component: () => import('@/views/electric/PartsIndex.vue'),
        name: 'partsindex',
        meta: {
          title: "零件管理",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['user','admi','super'],
        }
      },
      {
        path: 'partsadd',
        component: () => import('@/views/electric/PartsAdd.vue'),
        name: 'partsadd',
        meta: {
          title: "添加零件",
          icon: 'el-icon-tickets',
          hidden: true,
          roles: ['user','admi','super'],

        }
      },
      {
        path: 'partsedit',
        component: () => import('@/views/electric/PartsEdit.vue'),
        name: 'partsedit',
        meta: {
          title: "编辑零件",
          icon: 'el-icon-tickets',
          hidden: true,
          roles:  ['user','admi','super'],

        }
      },
    ]
  },
  {
    path: '/sale',
    component: Layout,
    redirect: '/sale/index',
    meta:{
      title: "订单管理",
      icon: 'el-icon-s-order',
      hidden: false,
      roles: ['user','admi','super'],
    },
    children: [
      {
        path: 'add',
        component: () => import('@/views/sale/Add.vue'),
        name: 'add',
        meta: {
          title: "添加订单",
          icon: 'el-icon-tickets',
          hidden: false,
          roles:  ['user','admi','super'],
        }
      },
      {
        path: 'index',
        component: () => import('@/views/sale/Index.vue'),
        name: 'saleindex',
        meta: {
          title: "过往订单信息",
          icon: 'el-icon-tickets',
          hidden: false,
          roles:  ['user','admi','super'],
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/sale/Edit.vue'),
        name: 'edit',
        meta: {
          title: "修改订单信息",
          icon: 'el-icon-tickets',
          hidden: true,
          roles: ['user','admi','super'],
        }
      },
      {
        path: 'repadd',
        component: () => import('@/views/sale/RepAdd.vue'),
        name: 'repadd',
        meta: {
          title: "添加保修处理信息",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['user','admi','super'],
        }
      },
      {
        path: 'repindex',
        component: () => import('@/views/sale/RepIndex.vue'),
        name: 'repindex',
        meta: {
          title: "保修处理信息",
          icon: 'el-icon-tickets',
          hidden: false,
          roles:  ['user','admi','super'],
        }
      },
      {
        path: 'repedit',
        component: () => import('@/views/sale/RepEdit.vue'),
        name: 'repedit',
        meta: {
          title: "修改保修处理信息",
          icon: 'el-icon-tickets',
          hidden: true,
          roles: ['user','admi','super'],
        }
      },
      {
        path: 'bacadd',
        component: () => import('@/views/sale/BacAdd.vue'),
        name: 'bacadd',
        meta: {
          title: "添加退货信息",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['user','admi','super'],
        }
      },
      {
        path: 'bacindex',
        component: () => import('@/views/sale/BacIndex.vue'),
        name: 'bacindex',
        meta: {
          title: "退货信息",
          icon: 'el-icon-tickets',
          hidden: false,
          roles:  ['user','admi','super'],
        }
      },
      {
        path: 'bacedit',
        component: () => import('@/views/sale/BacEdit.vue'),
        name: 'bacedit',
        meta: {
          title: "修改退货信息",
          icon: 'el-icon-tickets',
          hidden: true,
          roles: ['user','admi','super'],
        }
      },
    ]
  },
  {
    path: '/member',
    component: Layout,
    redirect: '/member/index',
    meta:{
      title: "顾客信息管理",
      icon: 'el-icon-s-custom',
      hidden: false,
      roles: ['admi','super'],
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/member/Index.vue'),
        name: 'memberindex',
        meta: {
          title: "顾客信息",
          icon: 'el-icon-tickets',
          hidden: false,
          roles:  ['admi','super'],
        }
      },
      {
        path: 'add',
        component: () => import('@/views/member/Add.vue'),
        name: 'memberadd',
        meta: {
          title: "添加顾客",
          icon: 'el-icon-tickets',
          hidden: true,
          roles:  ['admi','super'],

        }
      },
      {
        path: 'edit',
        component: () => import('@/views/member/Edit.vue'),
        name: 'memberedit',
        meta: {
          title: "编辑顾客信息",
          icon: 'el-icon-tickets',
          hidden: true,
          roles: ['admi','super'],
        }
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    meta:{
      title: "员工信息管理",
      icon: 'el-icon-user',
      hidden: false,
      roles:  ['admi','super'],
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/Index.vue'),
        name: 'userindex',
        meta: {
          title: "普通员工信息",
          icon: 'el-icon-tickets',
          hidden: false,
          roles:  ['admi','super'],
        }
      },
      {
        path: 'useradd',
        component: () => import('@/views/user/UserAdd.vue'),
        name: 'useradd',
        meta: {
          title: "添加员工",
          icon: 'el-icon-tickets',
          hidden: true,
          roles:  ['admi','super'],

        }
      },
      {
        path: 'useredit',
        component: () => import('@/views/user/UserEdit.vue'),
        name: 'useredit',
        meta: {
          title: "编辑用户信息",
          icon: 'el-icon-tickets',
          hidden: true,
          roles: ['admi','super'],

        }
      },
      {
        path: 'adminindex',
        component: () => import('@/views/user/AdminIndex.vue'),
        name: 'adminindex',
        meta: {
          title: "管理员信息",
          icon: 'el-icon-tickets',
          hidden: false,
          roles:  ['super'],
        }
      },
      {
        path: 'depindex',
        component: () => import('@/views/user/depIndex.vue'),
        name: 'depindex',
        meta: {
          title: "小组信息",
          icon: 'el-icon-tickets',
          hidden: false,
          roles:  ['admi','super'],
        }
      },
    ]
  },

  {
    path: '/stock',
    component: Layout,
    redirect: '/stock/index',
    meta:{
      title: "入库管理",
      icon: 'el-icon-shopping-cart-full',
      hidden: false,
      roles: ['admi','super'],
    },
    children: [
      {
        path: 'add',
        component: () => import('@/views/stock/Add.vue'),
        name: 'stockadd',
        meta: {
          title: "新增入库",
          icon: 'el-icon-tickets',
          hidden: false,
          roles:  ['admi','super'],
        }
      },
      {
        path: 'index',
        component: () => import('@/views/stock/Index.vue'),
        name: 'stockindex',
        meta: {
          title: "过往入库信息",
          icon: 'el-icon-tickets',
          hidden: false,
          roles:  ['admi','super'],
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/stock/Edit.vue'),
        name: 'stockedit',
        meta: {
          title: "修改入库信息",
          icon: 'el-icon-tickets',
          hidden: true,
          roles: ['admi','super'],
        }
      },
    ]
  },
  {
    path: '/leave',
    component: Layout,
    redirect: '/leave/useindex',
    meta:{
      title: "请假管理",
      icon: 'el-icon-message-solid',
      hidden: false,
      roles: ['user','admi','super'],
    },
    children: [
      {
        path: 'leaveadd',
        component: () => import('@/views/leave/Add.vue'),
        name: 'leaveadd',
        meta: {
          title: "申请请假",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['user','admi'],
        }
      },
      {
        path: 'useindex',
        component: () => import('@/views/leave/UseIndex.vue'),
        name: 'useindex',
        meta: {
          title: "员工请假管理",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['admi','super'],
        }
      },
      {
        path: 'admindex',
        component: () => import('@/views/leave/AdmIndex.vue'),
        name: 'admindex',
        meta: {
          title: "管理员请假管理",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['super'],
        }
      },
      {
        path: 'selindex',
        component: () => import('@/views/leave/SelIndex.vue'),
        name: 'selindex',
        meta: {
          title: "个人请假信息",
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['user','admi'],
        }
      },
    ]
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    meta:{
      title: "个人中心",
      icon: 'el-icon-user-solid',
      hidden: false,
      roles: ['user','admi','super'],
    },
    children: [
      {
        path: 'useredit',
        component: () => import('@/views/home/UserEdit.vue'),
        name: 'usedit',
        meta: {
          title: "编辑个人信息",
          icon: 'el-icon-tickets',
          hidden: true,
          roles: ['user','admi','super'],

        }
      },
      {
        path: 'userinfo',
        component: () => import('@/views/home/UserInfo.vue'),
        name: 'userinfo',
        meta: {
          title: "个人信息",
          icon: 'el-icon-tickets',
          hidden: false,
          roles:  ['user','user','admi','super'],
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constRouter
})

export default router

