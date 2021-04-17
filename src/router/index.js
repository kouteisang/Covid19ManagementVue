import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path:'addsickpeople',
                    component: () => import(/* webpackChunkName: "editCommunityUserInfo" */ '../components/page/AddSickPeople.vue'),
                    meta:{title: '添加生病人员'}
                },
                {
                    path:'/editCommunityUserInfo',
                    component: () => import(/* webpackChunkName: "editCommunityUserInfo" */ '../components/page/editCommunityUserInfo.vue'),
                    meta:{title: '修改小区用户信息'}
                },
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path:'/applyForSupplyList',
                    component: () => import(/* webpackChunkName: "editCommunityUserInfo" */ '../components/page/ApplyForSupplyList.vue'),
                    meta:{title: '物资缺失列表'}
                },
                {
                    path:'/getCovidNewsInfo',
                    component: () => import(/* webpackChunkName: "editCommunityUserInfo" */ '../components/page/GetCovidNewsInfo.vue'),
                    meta:{title: '新闻详情'}
                },
                {
                    path:'/covidNewsList',
                    component: () => import(/* webpackChunkName: "editCommunityUserInfo" */ '../components/page/CovidNewsList.vue'),
                    meta:{title: '疫情新闻'}
                },
                {
                    path:'/supplyStatics',
                    component: () => import(/* webpackChunkName: "editCommunityUserInfo" */ '../components/page/SupplyStatics.vue'),
                    meta:{title: '物资缺失统计'}
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path:'/addNews',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/AddNews.vue'),
                    meta: { title: '添加公告' }
                },
                {
                    path:'/newsList',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/NewsList.vue'),
                    meta: { title: '公告列表' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '居民信息管理' }
                },
                {
                    path: '/addCommunityUserInfo',
                    component: () => import(/* webpackChunkName: "addCommunityUserInfo" */ '../components/page/AddCommunityUserInfo.vue'),
                    meta: { title: '添加居民信息' }
                },
                {
                  path:'/editSickUserInfo',
                  component: () => import(/* webpackChunkName: "addCommunityUserInfo" */ '../components/page/EditSickUserInfo.vue'),
                  meta: { title: '更新病人病况' }
                },
                {
                    path:"sickpeopleList",
                    component: () => import(/* webpackChunkName: "addCommunityUserInfo" */ '../components/page/SickpeopleList.vue'),
                    meta:{title: '生病人员列表'}
                },
                {
                    path:"/editNewsInfo",
                    component: () => import(/* webpackChunkName: "addCommunityUserInfo" */ '../components/page/EditNewsInfo.vue'),
                    meta:{title: '公告信息详情'}
                },
                {
                    path:"/allCountryCovidData",
                    component: () => import(/* webpackChunkName: "addCommunityUserInfo" */ '../components/page/AllCountryCovidData.vue'),
                    meta:{title: '全球疫情数据'}
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    path:'/askForSupply',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/AskForSupply.vue'),
                    meta: { title: '物资缺失报备' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
