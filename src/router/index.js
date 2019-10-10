import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout/Layout'
import Login from '@/pages/login/Login'
import SysUser from '@/pages/sysuser/SysUser'
import SysRole from '@/pages/sysrole/SysRole'
import Test1 from '@/pages/test1/Test1'
import Test2 from '@/pages/test2/Test2'
import Test4 from '@/pages/test4/Test4'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/menu1/menu1-1',
          component: Test1
        },
        {
          path: '/menu1/menu1-2/menu1-2-1',
          component: Test2
        },
        {
          path: '/system/user',
          component: SysUser
        },
        {
          path: '/system/role',
          component: SysRole
        },
        {
          path: '/menu3',
          component: Test4
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
