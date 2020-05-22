<template>
  <div class="nav">
    <a-row class="list">
      <a-col
        :xs="8"
        :sm="6"
        :md="4"
        v-for="(item, index) in menus"
        :key="index"
        @click="onClick(item)"
      >
        <Animated :delay="`${index / 5}s`" name="fadeInDown">
          <router-link
            :to="{path: `/${item.name}`}"
            class="item"
            :class="{active: active === item.name}"
          >
            <component class="icon" :is="`${item.icon}Active`" v-if="active === item.name" />
            <component class="icon" :is="item.icon" v-else />
            <p class="title">{{item.title}}</p>
          </router-link>
        </Animated>
      </a-col>
    </a-row>
    <!-- <ul>
      <li v-for="(item, index) in menus" :key="index" @click="onClick(item)">
        <Animated :delay="`${index / 5}s`" name="fadeInDown">
          <router-link :to="{path: `/${item.name}`}" :class="{active: active === item.name}">
            <component class="icon" :is="`${item.icon}Active`" v-if="active === item.name" />
            <component class="icon" :is="item.icon" v-else />
            <p class="title">{{item.title}}</p>
          </router-link>
        </Animated>
      </li>
    </ul>-->
  </div>
</template>

<script>
import Home from '@/assets/home.svg?inline'
import Report from '@/assets/report.svg?inline'
import Remote from '@/assets/remote.svg?inline'
import Field from '@/assets/field.svg?inline'
import Data from '@/assets/data.svg?inline'
import System from '@/assets/system.svg?inline'
import HomeActive from '@/assets/home-active.svg?inline'
import ReportActive from '@/assets/report-active.svg?inline'
import RemoteActive from '@/assets/remote-active.svg?inline'
import FieldActive from '@/assets/field-active.svg?inline'
import DataActive from '@/assets/data-active.svg?inline'
import SystemActive from '@/assets/system-active.svg?inline'
export default {
  components: {
    Home,
    Report,
    Remote,
    Field,
    Data,
    System,
    HomeActive,
    ReportActive,
    RemoteActive,
    FieldActive,
    DataActive,
    SystemActive
  },
  data () {
    return {
      active: 0,
      menus: [{
        title: '首页',
        name: 'index',
        icon: 'Home'
      }, {
        title: '信息上报',
        name: 'info-report',
        icon: 'Report'
      }, {
        title: '遥感监测',
        name: 'remote-sensing',
        icon: 'Remote'
      }, {
        title: '实地核查',
        name: 'field-audit',
        icon: 'Field'
      }, {
        title: '数据分析',
        name: 'data-analysis',
        icon: 'Data'
      }, {
        title: '系统管理',
        name: 'system',
        icon: 'System'
      }]
    }
  },
  created () {
    this.active = this.$route.path.split('/')[1]
  },
  watch: {
    '$route' () {
      this.active = this.$route.path.split('/')[1]
    }
  },
  methods: {
    onClick (item) {
      this.active = item.name
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  margin: -24px -24px 0;
  padding: 70px 0 90px;
  background: url(../assets/header-bg.png) no-repeat center;
  background-size: cover;
  text-align: center;
  .list {
    display: inline-block;
    margin: 0 auto;
    .item {
      margin: 20px 40px;
      display: block;
      width: 70px;
      height: 70px;
      background: fade(@primary-color, 63%);
      box-shadow: 0px 6px 9px 0px rgba(0, 0, 0, 0.12);
      border-radius: 3px;
      color: #fff;
      padding: 12px 0 0;
      transition: 0.3s all;
      transform-origin: top;
      &.active {
        background: #fff;
        color: @primary-color;
      }
      &:hover {
        transform: translateY(-10px) scale(1.2);
      }
    }
    .icon {
      display: block;
      margin: 0 auto 4px;
    }
    .title {
      margin-top: 8px;
    }
  }
}
</style>
