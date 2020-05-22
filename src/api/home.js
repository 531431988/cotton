
import { axios } from '@/libs/request'

const getAnnualStatistics = data => {
  return axios({
    url: '/annual/statistics',
    method: 'post',
    data
  })
}

const getAreaBarData = data => {
  return axios({
    url: '/pie/data',
    method: 'post',
    data
  })
}

const getPending = data => {
  return axios({
    url: '/pending',
    method: 'post',
    data
  })
}

const getMainType = data => {
  return axios({
    url: '/main/type',
    method: 'post',
    data
  })
}

export {
  getAnnualStatistics,
  getAreaBarData,
  getPending,
  getMainType
}
