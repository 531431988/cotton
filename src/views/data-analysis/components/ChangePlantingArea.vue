<template>
  <Card title="种植主体、面积变化趋势">
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
import 'echarts/lib/chart/bar'
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
        yAxis: [{
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
        }, {
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
            show: false
          }
        }],
        series: []
      }
    }
  },
  created () {
    getOutturnTrend().then(res => {
      const { code, data: { year, list }, msg } = res
      if (code === 200) {
        const { chartOpt } = this
        const { legend, xAxis, yAxis, series } = chartOpt
        legend.data = ['面积', '种植本体']
        xAxis.data = year
        const max = Math.max(...list.flat()) + 500
        yAxis[0].max = max
        yAxis[1].max = max
        list.forEach((item, index) => {
          series.push({
            type: index ? 'bar' : 'line',
            symbolSize: 8,
            barWidth: 15,
            name: legend.data[index],
            data: item,
            yAxisIndex: index
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
