import Vue from 'vue'
import Router from 'vue-router'
import DevelopmentList from '@/components/DevelopmentList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DevelopmentList',
      component: DevelopmentList
    }
  ]
})
