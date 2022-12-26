import { createStore } from "vuex"
import { getStore, setStore, delStore } from '@/utils/indexDB.js'
import { on } from '@/utils/event'

const store = createStore({
  state: {
    token: '',
    userInfo: null
  },
  mutations: {
    // 保存token
    async setToken(state, { token, fromStore }) {
      state.token = token
      if (!fromStore) {
        await setStore('public', 'token', token)
      }
    },
    // 保存用户信息
    async setUserInfo(state, { info, fromStore }) {
      state.userInfo = info
      if (!fromStore) {
        await setStore('userInfo', 'user', info)
      }
    },
    // 清除所有store和本地缓存
    async clearAllState(state) {
      state.token = ''
      state.userInfo = null
      delStore('public', 'token')     // 删除token
      delStore('userInfo', 'user')        // 删除用户信息
    }
  }
})

// 获取本地缓存的用户信息
getStore('userInfo', 'user').then(info => {
  store.commit('setUserInfo', { info, fromStore: true })
})

on('logout', () => {
  store.commit('clearAllState')
})

export default store
