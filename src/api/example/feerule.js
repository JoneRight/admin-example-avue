import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/meeting/feerule/page',
    method: 'get',
    params: query,
  })
}

export function delObj(id) {
  return request({
    url: `/meeting/feerule/${id}`,
    method: 'delete',
  })
}

export function addObj(obj) {
  return request({
    url: '/meeting/feerule',
    method: 'post',
    data: obj,
  })
}

export function putObj(obj) {
  return request({
    url: '/meeting/feerule',
    method: 'put',
    data: obj,
  })
}
