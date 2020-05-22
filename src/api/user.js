
import { axios } from '@/libs/request'

const login = data => {
  return axios({
    url: '/auth/login',
    method: 'post',
    data
  })
}

const getInfo = data => {
  return axios({
    url: '/user/info',
    method: 'post',
    data
  })
}

const logout = () => {
  return axios({
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export {
  login,
  getInfo,
  logout

}
