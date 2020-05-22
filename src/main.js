import Vue from 'vue'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import VueStorage from 'vue-ls'
import { VueAxios } from '@/libs/request'
import config from '@/config/index'
import PermissionHelper from '@/libs/permission'
import '@/directive'
import '@/permission'
import '@/plugins/ant-design-vue'
import '@/less/WMlib.less'
import '@/mock'
import { Breadcrumb, Title, Animated } from '@/components'

import EChart from 'vue-echarts'
import theme from '@/plugins/echarts/theme.json'
Vue.component('EChart', EChart)
EChart.registerTheme('theme', theme)

Vue.config.productionTip = false
Vue.use(VueStorage, config.storageOptions)
Vue.use(VueAxios)
Vue.use(PermissionHelper)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(Title.name, Title)
Vue.component(Animated.name, Animated)
Vue.prototype.$config = config
window.document.title = config.title

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
