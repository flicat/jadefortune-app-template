<template>
  <app-content type="title" class="block-wrap" :hasNav="true">
    <div class="block user-info margin-land margin-port padding-land padding-port">
      <pl-cell :span="[168,784]" align-items="flex-start">
        <div class="user-photo"></div>
        <div class="user-info">
          <div class="name-num">
            <span class="name">{{userInfo.personName}}</span>
            <span class="num padding-land">{{userInfo.actualPositionLevel}}</span>
          </div>
          <div class="unit-name">{{userInfo.unitName}}</div>
        </div>
      </pl-cell>
    </div>
    <div class="block margin-land margin-port menu-list">
      <div class="menu-item" @click="error">
        <pl-icon name="icon-wd_shoucang"></pl-icon>
        <span class="name">收藏</span>
      </div>
      <div class="menu-item" @click="error">
        <pl-icon name="icon-wd_liulanlishi"></pl-icon>
        <span class="name">浏览历史</span>
      </div>
      <div class="menu-item" @click="error">
        <pl-icon name="icon-wd_yijianfankui"></pl-icon>
        <span class="name">意见反馈</span>
      </div>
    </div>
    <div class="block setting" @click="handlerLogout">退出登录</div>
  </app-content>
</template>

<script setup>
import { inject } from "vue"
import { emit } from '@/utils/event'

const { $confirm, $toast } = inject('globalProperties')

function error() {
  $toast('功能建设中，敬请期待！')
}

// 退出登陆
async function handlerLogout() {
  try {
    await $confirm({
      title: '提示',
      message: '确定要退出登录吗？',
      submitText: '确定',
      cancelText: '取消'
    })
  } catch (e) {
    return e
  }
  emit('logout')
}
</script>

<style lang="less" scoped>
.block-wrap {
  background: linear-gradient(
    180deg,
    #0179fd 0%,
    #0179fd 9.5rem,
    #f5f6f8 9.5rem
  );
  .block {
    .border-radius(10);
    background-color: #fff;
  }
  .user-info {
    .padding-top(32);
    .font-size(42);
    flex-shrink: 0;
    .flex-basis(357);

    .user-photo {
      .width(187);
      .height(263);
      .border-radius(10);
      align-self: center;
      background: url("~@/assets/images/default-police.png") no-repeat 0 0;
      background-size: cover;
    }
    .user-info {
      .padding-left(32);
      .level-more,
      .name-num {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .name-num {
        .margin-bottom(32);
      }
      .name {
        font-weight: 700;
        color: #495057;
        .font-size(52);
        white-space: nowrap;
      }
      .num {
        .padding(12, 32);
        .margin(0,32);
        line-height: 1.2em;
        background-color: #f4f8ff;
        .border-radius(6);
        color: #2d8cf0;
      }
      .level {
        font-weight: 500;
        color: #717376;
      }
      .more {
        font-weight: 500;
        color: #0179fd;
        .margin-left(32);
      }
    }

    .collect {
      .font-size(50);
    }
    .unit-name {
      line-height: normal;
      .margin-top(32);
      .padding-top(32);
      border-top: 1px solid #e5e5e5;
      font-weight: 500;
      color: #495057;
    }
  }
  .box-info {
    .box-list {
      background-color: #fff;
      .border-radius(10);
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .margin-bottom(32);
      .box-item {
        width: 50%;
        .label {
          color: #aaaaaa;
          .font-size(36);
        }
        .value {
          font-weight: 500;
          color: #495057;
          .font-size(42);
          margin: 0;
          max-width: 80%;
          line-height: 2.6em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .menu-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, (223 / @rem));
    align-items: center;
    justify-items: center;
    flex-shrink: 0;
    .flex-basis(446);
    .menu-item {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .pl-icon {
        .font-size(52);
      }
      .name {
        display: block;
        font-weight: 500;
        color: #495057;
        .font-size(36);
        margin-top: 0.5em;
      }
    }
  }
  .setting {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    .height(145);
    .line-height(145);
    font-weight: 700;
    color: #ff473d;
    .font-size(44);
    text-align: center;
  }
}
</style>
