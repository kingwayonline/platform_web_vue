<template>
  <div>
    <span>test4</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Test4',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      breadcrumb: state => state.layout.breadcrumb
    })
  },
  mounted () {
    // this.breadcrumb = true
    this.$store.commit('showBreadcrumb', false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
