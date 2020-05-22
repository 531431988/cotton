
/**
 * 项目默认配置项
 * title       项目标题
 * primaryColor - 默认主题色
 * cookieExpires - cookie保存的天数
 * api - 接口地址
 * publicPath - 发布目录
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */
export default {
  title: '某花信息调度平台',
  primaryColor: '#52C41A',
  cookieExpires: 1,
  api: process.env.VUE_APP_BASE_API,
  upload: process.env.VUE_APP_UPLOAD,
  storageOptions: {
    namespace: 'ovit__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  },
  tableLocale: {
    filterConfirm: '确定',
    filterReset: '重置',
    emptyText: '暂无数据'
  },
  echartColor: [
    '#45CB80',
    '#CFF3E5',
    '#647697',
    '#D2D8E0',
    '#F7C11F',
    '#FDEDBE',
    '#E96A5A',
    '#F9D4CE',
    '#75CBEE',
    '#D5EFF9',
    '#9966BD',
    '#DFD1EB',
    '#FF9D4E',
    '#FFE1C9',
    '#299999',
    '#BFDFDF',
    '#FF9FC7',
    '#FFE1ED'
  ]
}
