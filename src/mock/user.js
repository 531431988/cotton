import Mock from 'mockjs'
import { getBody } from './util'
const Login = options => {
  const { username } = getBody(options)
  return {
    code: 200,
    data: {
      id: Mock.mock('@guid'),
      token: username
    },
    msg: '请求成功'
  }
}

const userInfo = options => {
  const { token } = getBody(options)
  let name = ''
  let role = ''
  if (token === '420000') {
    role = 'provinces'
    name = '湖北省农业农村厅'
  } else if (token === '429006') {
    role = 'cities'
    // role = 'areas' 直辖县级市
    name = '天门市农业农村局'
  } else if (token === '429006106001') {
    role = 'streets'
    name = '黄潭镇管委会'
  }
  return {
    code: 200,
    data: {
      'id': Mock.mock('@guid'),
      name,
      administrative: Mock.mock('@province()'),
      token,
      role
    },
    msg: '请求成功'
  }
}

Mock.mock('/user/info', userInfo)
Mock.mock('/auth/login', Login)
Mock.mock('/auth/logout', {
  msg: '注销成功',
  data: 1,
  code: 200
})
