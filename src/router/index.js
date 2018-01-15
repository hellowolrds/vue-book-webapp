import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import best from '@/pages/best'
import category from '@/pages/category'
import rank from '@/pages/rank'
import more from '@/pages/more'
import detail from '@/pages/detail'
import same from '@/pages/same'
import search from '@/pages/search'
import list from '@/pages/list'
import menu from '@/pages/bookmenu'
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
    },
    {
      path: '/more/:id/:name',
      name: 'more',
      component: more
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/same/:id',
      name: 'same',
      component: same
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/list/:major',
      name: 'list',
      component: list
    },
    {
      path: "/menu/:id",
      name: 'menu',
      component: menu
    }
  ]
})
