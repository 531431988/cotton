<template>
  <a-modal
    title="录入信息"
    okText="确定"
    cancelText="清除导入信息"
    :visible="visible"
    :keyboard="false"
    :maskClosable="false"
    width="50%"
    @ok="onOk"
    @cancel="onCancel"
  >
    <div style="min-height: 300px">
      <a-button class="mr15" @click="onDownloadExcelTemplate">
        <a-icon type="download" />
        {{status === '2' ? '下载已上报种植信息' : '下载种植信息上报模板'}}
      </a-button>
      <a-upload
        :fileList="fileList"
        name="file"
        accept=".xls, .xlsx"
        :showUploadList="false"
        :action="$config.upload"
        :beforeUpload="beforeUpload"
        @change="onChange"
      >
        <a-button type="primary">
          <a-icon type="upload" />导入报表
        </a-button>
      </a-upload>
      <div class="pd25" v-if="status === '2' && !fileList.length">
        <p>杨泗潭村：种植主体XXX，种植面积XXX亩</p>
        <p>杨泗潭村：种植主体XXX，种植面积XXX亩</p>
        <p>杨泗潭村：种植主体XXX，种植面积XXX亩</p>
        <p>杨泗潭村：种植主体XXX，种植面积XXX亩</p>
      </div>
      <div class="pd25" v-if="status === '2' && fileList.length">
        <p>杨泗潭村已导入：销售规模XXX公斤；</p>
        <p>杨泗潭村已导入：销售规模XXX公斤；</p>
        <p>杨泗潭村已导入：销售规模XXX公斤；</p>
        <p>杨泗潭村已导入：销售规模XXX公斤；</p>
      </div>
      <div class="pd25" v-if="status !== '2'&& fileList.length">
        <div>杨泗潭村已导入</div>
        <p>种植主体合计 XXX 个，种植面积合计 XXX 亩；</p>
        <div>XXXX村已导入：</div>
        <p>种植主体合计 XXX 个，种植面积合计 XXX 亩；</p>
        <div>XXXX村已导入：</div>
        <p>种植主体合计 XXX 个，种植面积合计 XXX 亩；</p>
      </div>
    </div>
  </a-modal>
</template>

<script>
import excel from '@/libs/excel'
import { auditStateMap } from '@/libs/utils'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fileList: [],
      status: null
    }
  },
  created () {
    this.status = this.$route.query.status
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
    onDownloadExcelTemplate () {
      const params = {
        title: ['上报地区', '种植主体总计', '种植面积总计'],
        key: ['reportArea', 'mainTotal', 'areaTotal'],
        data: [],
        autoWidth: true,
        filename: '种植信息上报模板'
      }
      excel.export_array_to_excel(params)
    },
    onCancel () {
      this.fileList = []
      this.$emit('on-cancel')
    },
    onOk () {
      this.fileList = []
      this.$emit('on-ok', this.status)
    },
    beforeUpload (file) {
      this.fileList.push(file)
      this.readFile(file)
    },
    onChange (info) {
      // const status = info.file.status
    },
    // 读取文件
    readFile (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadstart = e => {
      }
      reader.onprogress = e => {
      }
      reader.onerror = e => {
        this.$message.error('文件读取出错')
      }
      reader.onload = e => {
        this.$message.info('上传成功')
        const data = e.target.result
        const { header, results } = excel.read(data, 'array')
        const tableCol = header.map(item => { return { title: item, key: item } })
        this.tableData = results
        this.tableCol = tableCol
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
