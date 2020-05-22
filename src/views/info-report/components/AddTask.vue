<template>
  <a-modal
    :destroyOnClose="true"
    title="新建任务"
    :okText="`启动${disabled ? '交易' : '种植'}信息上报`"
    cancelText="取消"
    :visible="visible"
    :keyboard="false"
    :maskClosable="false"
    width="600px"
    @ok="onOk"
    @cancel="$emit('on-cancel')"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 15 }"
    >
      <a-form-model-item label="任务名称" prop="name">
        <a-input v-model="form.name" placeholder="请输入任务名称" :disabled="disabled" />
      </a-form-model-item>
      <a-form-model-item label="任务模板" prop="template">
        <a-select
          v-model="form.template"
          :options="template"
          placeholder="请选择任务模板"
          :disabled="disabled"
        />
      </a-form-model-item>
      <a-form-model-item label="截止时间" prop="date">
        <a-date-picker v-model="form.date" placeholder="请选择截止时间" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ offset: 6 }">
        <a-radio-group v-if="!data" defaultValue="0">
          <a-radio value="0">种植信息上报</a-radio>
          <a-radio value="1" disabled>交易信息上报</a-radio>
        </a-radio-group>
        <a-radio-group v-else defaultValue="1">
          <a-radio value="0" disabled>种植信息上报</a-radio>
          <a-radio value="1">交易信息上报</a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => (null)
    }
  },
  data () {
    return {
      form: {},
      rules: {
        name: [{ required: true, message: '名称不能为空' }],
        template: [{ required: true, message: '模板不能为空' }],
        date: [{ required: true, message: '上报截止时不能为空' }]
      },
      template: [{
        label: '湖北省2020年棉花种植信息上报模板',
        value: '0'
      }],
      typeList: [{
        label: '种植信息上报',
        value: '0',
        disabled: !!this.data
      }, {
        label: '交易信息上报',
        value: '1',
        disabled: !this.data
      }]
    }
  },
  computed: {
    disabled () {
      return this.data !== null
    }
  },
  watch: {
    visible () {
      if (this.data) {
        this.form = {
          name: this.data.name,
          template: '0',
          date: moment(this.data.date)
        }
      } else {
        this.form = {
          name: null,
          template: '0',
          date: null
        }
      }
    }
  },
  methods: {
    disabledDate (current) {
      return current > moment().endOf('day')
    },
    onOk () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { name, date, template } = this.form
          // 启动上报的时候更新数据
          this.$emit('on-ok', {
            name,
            date: moment(date).format('YYYY-MM-DD'),
            template,
            status: this.data ? 2 : 0,
            key: `${Date.now()}`
          }, this.data ? 1 : 0)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
