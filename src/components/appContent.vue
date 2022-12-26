<template>
  <main class="app-content flex">
    <globalTitle :type="type" :title="title" :hasBack="hasBack" :search="search">
      <template #append>
        <slot name="append"></slot>
      </template>
    </globalTitle>
    <div class="flex-wrap">
      <div class="flex-content" v-bind="$attrs">
        <slot></slot>
      </div>
    </div>
    <bottomNav v-if="hasNav" :nav="navList"></bottomNav>
  </main>
</template>

<script setup>
import { computed, defineProps, inject } from "vue"
import bottomNav from './bottomNav.vue'
import globalTitle from './globalTitle.vue'

const props = defineProps({
  type: {              // 头部类型
    type: String,   // search/title/title2
    default: 'search'
  },
  title: {              // 头部标题
    type: String,
    default: ''
  },
  hasBack: {        // 是否有返回按钮
    type: [Boolean, Function],
    default: true
  },
  hasNav: {        // 是否有底部菜单
    type: Boolean,
    default: true
  },
  search: Boolean   // 是否搜索，或者跳转到搜索页
})

const store = inject('store')

const navList = computed(() => store.state.bottomNav)
</script>

<style lang="less" scoped>
.app-content {
  background-color: #f8f9fa;
}
</style>
