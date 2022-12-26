const DBName = 'cordova_db'
const indexedDB = window.indexedDB || window.webkitIndexedDB
const tableArr = ['public', 'userInfo']
let version = Number(localStorage.__database_version__)

if (!version) {
  localStorage.__database_version__ = version = 1
}

const openDB = () => new Promise((resolve, reject) => {
  // 打开 indexedDB 连接
  let request = indexedDB.open(DBName, version)   // 版本号，当修改了表字段时需要更新

  request.addEventListener('upgradeneeded', event => {
    let db = event.target.result
    // 创建表，键-值 key-value
    tableArr.forEach(name => {
      if (!db.objectStoreNames.contains(name)) {
        db.createObjectStore(name, { keyPath: 'key' })
      }
    })
  })

  request.addEventListener('success', event => {
    resolve(event.target.result)
  })

  request.addEventListener('error', event => {
    reject(event.target.error)
  })
}).catch(error => {
  // 如果是版本号错误问题，则更新版本号
  if (error && String(error.name).toLowerCase() === 'versionerror') {
    version = Number(localStorage.__database_version__ || 1) + 1
    let numArr = error.message.match(/\d+/g)
    if (numArr && numArr.length) {
      version = Math.max(...numArr.map(Number))
    }
    localStorage.__database_version__ = version
    return openDB()
  } else {
    return error
  }
})

// 结果封装，直接返回 value
function getResult(result) {
  return new Promise((resolve, reject) => {
    result.addEventListener('success', event => {
      let result = event.target.result
      resolve(result ? result.value : null)
    })
    result.addEventListener('error', event => {
      reject(event)
    })
  })
}

function getObjectStore(db, name) {
  let objectStore = db.transaction(name, 'readwrite').objectStore(name)
  db.close()
  return objectStore
}

// 获取值（表名，字段名）
export function getStore(name, key) {
  return openDB()
    .then(db => getObjectStore(db, name))
    .then(objectStore => getResult(objectStore.get(key)))
}

// 设置值（表名，字段名，值）
export function setStore(name, key, value) {
  return openDB()
    .then(db => getObjectStore(db, name))
    .then(objectStore => getResult(objectStore.put({ key, value })))
}

// 删除项（表名，字段名）
export function delStore(name, key) {
  return openDB()
    .then(db => getObjectStore(db, name))
    .then(objectStore => getResult(objectStore.delete(key)))
}

// 清空（表名）
export function clearStore(name) {
  return openDB()
    .then(db => getObjectStore(db, name))
    .then(objectStore => getResult(objectStore.clear()))
}

// 清空所有表
export function clearAllStore() {
  return openDB()
    .then(db => Promise.all(tableArr.map(name => {
      let objectStore = db.transaction(name, 'readwrite').objectStore(name)
      return getResult(objectStore.clear())
    })).then(() => {
      db.close()
    }))
}
