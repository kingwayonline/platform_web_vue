import Vue from 'vue'
import Vuex from 'vuex'
import layout from '@/pages/layout'
import sider from '@/components/menu'
import login from '@/pages/login'
import bodyHeader from '@/components/body_header'
import sysuser from '@/pages/sysuser'
import sysrole from '@/pages/sysrole'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    layout, sider, login, bodyHeader, sysuser, sysrole
  }
})
