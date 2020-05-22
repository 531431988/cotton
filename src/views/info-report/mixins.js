import { auditStateMap, renderTableCol } from '@/libs/utils'
import { entryPageList, noReport, optStatus, saveParent } from '@/api/info-report'
import { mapGetters } from 'vuex'
import store from '@/store'
// 取表格数据
export const getTableData = {
  data () {
    return {
      query: null,
      tableCol: [],
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      spinning: false,
      loading: true
    }
  },
  created () {
    const { query } = this.$route
    this.query = query
    this.onLoadData()
  },
  filters: {
    statusFilter (type) {
      return auditStateMap[type].text
    },
    statusTypeFilter (type) {
      return auditStateMap[type].status
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'taskStatus', 'taskType'])
  },
  watch: {
    taskStatus (newVal) {
      if (newVal) {
        this.tableCol = renderTableCol(newVal)
      }
    }
  },
  methods: {
    // 取表格数据
    onLoadData () {
      entryPageList({
        taskNO: this.query.taskNO,
        entryId: this.query.entryId || '',
        pageNumber: this.pagination.pageNumber,
        pageSize: this.pagination.pageSize,
        type: this.taskType
      }).then(res => {
        const { code, msg } = res
        this.loading = false
        if (code === 200 && Object.keys(res.data).length) {
          const {
            data: {
              pageNumber,
              list = [],
              pageSize,
              total
            }
          } = res
          const pagination = { ...this.pagination }
          pagination.pageNumber = pageNumber
          pagination.pageSize = pageSize
          pagination.total = total
          this.tableData = list
          this.pagination = pagination
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 分页
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.pageNumber = pagination.current
      this.pagination = pager
      this.onLoadData()
    },
    // 零申报
    onZeroDeclare () {
      this.$confirm({
        // 如果有上报信息
        title: '将删除所有下辖行政区已上报信息，并做零申报，是否确定？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.loading = true
          this.spinning = true
          noReport({
            taskNO: this.query.taskNO
          }).then(res => {
            const { code, msg } = res
            this.spinning = false
            if (code === 200) {
              this.$message.success(msg)
              store.commit('SET_IS_REPORT')
              this.onLoadData()
            } else {
              // this.$message.error(msg)
              this.$warning({
                title: '警告',
                content: msg
              })
              this.loading = false
            }
          })
        }
      })
    },
    // 提交信息
    onReport () {
      saveParent({ taskNO: this.query.taskNO, type: this.taskType }).then(res => {
        const { code, msg } = res
        if (code === 200) {
          this.$message.success(msg)
          this.onLoadData()
        } else {
          this.$warning({
            title: '警告',
            content: msg
          })
          // this.$message.error(msg)
        }
      })
    },
    // 审核通过
    onApproved (id) {
      this.optStatus(1, this.query.taskNO, id)
    },
    // 删除
    onDel (id) {
      this.optStatus(3, this.query.taskNO, id)
    },
    // 驳回
    onReject (id) {
      this.optStatus(2, this.query.taskNO, id)
    },
    // 导入回调
    onImportCallback () {
      this.visible = false
      this.onLoadData()
    },
    // 审核通过/驳回/删除上报条目信息 1审核通过，2驳回，3删除
    optStatus (opt, taskNO, entryId) {
      optStatus({
        opt,
        taskNO,
        entryId,
        type: this.taskType
      }).then(res => {
        const { code, msg } = res
        if (code === 200) {
          this.$message.success(msg)
          if ((this.pagination.pageNumber - 1) * this.pagination.pageSize >= this.pagination.total - 1) {
            this.pagination.pageNumber -= 1
          }
          store.dispatch('getCollectTotal', taskNO)
          store.commit('SET_IS_REPORT')
          this.onLoadData()
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
