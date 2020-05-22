<template>
  <a-card
    title="数据概览"
    class="overview card-box-shadow mb25"
    :bordered="false"
    :bodyStyle="{padding: '24px 36px'}"
    :loading="loading"
  >
    <router-link to="/data-analysis/detail" slot="extra" class="t-primary">查看明细>></router-link>
    <a-row type="flex" align="middle">
      <a-col class="hd tc pr25">
        <i class="icon-cover" v-font="24" v-color="'#36A065'" />
        <div class="title">棉花种植覆盖</div>
      </a-col>
      <a-col class="bd vui-flex-item">
        <a-row>
          <a-col :span="6">
            <p class="title">地市州</p>
            <template v-if="cities">
              <countTo class="text" :startVal="0" :endVal="cities.actual" />
              <span class="line">/</span>
              <countTo class="text" :startVal="0" :endVal="cities.total" />
            </template>
          </a-col>
          <a-col :span="6">
            <p class="title">区县</p>
            <template v-if="areas">
              <countTo class="text" :startVal="0" :endVal="areas.actual" />
              <span class="line">/</span>
              <countTo class="text" :startVal="0" :endVal="areas.total" />
            </template>
          </a-col>
          <a-col :span="6">
            <p class="title">乡镇</p>

            <template v-if="streets">
              <countTo class="text" :startVal="0" :endVal="streets.actual" />
              <span class="line">/</span>
              <countTo class="text" :startVal="0" :endVal="streets.total" />
            </template>
          </a-col>
          <a-col :span="6">
            <p class="title">村</p>
            <template v-if="villages">
              <countTo class="text" :startVal="0" :endVal="villages.actual" />
              <span class="line">/</span>
              <countTo class="text" :startVal="0" :endVal="villages.total" />
            </template>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row class="mt25" type="flex" align="middle">
      <a-col class="hd tc pr25">
        <i class="icon-chart-bar" v-font="24" v-color="'#f7b500'" />
        <div class="title">棉花种植统计</div>
      </a-col>
      <a-col class="bd vui-flex-item">
        <a-row>
          <a-col :span="6">
            <p class="title">种植主体</p>
            <countTo class="text" :startVal="0" :endVal="mainTotal" />
            <span class="unit">个</span>
          </a-col>
          <a-col :span="6">
            <p class="title">种植面积</p>
            <countTo class="text" :startVal="0" :endVal="areaTotal" />
            <span class="unit">亩</span>
          </a-col>
          <a-col :span="6">
            <p class="title">产量</p>
            <countTo class="text" :startVal="0" :endVal="yieldTotal" />
            <span class="unit">公斤</span>
          </a-col>
          <a-col :span="6">
            <p class="title">销售量</p>
            <countTo class="text" :startVal="0" :endVal="salesTotal" />
            <span class="unit">公斤</span>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>

import countTo from 'vue-count-to'
import { getDataAnalysisOverview } from '@/api/data-analysis'
export default {
  components: {
    countTo
  },
  data () {
    return {
      loading: true,
      cities: null,
      areas: null,
      streets: null,
      villages: null,
      mainTotal: null,
      areaTotal: null,
      yieldTotal: null,
      salesTotal: null
    }
  },
  created () {
    getDataAnalysisOverview().then(res => {
      const {
        data: {
          cities,
          areas,
          streets,
          villages,
          mainTotal,
          areaTotal,
          yieldTotal,
          salesTotal
        }
      } = res
      this.loading = false
      this.cities = cities
      this.areas = areas
      this.streets = streets
      this.villages = villages
      this.mainTotal = mainTotal
      this.areaTotal = areaTotal
      this.yieldTotal = yieldTotal
      this.salesTotal = salesTotal
    })
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.overview {
  .hd {
    padding-right: 64px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 5%;
      bottom: 5%;
      right: 32px;
      width: 1px;
      background: linear-gradient(
        180deg,
        rgba(238, 238, 238, 0) 0%,
        rgba(220, 220, 220, 1) 56%,
        rgba(216, 216, 216, 0) 100%
      );
    }
    .title {
      font-weight: 600;
      font-size: 16px;
    }
  }
  .bd {
    .title {
      font-size: 16px;
      color: #aaabad;
      margin-bottom: 8px;
    }
    .text {
      font-size: 20px;
      font-weight: 600;
    }
    .text,
    .line {
      display: inline-block;
      vertical-align: middle;
    }
    .line {
      margin: 0 4px;
    }
    .unit {
      display: inline-block;
      vertical-align: bottom;
      margin-left: 4px;
    }
  }
}
</style>
