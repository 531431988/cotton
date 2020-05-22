<template>
  <a-row :gutter="16">
    <a-col :md="24" :xl="18">
      <Overview />
      <a-card :bordered="false" class="card-box-shadow mb25">地图容器</a-card>
    </a-col>
    <a-col :md="24" :xl="6">
      <a-card
        title="种植主体数量TOP5"
        class="card-box-shadow mb25"
        :bordered="false"
        :bodyStyle="{padding: '8px 24px'}"
        :loading="!mainTop.length"
      >
        <TopCard :data="mainTop" unit="个" />
      </a-card>
      <a-card
        title="种植面积TOP5"
        class="card-box-shadow mb25"
        :bordered="false"
        :bodyStyle="{padding: '8px 24px'}"
        :loading="!plantTop.length"
      >
        <TopCard :data="plantTop" unit="亩" />
      </a-card>
      <a-card
        title="销售量TOP5"
        class="card-box-shadow mb25"
        :bordered="false"
        :bodyStyle="{padding: '8px 24px'}"
        :loading="!salesTop.length"
      >
        <TopCard :data="salesTop" unit="公斤" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import Overview from './components/Overview'
import TopCard from './components/TopCard'
import { getDataAnalysisTop } from '@/api/data-analysis'
export default {
  components: {
    Overview,
    TopCard
  },
  data () {
    return {
      mainTop: [],
      plantTop: [],
      salesTop: []
    }
  },
  created () {
    getDataAnalysisTop().then(res => {
      const { data } = res
      this.mainTop = data
      this.plantTop = data
      this.salesTop = data
    })
  }
}
</script>

<style lang="less" scoped>
</style>
