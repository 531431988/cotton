<template>
  <a-card :bordered="false">
    <Breadcrumb slot="title" />
    <ReportCard
      v-if="$auth('cities') || $auth('areas')"
      @on-add="visible = true"
      @on-report="onReport"
    >
      <a-button
        type="primary"
        ghost
        class="mr15"
        @click="onZeroDeclare"
        :disabled="query.status === '3'"
      >零申报</a-button>
    </ReportCard>
    <a-table :columns="tableCol" :dataSource="tableData" :loading="loading">
      <template v-slot:reportArea="{reportArea}">
        <router-link
          v-if="$auth('provinces')"
          :to="`/info-report/streets?cities=${query.cities}&areas=${query.areas}&streets=${reportArea}&status=${query.status}`"
        >{{reportArea}}</router-link>
        <router-link
          v-if="$auth('cities') || $auth('areas')"
          :to="`/info-report/streets?areas=${query.areas}&streets=${reportArea}&status=${query.status}`"
        >{{reportArea}}</router-link>
        <router-link
          v-if="$auth('streets')"
          :to="`/info-report/streets?streets=${reportArea}&status=${query.status}`"
        >{{reportArea}}</router-link>
      </template>
      <template v-slot:status="{status}" v-if="$auth('cities') || $auth('areas')">
        <a-badge :color="status | statusTypeFilter" :text="status | statusFilter" />
      </template>
      <template v-if="$auth('cities') || $auth('areas')" v-slot:action="{status, key}">
        <a-popconfirm
          v-if="status === 1"
          title="您确定要审核通过吗？"
          okText="确定"
          cancelText="取消"
          @confirm="() => onSigned(key)"
        >
          <a-button type="link" size="small" class="t-primary">审核通过</a-button>
        </a-popconfirm>
        <a-divider v-if="status === 1" type="vertical" />
        <a-popconfirm
          v-if="status !== 0"
          title="您确定要驳回吗?"
          okText="确定"
          cancelText="取消"
          @confirm="() => onReject(key)"
        >
          <a-button type="link" size="small" class="t-warning">驳回</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <AddReportInfo :visible="visible" @on-ok="visible = false" @on-cancel="visible = false" />
  </a-card>
</template>

<script>
import { getTaskCounty } from '@/api/task'
import { auditStateMap, renderTableCol } from '@/libs/utils'
import { Breadcrumb } from '@/components'
import ReportCard from './components/ReportCard'
import AddReportInfo from './components/AddReportInfo'
export default {
  components: {
    Breadcrumb,
    ReportCard,
    AddReportInfo
  },
  data () {
    return {
      query: null,
      tableCol: [],
      tableData: [],
      loading: true,
      visible: false
    }
  },
  created () {
    const { query } = this.$route
    const tableCol = renderTableCol(query.status)
    const { $auth } = this
    this.query = query
    // 级查看区县不带状态与操作功能
    if ($auth('provinces')) {
      this.tableCol = tableCol.filter(item => {
        if (item.title !== '审核状态' && item.title !== '操作') {
          return item
        }
      })
    } else {
      this.tableCol = tableCol
    }

    getTaskCounty().then(res => {
      const { data } = res
      this.tableData = data
      this.loading = false
    })
  },
  filters: {
    statusFilter (type) {
      return auditStateMap[type].text
    },
    statusTypeFilter (type) {
      return auditStateMap[type].status
    }
  },
  methods: {
    // 上报本级
    onReport () {
      setTimeout(() => {
        this.loading = true
        this.$message.success('上报成功')
        this.loading = false
      }, 1000)
    },
    // 零申报
    onZeroDeclare () {
      this.$confirm({
        // 如果有上报信息
        title: '将删除所有下辖行政区已上报信息，并做零申报，是否确定？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.$message.success('操作成功')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
