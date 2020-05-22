import { BasicLayout, RouteView } from '@/layouts'

const routes = [{
  path: '/login',
  hidden: true,
  component: () => import('@/views/login.vue')
}, {
  path: '/',
  name: 'home',
  component: BasicLayout,
  redirect: '/index',
  children: [{
    path: 'index',
    name: 'index',
    component: () => import('@/views/index/index')
  }, {
    path: 'info-report',
    name: 'info-report',
    component: () => import(/* webpackChunkName: "report" */ '@/views/info-report/provinces'),
    meta: {
    }
  }, {
    path: 'info-report/cities',
    name: 'info-report-cities',
    component: () => import(/* webpackChunkName: "report" */ '@/views/info-report/cities')
  }, {
    path: 'info-report/areas',
    name: 'info-report-areas',
    component: () => import(/* webpackChunkName: "report" */ '@/views/info-report/areas')
  }, {
    path: 'info-report/streets',
    name: 'info-report-streets',
    component: () => import(/* webpackChunkName: "report" */ '@/views/info-report/streets')
  }, {
    path: 'info-report/villages',
    name: 'info-report-villages',
    component: () => import(/* webpackChunkName: "report" */ '@/views/info-report/villages')
  }, {
    // 数据分析
    path: 'data-analysis1',
    name: 'data-analysis1',
    component: () => import(/* webpackChunkName: "dataAnalysis" */ '@/views/data-analysis/index1')
  }, {
    path: 'data-analysis/detail',
    name: 'data-analysis-detail',
    component: () => import(/* webpackChunkName: "dataAnalysis" */ '@/views/data-analysis/detail')
  }, {
    // 用户信息
    path: 'user/modify-password',
    name: 'user-modify-password',
    component: () => import(/* webpackChunkName: "dataAnalysis" */ '@/views/user/modifyPassword')
  }]
}, {
  // 数据分析
  path: '/data-analysis',
  component: RouteView,
  redirect: '/data-analysis',
  children: [{
    path: '/',
    component: () => import(/* webpackChunkName: "dataAnalysis" */ '@/views/data-analysis/index')
  }]
}, {

  path: '/404',
  component: () => import(/* webpackChunkName: "fail" */ '@/views/error/404')
}, {
  path: '*', redirect: '/404', hidden: true
}]

export default routes
