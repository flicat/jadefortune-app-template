<template>
  <pl-cell :span="(type === 'search' || type === 'search2') ? [6,1] : [1,3,1]" :class="['top-nav', 'current-' + type]">
    <template v-if="type === 'title' || type === 'title2'">
      <div class="left-back">
        <pl-icon name="icon-return" v-if="!!hasBack" @click="back"></pl-icon>
      </div>
      <div class="title">{{topTitle}}</div>
      <div class="right-append">
        <slot name="append"></slot>
      </div>
    </template>

    <template v-if="type === 'search' || type === 'search2'">
      <pl-input v-model:value="searchWord" @search="goSearchResult" @focus="goSearch" :autofocus="search" type="search" class="search-input" placeholder="请输入搜索关键字" clearable>
        <template #prepend>
          <pl-icon name="icon-search"></pl-icon>
        </template>
      </pl-input>
      <div class="right-append">
        <slot name="append">
          <router-link class="my-info" to="/my"></router-link>
        </slot>
      </div>
    </template>
  </pl-cell>
</template>

<script setup>
import { computed, defineProps, inject, ref } from "vue"
import { emit } from "@/utils/event"

const store = inject('store')
const route = inject('route')
const router = inject('router')

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
  search: Boolean   // 是否搜索，或者跳转到搜索页
})

const searchWord = ref('')
const topTitle = computed(() => {
  return props.title || route.meta.title
})

// 跳转到搜索页
const goSearch = async () => {
  if (!props.search) {
    emit('global_search')
  }
}

// 跳转到搜索结果页
const goSearchResult = async () => {
  if (props.search && searchWord.value) {
    // ...
    emit('global_search_off')
    searchWord.value = ''
  }
}

// 返回
function back() {
  if (typeof props.hasBack === 'function') {
    props.hasBack()
  } else {
    router.back()
  }
}

</script>

<style lang="less" scoped>
.top-nav {
  .padding(0, 41);
  .height(126);
  &.current-search,
  &.current-title {
    color: #fff;
    background: linear-gradient(180deg, #4299f2 0%, #71b2f6 100%);
  }
  &.current-search2,
  &.current-title2 {
    background-color: #fff;
    color: #666;
  }
  .left-back {
    .font-size(52);
  }
  .title {
    .font-size(52);
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .right-append {
    justify-self: flex-end;
    font-weight: 500;
    .font-size(48);
    .my-info {
      display: block;
      .width(64);
      .height(64);
      background: url("~@//assets/images/icon-my.png") no-repeat 0 0;
      background-size: contain;
    }
  }
  .search-input {
    .border-radius(44);
    font-weight: 500;
    .font-size(40);
    :deep(.pl-input-inner) {
      .padding(10, 0);
    }
  }
  &.current-search {
    .search-input {
      color: #fff;
      background-color: rgba(255, 255, 255, 0.3);
      :deep(.pl-input-inner) {
        input::placeholder {
          color: #eee;
        }
      }
      .pl-icon {
        color: #fff;
      }
    }
    .right-append {
      a {
        color: #fff;
      }
    }
  }
  &.current-search2 {
    .search-input {
      color: #495057;
      background-color: #f8f9fa;
      :deep(.pl-input-inner) {
        input::placeholder {
          color: #aaa;
        }
      }
      .pl-icon {
        color: #aaa;
      }
    }
    .right-append {
      a {
        color: #495057;
      }
    }
  }
  .pl-icon {
    display: block;
  }
}
</style>
