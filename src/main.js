import Vue from 'vue/dist/vue.js'
import Content from './components/Content'
import VueRouter from 'vue-router'
import AdminLogin from './components/AdminLogin'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Content},
  { path: '/admin', component: AdminLogin}
]

const router = new VueRouter({mode: 'history',routes})

Vue.config.productionTip = false

/*new Vue({
  render: h => h(App),
}).$mount('#app')*/
new Vue({router}).$mount('#app')
