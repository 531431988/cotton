<template>
  <a-drawer
    title="查看详情"
    placement="right"
    width="550"
    :closable="false"
    @close="$emit('on-cancel')"
    :visible="visible"
  >
    <a-form class="form-info form-item-sm" layout="horizontal" labelAlign="left">
      <template v-if="main">
        <Title title="主体信息" class="mb10" />
        <a-form-item label="主体类型">{{main.type}}</a-form-item>
        <a-form-item label="主体名称（姓名）">{{main.name}}</a-form-item>
        <a-form-item label="证件类型">{{main.certificateType}}</a-form-item>
        <a-form-item label="证件号码">{{main.cardId}}</a-form-item>
        <a-form-item label="所属行政区划">{{main.district}}</a-form-item>
        <a-form-item label="详细地址">{{main.address}}</a-form-item>
        <a-form-item label="联系电话（手机号）">{{main.phone}}</a-form-item>
        <a-form-item label="主体性质">{{main.nature}}</a-form-item>
        <a-form-item label="土地来源">{{main.origin}}</a-form-item>
      </template>
      <template v-if="plant">
        <a-divider />
        <Title title="种植信息" class="mb10" />
        <a-form-item label="种植地点">{{plant.lace}}</a-form-item>
        <a-form-item label="种植面积（亩）">{{plant.plantingArea}}</a-form-item>
        <a-form-item label="种植品种">{{plant.variety}}</a-form-item>
        <a-form-item label="平均单产（籽棉）">{{plant.averageYield}} 公斤/亩</a-form-item>
        <a-form-item label="总产量（籽棉）">{{plant.total}}</a-form-item>
      </template>
      <template v-if="(query.status === '2' || query.status === '3') && sell">
        <a-divider />
        <Title title="交易信息" class="mb10" />
        <a-form-item label="销售规模（籽棉）">{{sell.salesScale}} 公斤</a-form-item>
        <a-form-item label="平均销售价格（籽棉）">{{sell.averagePrice}} 元/公斤</a-form-item>
      </template>
    </a-form>
  </a-drawer>
</template>

<script>
import { getVillageInfo } from '@/api/task'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      main: null,
      plant: null,
      sell: null
    }
  },
  created () {
    const { query } = this.$route
    this.query = query

    getVillageInfo({ key: 1 }).then(res => {
      const { data: { main, plant, sell } } = res
      this.main = main
      this.plant = plant
      this.sell = sell
    })
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.form-info {
  /deep/.ant-form-item {
    display: flex;
  }
  /deep/.ant-form-item-control-wrapper {
    flex: 1;
    color: #333;
    font-weight: 500;
  }
}
</style>
