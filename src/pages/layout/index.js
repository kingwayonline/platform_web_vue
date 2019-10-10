const state = {
  breadcrumb: false,
  isCollapse: false
}
const mutations = {
  handCollapse (state) {
    state.isCollapse = !state.isCollapse
  },
  showBreadcrumb (state, val) {
    state.breadcrumb = val
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
