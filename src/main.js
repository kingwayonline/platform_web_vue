// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {
  Button, Menu, Submenu, MenuItem, Tooltip, Form, FormItem, Input, Card, Dropdown, DropdownMenu, Dialog, Tag,
  DropdownItem, Breadcrumb, BreadcrumbItem, Tree, Table, TableColumn, Select, Option, OptionGroup, Popover, Pagination, Tabs, TabPane,
  MessageBox, Message, Scrollbar
} from 'element-ui'
// import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Card)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(DropdownItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tree)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Popover)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Scrollbar)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
// Vue.component(CollapseTransition.name, CollapseTransition)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
