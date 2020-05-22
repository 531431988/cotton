<template>
  <div class="data-analysis-card">
    <div class="title">{{title}}</div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.data-analysis-card {
  position: relative;
  padding: 16px;
  height: calc((100vh - 64px - 60px) / 3);
  border-image-source: url(../../../assets/data-analysis-card-bg.png);
  border-image-slice: 1 fill;
  border-width: 1px;
  border-style: solid;
  overflow: hidden;
  .title {
    color: #69fffa;
    font-weight: 500;
    font-size: 18px;
    position: relative;
    z-index: 1;
  }
}
</style>
