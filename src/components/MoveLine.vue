<template>
  <div class="move-line">
    <slot></slot>
    <span
      class="line line-1"
      :style="`background:linear-gradient(to right, rgba(0, 0, 0, 0), ${color});`"
    ></span>
    <span
      class="line line-2"
      :style="`background: linear-gradient(to bottom, rgba(0, 0, 0, 0), ${color});`"
    ></span>
    <span
      class="line line-3"
      :style="`background: linear-gradient(to left, rgba(0, 0, 0, 0), ${color});`"
    ></span>
    <span
      class="line line-4"
      :style="`background: linear-gradient(to top, rgba(0, 0, 0, 0), ${color});`"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'rgba(255, 255, 255, 0.8)'
    }
  }
}
</script>

<style lang="less" scoped>
.move-line {
  position: relative;
  overflow: hidden;
  transition: all 0.5s;
  .line {
    position: absolute;
    display: block;
    &-1 {
      height: 1px;
      width: 100%;
      top: 0px;
      left: -100%;
      border-top-right-radius: 1px;
      border-bottom-right-radius: 1px;
      animation: line-1 2s linear infinite;
      animation-delay: 1s;
    }
    &-2 {
      height: 100%;
      width: 1px;
      top: -100%;
      right: 0px;

      border-bottom-left-radius: 1px;
      border-bottom-right-radius: 1px;
      animation: line-2 2s linear infinite;
      animation-delay: 2s;
    }
    &-3 {
      height: 1px;
      width: 100%;
      right: -100%;
      bottom: 0px;

      border-top-left-radius: 1px;
      border-bottom-left-radius: 1px;
      animation: line-3 2s linear infinite;
      animation-delay: 3s;
    }
    &-4 {
      height: 100%;
      width: 1px;
      bottom: -100%;
      left: 0px;

      border-top-right-radius: 1px;
      border-top-left-radius: 1px;
      animation: line-4 2s linear infinite;
      animation-delay: 4s;
    }
  }
}

@keyframes line-1 {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes line-2 {
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}

@keyframes line-3 {
  0% {
    right: -100%;
  }
  100% {
    right: 100%;
  }
}

@keyframes line-4 {
  0% {
    bottom: -100%;
  }
  100% {
    bottom: 100%;
  }
}
</style>
