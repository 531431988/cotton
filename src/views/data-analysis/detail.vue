<template>
  <a-card>
    <Breadcrumb slot="title" :dynamic="false">
      <a-breadcrumb-item>
        <router-link to="/data-analysis">数据分析</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>详情</a-breadcrumb-item>
    </Breadcrumb>
    <a-form-model :model="form" class="data-analysis-detail-search">
      <a-row>
        <a-col :sm="24" :xl="21">
          <a-row :gutter="52">
            <a-col :sm="24" :md="12" :xl="8">
              <a-form-model-item label="行政区划">
                <a-cascader
                  v-model="form.administrative"
                  :options="administratives"
                  placeholder="请选择行政区划"
                />
              </a-form-model-item>
            </a-col>
            <a-col :sm="24" :md="12" :xl="8">
              <a-form-model-item label="上报年度">
                <a-date-picker
                  v-model="form.year"
                  mode="year"
                  format="YYYY"
                  :open="open"
                  v-width="'100%'"
                  @focus.stop="open = true"
                  @panelChange="onDatePickerChange"
                  @openChange="event => open = event"
                ></a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :sm="24" :md="12" :xl="8">
              <a-form-model-item label="主体类型">
                <a-select v-model="form.type.value" :options="typeList" />
              </a-form-model-item>
            </a-col>
            <a-col :sm="24" :md="12" :xl="8">
              <a-form-model-item label="土地来源">
                <a-select v-model="form.origin.value" :options="originList" v-width="'100%'" />
              </a-form-model-item>
            </a-col>
            <a-col :sm="24" :md="12" :xl="8">
              <a-form-model-item label="种植面积">
                <a-input-group compact>
                  <a-input
                    class="compact-input"
                    v-model="form.plantAreaMin"
                    type="number"
                    placeholder="面积"
                    suffix="亩"
                  />
                  <a-input class="seat" placeholder="—" disabled />
                  <a-input
                    class="compact-input"
                    v-model="form.plantAreaMax"
                    type="number"
                    placeholder="面积"
                    suffix="亩"
                  />
                </a-input-group>
              </a-form-model-item>
            </a-col>
            <a-col :sm="24" :md="12" :xl="8">
              <a-form-model-item label="销售规模">
                <a-input-group compact>
                  <a-input
                    class="compact-input"
                    v-model="form.salesScaleMin"
                    type="number"
                    placeholder="面积"
                    suffix="公斤"
                  />
                  <a-input class="seat" placeholder="—" disabled />
                  <a-input
                    class="compact-input"
                    v-model="form.salesScaleMax"
                    type="number"
                    placeholder="面积"
                    suffix="公斤"
                  />
                </a-input-group>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :sm="24" :xl="{ span: 2, offset: 1}" class="tr">
          <a-form-model-item>
            <a-button type="primary" class="pl25 pr25">查询</a-button>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <Title title="查询结果" class="mt25 mb25">
      <span v-font="16">
        种植主体
        <span class="b">{{mainTotal}}</span>
        个
        种植面积
        <span class="b">{{areaTotal}}</span> 亩
        销售量
        <span class="b">{{salesTotal}}</span> 公斤
      </span>
      <a-button class="btn-warning" slot="extra">
        <a-icon type="download" />导出报表
      </a-button>
    </Title>

    <a-table :columns="tableCol" :dataSource="tableData" :loading="loading"></a-table>
  </a-card>
</template>

<script>
import { Breadcrumb, Title } from '@/components'
import { getDataAnalysisDetail } from '@/api/data-analysis'
export default {
  components: {
    Breadcrumb,
    Title
  },
  data () {
    return {
      form: {
        administrative: [],
        year: null,
        type: {
          label: '全部类型',
          value: 'all'
        },
        origin: {
          label: '全部类型',
          value: 'all'
        },
        plantAreaMin: null,
        plantAreaMax: null,
        salesScaleMin: null,
        salesScaleMax: null
      },
      open: false,
      administratives: [],
      typeList: [{
        label: '全部类型',
        value: 'all'
      }, {
        label: '农户（含种植大户）',
        value: '1'
      }, {
        label: '家庭农场',
        value: '2'
      }, {
        label: '农民合作社',
        value: '3'
      }, {
        label: '农业企业',
        value: '4'
      }],
      originList: [{
        label: '全部类型',
        value: 'all'
      }, {
        label: '划拨',
        value: '1'
      }, {
        label: '承包',
        value: '2'
      }, {
        label: '流转',
        value: '3'
      }, {
        label: '其他',
        value: '4'
      }],
      tableCol: [{
        title: '主体类型',
        dataIndex: 'type'
      }, {
        title: '主体名称',
        dataIndex: 'name',
        align: 'center'
      }, {
        title: '种植地点',
        dataIndex: 'place',
        align: 'center'
      }, {
        title: '种植面积（亩）',
        dataIndex: 'plantingArea',
        align: 'center'
      }, {
        title: '销售规模（公斤）',
        dataIndex: 'salesScale',
        align: 'center'
      }],
      tableData: [],
      mainTotal: null,
      areaTotal: null,
      salesTotal: null,
      loading: true
    }
  },
  created () {
    getDataAnalysisDetail().then(res => {
      const {
        data: {
          mainTotal,
          areaTotal,
          salesTotal,
          list
        }
      } = res
      this.tableData = list
      this.mainTotal = mainTotal
      this.areaTotal = areaTotal
      this.salesTotal = salesTotal
      this.loading = false
    })
  },
  methods: {
    // 日期面板变更时
    onDatePickerChange (value) {
      this.form.year = value
      this.open = false
    },
    // 面积 销售规模变更时
    onInputChange (e, key) {
      const { value } = e.target
      const reg = /^-?[0-9]*(\.[0-9]*)?$/
      console.log((!isNaN(value) && reg.test(value)) || value === '' || value === '-')
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        this.form[key] = value
        console.log(this.form)
      } else {
        console.log(value)
      }
    }
  },
  mounted () {
    // document.querySelector('body').onclick = e => {
    //   const { placeholder } = e.target
    //   console.log(placeholder)
    //   if (!placeholder) {
    //     this.open = false
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.data-analysis-detail-search {
  max-width: none;
  .ant-form-item {
    display: flex;
    margin-bottom: 16px;
  }
  /deep/ .ant-form-item-control-wrapper {
    flex: 1;
  }
  .seat {
    width: 30px;
    text-align: center;
    pointer-events: none;
  }
  .compact-input {
    width: calc((100% - 30px) / 2 + 1px);
  }
}
/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
/deep/ input[type="number"] {
  -moz-appearance: textfield;
}
</style>
