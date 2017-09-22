<template>
  <el-row class="step-list">
    <el-col
      class="step-list-item"
      v-for="stepInfo in stepInfoList"
      :key="stepInfo"
      :span="stepInfo.span || 8"
    ><span>{{stepInfo.label}}：</span>{{stepInfoObject[stepInfo.name] | dataFormat(stepInfo.type)}}</el-col>
  </el-row>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      stepInfoList: Array,
      stepInfoObject: Object
    },
    data () {
      return {}
    },
    filters: {
      dataFormat (value, type) {
        if (type === 'time') {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        } else if (type === 'date') {
          return moment(value).format('YYYY-MM-DD')
        } else {
          return value
        }
      }
    },
    computed: {
      stepInfoValue () {
        this.stepInfoList.map(step => {
          if (step.type === 'date') {
            this.stepInfoObject[step.name] = moment(this.stepInfoObject[step.name]).format('YYYY年MM月DD日')
          }
          return this.stepInfoObject[step.name]
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
.step-list
  font-size: 14px
  color: #424e67
  margin: 0 auto 20px
  span
    font-weight: bold
  .step-list-item
    margin: 10px 0;
</style>
