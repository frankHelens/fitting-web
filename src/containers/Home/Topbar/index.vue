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
        <account
          slot="list"
          @dialogEvent="dialogEvent"
        ></account>
      </top-menu-item>
      <el-dialog
        title="解锁上传"
        size="tiny"
        v-model="dialogVisible">
        <SmartForm
          :formList="formList"
          :columns="columns"
          :values="values"
          :buttonList="buttonList"
        />
      </el-dialog>
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
import SmartForm from '@/components/SmartForm'
import { fetchCreate } from '@/utils/api'

/* globals localStorage */
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
    Account,
    SmartForm
  },
  data () {
    return {
      taskNum: 0,
      dialogVisible: false,
      formList: ['uploadPwd'],
      columns: {
        uploadPwd: {
          label: '解锁密码',
          form: {
            type: 'password',
            rules: [{
              required: true, message: '请输密码'
            }]
          }
        }
      },
      values: {},
      buttonList: [{
        name: 'submit',
        label: '提交',
        type: 'primary',
        funcProps: {
          topForm: this
        },
        func (data, props, button) {
          button.loading = true
          props.topForm.submitEvent(data, button)
        }
      }]
    }
  },
  methods: {
    getTaskNum (taskNum) {
      this.taskNum = taskNum
    },
    dialogEvent (bol) {
      this.dialogVisible = true
    },
    submitEvent (data, button) {
      fetchCreate({
        resource: '/users',
        data: data
      })
      .then(data => {
        if (data) {
          this.$message({
            message: '验证成功！',
            showClose: true,
            type: 'success'
          })
          localStorage.timestamp = data.timestamp
          this.$router.replace({
            path: '/query/list',
            query: data
          })
        }
      })
      button.loading = false
      this.dialogVisible = false
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
