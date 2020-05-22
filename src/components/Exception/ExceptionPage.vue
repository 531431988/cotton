<template>
  <a-row type="flex" align="middle" justify="center" class="error">
    <a-col>
      <Error404 v-if="type === '404'" class="imgEle" />
    </a-col>
    <a-col>
      <div class="content">
        <h1>404</h1>
        <div class="desc">抱歉，你访问的页面不存在或仍在开发中</div>
        <div class="actions">
          <a-button type="primary" size="large" @click="handleToHome">返回首页</a-button>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import Error404 from './Error404'

export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  components: {
    Error404
  },
  data () {
    return {
    }
  },
  methods: {
    handleToHome () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style lang="less">
@import "~ant-design-vue/lib/style/index";
.error {
  height: 100%;

  .imgEle {
    max-width: 430px;
  }

  .content {
    padding-left: 48px;
    h1 {
      margin-bottom: 24px;
      color: #434e59;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }

    .desc {
      margin-bottom: 16px;
      color: @text-color-secondary;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
