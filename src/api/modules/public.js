import _request from '../request.js'

export const login = data => {
  return _request({
    data,
    url: '/sso/login',
    method: 'get'
  })
}
