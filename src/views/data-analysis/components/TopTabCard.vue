<template>
  <Card :title="title" class="top-tab-card">
    <div>
      <a-tabs default-active-key="1" size="small" @change="onTabChange">
        <a-tab-pane key="1" tab="家庭农场"></a-tab-pane>
        <a-tab-pane key="2" tab="农户(种植大户)"></a-tab-pane>
        <a-tab-pane key="3" tab="农民合作社"></a-tab-pane>
        <a-tab-pane key="4" tab="农业企业"></a-tab-pane>
      </a-tabs>
      <Animated :delay="`${index / 5}s`" name="fadeInUp" v-for="(item, index) in data" :key="index">
        <a-row type="flex" align="middle" class="mt10 mb10 list">
          <a-col>
            <span class="dot first" v-if="index === 0">■</span>
            <span class="dot second" v-if="index === 1">■</span>
            <span class="dot third" v-if="index === 2">■</span>
            <span class="dot" v-if="index > 2">■</span>
            <span class="title">{{item.label}}</span>
          </a-col>
          <a-col class="vui-flex-item tr pl10">
            <countTo class="text" :startVal="0" :endVal="item.value" />
          </a-col>
        </a-row>
      </Animated>
    </div>
  </Card>
</template>

<script>
import Card from './Card.vue'
import countTo from 'vue-count-to'
export default {
  props: {
    title: String,
    data: Array
  },
  components: {
    Card,
    countTo
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    onTabChange (key) {
      this.$emit('on-change', key)
    }
  }
}
</script>

<style lang="less" scoped>
.top-tab-card {
  /deep/ .ant-tabs {
    color: rgba(191, 246, 243, 0.7);
    .ant-tabs-bar {
      border-color: #1e5451;
    }
    .ant-tabs-tab-active {
      color: rgba(191, 246, 243, 0.7);
    }
    .ant-tabs-ink-bar {
      background-color: #0a9faa;
    }
    .ant-tabs-nav .ant-tabs-tab {
      margin-right: 0;
    }
  }
  .dot {
    font-size: 12px;
    transform: scale(0.5);
    color: rgba(15, 151, 144, 0.25);
    &.first {
      color: rgba(15, 151, 144, 1);
    }
    &.second {
      color: rgba(231, 205, 42, 1);
    }
    &.third {
      color: rgba(238, 99, 81, 1);
    }
  }
  .title {
    font-size: 14px;
    margin-left: 8px;
    color: rgba(255, 255, 255, 0.8);
  }
  .text {
    font-weight: 600;
    font-size: 16px;
    color: #1fc1b9;
  }
}
</style>
