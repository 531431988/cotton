<template>
  <div :id="`g2plot-chart-${_uid}`"></div>
</template>
<script>
// const EVENTS = [
//   'onPlotClick',  // 图表区域点击事件
//   'onPlotDblClick',  // 图表区域双击事件
//   'onPlotMousemove',  // 图表区域鼠标移动事件
//   'onPlotContextmenu',  // 图表区域右键事件
//   'onLabelClick',  // 图例点击事件
//   'onLabelDblClick',  // 图例双击事件
//   'onLabelMouseMove',  //  图例鼠标移动事件
//   'onLabelContextmenu' // 图例右键事件
// ]
export default {
  props: {
    g2plot: Function,
    options: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    options: {
      handler () {
        this.init()
      },
      deep: true
    }
  },
  methods: {
    init () {
      if (this.chart) {
        return
      }
      /* eslint new-cap: 0 */
      this.chart = new this.g2plot(document.getElementById(`g2plot-chart-${this._uid}`), Object.assign({
        forceFit: true,
        padding: 'auto',
        legend: {
          position: 'top-center'
        },
        color: [
          '#45CB80',
          '#CFF3E5',
          '#647697',
          '#D2D8E0',
          '#F7C11F',
          '#FDEDBE',
          '#E96A5A',
          '#F9D4CE',
          '#75CBEE',
          '#D5EFF9',
          '#9966BD',
          '#DFD1EB',
          '#FF9D4E',
          '#FFE1C9',
          '#299999',
          '#BFDFDF',
          '#FF9FC7',
          '#FFE1ED'
        ]
        // 事件过多不在组件内部注册
        // events: {
        //   click: params => {
        //     console.log('画布基础事件', params);
        //   }
        // }
      }, this.options))
      this.chart.render()
    }
  },
  mounted () {
    if (this.options.data.length) {
      this.init()
    }
  }
}
</script>
