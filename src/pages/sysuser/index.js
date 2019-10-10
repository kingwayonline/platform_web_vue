import axios from 'axios'

const state = {
  dept: [],
  userTableData: []
}
const mutations = {
  async getDept (state, that) {
    let res = await axios.post('/sys/dept/getDept.json', { 'param': '' }, { 'headers': { userid: sessionStorage.getItem('userid'), token: sessionStorage.getItem('token') } })
    if (res.data.ret) {
      state.dept = res.data.data
    } else {
      that.$router.replace('/login')
    }
  },
  async getUser (state, { data, that }) {
    var fd = new FormData()
    fd.append('deptId', data.id)
    fd.append('pageNo', 1)
    fd.append('pageSize', 5)
    let res = await axios.post('/sys/user/getUserPage.json', fd, { 'headers': { userid: sessionStorage.getItem('userid'), token: sessionStorage.getItem('token') } })
    if (res.data.ret) {
      state.userTableData = res.data.data.list
    } else {
      that.$router.replace('/login')
    }
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
