function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  !Vue.prototype.$auth && Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        const _this = this
        const role = _this.$store.getters.role
        return (permissions) => permissions === role
      }
    }
  })
}

export default plugin
