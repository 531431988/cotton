<template>
  <a-card :bordered="false" class="card-box-shadow">
    <ReportCard
      v-if="$auth('streets')"
      @on-add="visible = true"
      @on-report="onReport"
      :disabled="disabled"
    >
      <a-button
        type="primary"
        ghost
        class="mr15"
        @click="onZeroDeclare"
        :disabled="query.status === '3'"
      >零申报</a-button>
    </ReportCard>
    <Breadcrumb slot="title" />
    <!-- 可查看详情 -->
    <a-table :columns="tableCol" :dataSource="tableData" :loading="loading">
      <template v-slot:reportArea="{reportArea}">
        <router-link
          v-if="$auth('provinces')"
          :to="`/info-report/villages?cities=${query.cities}&areas=${query.areas}&streets=${query.streets}&villages=${reportArea}&status=${query.status}`"
        >{{reportArea}}</router-link>
        <router-link
          v-if="$auth('cities') || $auth('areas')"
          :to="`/info-report/villages?&areas=${query.areas}&streets=${query.streets}&villages=${reportArea}&status=${query.status}`"
        >{{reportArea}}</router-link>
        <router-link
          v-if="$auth('streets')"
          :to="`/info-report/villages?streets=${query.streets}&villages=${reportArea}&status=${query.status}`"
        >{{reportArea}}</router-link>
      </template>
      <template v-slot:status="{status}" v-if="$auth('streets')">
        <a-badge :color="status | statusTypeFilter" :text="status | statusFilter" />
      </template>
      <template v-slot:action="{status, key}">
        <a-popconfirm
          v-if="status === 0"
          title="您确定要删除吗?"
          okText="确定"
          cancelText="取消"
          @confirm="() => onDelete(key)"
        >
          <a-button type="link" size="small" class="t-warning">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <AddReportInfo :visible="visible" @on-ok="onImport" @on-cancel="visible = false" />
  </a-card>
</template>

<script>
import { Breadcrumb } from '@/components'
import { getTaskStreets } from '@/api/task'
import { renderTableCol } from '@/libs/utils'
import ReportCard from './components/ReportCard'
import AddReportInfo from './components/AddReportInfo'
export const auditStateMap = {
  0: {
    status: '#ed4014',
    text: '未提交'
  },
  1: {
    status: '#FA6400',
    text: '待审核'
  },
  2: {
    status: '#36A065',
    text: '已审核'
  }
}
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
      visible: false,
      disabled: true
    }
  },
  created () {
    const { query } = this.$route
    const tableCol = renderTableCol(query.status)
    const { $auth } = this
    this.query = query
    // 市查看乡村不带状态与操作功能
    if (!$auth('streets')) {
      this.tableCol = tableCol.filter(item => {
        if (item.title !== '审核状态' && item.title !== '操作') {
          return item
        }
      })
    } else {
      this.tableCol = tableCol
    }

    getTaskStreets().then(res => {
      let { data } = res
      if (this.$auth('streets')) {
        data = []
      }
      this.loading = false
      this.tableData = data
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
    },
    // 提交上报信息
    onReport () {
      setTimeout(() => {
        this.loading = true
        this.$message.success('上报成功')
        this.loading = false
        this.tableData.map(item => (item.status = 1))
      }, 1000)
    },
    // 导入
    onImport (type) {
      this.type = type
      this.visible = false
      if (this.$auth('streets')) {
        getTaskStreets().then(res => {
          this.$message.success('导入成功')
          this.tableData.unshift(...res.data.splice(0, 3))
          this.disabled = false
        })
      }
    },
    onDelete (key) {
      const tableData = [...this.tableData]
      this.tableData = tableData.filter(item => item.key !== key)
      this.$message.success('操作成功')
    }
  }
}
</script>

<style lang="less" scoped>
.inner-table {
  /deep/ .ant-table {
    border: none;
  }
}
</style>
