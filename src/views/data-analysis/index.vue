<template>
  <a-row type="flex" class="data-analysis vui-flex-ver">
    <a-col :span="24">
      <Header />
    </a-col>
    <a-col :span="24" class="vui-flex-item pd15">
      <a-row :gutter="15">
        <a-col :span="6">
          <Animated name="fadeInLeft" delay=".2s">
            <OutturnTrend class="mb15" />
          </Animated>
          <Animated name="fadeInLeft" delay=".4s">
            <ChangePlantingArea class="mb15" />
          </Animated>
          <Animated name="fadeInLeft" delay=".6s">
            <PlantingAreaDistribution />
          </Animated>
        </a-col>
        <a-col :span="12">
          <div class="pl25 pr25">
            <Animated name="fadeInDown" delay=".3s">
              <a-row type="flex" align="middle" justify="center" :gutter="15">
                <a-col :span="6" v-for="(item, index) in OverviewCardList" :key="index">
                  <OverviewCard :label="item.label">
                    <MapSvg slot="icon" v-if="index === 0" />
                    <AreaSvg slot="icon" v-if="index === 1" />
                    <StreetsSvg slot="icon" v-if="index === 2" />
                    <VillagesSvg slot="icon" v-if="index === 3" />
                    <countTo :startVal="0" :endVal="item.actual" />
                    <span class="line">/</span>
                    <countTo :startVal="0" :endVal="item.total" />
                  </OverviewCard>
                </a-col>
              </a-row>
            </Animated>
            <Animated name="fadeInUp" delay=".4s">
              <Map />
            </Animated>
          </div>
        </a-col>
        <a-col :span="6">
          <a-row :gutter="15" class="mb15">
            <a-col :span="12">
              <Animated name="fadeInRight" delay=".1s">
                <Pie :data="landSourceData" title="土地来源占比" />
              </Animated>
            </a-col>
            <a-col :span="12">
              <Animated name="fadeInRight" delay=".2s">
                <Pie :data="landNatureData" title="土地性质占比" />
              </Animated>
            </a-col>
          </a-row>
          <Animated name="fadeInRight" delay=".4s">
            <TopTabCard
              title="种植面积排名 TOP5"
              class="mb15"
              :data="plantData"
              @on-change="onPlantTabChange"
            />
          </Animated>
          <Animated name="fadeInRight" delay=".6s">
            <TopTabCard title="消售规模排名 TOP5" :data="saleData" @on-change="onSaleTabChange" />
          </Animated>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
import Header from './components/Header'
import OutturnTrend from './components/OutturnTrend'
import ChangePlantingArea from './components/ChangePlantingArea'
import PlantingAreaDistribution from './components/PlantingAreaDistribution'
import OverviewCard from './components/OverviewCard'
import Map from './components/Map'
import countTo from 'vue-count-to'
import MapSvg from '@/assets/data-analysis-map'
import AreaSvg from '@/assets/data-analysis-area'
import StreetsSvg from '@/assets/data-analysis-streets'
import VillagesSvg from '@/assets/data-analysis-villages'
import Pie from './components/Pie'
import TopTabCard from './components/TopTabCard'
import { getDataAnalysisTop } from '@/api/data-analysis'
export default {
  components: {
    Header,
    OutturnTrend,
    ChangePlantingArea,
    PlantingAreaDistribution,
    OverviewCard,
    Map,
    countTo,
    MapSvg,
    AreaSvg,
    StreetsSvg,
    VillagesSvg,
    Pie,
    TopTabCard
  },
  data () {
    return {
      OverviewCardList: [{
        label: '地市州',
        actual: 321,
        total: 3160
      }, {
        label: '区县',
        actual: 321,
        total: 3160
      }, {
        label: '乡镇',
        actual: 321,
        total: 3160
      }, {
        label: '村',
        actual: 321,
        total: 3160
      }],
      landSourceData: [{
        name: '划拨',
        value: 121
      }, {
        name: '承包',
        value: 231
      }, {
        name: '流转',
        value: 313
      }, {
        name: '其他',
        value: 611
      }],
      landNatureData: [{
        name: '国有土地',
        value: 121
      }, {
        name: '集体土地',
        value: 231
      }, {
        name: '土地性质分类',
        value: 313
      }, {
        name: '其他',
        value: 611
      }],
      plantData: [],
      saleData: []
    }
  },
  created () {
    this.onLoadTopData()
  },
  methods: {
    onLoadTopData () {
      getDataAnalysisTop().then(res => {
        const { data } = res
        this.plantData = data
        this.saleData = data
      })
    },
    // 种植面积排名 TOP5
    onPlantTabChange (key) {
      this.onLoadTopData()
    },
    // 消售规模排名 TOP5
    onSaleTabChange (key) {
      this.onLoadTopData()
    }
  }
}
</script>

<style lang="less" scoped>
.data-analysis {
  // min-width: 1920px;
  background: url(../../assets/data-analysis-bg.jpg) no-repeat center;
  background-size: cover;
}
</style>
