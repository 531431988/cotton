<template>
  <a-card :bordered="false" class="card-box-shadow">
    <a-row type="flex" slot="title">
      <Breadcrumb />
    </a-row>
    <a-row type="flex" class="mb15">
      <div class="vui-flex-item pr25">
        <Title title="任务列表" />
      </div>
      <a-button class="btn-warning" @click="onAdd" v-if="$auth('provinces')">
        <a-icon type="plus-circle" />新建任务
      </a-button>
    </a-row>
    <a-table :columns="tableCol" :dataSource="tableData" :loading="loading">
      <template v-slot:name="{name, status}">
        <router-link
          v-if="$auth('provinces')"
          :to="`/info-report/cities?cities=${name}&status=${status}`"
        >{{name}}</router-link>
        <router-link
          v-if="$auth('cities') || $auth('areas')"
          :to="`/info-report/areas?areas=${administrative}-上报信息&status=${status}`"
        >{{name}}</router-link>
        <template v-if="$auth('streets')">
          <router-link
            :to="`/info-report/streets?streets=${administrative}-上报信息&status=${status}`"
          >{{name}}</router-link>
        </template>
      </template>
      <template v-slot:status="{ status }">
        <a-badge :status="status | statusTypeFilter" :text="status | statusFilter" />
      </template>
      <template v-slot:action="params" v-if="$auth('provinces')">
        <a-popconfirm
          v-if="params.status === 0 || params.status === 2"
          title="您确定要撤回吗?"
          okText="确定"
          cancelText="取消"
          @confirm="() => onCancel(params.key)"
        >
          <a-button type="link" size="small" class="t-warning">撤回</a-button>
        </a-popconfirm>
        <!-- 弹产销上报操作 -->
        <a-button
          type="link"
          size="small"
          class="t-success"
          v-if="params.status === 1"
          @click="onStart(params)"
        >启动交易信息上报</a-button>
      </template>
    </a-table>
    <AddTask :visible="visible" @on-ok="onAddOk" :data="data" @on-cancel="onCloseModal" />
  </a-card>
</template>

<script>
import { getTaskProvince } from '@/api/task'
import { reportStatusMap } from '@/libs/utils'
import AddTask from './components/AddTask'
import { Breadcrumb } from '@/components'
import { mapState } from 'vuex'

export default {
  components: {
    AddTask,
    Breadcrumb
  },
  data () {
    return {
      tableCol: [],
      tableData: [],
      loading: true,
      visible: false,
      data: null
    }
  },
  created () {
    const { $auth } = this
    const tableCol = [{
      title: '任务名称',
      scopedSlots: { customRender: 'name' }
    }, {
      title: '截止时间',
      dataIndex: 'date'
    }, {
      title: '状态',
      scopedSlots: { customRender: 'status' }
    }, {
      title: '操作',
      scopedSlots: { customRender: 'action' }
    }]
    if ($auth('provinces')) {
      this.tableCol = tableCol
    } else {
      this.tableCol = tableCol.slice(0, 3)
    }
    getTaskProvince().then(res => {
      let { data } = res
      // 湖北省 420000
      // 天门市 429006
      // 黄潭镇 429006106001
      // 根据用户加载不同的数据
      if (!$auth('provinces')) {
        data = [{
          key: '111',
          name: '2020年棉花种植信息上报',
          date: '2020-6-1',
          status: 0
        }, {
          key: '2222',
          name: '2019年棉花种植信息上报',
          date: '2019-6-1',
          status: 2
        }]
      }
      this.tableData = data
      this.loading = false
    })
  },
  computed: {
    ...mapState({
      administrative: state => state.user.userInfo.administrative
    })
  },
  filters: {
    statusFilter (type) {
      return reportStatusMap[type].text
    },
    statusTypeFilter (type) {
      return reportStatusMap[type].status
    }
  },
  methods: {
    // 新建任务
    onAdd () {
      this.visible = true
      this.data = null
    },
    onCloseModal () {
      this.visible = false
      this.data = null
    },
    onAddOk (form, type) {
      if (type) {
        console.log(form)
        this.tableData[this.tableData.length - 1] = form
      } else {
        this.tableData.unshift(form)
      }
      this.visible = false
    },
    // 撤回
    onCancel (key) {
      if (key === 0) {
        const tableData = [...this.tableData]
        this.tableData = tableData.filter(item => item.key !== key)
      } else {
        const tableData = [...this.tableData]
        const index = tableData.findIndex(item => item.key === key)
        tableData[index].status = 1
        this.tableData = tableData
      }
      this.$message.success('操作成功')
    },
    // 启动产销
    onStart (params) {
      this.visible = true
      this.data = params
    }
  }
}
</script>

<style lang="less" scoped>
</style>
