/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return routePermissionJudge(routes)
}

// 上报状态
export const reportStatusMap = {
  0: {
    status: 'warning',
    text: '种植信息上报中'
  },
  1: {
    status: 'processing',
    text: '种植信息上报完成'
  },
  2: {
    status: 'warning',
    text: '交易信息上报中'
  },
  3: {
    status: 'success',
    text: '上报已完成'
  }
}

// 审核状态
export const auditStateMap = {
  0: {
    status: '#ed4014',
    text: '驳回'
  },
  1: {
    status: '#FA6400',
    text: '待审核'
  },
  2: {
    status: '#36A065',
    text: '已审核'
  }
}

// 通用表头
export const renderTableCol = (status) => {
  status = Number(status)
  const col = [{
    title: '上报地区',
    scopedSlots: { customRender: 'reportArea' }
  }, {
    title: '种植主体总计（个）',
    dataIndex: 'mainTotal',
    align: 'center'
  }, {
    title: '种植面积总计（亩）',
    dataIndex: 'areaTotal',
    align: 'center'
  }]
  const salesTotal = [{
    title: '销售规模总计（公斤）',
    dataIndex: 'salesTotal',
    align: 'center'
  }]
  const action = [{
    title: '审核状态',
    scopedSlots: { customRender: 'status' },
    align: 'center'
  }, {
    title: '操作',
    scopedSlots: { customRender: 'action' },
    align: 'center'
  }]
  if (status === 0) {
    return [...col, ...action]
  } else if (status === 1) {
    return col
  } else if (status === 2) {
    return [...col, ...salesTotal, ...action]
  } else {
    return [...col, ...salesTotal]
  }
}
