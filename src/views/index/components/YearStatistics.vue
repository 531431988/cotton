<template>
  <MoveLine class="year-statistics">
    <div class="vui-flex vui-flex-middle">
      <div class="vui-flex-item pr5">
        <p class="mb5 b" v-font="18">{{year}} 年</p>
        <p class="mb5">{{title}}</p>
        <p class="number">
          <countTo :startVal="0" :endVal="value" />
        </p>
      </div>
      <div class="icon">
        <slot></slot>
      </div>
    </div>
  </MoveLine>
</template>

<script>
import countTo from 'vue-count-to'
import { MoveLine } from '@/components'
export default {
  props: {
    year: String,
    title: String,
    value: Number
  },
  components: {
    countTo,
    MoveLine
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
.year-statistics {
  color: #fff;
  .number {
    font-size: 24px;
    margin-bottom: 0;
    font-weight: 500;
  }

  .icon {
    position: relative;
    padding-top: 4px;

    &::after,
    &::before {
      width: 48px;
      height: 48px;
      content: "";
      border-radius: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 0;
    }
    &::after {
      background: rgba(255, 255, 255, 0.2);
      animation: slace 1.8s infinite;
    }
    &::before {
      width: 34px;
      height: 34px;
      background: #fff;
      animation: slace 1.4s infinite;
    }
  }
}
@keyframes slace {
  0% {
    transform: translate3d(-50%, -50%, 0) scale(1);
  }
  50% {
    transform: translate3d(-50%, -50%, 0) scale(1.2);
  }
  100% {
    transform: translate3d(-50%, -50%, 0) scale(1);
  }
}
</style>
