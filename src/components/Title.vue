<template>
  <a-row type="flex" align="middle">
    <a-col class="vui-flex-item">
      <span class="title mr10">{{title}}</span>
      <slot></slot>
    </a-col>
    <a-col>
      <slot name="extra"></slot>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: String
  }
}
</script>

<style lang="less" scoped>
.title {
  padding-left: 8px;
  border-left: 5px solid @success-color;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
}
</style>
