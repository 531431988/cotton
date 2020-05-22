<template>
  <div class="login">
    <KinesisContainer class="login-bg">
      <KinesisElement>
        <img src="@/assets/login-bg" />
      </KinesisElement>
    </KinesisContainer>
    <Animated name="fadeInUp">
      <div class="login-form">
        <a-row>
          <a-col :span="12">
            <div class="login-banner"></div>
          </a-col>
          <a-col :span="12" class="pl25 pr25 pt40 pb40">
            <div class="mb25">
              <Logo />
            </div>
            <a-form-model ref="form" :model="form" :rules="rules">
              <a-form-model-item prop="username" class="mb20">
                <a-input size="large" v-model="form.username" placeholder="请输入用户名">
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item prop="password" class="mb20">
                <a-input-password
                  size="large"
                  v-model="form.password"
                  placeholder="请输入密码"
                  @pressEnter="handleSubmit"
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input-password>
              </a-form-model-item>
              <a-button
                class="login-btn mt20"
                size="large"
                type="primary"
                block
                @click="handleSubmit"
              >登录</a-button>
            </a-form-model>
          </a-col>
        </a-row>
      </div>
    </Animated>
  </div>
</template>

<script>
import { Logo } from '@/components'
import { KinesisContainer, KinesisElement } from 'vue-kinesis'
export default {
  components: {
    Logo,
    KinesisContainer,
    KinesisElement
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          required: true, message: '用户名不能为空'
        }],
        password: [{
          required: true, message: '密码不能为空'
        }]
      },
      valid: true
    }
  },
  created () {
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate(valid => {
        this.valid = false
        if (valid) {
          // /* global TencentCaptcha */
          // var captcha = new TencentCaptcha('2043908182', res => {
          //   if (res.ticket) {
          //     const { username, password } = this.form
          //     this.$store.dispatch('Login', { username, password }).then(res => this.loginSuccess(res)).catch(err => this.requestFailed(err))
          //   }
          // })
          // captcha.show()
          const { username, password } = this.form
          this.$store.dispatch('Login', { username, password }).then(res => this.loginSuccess(res)).catch(err => this.requestFailed(err))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loginSuccess (res) {
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '您好',
          description: '欢迎回来'
        })
      }, 1000)
    },
    requestFailed (err) {
      this.$notification.error({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }

}
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  // background: url(../assets/login-bg.png) no-repeat;
  // background-size: cover;
  &-bg {
    overflow: hidden;
    height: 100%;
    img {
      position: relative;
      z-index: -1;
      transform: scale(1.1);
    }
  }
  &-form {
    border-radius: 4px;
    background: #fff;
    width: 700px;
    position: absolute;
    top: 50%;
    left: 50%;
    // transform: translate3d(-50%, -50%, 0);
    box-shadow: 0px 10px 34px 0px rgba(104, 131, 127, 0.28);
    animation: fadeInUp 0.5s both;
    overflow: hidden;
  }
  &-banner {
    height: 360px;
    background: url("../assets/login-banner.png") 0 center repeat-x;
    animation: parallax_fg linear 300s infinite both;
  }
  &-btn {
    box-shadow: 0px 10px 34px 0px rgba(104, 131, 127, 0.28);
    border-radius: 4px;
  }
}

@keyframes parallax_fg {
  0% {
    background-position: 1330px 100%;
  }
  100% {
    background-position: 0 100%;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(-50%, 100%, 0) scale(0);
  }

  to {
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 1;
    transform: translate3d(-50%, -50%, 0) scale(1);
  }
}
</style>
