import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import plMobile from "pl-mobile2"
import "pl-mobile2/lib/style.css"
import requestPermission from './utils/requestPermission.js'
import directive from './directive/index.js'
<%_ if(options.plugins.includes('vconsole')){ _%>
import VConsole from 'vconsole'
<%_ } _%>
import appContent from './components/appContent.vue'
import initRouterEvent from '@/utils/routerEvent.js'
import appUpdate from '@/utils/update.js'

require('./iconfont/iconfont.js')

const app = createApp(App)
app.use(store)
app.use(router)
app.use(plMobile)
app.use(directive)
app.component('app-content', appContent)
app.mount("#app")

// 路由接管
initRouterEvent(router)

<%_ if(options.plugins.includes('vconsole')){ _%>
if (process.env.PROJECT_ENV !== 'production') {
  new VConsole()
}
<%_ } _%>

document.addEventListener('deviceready', () => {
  if (typeof cordova !== 'undefined') {
    // 权限申请
    requestPermission('INTERNET')
    // 检查更新
    appUpdate()
  }
}, false)
