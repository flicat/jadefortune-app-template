// https://cli.vuejs.org/dev-guide/generator-api.html
module.exports = (api, options, rootOptions) => {
  // console.log('options----------------------------')
  // console.log(options)
  // console.log('--------------------------------end')
  // 复制template模版
  api.render('./template')
  api.render({
    './package.json': './template/package.json'
  })
}
