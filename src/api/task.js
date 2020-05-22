
import { axios } from '@/libs/request'

const getTaskProvince = data => {
  return axios({
    url: '/task/provinces',
    method: 'post',
    data
  })
}

const getTaskCity = data => {
  return axios({
    url: '/task/cities',
    method: 'post',
    data
  })
}

const getTaskCounty = data => {
  return axios({
    url: '/task/areas',
    method: 'post',
    data
  })
}

const getTaskStreets = data => {
  return axios({
    url: '/task/streets',
    method: 'post',
    data
  })
}

const getVillage = data => {
  return axios({
    url: '/task/villages',
    method: 'post',
    data
  })
}

const getVillageInfo = data => {
  return axios({
    url: '/task/villages/info',
    method: 'post',
    data
  })
}

export {
  getTaskProvince,
  getTaskCity,
  getTaskCounty,
  getTaskStreets,
  getVillage,
  getVillageInfo
}
