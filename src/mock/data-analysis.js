import Mock from 'mockjs'

// 数据概览
Mock.mock(/\/data-analysis\/overview/, {
  code: 200,
  data: {
    cities: { // 地市州
      actual: 321,
      total: 3160
    },
    areas: { // 区县
      actual: 321,
      total: 3160
    },
    streets: { // 乡镇
      actual: 321,
      total: 3160
    },
    villages: { // 村
      actual: 321,
      total: 3160
    },
    mainTotal: 2121,
    areaTotal: 312,
    yieldTotal: 210,
    salesTotal: 219
  }
})

// top5
Mock.mock(/\/data-analysis\/top/, {
  code: 200,
  'data|5': [{
    'label': '@province()',
    'value|9-999': 1
  }]
})

// 数据分析详情
Mock.mock(/\/data-analysis\/detail/, {
  code: 200,
  data: {
    'mainTotal|1-999': 1,
    'areaTotal|1-999': 1,
    'salesTotal|1-999': 1,
    'list|10': [{
      key: '@id()',
      'type|+1': ['农户（含种植大户）', '农户（含种植大户）', '家庭农场', '农民合作社', '农业企业'],
      name: '@cname()',
      place: '@county()',
      'plantingArea|99-999': 1,
      'salesScale|99-999': 1
    }]
  },
  msg: '请求成功'
})

// 产量、销量变化趋势
Mock.mock(/\/data-analysis\/outturn-trend/, {
  code: 200,
  data: {
    year: ['2017', '2018', '2019', '2020', '2021', '2022'],
    list: [[820, 932, 901, 934, 1290, 1330], [680, 492, 311, 794, 290, 1130]]
  },
  msg: '请求成功'
})
