const path = require('path')
const fs = require('fs')
const pkg = require('./package.json')
const execSync = require('child_process').execSync

const { dependencies = {}, devDependencies = {} } = pkg;
const pkgList = [].concat(Object.entries(dependencies), Object.entries(devDependencies))

// 获取版本号信息
function getVersion(version) {
  const rangeReg = /^(\d+\.\d+\.\d+)\s?-\s?(\d+\.\d+\.\d+)$/
  const numberReg = /(?=(^|.))(\d+|x)(?=(\.|$))/ig
  let range = version.match(rangeReg)
  let number = null
  // 范围号版本
  if (range) {
    range = range.slice(1).map(item => item.match(numberReg))
  } else {
    number = version.split('-')[0].match(numberReg)
  }
  return {
    number,
    range,
    version: number && number.join('.') || null,
    greater: /^>/.test(version),                // 大于某个版本
    greaterEqual: /^>=/.test(version),          // 大于或等于某个版本
    less: /^</.test(version),                   // 小于某个版本
    lessEqual: /^<=/.test(version),             // 小于或等于某个版本
    probably: /^~/.test(version),               // 大概匹配某个版本
    compatible: /^\^/.test(version),            // 兼容某个版本
    any: !version || /^\*$/.test(version),      // 任意版本
    net: /^\w+\+/.test(version),                // 来自网络
    local: /^file:/.test(version),                // 来自本地
  }
}

// 版本号转成数字
function getNumberVersion(versions) {
  return versions.map(versionNum => {
    const [x, y, z] = versionNum
    return Number([x, y, z].map(item => {
      if (!item || !/^\d+$/.test(item)) {
        return '000'
      } else {
        return String(item).padStart(3, '0')
      }
    }).join(''))
  })
}

// 版本范围
function checkRange(range, version2) {
  const [v1, v2, v3] = getNumberVersion([...range, version2])
  return v3 >= v1 && v3 < v2
}
// 大于某个版本>
function checkGreater(version1, version2) {
  const [v1, v2] = getNumberVersion([version1, version2])
  return v1 > v2
}
// 大于或等于某个版本>=
function checkGreaterEqual(version1, version2) {
  const [v1, v2] = getNumberVersion([version1, version2])
  return v1 >= v2
}
// 小于某个版本<
function checkLess(version1, version2) {
  return !checkGreaterEqual(version1, version2)
}
// 小于或等于某个版本<=
function checkLessEqual(version1, version2) {
  return !checkGreater(version1, version2)
}
// 等于某个版本=
function checkEqual(version1, version2) {
  // 处理x版本号
  version1 = version1.map((item, index) => !/^\d+$/.test(item) ? version2[index] : item)
  const [v1, v2] = getNumberVersion([version1, version2])
  return v1 === v2
}
// 大概匹配某个版本~
function checkProbably(version1, version2) {
  let [x, y, z] = version1
  if (!/^(0|x)$/i.test(y) || (!/^(0|x)$/i.test(z) && /^0$/i.test(y))) {
    y = String(Number(y) + 1)
    z = '0'
  } else {
    x = String(Number(x) + 1)
    y = z = '0'
  }
  const [v1, v2, v3] = getNumberVersion([version1, [x, y, z], version2], '0')
  return v3 >= v1 && v3 < v2
}
// 兼容某个版本^
function checkCompatible(version1, version2) {
  const nextVersion = [...version1]
  let index = nextVersion.findIndex(n => !/^(0|x)$/i.test(n))
  if (index < 0) {
    index = nextVersion.lastIndexOf('0')
  }
  nextVersion[index] = String(Number(nextVersion[index]) + 1)
  for (i = index + 1; i < nextVersion.length; i++) {
    nextVersion[i] = '0'
  }
  const [v1, v2, v3] = getNumberVersion([version1, nextVersion, version2], '0')
  return v3 >= v1 && v3 < v2
}

// 版本号比较
function compareVersion(version1, version2) {
  let version = getVersion(version1)
  let installVersion = getVersion(version2)

  if (version.any || version.net) {
    return true
  }
  if (version.range) {
    return checkRange(version.range, installVersion.number)
  } else if (version.greaterEqual) {
    return checkGreater(version.number, installVersion.number)
  } else if (version.greaterEqual) {
    return checkGreaterEqual(version.number, installVersion.number)
  } else if (version.less) {
    return checkLess(version.number, installVersion.number)
  } else if (version.lessEqual) {
    return checkLessEqual(version.number, installVersion.number)
  } else if (version.probably) {
    return checkProbably(version.number, installVersion.number)
  } else if (version.compatible) {
    return checkCompatible(version.number, installVersion.number)
  } else {
    return checkEqual(version.number, installVersion.number)
  }
}

// 运行安装命令
function npmInstall(installPackage = []) {
  if (installPackage.length > 10) {
    installPackage.length = 0
  }
  const cmdStr = `npm i ${installPackage.join(' ')}`
  console.log(cmdStr + '\n')
  try {
    const cmd = execSync(cmdStr)
    console.log(cmd.toString())
  } catch (e) {
    console.log(e)
  }
}

// 获取所有已定义的包的版本信息
function getAllPackInfo() {
  return Promise.all(pkgList.map(([name, version]) => {
    return new Promise((resolve, reject) => {
      const packageInfo = { name, version }
      fs.readFile(path.resolve(__dirname, path.join('node_modules', name, 'package.json')), (e, data) => {
        if (e) {
          packageInfo.installVersion = ''
        } else {
          let appPkg
          try {
            appPkg = JSON.parse(data.toString())
          } catch (e) {
            reject(e)
          }
          packageInfo.installVersion = appPkg.version
        }
        resolve(packageInfo)
      })
    })
  }))
}

// 检查package.json包版本是否安装正确
function checkAllVersion() {
  return getAllPackInfo().then(packages => {
    const echoInfo = []
    const installPackage = []
    packages.forEach(({ name, version, installVersion }) => {
      const versionInfo = getVersion(version)
      if (versionInfo.local) {
        return false
      }
      const versionNum = versionInfo.range && versionInfo.range[1].join('.') || versionInfo.version || version
      if (!installVersion) {
        echoInfo.push(`包未安装： ${name}@${version}`)
        installPackage.push(`${versionInfo.net ? version : `${name}@${versionNum}`}`)
      } else if (!compareVersion(version, installVersion)) {
        echoInfo.push(`版本不对： ${name}@${version} 现在版本：${installVersion}`)
        installPackage.push(`${name}@${versionNum}`)
      }
    })
    if (echoInfo.length) {
      console.log(echoInfo.join('\n'))
      npmInstall(installPackage)
    }
  }).catch(e => {
    console.log(e)
    npmInstall()
  })
}

checkAllVersion().then(() => {
  console.log('npm包版本检查完毕\n')
})
