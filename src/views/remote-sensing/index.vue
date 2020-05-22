<template>
  <div class="remote-sensing" @click="onClick" :style="style"></div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      style: 'background: url(./remote-sensing.gif) center;'
    }
  },
  methods: {
    onClick () {
      this.style = 'background: url(./remote-sensing-active.gif) center;'
    }
  }
}
</script>

<style lang="less" scoped>
.remote-sensing {
  height: 100vh;
  background-size: 100% 100% !important;
}
</style>
