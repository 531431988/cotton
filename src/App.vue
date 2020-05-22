<template>
  <AConfigProvider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </AConfigProvider>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
export default {
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  height: 100vh;
}
</style>
