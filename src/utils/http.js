import axios from 'axios'

const instance = axios.create({
  timeout: 300000,
  baseURL: process.env.VUE_APP_API_ROOT,
  headers: {
    common: {
      Authorization: token
    }
  }
})

const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
  '$1'
)
// instance.defaults.headers.common['Authorization'] = token

instance.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        t: new Date().getTime()
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          {
            const { message } = error.response.data
            alert(`${error.response.status}: ${message || '資料錯誤'}。`)
          }
          break

        case 404:
          alert(`${error.response.status}: 資料來源不存在`)
          break

        case 500:
          alert(`${error.response.status}: 內部系統發生錯誤`)
          break

        default:
          alert(`${error.response.status}: 系統錯誤，造成您的不便，敬請見諒。`)

          break
      }
    } else {
      if (
        error.code === 'ECONNABORTED' &&
        error.message &&
        error.message.indexOf('timeout') !== -1
      ) {
        alert('網路連線逾時。')
      } else {
        alert('網路連線不穩定，請稍候再試')
      }
    }
    return Promise.reject(error)
  }
)

export function get (url, params, config = {}) {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params,
      ...config
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function post (url, data, config = {}) {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data,
      ...config
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
