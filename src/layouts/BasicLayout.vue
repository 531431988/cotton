<template>
  <a-layout style="min-height: 100vh;">
    <a-layout-header class="header">
      <a-row type="flex" justify="center">
        <a-col :md="22" :xl="20">
          <div class="vui-flex vui-flex-middle">
            <div class="vui-flex-item">
              <Logo />
            </div>
            <UserMenu />
          </div>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content style="padding-top: 64px; height: 100%;margin: 24px 24px 0px;">
      <Nav />
      <a-row type="flex" justify="center">
        <a-col :md="22" :xl="20">
          <transition name="fadeUp">
            <RouteView style="margin: -36px auto 36px" />
          </transition>
        </a-col>
      </a-row>
    </a-layout-content>

    <a-layout-footer>Copyright©2020 武汉光谷信息技术有限公司 版权所有</a-layout-footer>
    <a-back-top />
  </a-layout>
</template>

<script>

import { Logo } from '@/components'
import RouteView from './RouteView'
import Nav from '@/components/Nav'
import UserMenu from '@/components/UserMenu'
export default {
  name: 'BasicLayout',
  components: {
    Logo,
    RouteView,
    Nav,
    UserMenu
  },
  data () {
    return {
    }
  }

}
</script>

<style lang="less" scoped>
.header {
  border-top: 3px solid rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.2s;
  background-color: #fff;
  box-shadow: 0px 6px 9px 0px rgba(0, 0, 0, 0.12);
}
.ant-layout-footer {
  background: rgba(83, 80, 80, 1);
  color: #fff;
  text-align: center;
  padding: 20px;
}
</style>
