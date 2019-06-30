import Vue from 'vue' //引入 Vue对象 来自vue
import App from './App' //引入App对象来自'./App'
import router from './router'//引入router对象来自'./router'
import VueResource from 'vue-resource'//引入VueResource对象来自'./vue-resource'
import VueRouter from 'vue-router' //引入VueRouter对象来自'./vue-router'
//引入jquery
import $ from 'jquery'
//引入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
//引入vuex状态管理模式
import store from './store/index'
Vue.use(VueResource)
Vue.use(VueRouter)
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
      // 通过vuex state获取当前的token是否存在
      // console.log(isEmptyObject(store.state.user)) 
      if(!isEmptyObject(store.state.user)) {   
          next();
      }
      else { 
          next({
             query: {redirect: to.Path}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
         })
      }
  }
  else {
      next();
  }
})
function isEmptyObject(obj) {
  for (var key in obj) {
      return false;
  }
  return true;
}
//判断object是否为空
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})