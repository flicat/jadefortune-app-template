<template>
  <router-view v-slot="{ Component }">
    <transition :name="transName">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import { inject } from "vue"
const transName = inject('transName')
</script>

<style lang="less" scoped>
.box {
  .top-nav {
    width: 100%;
  }
}
</style>
