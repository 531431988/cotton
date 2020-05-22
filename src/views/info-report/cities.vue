<template>
  <a-card :bordered="false">
    <Breadcrumb slot="title" />
    <ReportCard @on-add="visible = true">
      <a-button
        v-if="taskBtnShow"
        :type="isSign ? 'danger' : 'primary'"
        @click="onTaskSign"
      >{{isSign ? '取消签收' : '任务签收'}}</a-button>
    </ReportCard>

    <a-table :columns="tableCol" :dataSource="tableData" :loading="loading">
      <template v-slot:reportArea="{reportArea}">
        <router-link
          :to="`/info-report/areas?cities=${query.cities}&areas=${reportArea}&status=${query.status}`"
        >{{reportArea}}</router-link>
      </template>
      <template v-slot:status="{status}">
        <a-badge :color="status | statusTypeFilter" :text="status | statusFilter" />
      </template>
      <template v-slot:action="{status, key}" v-if="!isSign">
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
          v-if="status === 1"
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
import AddReportInfo from './components/AddReportInfo'
import { getTaskCity } from '@/api/task'
import { auditStateMap, renderTableCol } from '@/libs/utils'
import { Breadcrumb } from '@/components'
import ReportCard from './components/ReportCard'
export default {
  components: {
    Breadcrumb,
    AddReportInfo,
    ReportCard
  },
  data () {
    return {
      query: null,
      isSign: false,
      visible: false,
      tableCol: [],
      tableData: [],
      loading: true
    }
  },
  created () {
    const { query } = this.$route
    this.query = query
    this.tableCol = renderTableCol(query.status)
    getTaskCity().then(res => {
      const { data } = res
      this.tableData = data
      this.loading = false
    })
  },
  computed: {
    taskBtnShow () {
      const { status } = this.$route.query
      const { $auth } = this
      return $auth('provinces') && (status === '0' || status === '2')
    }
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
    onReject (key) {
      const tableData = [...this.tableData]
      this.tableData = tableData.filter(item => item.key !== key)
      this.$message.success('操作成功')
    },
    onSigned (key) {
      const tableData = [...this.tableData]
      this.tableData = tableData.map(item => {
        if (item.key === key) item.status = 2
        return item
      })
      this.$message.success('操作成功')
    },
    // 任务签收
    onTaskSign () {
      this.$confirm({
        title: '任务签收后',
        content: '将锁定各级信息录入和提交，是否确定签收任务？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.isSign = !this.isSign
          this.$message.success('操作成功')
        }
      })
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
