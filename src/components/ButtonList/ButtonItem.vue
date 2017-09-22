<template>
  <el-button
    :size="size"
    :type="type"
    :loading="loading"
    @click="handleClick">
    <i v-if="icon && !loading" :class="['fa', 'fa-' + icon]"></i>
    {{label}}
  </el-button>
</template>

<script>
export default {
  name: 'ButtonItem',
  props: {
    name: String,
    size: String,
    type: String,
    icon: String,
    label: String,
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    funcProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    func: Function
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    handleClick (e) {
      this.func(this.data, this.funcProps, this, e)
    }
  }
}
</script>
