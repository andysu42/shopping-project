import { post } from '@/utils/http'

const loginAPI = {
  signIn: function (data) {
    //登入
    return post('/admin/signin', data)
  },
  checkAuth: function () {
    //檢查是否持續登入
    return post('/api/user/check')
  }
}

export default loginAPI
