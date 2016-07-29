import Vue from 'vue'
import App from './App'
import VueRouter from 'VueRouter'

Vue.use(VueRouter)
const router = new VueRouter({
  linkActiveClass: 'is-active'
})

router.map({
  '/': {
    component: resolve => require(['./components/Index'], resolve)
  },
  '/area-chart': {
    component: resolve => require(['./components/AreaChart'], resolve)
  }
})

router.start(App, 'app')
