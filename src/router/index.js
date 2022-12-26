import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index.js'
import { getStore } from '@/utils/indexDB.js'
import { on, emit } from '@/utils/event'

const _import = file => ({
  default: () => import('../views/' + file + '.vue'),
  Search: () => import('../views/search/search.vue')
})

// 获取 token
async function getToken() {
  let token = store.state.token
  if (!token) {
    // 从本地缓存中获取token
    token = await getStore('public', 'token')
    // 保存token
    if (token) {
      store.commit('setToken', { token, fromStore: true })
    }
  }
  return token
}

// 检查token
function checkToken(flag, callback) {
  return async function (to, from, next) {
    const hasToken = await getToken()
    if (!!hasToken === flag) {
      next()
    } else {
      callback(next)
    }
  }
}

const routes = [
  { path: '/404', name: '404', components: _import('error/index'), meta: { title: '404未找到' } },
  { path: '/login', name: 'login', components: _import('login/index'), meta: { title: '登陆' }, beforeEnter: [checkToken(false, next => next({ path: '/' }))] },
  {
    path: '/',
    name: 'index',
    redirect: { path: '/home' },
    components: _import('layout/index'),
    children: [
      { path: '/home', name: 'home', components: _import('home/my'), meta: { title: '我的' } },
    ],
    beforeEnter: [checkToken(true, next => next({ path: '/login' }))]
  },
  { path: '/:pathMatch(.*)', redirect: { path: '/404' } }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  // 设置页面标题
  document.title = to.meta.title
  // 触发页面change事件
  emit('pageChange')
})

on('logout', () => {
  router.replace({ path: '/login' })
})

export default router;
