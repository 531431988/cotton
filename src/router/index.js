import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/config/router.config'

// hack router push/replace callback
['push', 'replace'].map(key => {
  return {
    k: key,
    prop: VueRouter.prototype[key]
  }
}).forEach(item => {
  VueRouter.prototype[item.k] = function newCall (location, onResolve, onReject) {
    if (onResolve || onReject) return item.prop.call(this, location, onResolve, onReject)
    return item.prop.call(this, location).catch(err => err)
  }
})

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_PUBLIC_PATH,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
