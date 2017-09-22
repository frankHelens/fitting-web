<template>
  <div class="topbar">
    <logo v-show="isOpen"></logo>
    <menu-toggle></menu-toggle>
    <ul class="top-menu pull-right">
      <!-- <alarms v-if="alarmRole" />
      <top-menu-item :badge="taskNum">
        <span slot="title">
          <i slot="title" class="fa fa-tasks"></i>
          任务
        </span>
        <task-list slot="list" @getTaskNum="getTaskNum" />
      </top-menu-item> -->
      <top-menu-item>
        <span slot="title">
          {{realName}}
          <i class="fa fa-angle-down"></i>
        </span>
        <account slot="list"></account>
      </top-menu-item>
    </ul>
  </div>
</template>
<script>
import Logo from './Logo'
import MenuToggle from './MenuToggle'
import TopMenuItem from './TopMenuItem'
import Alarms from './Alarms'
import TaskList from './TaskList'
import Account from './Account'

export default {
  name: 'Topbar',
  props: {
    isOpen: Boolean,
    realName: String
  },
  components: {
    Logo,
    MenuToggle,
    TopMenuItem,
    Alarms,
    TaskList,
    Account
  },
  data () {
    return {
      taskNum: 0
    }
  },
  methods: {
    getTaskNum (taskNum) {
      this.taskNum = taskNum
    }
  }
}
</script>

<style scoped lang="sass">
.topbar
  width: 100%
  margin: 0
  border: 0
  padding: 0
  height: 50px
  min-height: 50px
  background-color: #1e2430
.top-menu
  margin: 0
  padding-left: 20px
  padding-right: 20px
  list-style: none
</style>
