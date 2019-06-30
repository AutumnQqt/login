import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    user:JSON.parse(sessionStorage.getItem('user')) || {},
}
const actions = {
  user_signin:({commit},user)=>commit('user_signin'),
}
const mutations={
  user_signin : (state,user)=>{
    sessionStorage.setItem('user', JSON.stringify(user))
    console.log(user)
      Object.assign(state,user)
   },
}
const getters = {
  user : state => state.user
}
const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
export default store