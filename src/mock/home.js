import Mock from 'mockjs'
import { getBody } from './util'
Mock.mock('/annual/statistics', {
  code: 200,
  data: [{
    year: '2020',
    'number|999-9999.1-2': 9
  }, {
    year: '2020',
    'number|999-9999.1-2': 9
  }, {
    year: '2020',
    'number|999-9999.1-2': 9
  }],
  msg: '请求成功'
})

const PieData = options => {
  const { role } = getBody(options)
  const data = []
  let arr = []
  if (role === 'provinces') {
    arr = ['武汉市', '宜昌市', '黄石市', '十堰市', '襄阳市', '鄂州市', '荆州市', '荆门市', '黄冈市', '咸宁市', '孝感市', '随州市', '恩施州', '潜江市', '仙桃市', '天门市']
  } else if (role === 'cities' || role === 'areas') {
    arr = ['郑场镇', '毛嘴镇', '剅河镇', '三伏潭镇', '胡场镇', '长埫口镇', '西流河镇', '彭场镇', '沙湖镇', '杨林尾镇', '张沟镇', '郭河镇']
  } else if (role === 'streets') {
    arr = ['翻身村', '车墩村', '横岭村', '龙台村', '友好村', '官堤村', '中革岭村', '殷家脑村', '荷花村', '济台村', '石土地村', '周黄脑村', '老桩垸村', '塘嘴村']
  }
  arr.forEach(item => {
    data.push({
      name: item,
      value: Mock.mock('@integer(99, 999)')
    })
  })
  return {
    code: 200,
    data,
    msg: '请求成功'
  }
}

Mock.mock('/main/type', {
  code: 200,
  data: [{
    name: '农户',
    'value|1-999': 1
  }, {
    name: '家庭农场',
    'value|1-999': 1
  }, {
    name: '农民合作社',
    'value|1-999': 1
  }, {
    name: '农业企业',
    'value|1-999': 1
  }]
})

Mock.mock('/pie/data', PieData)

Mock.mock('/pending', {
  code: 200,
  'data|5': [
    { title: 'XXX任务您的上报信息被驳回', date: '@date()' }
  ],
  msg: '请求成功'
})
