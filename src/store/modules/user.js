import Vue from 'vue'
import { login, getInfo, logout } from '@/api/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
  state: {
    token: null,
    userInfo: null,
    // ['provinces', 'cities', 'areas', 'streets', 'villages'] // 省 市 镇（县） 乡 村庄
    role: ''
  },

  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER_INFO (state, userInfo) {
      state.userInfo = userInfo
    },
    SET_ROLE (state, role) {
      state.role = role
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          const { data: { token } } = res
          Vue.ls.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', token)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo({ token: state.token }).then(res => {
          const { data } = res
          if (data) {
            commit('SET_USER_INFO', data)
            commit('SET_ROLE', data.role)
          } else {
            reject(new Error('用户信息为空'))
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', null)
          window.location = '/login'
          commit('SET_ROLE', '')
          commit('SET_USER_INFO', null)
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
