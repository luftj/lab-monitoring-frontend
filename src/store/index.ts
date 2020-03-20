import Vue from 'vue'
import Vuex, { Mutation } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userid: '',
    userdata: {
      username: '',
      plzHome: '',
      age: '',
      gender: ''
    }
  },
  mutations: {
    user (state, data) {
      state.userid = data.userid;
      state.userdata = data.userdata;
    }
  },
  actions: {
  },
  modules: {
  }
})
