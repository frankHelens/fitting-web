<template>
  <div id="home" class="container">
    <div class="topbar">
      <topbar
        :isOpen="isOpen"
        :realName="realName"
      />
    </div>
    <div class="wrapper">
      <navbar
        v-if="routesPure && routesPure.length > 0"
        :class="{'nav':true,'navbar-open':isOpen}"
        :isOpen="isOpen"
        :routesPure="routesPure"/>
      <router-view class="content"></router-view>
    </div>
  </div>
</template>

<script>
/* globals localStorage */
import { mapGetters } from 'vuex'
// import { fetch } from '@/utils/api'
// import { getMenus } from '@/utils/auth'

import Navbar from './Navbar'
import Topbar from './Topbar'

export default {
  components: {
    Navbar,
    Topbar
  },
  data () {
    return {
      routesPure: [{
        id: 272,
        parentId: '',
        label: '查询',
        url: '/query/list',
        icon: 'search',
        type: 'PAGE'
      }],
      realName: 'Admin',
      data: {
        'id': 1,
        'loginName': 'sa',
        'name': 'Admin',
        'menus': []
      }
    }
  },
  created () {
    // fetch({
    //   method: 'get',
    //   url: 'rbac/user/get'
    // }).then(response => {
    //   this.realName = response.name
    //   localStorage.realname = response.name
    //   this.routesPure = response.menus.filter(item => item.type !== 'BUTTON').map(item => {
    //     return {
    //       ...item,
    //       isOpen: false,
    //       isActive: false
    //     }
    //   })
    //   localStorage.actions = response.menus.filter(item => item.type === 'BUTTON').map(item => {
    //     return item.url
    //   })
    // })
  },
  computed: {
    ...mapGetters([
      'isOpen'
    ])
  },
  motheds: {
    toggleNav: function () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped lang="sass">
  .container
    display: flex
    flex-direction: column
    height: 100%
  .wrapper
    flex: 1
    display: flex
    flex-direction: row
  .nav
    width: 45px
    overflow: auto
    &.navbar-open
      width: 235px
  .content
    flex: 1
    overflow: auto
</style>
