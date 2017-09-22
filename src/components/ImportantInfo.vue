<template>
  <div class="important-wrap">
    <div class="important-info">
      <el-row>
        <el-col
          v-for="columnName in infoList"
          :key="columnName"
          :span="columns[columnName].size||6"
        >
          <info-render
            v-if="formValues"
            :data="formValues[columnName]"
            :column="columns[columnName]"
            :minLength="columns[columnName].minLength"
          >
            <template scope="props">
              {{columns[columnName].label}}：{{ props.content }}
            </template>
          </info-render>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import InfoRender from '@/components/InfoRender'
export default {
  name: 'important-info',
  components: {
    InfoRender
  },
  props: {
    infoList: Array,
    formValues: Object,
    columns: Object
  },
  data () {
    return {

    }
  }
}
</script>
<style scoped lang="sass">
.important-wrap
  padding: 12px
  line-height: 2.4
  border: 1px solid #ddd
  .important-info
    margin: 0 auto
    width: 90%
</style>
