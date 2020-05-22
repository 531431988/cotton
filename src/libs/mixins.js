// 重建表头
import { auditStateMap, renderTableCol } from '@/libs/utils'
import { mapState } from 'vuex'
export const RenderTableCol = {
  data () {
    return {
      query: null,
      tableCol: [],
      tableData: []
    }
  },
  created () {
    const { query } = this.$route
    this.query = query

    const tableCol = renderTableCol(query.status)
    if (this.$auth('provinces')) {
      this.tableCol = tableCol.slice(0, 3)
    } else {
      this.tableCol = tableCol
    }
  },
  computed: {
    ...mapState({
      role: state => state.user.role
    })
  },
  filters: {
    statusFilter (type) {
      return auditStateMap[type].text
    },
    statusTypeFilter (type) {
      return auditStateMap[type].status
    }
  }
}
