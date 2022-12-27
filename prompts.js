// https://github.com/SBoudrias/Inquirer.js
module.exports = [
  {
    type: "checkbox",            // 问题类型
    name: "plugins",              // 存储答案的 key
    message: "请选择需要安装的插件",    // 问题的内容
    default: ['vconsole'],  // 未选择时的默认值
    choices: [ // 可选项
      {
        name: 'VConsole', // 选项
        value: 'vconsole' // 选项对应的值
      },
      {
        name: 'eCharts', // 选项
        value: 'echarts' // 选项对应的值
      }
    ]
  }
]
