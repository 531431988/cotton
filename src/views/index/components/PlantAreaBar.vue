<template>
  <a-card
    class="card-box-shadow mb25"
    :bordered="false"
    title="种植面积分布统计"
    :loading="!chartOpt.xAxis.data.length"
  >
    <EChart autoresize :options="chartOpt" theme="theme" style="width: 100%" />
  </a-card>
</template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
import { getAreaBarData } from '@/api/home'
export default {
  data () {
    return {
      chartOpt: {
        grid: {
          top: '8%',
          right: '5%',
          left: '5%'
        },
        tooltip: {},
        dataZoom: [{
          show: true,
          bottom: 0,
          start: 0,
          end: 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '100%',
          handleStyle: {
            color: '#90979c'
          },
          borderColor: '#90979c'
        }],
        xAxis: {
          type: 'category',
          splitNumber: 0,
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          nameGap: 0,
          data: []
        },
        yAxis: {
          type: 'value',
          name: '单位：亩'
        },
        series: [{
          type: 'bar',
          barGap: '-100%',
          barCategoryGap: '-100%',
          barMaxWidth: 24,
          data: []
        }]
      }
    }
  },
  created () {
    getAreaBarData({
      role: this.$store.state.user.role
    }).then(res => {
      const { data } = res
      const { chartOpt } = this
      const { xAxis, series } = chartOpt
      xAxis.data = data.map(item => item.name)
      series[0].data = data.map((item, index) => ({
        value: item.value,
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#555'
          }
        },
        itemStyle: {
          color: this.$config.echartColor[index]
        }
      }))
      this.chartOpt = chartOpt
    })
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
