<template>
  <a-card :bordered="false" class="card-box-shadow">
    <Breadcrumb slot="title" />
    <a-table :columns="tableCol" :dataSource="tableData" :loading="!tableData.length">
      <template v-slot:type="params">
        <a-button type="link" @click="onClick(params)">{{params.type}}</a-button>
      </template>
    </a-table>
    <RuralDrawer :visible="visible" :data="data" @on-cancel="visible = false" />
  </a-card>
</template>

<script>
import { Breadcrumb } from '@/components'
import { getVillage } from '@/api/task'
import RuralDrawer from './components/RuralDrawer'
export default {
  components: {
    Breadcrumb,
    RuralDrawer
  },
  data () {
    return {
      query: null,
      tableCol: [],
      tableData: [],
      visible: false,
      data: null
    }
  },
  created () {
    const { query } = this.$route
    const status = Number(query.status)
    this.query = query
    const tableCol = [{
      title: '主体类型',
      scopedSlots: { customRender: 'type' }
    }, {
      title: '主体名称',
      dataIndex: 'name',
      align: 'center'
    }, {
      title: '种植面积（亩）',
      dataIndex: 'plantingArea',
      align: 'center'
    }, {
      title: '平均单产（公斤/亩）',
      dataIndex: 'averageYield',
      align: 'center'
    }]
    // 种植信息上报中 种植信息上报已完成
    if (status === 0 || status === 1) this.tableCol = [...tableCol]
    // 交易信息上报中 任务已结束
    if (status === 2 || status === 3) {
      this.tableCol = [...tableCol, {
        title: '销售规模（公斤）',
        dataIndex: 'salesScale',
        align: 'center'
      }, {
        title: '平均销售价格（元/公斤）',
        dataIndex: 'averagePrice',
        align: 'center'
      }]
    }
    getVillage().then(res => {
      const { data } = res
      this.tableData = data
    })
  },
  methods: {
    onClick (params) {
      this.visible = true
      this.data = params.key
    }
  }
}
</script>

<style lang="less" scoped>
</style>
