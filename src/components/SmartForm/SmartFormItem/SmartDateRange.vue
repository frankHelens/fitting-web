<template>
  <el-date-picker
    v-model="value"
    type="daterange"
    :align="getAlign"
    :placeholder="placeholder"
    :disabled="disabled"
    :picker-options="pickerOptions"
    @change="changeValue">
  </el-date-picker>
</template>

<script>
import moment from 'moment'

export default {
  name: 'daterange',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '选择日期范围'
    },
    dataType: {
      type: String,
      default: 'string'
    },
    currentValue: {
      type: Object,
      default: () => ({})
    },
    shortcuts: {
      type: Array
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    console.log(this.currentValue)
    return {
      pickerOptions: {
        shortcuts: this.shortcuts
      }
      // value: moment(this.currentValue).format(this.dataType)
    }
  },
  computed: {
    getAlign () {
      return this.shortcuts && this.shortcuts.length ? 'align' : ''
    },
    value () {
      return [this.currentValue.start, this.currentValue.end]
    }
  },
  methods: {
    changeValue (value) {
      const times = value.split(' - ')
      const result = {
        start: times[0] && times[0] !== '' ? moment(times[0], 'YYYY-MM-DD').startOf('day').format('x') : undefined,
        end: times[0] && times[0] !== '' ? moment(times[1], 'YYYY-MM-DD').endOf('day').format('x') : undefined
      }
      console.log(result)
      this.$emit('changeValue', result)
    }
  }
}
</script>
