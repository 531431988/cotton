<template>
  <Card title="种植面积分布统计">
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
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/legend'
export default {
  components: {
    Card
  },
  data () {
    return {
      chartOpt: {
        color: [],
        grid: {
          top: '15%',
          bottom: '54%',
          left: '30%',
          containLabel: true
        },
        // legend: {
        //   orient: 'vertical',
        //   top: '15%',
        //   right: '10%',
        //   icon: 'circle',
        //   textStyle: {
        //     color: 'hsla(177, 100%, 93%, 0.7)'
        //   },
        //   data: []
        // },
        yAxis: {
          type: 'category',
          position: 'left',
          offset: -90,
          inverse: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            inside: true,
            align: 'left',
            textStyle: {
              color: 'rgba(219, 255, 253, 0.7)'
            },
            show: true
          },
          data: []
        },
        xAxis: {
          show: false
        },
        series: []
      }
    }
  },
  created () {
    const color = ['#0f9790', '#36a064', '#e7cd2a', '#ea773f', '#fff']
    const chartData = [{
      name: '500亩以上',
      value: 2311
    },
    {
      name: '200-500亩',
      value: 4211
    },
    {
      name: '50-200亩',
      value: 3171
    },
    {
      name: '10-50亩',
      value: 3217
    },
    {
      name: '1-10亩',
      value: 2211
    }
    ]
    const arrName = []
    const arrValue = []
    let sum = 0
    const pieSeries = []
    const lineYAxis = []

    // 数据处理
    chartData.forEach((v, i) => {
      arrName.push(v.name)
      arrValue.push(v.value)
      sum = sum + v.value
    })
    console.log(chartData)
    // 图表option整理
    chartData.forEach((v, i) => {
      pieSeries.push({
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        radius: [75 - i * 15 + '%', 67 - i * 15 + '%'],
        center: ['50%', '50%'],
        label: {
          show: false,
          formatter: '{c}',
          position: 'inner'
        },
        data: [{
          value: v.value,
          name: v.name
        }, {
          label: {
            show: false
          },
          value: sum - v.value,
          name: '',
          itemStyle: {
            color: 'rgba(0,0,0,0)'
          }
        }]
      })
      pieSeries.push({
        name: '',
        type: 'pie',
        silent: true,
        z: 1,
        clockWise: false, // 顺时加载
        hoverAnimation: false, // 鼠标移入变大
        radius: [75 - i * 15 + '%', 67 - i * 15 + '%'],
        center: ['50%', '50%'],
        label: {
          show: false
        },
        data: [{
          value: 6.5,
          itemStyle: {
            color: '#04344b'
          }
        }, {
          value: 3.5,
          name: '',
          itemStyle: {
            color: 'rgba(0,0,0,0)'
          }
        }]
      })
      v.percent = (v.value / sum * 100).toFixed(1) + '%'
      lineYAxis.push({
        value: i,
        textStyle: {
          rich: {
            circle: {
              color: color[i],
              padding: [0, 5]
            }
          }
        }
      })
    })

    const { chartOpt } = this
    const { yAxis } = chartOpt
    chartOpt.color = color
    yAxis.axisLabel.formatter = (params) => {
      const item = chartData[params]
      return '{line|}{circle|●}{name|' + item.name + '}{bd| | }{percent|' + item.percent + '} | {value|' + item.value + '}'
    }
    yAxis.data = lineYAxis
    // legend.data = chartData.map(item => item.name)
    chartOpt.series = pieSeries
    this.chartOpt = chartOpt
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
