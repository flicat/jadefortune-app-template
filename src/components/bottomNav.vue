<template>
  <pl-cell class="bottom-nav" :span="cellSpan" justify-items="center">
    <router-link class="line-item" active-class="active-item" v-for="item in nav" :key="item.path" :to="item.path">
      <pl-cell :span="[1,1]" direction="column" justify-items="center">
        <pl-icon :name="item.icon"></pl-icon>
        <span>{{item.name}}</span>
      </pl-cell>
    </router-link>
  </pl-cell>
</template>

<script setup>
import { computed, defineProps } from "vue"

const props = defineProps({
  nav: Array
})
const cellSpan = computed(() => {
  return new Array(props.nav.length).fill(1)
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bottom-nav {
  .height(130);
  border-top: 1px solid #e6e6e6;
  background-color: #fff;
  .line-item {
    .font-size(28);
    color: #868686;
    .pl-icon {
      .font-size(40);
    }
  }
  .active-item {
    color: #197ac9;
  }
}
</style>
