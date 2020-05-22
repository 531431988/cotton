<template>
  <div>
    <a-row type="flex">
      <div class="vui-flex-item pr25">
        <Title title="信息上报进度跟踪" />
      </div>
    </a-row>
    <a-row :gutter="16" class="mt15">
      <a-col :span="6">
        <a-row type="flex" align="middle" justify="center">
          <a-col class="mr25">
            <div>种植主体总计：</div>
            <p class="b">XXX 个</p>
            <div>种植面积总计：</div>
            <p class="b">XXXX 亩</p>
            <template v-if="query.status === '2' || query.status === '3'">
              <div>销售规模总计：</div>
              <p class="b">XXXX 亩</p>
            </template>
          </a-col>
          <a-col>
            <div class="mb15">
              <a-progress
                type="circle"
                strokeColor="#FFCE45"
                :percent="35"
                :format="percent => `${35} / 90`"
              />
            </div>
            <a-badge color="#FEC86B" text="已上报比例 6%" />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="9">
        <a-row type="flex" align="top" justify="center" class="report-card-list pd25">
          <a-col>
            <div class="icon reported">
              <ReportSvg />
            </div>
          </a-col>
          <a-col class="vui-flex-item pl25">
            <div class="title">已上报</div>
            <span class="item" v-for="(item, index) in reported" :key="index">{{item}}</span>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="9">
        <a-row type="flex" align="top" justify="center" class="report-card-list pd25">
          <a-col>
            <div class="icon not-report">
              <notReportSvg />
            </div>
          </a-col>
          <a-col class="vui-flex-item pl25">
            <div class="title">未上报</div>
            <span class="item" v-for="(item, index) in notReported" :key="index">{{item}}</span>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row type="flex" class="mt40 mb15">
      <div class="vui-flex-item pr25">
        <!-- 根据上报进度显示 -->
        <Title :title="title" />
      </div>
      <slot></slot>
      <!-- 省厅不可见 -->
      <template v-if="role !== 'provinces'">
        <a-button
          type="primary"
          class="btn-warning mr15"
          @click="$emit('on-add')"
          :disabled="query.status === '3'"
        >
          <a-icon type="plus-circle" />录入信息
        </a-button>
        <a-button type="primary" @click="onReport" :disabled="disabled || query.status === '3'">提交信息</a-button>
      </template>
    </a-row>
  </div>
</template>

<script>

import { reportStatusMap } from '@/libs/utils'
import ReportSvg from '@/assets/reported-icon'
import notReportSvg from '@/assets/not-reported-icon'
import { mapState } from 'vuex'
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ReportSvg,
    notReportSvg
  },
  data () {
    return {
      reported: ['XXX', 'XXX', 'XXX', 'XXX', 'XXX', 'XXX'],
      notReported: ['XXX', 'XXX', 'XXX', 'XXX', 'XXX', 'XXX', 'XXX', 'XXX', 'XXX', 'XXX'],
      query: null
    }
  },
  created () {
    const { query } = this.$route
    this.query = query
  },
  computed: {
    ...mapState({
      role: state => state.user.role
    }),
    title () {
      const { status } = this.query
      const text = reportStatusMap[status].text
      return text
    }
  },
  methods: {
    onReport () {
      this.$confirm({
        title: '提交上报信息',
        content: '您确定要提交吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.$emit('on-report')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.report-card-list {
  background: rgba(216, 216, 216, 0.13);
  height: 182px;
  .item {
    margin: 16px 16px 0 0;
    display: inline-block;
  }
  .title {
    font-weight: 500;
  }
  .icon {
    position: relative;
    svg {
      position: relative;
      z-index: 1;
    }
    &::after {
      width: 46px;
      height: 46px;
      content: "";
      border-radius: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      z-index: 0;
    }
  }
  .reported::after {
    background: rgba(54, 160, 101, 0.1);
  }
  .not-report::after {
    background: rgba(250, 100, 0, 0.1);
  }
}
</style>
