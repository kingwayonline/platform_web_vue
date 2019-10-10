import axios from 'axios'
import { Message } from 'element-ui'

const state = {
  menuData: [],
  roleMenuData: []
}
const mutations = {
  async login (state, { username, password, that }) {
    const data = {
      'loginName': username,
      'password': password
    }
    let res = await axios.post('/login.json', data)
    if (res.data.ret) {
      sessionStorage.setItem('userid', res.data.userid)
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('username', res.data.userName)
      that.$router.push('/')
    } else {
      Message.error('用户名或密码错误')
    }
  },
  async getMenu (state, that) {
    let res = await axios.post('/sys/menu/getAllMenu.json', null, { 'headers': { userid: sessionStorage.getItem('userid'), token: sessionStorage.getItem('token') } })
    if (res.data.ret) {
      state.menuData = res.data.data
      console.log(res.data.data)
      // 拼接角色模块的菜单数据
      this.commit('initRoleMenuData', res.data.data)
    } else {
      that.$router.replace('/login')
    }
  },
  initRoleMenuData (state, data) {
    let menuTbData = []
    data.forEach(element => {
      let name1 = element.name
      let id1 = element.id
      if (element.children) {
        element.children.forEach(element1 => {
          let name2 = element1.name
          let id2 = element1.id
          if (element1.children) {
            element1.children.forEach(element2 => {
              let obj = {}
              obj.name3 = element2.name
              obj.id3 = element2.id
              obj.name2 = name2
              obj.id2 = id2
              obj.name1 = name1
              obj.id1 = id1
              menuTbData.push(obj)
            })
          } else {
            let obj = {}
            obj.name2 = name2
            obj.id2 = id2
            obj.name1 = name1
            obj.id1 = id1
            menuTbData.push(obj)
          }
        })
      } else {
        let obj = {}
        obj.name1 = name1
        obj.id1 = id1
        menuTbData.push(obj)
      }
    })
    state.roleMenuData = menuTbData
    console.log(menuTbData)
  }

}
const actions = {

}
const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
