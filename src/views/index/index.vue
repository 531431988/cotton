<template>
  <a-row :gutter="16" class="card-list">
    <a-col :md="24" :xl="18">
      <a-card
        :bordered="false"
        class="card-box-shadow mb25"
        :loading="!cardList.length"
        :bodyStyle="{padding: '24px 24px 0'}"
      >
        <a-row :gutter="16">
          <a-col :xs="24" :md="8" class="card-item" v-for="(item, index) in cardList" :key="index">
            <MoveLine>
              <div class="vui-flex vui-flex-middle">
                <div class="vui-flex-item pr5">
                  <p class="mb5 b" v-font="18">{{item.year}} 年</p>
                  <p class="mb5" v-if="index === 0">种植主体总计（个）</p>
                  <p class="mb5" v-if="index === 1">种植面积总计（亩）</p>
                  <p class="mb5" v-if="index === 2">销售规模总计（公斤）</p>
                  <p class="number">
                    <countTo :startVal="0" :endVal="item.number" />
                  </p>
                </div>
                <div class="icon">
                  <TreeSvg v-if="index === 0" />
                  <AreaSvg v-if="index === 1" />
                  <SellSvg v-if="index === 2" />
                </div>
              </div>
            </MoveLine>
          </a-col>
        </a-row>
      </a-card>

      <PlantAreaBar />
    </a-col>
    <a-col :md="24" :xl="6">
      <a-card
        title="待办消息"
        :loading="!pending.length"
        :bordered="false"
        :bodyStyle="{padding: '8px'}"
        class="pending card-box-shadow"
      >
        <Animated
          :delay="`${index / 5}s`"
          name="fadeInUp"
          v-for="(item, index) in pending"
          :key="index"
        >
          <a-row type="flex" align="middle" class="item">
            <a-col class="vui-flex-item ell pr25">
              <router-link to>{{item.title}}</router-link>
            </a-col>
            <a-col class>{{item.date}}</a-col>
          </a-row>
        </Animated>
      </a-card>

      <PlantMainTypePie />
    </a-col>
  </a-row>
</template>

<script>
import countTo from 'vue-count-to'
import { MoveLine } from '@/components'
import TreeSvg from '@/assets/tree-icon'
import AreaSvg from '@/assets/area-icon'
import SellSvg from '@/assets/sell-icon'
import PlantAreaBar from './components/PlantAreaBar'
import PlantMainTypePie from './components/PlantMainTypePie'
import { getAnnualStatistics, getPending } from '@/api/home'
export default {
  components: {
    countTo,
    MoveLine,
    TreeSvg,
    AreaSvg,
    SellSvg,
    PlantAreaBar,
    PlantMainTypePie
  },
  data () {
    return {
      number: 0,
      total: 0,
      scale: 0,
      cardList: [],
      pending: []
    }
  },
  created () {
    getAnnualStatistics().then(res => {
      const { data } = res
      this.cardList = data
    })

    getPending().then(res => {
      const { data } = res
      this.pending = data
    })
  }

}
</script>
<style lang="less" scoped>
.card-list {
  .item {
    padding: 16px 12px;
    color: rgba(0, 0, 0, 0.85);
    transition: 0.3s all;
    &:hover {
      background: rgba(240, 245, 242, 1);
    }
    .unit {
      opacity: 0.85;
    }
  }
  .number {
    font-size: 24px;
    margin-bottom: 0;
    font-weight: 500;
  }
  .card-item {
    color: #fff;
    border-radius: 5px;
    margin-bottom: 24px;
    > div {
      padding: 13px 24px 13px 16px;
    }
    &:first-child {
      > div {
        background: url(../../assets/min-banner-1.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    &:nth-child(2) {
      > div {
        background: url(../../assets/min-banner-2.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    &:last-child {
      > div {
        background: url(../../assets/min-banner-3.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .icon {
    position: relative;
    padding-top: 4px;
    svg {
      position: relative;
      z-index: 2;
    }
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
.pending {
  .item {
    padding: 5px;
  }
}
</style>
