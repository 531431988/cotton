
import { axios } from '@/libs/request'
// 任务列表
const getTaskList = data => {
  return axios({
    url: '/task/taskList',
    method: 'post',
    data
  })
}
// 获取任务模板
const getTaskTemplate = () => {
  return axios({
    url: '/task/getExcelTemplate',
    method: 'post'
  })
}

// 信息上报-新建任务
const createTask = data => {
  return axios({
    url: '/task/createTask',
    method: 'post',
    data
  })
}

// 信息上报-撤回/签收（只针对省级账号）
const updateTask = data => {
  return axios({
    url: '/task/updateTask',
    method: 'post',
    data
  })
}

// 任务详情--面包屑导航
const getCrumbs = data => {
  return axios({
    url: '/taskDetail/getCrumbs',
    method: 'post',
    data
  })
}

// 任务详情--种植主体个数,面积统计信息
const plantingStatistics = data => {
  return axios({
    url: '/taskDetail/plantingStatistics',
    method: 'post',
    data
  })
}

// 任务详情--上报完成情况统计信息
const reportStatistics = data => {
  return axios({
    url: '/taskDetail/reportStatistics',
    method: 'post',
    data
  })
}

// 任务详情--上报条目分页列表
const entryPageList = data => {
  return axios({
    url: '/reportEntry/entryPageList',
    method: 'post',
    data
  })
}
// 任务详情--零申报
const noReport = data => {
  return axios({
    url: '/taskDetail/noReport',
    method: 'post',
    data
  })
}
// 任务详情--获取当前上报条目信息下所有明细信息列表
const reportInfoPageList = data => {
  return axios({
    url: '/reportInfo/reportInfoPageList',
    method: 'post',
    data
  })
}
// 任务详情--获取所选上报信息详情
const getOne = data => {
  return axios({
    url: '/reportInfo/getOne',
    method: 'post',
    data
  })
}

// 审核通过/驳回/删除上报条目信息
const optStatus = data => {
  return axios({
    url: '/reportEntry/optStatus',
    method: 'post',
    data
  })
}

// 任务详情--提交信息
const saveParent = data => {
  return axios({
    url: '/reportEntry/saveParent',
    method: 'post',
    data
  })
}

// 获取excel模板
const downloadExcelTemplate = data => {
  return axios({
    url: '/reportEntry/downloadExcelTemplate',
    method: 'post',
    responseType: 'blob',
    data
  })
}
// 导入excel数据
const importTaskExcel = data => {
  const formData = new FormData()
  formData.append('file', ...data.formData)
  return axios({
    url: `/reportEntry/import?taskNO=${data.taskNO}&type=${data.type}`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export {
  getTaskList,
  getTaskTemplate,
  createTask,
  updateTask,
  getCrumbs,
  plantingStatistics,
  entryPageList,
  noReport,
  reportInfoPageList,
  getOne,
  optStatus,
  saveParent,
  downloadExcelTemplate,
  importTaskExcel,
  reportStatistics
}
