/*!
 * @author liyuelong1020@gmail.com
 * @date 2018/7/17 017
 * @description Description
 */

let SITE_CONFIG

if (process.env.PROJECT_ENV === 'production') {
  /*
   * 正式环境
   * */

  SITE_CONFIG = {
    // api接口请求地址
    baseUrl: 'http://20.97.0.175/GZPHRM/',
    // 静态资源文件夹名称
    staticFileName: '',
    // cdn地址
    cdnUrl: ''
  }
} else if (process.env.PROJECT_ENV === 'uat') {
  /*
   * uat 环境
   * */

  SITE_CONFIG = {
    // api接口请求地址
    baseUrl: 'http://68.32.134.78:7099/GZPHRM/',
    // 静态资源文件夹名称
    staticFileName: '',
    // cdn地址
    cdnUrl: ''
  }
} else if (process.env.PROJECT_ENV === 'testing') {
  /*
   * test 环境
   * */

  SITE_CONFIG = {
    // api接口请求地址
    baseUrl: process.env.NODE_ENV === 'development' ? '/VUE_PROXY/' : 'http://192.183.8.240:8099/GZPHRM/',
    // 静态资源文件夹名称
    staticFileName: '',
    // cdn地址
    cdnUrl: ''
  }
} else if (process.env.PROJECT_ENV === 'dev') {
  /*
   * dev 环境
   * */

  SITE_CONFIG = {
    // api接口请求地址
    baseUrl: process.env.NODE_ENV === 'development' ? '/VUE_PROXY/' : 'http://192.183.8.149:8099/GZPHRM/',
    // 静态资源文件夹名称
    staticFileName: '',
    // cdn地址
    cdnUrl: ''
  }
} else {
  /*
   * 域名就是api请求地址
   * */

  SITE_CONFIG = {
    // api接口请求地址
    baseUrl: '/GZPHRM',
    // 静态资源文件夹名称
    staticFileName: '',
    // cdn地址
    cdnUrl: ''
  }
}

export default SITE_CONFIG
