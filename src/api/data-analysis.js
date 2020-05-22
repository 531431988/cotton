
import { axios } from '@/libs/request'
// 数据概览
const getDataAnalysisOverview = data => {
  return axios({
    url: '/data-analysis/overview',
    method: 'post',
    data
  })
}
// 种植主体数量TOP5
const getDataAnalysisTop = data => {
  return axios({
    url: '/data-analysis/top',
    method: 'post',
    data
  })
}
// 种植面积查看明细
const getDataAnalysisDetail = data => {
  return axios({
    url: '/data-analysis/detail',
    method: 'post',
    data
  })
}
// 产量、销量变化趋势
const getOutturnTrend = data => {
  return axios({
    url: '/data-analysis/outturn-trend',
    method: 'post',
    data
  })
}

export {
  getDataAnalysisOverview,
  getDataAnalysisTop,
  getDataAnalysisDetail,
  getOutturnTrend

}
