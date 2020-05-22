<template>
  <div class="overview-card">
    <a-row type="flex" align="middle" justify="center" class="pd10">
      <a-col>
        <div class="icon">
          <slot name="icon"></slot>
        </div>
      </a-col>
      <a-col class="vui-flex-item pl15">
        <div class="number">
          <slot></slot>
        </div>
        <div class="label">{{label}}</div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    label: String
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
.overview-card {
  margin: 24px 0;
  position: relative;
  border-image-source: url(../../../assets/overview-card-border.png);
  border-image-slice: 1 fill;
  border-width: 1px;
  border-style: solid;
  .icon {
    overflow: hidden;
    height: 48px;
  }
  .number {
    line-height: 1;
    font-size: 22px;
    font-weight: 600;
    color: #51ffd2;
    margin-bottom: 5px;
  }
  .label {
    color: #fff;
  }
}
</style>
