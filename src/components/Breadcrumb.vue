<template>
  <a-row type="flex" align="middle">
    <a-col>
      <a-icon type="environment" class="mr5" v-color="'t-primary'" />
      <span>当前位置：</span>
    </a-col>
    <a-col>
      <a-breadcrumb>
        <a-breadcrumb-item>
          <router-link to="/">首页</router-link>
        </a-breadcrumb-item>
        <template v-if="dynamic">
          <a-breadcrumb-item>
            <router-link v-if="query" :to="{name: 'info-report'}">信息上报</router-link>
            <span v-else>信息上报</span>
          </a-breadcrumb-item>
          <!-- 面包屑规则 -->
          <!-- 省 -->
          <!-- 任务名> XX市上报信息 > XX镇-上报信息 > XXX村 -->
          <template v-if="$auth('provinces') && query">
            <a-breadcrumb-item v-if="query.cities && query.cities !== 'undefined'">
              <router-link
                v-if="query.areas"
                :to="`/info-report/cities?cities=${query.cities}&status=${query.status}`"
              >{{query.cities}}</router-link>
              <template v-else>{{query.cities}}</template>
            </a-breadcrumb-item>

            <a-breadcrumb-item v-if="query.areas && query.areas !== 'undefined'">
              <router-link
                v-if="query.streets"
                :to="`/info-report/areas?cities=${query.cities}&areas=${query.areas}&status=${query.status}`"
              >{{query.areas}}</router-link>
              <template v-else>{{query.areas}}</template>
            </a-breadcrumb-item>

            <a-breadcrumb-item v-if="query.streets && query.streets !== 'undefined'">
              <router-link
                v-if="query.villages"
                :to="`/info-report/streets?cities=${query.cities}&areas=${query.areas}&streets=${query.streets}&status=${query.status}`"
              >{{query.streets}}</router-link>
              <template v-else>{{query.streets}}</template>
            </a-breadcrumb-item>
          </template>

          <!-- 市 -->
          <!-- XX市上报信息 > XX镇-上报信息 > XXX村 -->
          <template v-if="($auth('cities') || $auth('areas')) && query">
            <a-breadcrumb-item v-if="query.areas && query.areas !== 'undefined'">
              <router-link
                v-if="query.streets"
                :to="`/info-report/areas?areas=${query.areas}&status=${query.status}`"
              >{{query.areas}}</router-link>
              <template v-else>{{query.areas}}</template>
            </a-breadcrumb-item>
            <a-breadcrumb-item v-if="query.streets && query.streets !== 'undefined'">
              <router-link
                v-if="query.villages"
                :to="`/info-report/streets?areas=${query.areas}&streets=${query.streets}&status=${query.status}`"
              >{{query.streets}}</router-link>
              <template v-else>{{query.streets}}</template>
            </a-breadcrumb-item>
          </template>

          <!-- 市 -->
          <!-- XX镇-上报信息 > XXX村 -->
          <template v-if="$auth('streets') && query">
            <a-breadcrumb-item v-if="query.streets && query.streets !== 'undefined'">
              <router-link
                v-if="query.villages"
                :to="`/info-report/streets?streets=${query.streets}&status=${query.status}`"
              >{{query.streets}}</router-link>
              <template v-else>{{query.streets}}</template>
            </a-breadcrumb-item>
          </template>

          <a-breadcrumb-item
            v-if="query && query.villages && query.villages !== 'undefined'"
          >{{query.villages}}</a-breadcrumb-item>
        </template>
        <slot v-else></slot>
      </a-breadcrumb>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    dynamic: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      query: null
    }
  },
  created () {
    const { query } = this.$route
    this.query = Object.keys(this.$route.query).length ? query : null
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
