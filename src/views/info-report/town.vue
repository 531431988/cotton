<template>
  <a-spin :spinning="spinning" tip="正在申报中……">
    <a-card :bordered="false">
      <Breadcrumb slot="title" />
      <ReportCard v-if="$auth('3')" @on-add="visible = true" @on-report="onReport">
        <!-- 种植信息上报中（1）才可以零申报 -->
        <a-button
          type="primary"
          ghost
          class="mr15"
          @click="onZeroDeclare"
          :disabled="taskStatus !== 1"
        >零申报</a-button>
      </ReportCard>
      <a-table
        :columns="tableCol"
        :dataSource="tableData"
        :row-key="record => record.entry_id"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template v-slot:name="{name, entry_id, report_user_code, is_municipality}">
          <!-- 省 -->
          <router-link
            v-if="is_municipality"
            :to="`/info-report/villages?taskNO=${query.taskNO}&entryId=${entry_id}`"
          >{{name}}</router-link>
          <router-link
            v-else
            :to="`/info-report/streets?taskNO=${query.taskNO}&entryId=${entry_id}`"
          >{{name}}</router-link>
        </template>
        <template v-slot:status="{status, saleStatus}" v-if="$auth('2') || $auth('3')">
          <a-badge
            v-if="taskStatus <= 2"
            :status="status | statusTypeFilter"
            :text="status | statusFilter"
          />
          <a-badge
            v-else
            :status="saleStatus | statusTypeFilter"
            :text="saleStatus | statusFilter"
          />
        </template>
        <template
          v-if="$auth('2') || $auth('3')"
          v-slot:action="{status, saleStatus, report_user_code, entry_id, is_municipality}"
        >
          <!-- 1待本级审核（通过、驳回），2本级审核通过（删除本级直辖、下级可驳回），3待上级审核（无），4上级审核通过（无） -->
          <span v-if="status === 1 || saleStatus === 1">
            <a-popconfirm
              title="您确定要审核通过吗？"
              okText="确定"
              cancelText="取消"
              @confirm="onApproved(entry_id)"
            >
              <a-button type="link" size="small" class="t-primary">审核通过</a-button>
            </a-popconfirm>
            <a-divider type="vertical" />
          </span>
          <a-popconfirm
            v-if="(status === 2 || saleStatus === 2) && is_municipality"
            title="您确定要删除吗？"
            okText="确定"
            cancelText="取消"
            @confirm="onDel(entry_id)"
          >
            <a-button type="link" size="small" class="t-error">删除</a-button>
          </a-popconfirm>
          <a-popconfirm
            v-if="(status === 1 || status === 2 || saleStatus === 1 || saleStatus === 2) && report_user_code !== userInfo.area_code"
            title="您确定要驳回吗?"
            okText="确定"
            cancelText="取消"
            @confirm="onReject(entry_id)"
          >
            <a-button type="link" size="small" class="t-warning">驳回</a-button>
          </a-popconfirm>
        </template>
      </a-table>
      <AddReportInfo :visible="visible" @on-ok="onImportCallback" @on-cancel="onImportCallback" />
    </a-card>
  </a-spin>
</template>

<script>
import { renderTableCol } from '@/libs/utils'
import { Breadcrumb } from '@/components'
import ReportCard from './components/ReportCard'
import AddReportInfo from './components/AddReportInfo'
import { getTableData } from './mixins'
import { mapGetters } from 'vuex'
export default {
  components: {
    Breadcrumb,
    ReportCard,
    AddReportInfo
  },
  mixins: [getTableData],
  data () {
    return {
      tableCol: [],
      visible: false
    }
  },
  computed: {
    ...mapGetters(['taskType'])
  },
  created () {
    const tableCol = renderTableCol(this.taskStatus)
    const { $auth } = this
    // 级查看区县不带状态与操作功能
    if ($auth('2')) {
      this.tableCol = tableCol.filter(item => {
        if (item.title !== '审核状态' && item.title !== '操作') {
          return item
        }
      })
    } else {
      this.tableCol = tableCol
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
