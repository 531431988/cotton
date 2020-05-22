<template>
  <a-card
    :bordered="false"
    title="种植主体类型统计"
    class="mt25 card-box-shadow"
    :bodyStyle="{padding: '0 8px 24px'}"
    :loading="!chartOpt.legend.data.length"
  >
    <EChart
      autoresize
      ref="chart"
      :options="chartOpt"
      theme="theme"
      style="width: 100%;height: 365px"
      @click="onChartClick"
    />
  </a-card>
</template>

<script>
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import { getMainType } from '@/api/home'
export default {
  data () {
    return {
      chartOpt: {
        tooltip: {},
        legend: {
          orient: 'vertical',
          bottom: '0',
          icon: 'circle',
          data: []
        },
        series: [{
          type: 'pie',
          radius: ['40%', '60%'],
          center: ['50%', '35%'],
          itemStyle: {
            normal: {
              borderColor: '#ffffff',
              borderWidth: 6
            }
          },

          data: []
        }]
      }
    }
  },
  created () {
    getMainType({
      role: this.$store.state.user.role
    }).then(res => {
      const { data } = res
      const { chartOpt } = this
      const { legend, series } = chartOpt
      legend.data = data.map(item => item.name)
      series[0].data = data.map((item, index) => ({
        value: item.value,
        name: item.name,
        label: {
          position: 'inner',
          formatter: '{c}'
          // formatter: '{d}%'
        },
        itemStyle: {
          color: this.$config.echartColor[index * 2]
        }
      }))
      this.chartOpt = chartOpt
      this.$nextTick(() => {
        this.pieHighlight()
      })
    })
  },
  methods: {
    onChartClick (e) {
      this.pieHighlight(e.dataIndex)
    },
    pieHighlight (dataIndex = 3) {
      this.$refs.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0
      })
      this.$refs.chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
