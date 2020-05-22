<template>
  <div class="header">
    <Animated name="fadeInDown">
      <img src="@/assets/data-analysis-home-icon.png" class="home" @click="$router.push('/')" />
      <img src="@/assets/data-analysis-logo-text.png" class="logo" />
      <img
        src="@/assets/query-statistics.png"
        class="query"
        @click="$router.push('/data-analysis/detail')"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1921 64"
        height="64px"
      >
        <defs>
          <linearGradient
            id="aa"
            data-name="未命名的渐变"
            x1="662.11"
            y1="448.3"
            x2="662.11"
            y2="447.18"
            gradientTransform="matrix(1697.8, 0, 0, -79, -1123166.94, 35415.79)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#0a3741" />
            <stop offset="1" stop-color="#19736f" />
          </linearGradient>
          <linearGradient
            id="bb"
            data-name="未命名的渐变 3"
            x1="662.21"
            y1="447.97"
            x2="661.21"
            y2="447.97"
            gradientTransform="matrix(842, 0, 0, -80, -556201, 35879.18)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#30bfb5" stop-opacity="0.8" />
            <stop offset="0.51" stop-color="#6fb6b8" stop-opacity="0.8" />
            <stop offset="1" stop-color="#8acdce" />
          </linearGradient>
          <linearGradient
            id="cc"
            data-name="未命名的渐变 2"
            x1="661.71"
            y1="448.47"
            x2="661.71"
            y2="447.47"
            gradientTransform="matrix(842, 0, 0, -80, -556201, 35879.18)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#144649" />
            <stop offset="1" stop-color="#45d1b2" />
          </linearGradient>
        </defs>
        <title>top</title>
        <rect y="1.5" width="1921" height="41" style="fill: #0e464c" />
        <path
          d="M1809.9,0H112.1l69.1,79H1740.8Z"
          transform="translate(0 0.5)"
          style="stroke: #259791;fill-rule: evenodd;fill: url(#aa)"
        />
        <polygon
          points="541 1.5 1383 1.5 1322 81.5 602 81.5 541 1.5"
          style="fill: none;opacity: 0.5782645344734192;isolation: isolate;stroke: url(#bb)"
        />
        <polygon
          points="541 1.5 1383 1.5 1322 81.5 602 81.5 541 1.5"
          style="fill-rule: evenodd;fill: url(#cc)"
        />
      </svg>
    </Animated>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {

    }
  },
  methods: {
    onClick () {
      console.log(1)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  height: 64px;
  overflow: hidden;
  svg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
  .home,
  .logo,
  .query {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .home {
    left: 12%;
  }
  .logo {
    width: 400px;
    left: 50%;
  }
  .query {
    right: 8%;
  }
  .home,
  .query {
    cursor: pointer;
    height: 32px;
  }
}
</style>
