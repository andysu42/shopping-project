import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import loginAPI from '@/api/loginAPI'

Vue.use(Vuex)

const vuexLocal = new VuexPersist({
  key: 'vuex',
  storage: window.sessionStorage
})

export default new Vuex.Store({
  state: {
    token: '',
    isLogin: false
  },
  actions: {
    async doSetToken ({ commit, dispatch }, payload) {
      let user = {
        username: payload.username,
        password: payload.password
      }
      const { data } = await loginAPI.signIn(user)
      if (data.success) {
        const token = data.token
        const expired = data.expired
        console.log(token, expired)
        document.cookie = `hexToken=${token}; expired=${new Date(expired)}`

        commit('setToken', token)
        dispatch('AnotherActions')
      }
    },
    async checkAuth ({ commit }) {
      const { data } = await loginAPI.checkAuth()
      console.log(data)
      if (data.success) {
        commit('checkAuth', true)
      }
    },
    AnotherActions () {
      console.log('Another Actions run!')
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    checkAuth (state, payload) {
      state.isLogin = payload
    }
  },
  plugins: [vuexLocal.plugin]
})
