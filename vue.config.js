const webpack = require('webpack')
const merge = require('webpack-merge')
const env = process.env

// 转发代理的路径
const proxyPath = '/VUE_PROXY'

// 接口代理列表
const proxyList = {
  // 测试环境
  testing: {
    target: 'http://192.183.8.240:8099/GZPHRM/',
    secure: false,
    pathRewrite: {
      [`^${proxyPath}`]: ''
    }
  },
  // 开发环境
  dev: {
    target: 'http://192.183.8.149:8099/GZPHRM/',
    secure: false,
    pathRewrite: {
      [`^${proxyPath}`]: ''
    }
  }
}

module.exports = {
  publicPath: './',
  outputDir: 'www',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        // lessOptions, prependData, appendData, sourceMap, implementation
        prependData: `@import "~@/assets/less/mixin.less";`
      }
    }
  },
  configureWebpack: {
    output: {
      filename: '[name].[hash].js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': merge(env, {
          'PROJECT_ENV': '"' + process.env.PROJECT_ENV + '"'
        })
      })
    ]
  },
  devServer: {
    proxy: {
      [proxyPath]: proxyList[process.env.PROJECT_ENV]
    }
  }
}
