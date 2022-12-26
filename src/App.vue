<template>
  <router-view :key="route.fullPath" v-slot="{ Component }" v-show="!isSearch">
    <transition :name="transName">
      <component :is="Component" />
    </transition>
  </router-view>
  <router-view name="Search" v-show="isSearch"></router-view>
</template>

<script setup>
import { getCurrentInstance, onMounted, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { on } from '@/utils/event'

const app = getCurrentInstance()
const router = useRouter()
const route = useRoute()
const store = useStore()

const isSearch = ref(false)
const transName = ref('slide-left')

provide('isSearch', isSearch)
provide('transName', transName)
provide('router', router)
provide('route', route)
provide('app', app)
provide('globalProperties', app.appContext.config.globalProperties)
provide('store', store)

onMounted(() => {
  // 退出APP设置
  let backCount = 0
  // 全局搜索事件
  on('global_search', () => {
    isSearch.value = true
  })
  on('global_search_off', () => {
    isSearch.value = false
  })

  // 后退
  on('history_back', () => {
    transName.value = 'slide-right'
  })
  // 前进
  on('history_go', () => {
    transName.value = 'slide-left'
    // 清空两次返回退出APP的计数
    backCount = 0
  })
  // 返回事件,如果历史记录是最后一条按两次返回则退出APP
  on('back_event', e => {
    if (e.data.history === 1 || route.path === '/login') {
      backCount++
      // 首页点击两次退出APP
      if (backCount > 1) {
        navigator.app.exitApp() //退出app
      } else if (backCount > 0) {
        app.appContext.config.globalProperties.$toast('再按一次退出APP')
      }
    }
  })
})
</script>

<style lang="less">
@import "./assets/less/index.less";
</style>
