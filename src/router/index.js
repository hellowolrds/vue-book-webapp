import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import best from '@/pages/best'
import category from '@/pages/category'
import rank from '@/pages/rank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }
    ,
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/best',
      name: 'best',
      component: best
    },
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    }
  ]
})
