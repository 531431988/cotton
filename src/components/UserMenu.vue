<template>
  <div class="user-wrapper">
    <span class="action">用户名：{{ userInfo && userInfo.name }}</span>
    <span class="action">
      <a-icon type="unlock" />&nbsp;
      <router-link to="/user/modify-password">修改密码</router-link>
    </span>
    <span class="action" @click="handleLogout">
      <a-icon type="logout" />&nbsp;
      <span>退出登录</span>
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UserMenu',
  components: {
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          return this.Logout({}).then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 16)
          }).catch(err => {
            this.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
<style lang="less">
.user-wrapper {
  height: 64px;
  overflow: hidden;
  .action {
    overflow: hidden;
    white-space: nowrap;
    padding: 0 12px;
    display: inline-block;
    transition: all 0.3s;
    height: 100%;
    &:not(:first-child) {
      cursor: pointer;
      a {
        color: #333;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
}
</style>
