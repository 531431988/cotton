<template>
  <a-card :bordered="false" class="card-box-shadow" :bodyStyle="{padding: '50px 24px'}">
    <Breadcrumb slot="title" :dynamic="false">
      <a-breadcrumb-item>修改密码</a-breadcrumb-item>
    </Breadcrumb>
    <a-row type="flex" justify="center">
      <a-col :span="14">
        <a-form-model
          ref="form"
          :model="form"
          :rules="rules"
          v-bind="{
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
          }"
        >
          <a-form-model-item has-feedback label="当前密码" prop="password">
            <a-input-password v-model="form.password" :maxLength="16" allowClear />
          </a-form-model-item>
          <a-form-model-item has-feedback label="新密码" prop="newPassword">
            <a-input-password
              v-model="form.newPassword"
              autocomplete="off"
              :maxLength="16"
              allowClear
              @change="onChange"
              @focus="onFocus"
            />
            <a-popover
              v-model="visible"
              trigger="contextmenu"
              placement="right"
              :destroyTooltipOnHide="true"
            >
              <div class="tc t-primary" slot="content">
                <template v-if="intensity === 0">
                  <ExpressionlessSvg />
                  <div>密码强度：弱</div>
                </template>
                <template v-if="intensity === 1">
                  <StareSvg />
                  <div>密码强度：中</div>
                </template>
                <template v-if="intensity === 2">
                  <HappySvg />
                  <div>密码强度：强</div>
                </template>
              </div>
              <span>&nbsp;</span>
            </a-popover>
          </a-form-model-item>
          <a-form-model-item has-feedback label="再次确认新密码" prop="checkNewPassword">
            <a-input-password
              v-model="form.checkNewPassword"
              autocomplete="off"
              :maxLength="16"
              allowClear
            />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
            <a-button type="primary" @click="onSubmit">提交</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import ExpressionlessSvg from '@/assets/expressionless'
import StareSvg from '@/assets/stare'
import HappySvg from '@/assets/happy'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    ExpressionlessSvg,
    StareSvg,
    HappySvg
  },
  data () {
    /* eslint-disable */
    let checkPending
    const checkStrong = sValue => {
      var modes = 0
      // 正则表达式验证符合要求的
      if (sValue.length < 1) return modes
      if (/\d/.test(sValue)) modes++ // 数字
      if (/[a-z|A-Z]/.test(sValue)) modes++ // 小写 大写
      if (/\W/.test(sValue)) modes++ // 特殊字符

      // 逻辑处理
      switch (modes) {
        case 1:
          return 1
          break
        case 2:
          return 2
          break
        case 3:
          return sValue.length < 10 ? 2 : 3
          break
      }
      return modes
    }
    const checkPassword = (rule, value, callback) => {
      clearTimeout(checkPending)
      // checkPending = setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error('当前密码错误'))
      //   } else {
      //     callback()
      //   }
      // }, 1000)
      callback()
    }
    const validatePass = (rule, value, callback) => {
      var intensity = checkStrong(value)
      if (intensity > 1 || intensity === 1) {
        this.intensity = 0
      }
      if (intensity > 2 || intensity === 2) {
        this.intensity = 1
      }
      if (intensity === 3) {
        this.intensity = 2
      }
      if (this.form.checkNewPassword !== '') {
        this.$refs.form.validateField('checkNewPassword')
      }
      callback()
    }
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error('两次密码不一至，请重新输入'))
      } else {
        callback()
      }
    }
    const defaultRule = [{ required: true, message: '此项必填' }, { min: 6, message: '密码长度最少6位，最多12位' }]
    return {
      form: {
        password: '',
        newPassword: '',
        checkNewPassword: ''
      },
      rules: {
        password: [...defaultRule, { validator: checkPassword, trigger: 'blur' }],
        newPassword: [...defaultRule, { validator: validatePass, trigger: 'change' }],
        checkNewPassword: [...defaultRule, { validator: validatePass2, trigger: 'blur' }]
      },
      visible: false,
      intensity: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    ...mapActions(['Logout']),
    onChange (e) {
      if (e.target.value !== '') this.visible = true
    },
    onFocus () {
      if (this.form.newPassword !== '') this.visible = true
    },
    onSubmit () {
      const { user_name } = this.userInfo
      const { password, newPassword } = this.form
      this.$refs.form.validate(valid => {
        if (valid) {
          // 成功后的操作
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
