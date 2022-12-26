// 无权限控制接口
import _request from '../request.js'

export const login = data => {
  return _request({
    data,
    url: '/sso/login',
    method: 'get'
  })
}

export const loginApp = data => {
  return _request({
    data,
    url: '/sso/loginAppSSO',
    method: 'post'
  })
}

export const logout = () => {
  return _request({
    url: '/sso/logout',
    method: 'get'
  })
}

// 修改密码
export const passwordUpdate = data => {
  return _request({
    url: '/admin/passwordUpdate',
    method: 'post',
    data
  })
}

// 搜索
export const topSearch = data => {
  return _request({
    url: '/app/baseInfo/search/homePage',
    data,
    method: 'get'
  })
}

// 查询当前登录用户的信息
export const getUserInfo = () => {
  return _request({
    url: '/infoquery/my-info',
    method: 'get'
  })
}

// 队伍风险库柱状图
export const pbWpUnitDynamicCount = data => {
  return _request({
    url: '/app/persona/pbWpUnitDynamic/count',
    data,
    method: 'get'
  })
}

// 反馈列表
export const feedbackList = data => {
  return _request({
    data,
    url: '/app/suggestion/list',
    method: 'get'
  })
}

// 提交反馈
export const submitFeedback = data => {
  return _request({
    data,
    url: '/app/suggestion/save',
    method: 'post'
  })
}
