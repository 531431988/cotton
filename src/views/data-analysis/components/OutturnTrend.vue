<template>
  <Card title="产量、销量变化趋势">
    <EChart
      autoresize
      ref="chart"
      :options="chartOpt"
      theme="theme"
      style="width: 100%;height: 100%"
    />
  </Card>
</template>

<script>
import Card from './Card.vue'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import { getOutturnTrend } from '@/api/data-analysis'
export default {
  components: {
    Card
  },
  data () {
    return {
      chartOpt: {
        color: ['#EFD32A', '#51FFD2'],
        tooltip: {},
        gird: {
          top: 0,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          top: '8px',
          left: 0,
          icon: 'path://M0,.5H12v1H0Z',
          textStyle: {
            color: 'rgba(219, 255, 253, 0.7)'
          },
          data: []
        },
        xAxis: {
          // 坐标线
          axisLine: {
            lineStyle: {
              color: 'rgba(191, 246, 243, 0.3)'
            }
          },
          // 刻度线
          axisTick: {
            lineStyle: {
              color: 'rgba(191, 246, 243, 0.3)'
            }
          },
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: 'rgba(191, 246, 243, 0.3)'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(191, 246, 243, 0.2)',
              type: 'dashed'
            }
          }
        },
        series: []
      }
    }
  },
  created () {
    getOutturnTrend().then(res => {
      const { code, data: { year, list }, msg } = res
      if (code === 200) {
        const { chartOpt } = this
        const { legend, xAxis, series } = chartOpt
        legend.data = ['产量', '销量']
        xAxis.data = year
        list.forEach((item, index) => {
          series.push({
            type: 'line',
            symbolSize: 8,
            name: legend.data[index],
            data: item
          })
        })
        this.chartOpt = chartOpt
      } else {
        this.$message.error(msg)
      }
    })
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
