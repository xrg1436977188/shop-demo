import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/searchList.vue')
const Prodetail = () => import('@/views/prodetail')
const Myorder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // 一级路由
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home', // 重定向到home首页
      // 二级路由
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    // 动态路由传参 确认将来是哪个商品  路由参数中携带ID
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/myorder', component: Myorder },
    { path: '/pay', component: Pay }
  ]
})
// 所有的路由在真正被访问到之前（解析渲染对应组件也面前），都会经过全局前置守卫
// 只有全局路由守卫放行了，才会到达对应的页面
// 全局前置导航守卫
// 1.to 去哪 完整路由对象（路径，参数）
// 2.from 从哪来 完整路由对象（路径，参数）
// 3.next（）是否放行
// (1)无参数.next() 直接放行 ==>to
// (2)有参数.next(路径) 拦截到参数路径
// router.beforeEach((to, from, next) => {

// })
const authUrl = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  // 判断to.path 是否在anthUrl中出现过
  if (!authUrl.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }
  // 是权限页面，进一步判断token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
