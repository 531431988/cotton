<template>
  <Card :title="title">
    <EChart
      autoresize
      ref="chart"
      :options="chartOpt"
      theme="theme"
      style="width: 100%;height: 100%"
      @click="onChartClick"
    />
  </Card>
</template>

<script>
import Card from './Card'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
export default {
  props: {
    title: String,
    data: Array
  },
  components: {
    Card
  },
  data () {
    return {
      chartOpt: {
        tooltip: {},
        gird: {
          top: 0,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          bottom: '10%',
          icon: 'circle',
          textStyle: {
            color: 'hsla(177, 100%, 93%, 0.7)'
          },
          data: []
        },
        series: [{
          type: 'pie',
          radius: ['40%', '60%'],
          center: ['50%', '35%'],
          itemStyle: {
            normal: {
              borderColor: '#012f42',
              borderWidth: 2
            }
          },
          data: []
        }]
      }
    }
  },
  created () {
    const color = ['#E7CD2A', '#0F9790', '#36A065', '#EA783F']
    const { chartOpt, data } = this
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
        color: color[index]
      }
    }))
    this.chartOpt = chartOpt
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
