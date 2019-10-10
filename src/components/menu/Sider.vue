<template>
  <el-menu class="el-menu-vertical-demo"
           background-color="#001529"
           :collapse="isCollapse"
           text-color="#fff"
           :default-active="actMenu"
           router
           :unique-opened="true"
           @select="handleSelect"
           active-text-color="#ffd04b"
           :collapse-transition='true'>
    <div class="sider_header">
      <img src="../../assets/logo.png"
           v-show="isCollapse"
           alt=""
           style="heigth:30px;width: 30px">
      <img src="../../assets/logo2.png"
           v-show="!isCollapse"
           style="heigth:60px;width: 200px">
    </div>
    <cu-menu v-for="item in menuData"
             :menuitem="item"
             :key="item.id"></cu-menu>
    <!-- <template v-for="(item) in menuData.data"> -->
    <!-- <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航uo</span>
      </template>
      <el-menu-item index="/menu3">选项1</el-menu-item>
    </el-submenu>
    <el-menu-item index="/menu2/menu2-1">
      <i class="el-icon-setting"></i>
      <span slot="title">{{menuData.data[0].name}}</span>
    </el-menu-item> -->
    <!-- </template> -->
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import cuMenu from './Menu'
export default {
  name: 'Sider',
  data () {
    return {
      actMenu: '',
      path: ''
    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.layout.isCollapse,
      menuData: state => state.login.menuData
    })
  },
  components: {
    cuMenu
  },
  watch: {
    '$route' (to, from) {
      this.actMenu = to.path
      this.handleSelect(to.path)
      // console.log(to.path)
    },
    menuData () {
      let menuList = JSON.parse(JSON.stringify(this.menuData))
      this.findFirstMenu(menuList)
      this.$router.replace(this.path)
      this.actMenu = this.path
    }
  },
  methods: {
    findFirstMenu (menuList) {
      if (menuList[0].children) {
        this.findFirstMenu(menuList[0].children)
      } else {
        this.path = menuList[0].path
      }
    },
    handleSelect (key, keyPath) {
      const target = key
      let targetArr = target.split('/')
      let breadArr = []
      targetArr.forEach((item, index) => {
        if (index === 0) {
          breadArr.push(item)
        } else {
          breadArr.push(breadArr[index - 1] + '/' + item)
        }
      })
      breadArr.splice(0, 1)
      let breadArrName = []
      let menuArr = JSON.parse(JSON.stringify(this.menuData))
      breadArr.forEach((item, index) => {
        menuArr.forEach((menuItem, menuIndex) => {
          if (menuItem.path === item) {
            breadArrName.push(menuItem.name)
            if (menuItem.children) {
              menuArr = menuItem.children
            }
            return false
          }
        })
      })
      this.$store.commit('breadSubmit', breadArrName)
      // console.log(breadArrName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 256px;
  min-height: 400px;
}
.sider_header {
  height: 32px;
  background-color: #001529;
  margin: 20px 16px 20px 16px;
  display: flex;
  align-items: center;
}
</style>
