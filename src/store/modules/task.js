import { getCrumbs, plantingStatistics } from '@/api/info-report'
const task = {
  state: {
    breadcrumb: [],
    status: null,
    type: 1,
    collectTotal: {
      subjectNumTotal: 0,
      plantingAreaTotal: 0,
      salesScaleTotal: 0
    },
    isReport: false
  },

  mutations: {
    SET_BREADCRUMB (state, breadcrumb) {
      state.breadcrumb = breadcrumb
    },
    SET_TASK_STATUS (state, status) {
      state.status = status
      if (status <= 2) {
        // 1种植条目上报
        state.type = 1
      } else {
        // 2交易条目上报
        state.type = 2
      }
    },
    SET_COLLECT_TOTAL (state, data) {
      state.collectTotal = data
    },
    SET_IS_REPORT (state) {
      state.isReport = !state.isReport
    }
  },
  actions: {
    // 面包屑
    GetCrumbs ({ commit }, id) {
      return new Promise((resolve, reject) => {
        getCrumbs({ id }).then(res => {
          const { code, data: { list, status } } = res
          if (code === 200) {
            commit('SET_BREADCRUMB', list)
            commit('SET_TASK_STATUS', status)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 面包屑
    async syncGetCrumbs ({ commit }, id) {
      try {
        const res = await getCrumbs({ id })
        const { code, data: { status } } = res
        if (code === 200) {
          commit('SET_TASK_STATUS', status)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 统计
    async getCollectTotal ({ commit }, taskNO) {
      try {
        const { code, data } = await plantingStatistics({
          taskNO
        })
        if (code === 200) {
          commit('SET_COLLECT_TOTAL', data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default task
