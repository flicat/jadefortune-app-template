// generator.js
module.exports = (api, options, rootOptions) => {
  // 复制template模版
  api.render('./template')
  api.render({
    './package.json': './template/package.json'
  })
}
