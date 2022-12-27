<template>
  <app-content type="search2" :hasBack="false" :hasNav="false" search>
    <template #append>
      <span @click="handlerBack()">取消</span>
    </template>

    <div class="history padding-land" v-if="keywordList && keywordList.length">
      <div class="title">
        <span>搜索历史</span>
        <pl-icon name="icon-delete" @click="delSearchHistory"></pl-icon>
      </div>
      <div class="history-list clearfix">
        <span class="history-item" v-for="keyword in keywordList" @click="keywordSearch(keyword)" :key="keyword">{{keyword}}</span>
      </div>
    </div>
  </app-content>
</template>

<script setup>
import { inject, onMounted, onUnmounted, reactive } from 'vue';
import { on, off, emit } from "@/utils/event"

const keywordList = reactive(['张三', '李四'])
const { $confirm, $toast } = inject('globalProperties')
const isSearch = inject('isSearch')

// 删除历史记录
const delSearchHistory = async () => {
  try {
    await $confirm({
      title: '提示',
      message: '确定要删除历史记录吗！',
      submitText: '确定',
      cancelText: '取消'
    })
  } catch (e) {
    return false
  }
  keywordList.length = 0
  $toast('删除成功')
}

// 搜索历史点击
const keywordSearch = keyword => {
  // ...
  emit('global_search_off')
}

const handlerBack = e => {
  if (e && isSearch.value) {
    e.stop()
  }
  emit('global_search_off')
}

// 回退按钮
onMounted(() => {
  on('back_event', handlerBack, true)
})
onUnmounted(() => {
  off('back_event', handlerBack)
})
</script>

<style lang="less" scoped>
.history {
  .margin-top(32);
  .padding-bottom(40);
  background-color: #fff;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .height(132);
    .line-height(132);
    font-weight: 700;
    color: #495057;
    .font-size(42);
    .pl-icon {
      .font-size(36);
      color: #495057;
    }
  }
}
.history {
  .history-list {
    .margin(-16, -16, 0);
    .history-item {
      line-height: 1em;
      .padding(14, 32);
      float: left;
      .margin(16);
      font-weight: 500;
      color: #495057;
      .font-size(36);
      background-image: linear-gradient(90deg, #f3f9fe 0%, #fcfdff 100%);
      .border-radius(10);
    }
  }
}
</style>
