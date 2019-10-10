<template>
  <el-menu-item :index="menuitem.path"
                v-if="!menuitem.children">
    <i :class="menuitem.icon"></i>
    <span slot="title">{{menuitem.name}}</span>
  </el-menu-item>
  <el-submenu :index="menuitem.path"
              v-else>
    <template slot="title">
      <i :class="menuitem.icon"></i>
      <span slot="title">{{menuitem.name}}</span>
    </template>
    <cu-menu v-for="subItem in menuitem.children"
          :key="subItem.id"
          :menuitem="subItem"></cu-menu>
  </el-submenu>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  props: ['menuitem'],
  name: 'cuMenu',
  data () {
    return {
    }
  },
  computed: {
    // ...mapState({
    //   isCollapse: state => state.layout.isCollapse,
    //   menuData: state => state.sider.menuData
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
