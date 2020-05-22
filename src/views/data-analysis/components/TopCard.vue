<template>
  <div class="card-top">
    <Animated :delay="`${index / 5}s`" name="fadeInUp" v-for="(item, index) in data" :key="index">
      <a-row type="flex" align="middle" class="mt15 mb15">
        <a-col>
          <img class="num" src="@/assets/medal-1.png" v-if="index === 0" />
          <img class="num" src="@/assets/medal-2.png" v-if="index === 1" />
          <img class="num" src="@/assets/medal-3.png" v-if="index === 2" />
          <span class="num" v-if="index > 2">{{index + 1}}</span>
          <span class="title">{{item.label}}</span>
        </a-col>
        <a-col class="vui-flex-item tr pl10">
          <countTo class="text" :startVal="0" :endVal="item.value" />
          {{unit}}
        </a-col>
      </a-row>
    </Animated>
  </div>
</template>

<script>

import countTo from 'vue-count-to'
export default {
  components: {
    countTo
  },
  props: {
    unit: String,
    data: {
      type: Array,
      default: () => []
    }
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
.card-top {
  .num {
    text-align: center;
    height: 26px;
    width: 20px;
    display: inline-block;
    vertical-align: middle;
  }
  .title {
    margin-left: 8px;
  }
  .text {
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
