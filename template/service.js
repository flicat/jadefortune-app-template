const path = require('path')
const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')
const proxy = require('koa-server-http-proxy')
const process = require('process')

const proxyPath = '/GZPHRM'

// 服务器地址
const serviceIp = ({
  dev: 'http://192.183.8.149:8099',    // 开发环境 npm run service -- dev
  test: 'http://192.183.8.240:8099'    // 测试环境 npm run service -- test
})[(process.argv || []).find(arg => /^(dev|test)$/i.test(arg)) || 'dev']

// 静态资源代理
const dist = serve(path.join(__dirname) + '/www/')
app.use(dist)

const proxyTable = {
  // 接口代理
  [proxyPath]: {
    target: `${serviceIp}${proxyPath}`,
    changeOrigin: false,
    pathRewrite: {
      [`^${proxyPath}`]: ''
    }
  }
}

Object.keys(proxyTable).forEach((context) => {
  app.use(proxy(context, proxyTable[context]))
})

app.listen(5001)
console.log('\n service start at http://localhost:5001/\n')
console.log(`\n proxy to ${serviceIp}\n`)
