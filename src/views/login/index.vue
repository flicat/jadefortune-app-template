<template>
  <div class="box" v-loading:登录中…="loadingTarget.login">
    <pl-form class="login-form" :showError="false">
      <p class="face-tips">
        <i class="icon-face-login"></i>
        <span>为了保障您的账号信息安全，请进行<br />人脸识别验证登录</span>
      </p>
      <pl-cell :span="[1]">
        <pl-button class="btn-login" type="primary" @click="authLoginHandler">登录</pl-button>
      </pl-cell>
      <pl-checkbox class="agreement" v-model:value="agreement" :trueValue="true" :falseValue="false">
        <div class="link">我已阅读并同意<router-link to="/">《用户协议》</router-link>和<router-link to="/">《使用手册》</router-link>
        </div>
      </pl-checkbox>
    </pl-form>
  </div>
</template>

<script setup>
import { inject, reactive, ref } from "vue"

const router = inject('router')
const store = inject('store')

const { $toast } = inject('globalProperties')

// 阅读并同意
const agreement = ref(false)

const loadingTarget = reactive({
  login: false
})

const authLoginHandler = async () => {
  if (!agreement.value) {
    return $toast('请阅读并同意《用户协议》和《使用手册》')
  }

  loadingTarget.login = true

  store.commit('setToken', { token: `${Math.random()}-${Date.now()}` })

  setTimeout(() => {
    loadingTarget.login = false
    router.replace({ path: '/welcome' })
  }, 1000)
}
</script>

<style lang="less" scoped>
.box {
  .padding-top(710);
  display: flex;
  flex-direction: column;
  background: url(../../assets/images/bg-login.jpg) no-repeat 0 0;
  background-size: 100% auto;

  .login-form {
    .padding(80, 64, 180);
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #fff;
    .border-radius(80, 80, 0, 0);
    .btn-login {
      font-weight: 900;
      .font-size(52);
    }
    .agreement {
      margin-top: auto;
      padding: 0;
      align-self: center;
      font-weight: 500;
      .link {
        position: relative;
        z-index: 11;
      }
    }
    .face-tips {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon-face-login {
        display: block;
        .width(408);
        .height(480);
        .margin-bottom(64);
        background: url("~@/assets/images/icon.png") no-repeat 50% 50%;
        background-size: contain;
      }
      span {
        font-weight: 700;
        color: #495057;
        .font-size(48);
        .line-height(72);
        text-align: center;
      }
    }
  }
}
</style>
