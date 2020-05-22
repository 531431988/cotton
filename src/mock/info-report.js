import Mock from 'mockjs'
Mock.mock(/\/task\/provinces/, 'post', {
  code: 200,
  message: '获取数据成功',
  'data': [{
    'key': '@id()',
    'name': '2019年棉花种植信息上报',
    date: '2019-6-1',
    'status': 1
  }]
})
Mock.mock(/\/task\/cities/, 'post', {
  code: 200,
  message: '获取数据成功',
  'data': [{
    'key': '@id()',
    name: '天门市上报信息',
    'mainTotal|1-99': 1,
    'areaTotal|1-99': 1,
    'status': 1
  }]
})

Mock.mock(/\/task\/areas/, 'post', {
  code: 200,
  message: '获取数据成功',
  'data|10': [{
    'key': '@id()',
    'name|+1': ['黄潭镇-上报信息', 'XXX-上报信息', 'XXX-上报信息', 'XXX-上报信息', 'XXX-上报信息', 'XXX-上报信息', 'XXX-上报信息', 'XXX-上报信息', 'XXX-上报信息', 'XXX-上报信息'],
    'mainTotal|1-99': 1,
    'areaTotal|1-99': 1,
    'salesTotal|1-999': 1,
    'status|1': [0, 1, 2]
  }]
})

Mock.mock(/\/task\/streets$/, 'post', {
  code: 200,
  message: '获取数据成功',
  'data|10': [{
    'key': '@id()',
    name: 'XXX村',
    'mainTotal|1-99': 1,
    'areaTotal|1-99': 1,
    'salesTotal|1-999': 1,
    'status': 0
  }]
})

Mock.mock(/\/task\/villages$/, 'post', {
  code: 200,
  message: '获取数据成功',
  'data|10': [{
    'key': '@id()',
    'type': 'XXX人',
    name: '@cname',
    'plantingArea|1-99': 1,
    'averageYield|1-99': 1,
    'salesScale|1-99': 1,
    'averagePrice|1-99': 1
  }]
})

Mock.mock(/\/task\/villages\/info/, 'post', {
  code: 200,
  message: '获取数据成功',
  data: {
    main: {
      type: '',
      name: '',
      certificateType: '身份证',
      cardId: '@id()',
      district: '@province()',
      address: '',
      'phone': /[1][3-9]{10}/,
      nature: '',
      origin: ''
    },
    plant: {
      place: '@county()',
      'plantingArea|99-999': 1,
      variety: '',
      'averageYield|99-999': 1
    },
    sell: {
      'salesScale|99-999': 1,
      'averagePrice|99-999': 1
    }
  }
})
