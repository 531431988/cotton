<template>
  <a-empty :image="simpleImage" :description="description" />
</template>

<script>

import { Empty } from 'ant-design-vue'
export default {
  name: 'Empty',
  props: {
    description: String
  },
  beforeCreate () {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
