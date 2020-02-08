import Vue from 'vue'
import App from './App.vue'



Vue.config.productionTip = false
//路由 先npm install vue-router
import VueRouter from 'vue-router'
//因为是install的组件 所以需要Vue.use来初始化
Vue.use(VueRouter)

const routes = [
  {path: '/', component: ()=> import('./components/HelloWorld.vue') },
  {path: '*',redirect: '/'}//输错或者没找到页面 跳转到首页
]

const router = new VueRouter ({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
