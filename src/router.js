import Vue from 'vue'
import Content from './components/User/Content'
import Router from 'vue-router'
import AdminLogin from './components/Admin/AdminLogin'


Vue.use(Router)

export default new Router({
    routes: [
      { path: '/', component: Content},
      { path: '/admin', component: AdminLogin}
    ]
})